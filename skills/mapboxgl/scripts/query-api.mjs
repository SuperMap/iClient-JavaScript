import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeApiEntry, getApiSearchText, openApiDatabase } from './api-index-utils.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultDatabase = path.resolve(scriptDir, '..', 'assets', 'iclient-mapboxgl.sqlite');
const MAX_LIMIT = 50;
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'api', 'are', 'can', 'class', 'create', 'does', 'do', 'for', 'from',
  'function', 'generate', 'get', 'how', 'i', 'make', 'method', 'name', 'need', 'of', 'on',
  'or', 'please', 'show', 'supermap', 'the', 'to', 'use', 'using', 'want', 'with'
]);
function usage() {
  return [
    'Usage:',
    '  node scripts/query-api.mjs search <query> [--limit N]',
    '  node scripts/query-api.mjs get <ClassName> [--member <name>] [--kind <kind>] [--limit N]',
    '',
    'Examples:',
    '  node scripts/query-api.mjs search "热力图专题图"',
    '  node scripts/query-api.mjs search "HeatMapLayer featureWeight"',
    '  node scripts/query-api.mjs get HeatMapLayer --member addFeatures',
    '  node scripts/query-api.mjs get REST --limit 10'
  ].join('\n');
}

function parseArgs(args) {
  const [command, ...tail] = args;
  const positional = [];
  const options = { limit: command === 'get' ? 20 : 8 };
  for (let index = 0; index < tail.length; index += 1) {
    const arg = tail[index];
    if (arg === '--limit' || arg === '--member' || arg === '--kind') {
      const value = tail[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`${arg} requires a value.`);
      index += 1;
      if (arg === '--limit') {
        options.limit = Number(value);
        if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > MAX_LIMIT) {
          throw new Error(`--limit must be an integer from 1 to ${MAX_LIMIT}.`);
        }
      } else {
        options[arg.slice(2)] = value;
      }
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }
  return { command, positional, options };
}

function getQueryTerms(query) {
  return [...new Set((query.match(/[A-Za-z0-9_$]+/g) || [])
    .map(term => term.toLowerCase())
    .filter(term => term.length > 1 && !STOP_WORDS.has(term)))];
}

function getChineseSearchTerms(query) {
  const terms = new Set();
  for (const run of query.match(/\p{Script=Han}+/gu) || []) {
    terms.add(run);
    const characters = Array.from(run);
    for (let size = 2; size <= 3; size += 1) {
      for (let index = 0; index <= characters.length - size && terms.size < 128; index += 1) {
        terms.add(characters.slice(index, index + size).join(''));
      }
    }
  }
  return [...terms];
}

function formatEntry(row, api) {
  return {
    source: row.source_file,
    class: row.class_name,
    kind: row.kind,
    name: row.name,
    longname: row.longname,
    memberof: row.memberof,
    category: row.category,
    api
  };
}

function rowsFromEntryRows(db, entryRows) {
  const sources = new Map();
  return entryRows.map(row => {
    if (!sources.has(row.source_file)) {
      const source = db.prepare('SELECT raw_gzip FROM api_files WHERE source_file = ?').get(row.source_file);
      if (!source) throw new Error(`API source missing from index: ${row.source_file}`);
      sources.set(row.source_file, decodeApiEntry(source));
    }
    const api = sources.get(row.source_file)[row.record_index];
    if (!api) throw new Error(`API record missing from index: ${row.source_file}#${row.record_index}`);
    return formatEntry(row, api);
  });
}

function getEntryRows(db, whereSql, parameters) {
  return db.prepare(`
    SELECT id, class_name, source_file, record_index, kind, name, longname, memberof, category
    FROM api_entries
    WHERE ${whereSql}
  `).all(...parameters);
}

function rankEntry(row, searchText, terms, fullQuery) {
  const nameText = `${row.name} ${row.longname} ${row.memberof}`.toLocaleLowerCase();
  const classText = row.class_name.toLocaleLowerCase();
  const categoryText = row.category.toLocaleLowerCase();
  let score = 0;
  let matchedTerms = 0;
  let matchedLatinTerms = 0;
  let matchedChinese = false;
  for (const term of terms) {
    const normalizedTerm = term.toLocaleLowerCase();
    let termScore = 0;
    if (nameText === normalizedTerm) termScore += 14;
    else if (nameText.includes(normalizedTerm)) termScore += 9;
    if (classText === normalizedTerm) termScore += 12;
    else if (classText.includes(normalizedTerm)) termScore += 7;
    if (categoryText.includes(normalizedTerm)) termScore += 5;
    if (searchText.includes(normalizedTerm)) termScore += 2;
    if (termScore > 0) {
      matchedTerms += 1;
      score += termScore;
      if (/^[A-Za-z0-9_$]+$/.test(term)) matchedLatinTerms += 1;
      else matchedChinese = true;
    }
  }
  const requiredLatinMatches = terms.filter(term => /^[A-Za-z0-9_$]+$/.test(term)).length > 1 ? 2 : 1;
  if (matchedLatinTerms < requiredLatinMatches && !matchedChinese) {
    return { score: 0, matchedTerms: 0 };
  }
  if (fullQuery && searchText.includes(fullQuery.toLocaleLowerCase())) score += 6;
  if (matchedTerms > 1) score += matchedTerms * 2;
  return { score, matchedTerms };
}

function getTrigrams(terms) {
  const trigrams = new Set();
  for (const term of terms) {
    const characters = Array.from(term);
    for (let index = 0; index <= characters.length - 3; index += 1) {
      trigrams.add(characters.slice(index, index + 3).join(''));
    }
  }
  return [...trigrams];
}

function getFtsSearchTerms(terms) {
  const ftsTerms = new Set();
  for (const term of terms) {
    if (/\p{Script=Han}/u.test(term)) {
      ftsTerms.add(`"${term.replace(/"/g, '""')}"`);
      continue;
    }
    for (const word of term.match(/[A-Za-z0-9]+/g) || []) {
      const normalizedWord = word.toLocaleLowerCase();
      ftsTerms.add(`"${normalizedWord}"*`);
      for (const trigram of getTrigrams([normalizedWord])) {
        ftsTerms.add(`"${trigram}"`);
      }
    }
  }
  return [...ftsTerms];
}

function getSearchCandidateRows(db, terms) {
  const match = getFtsSearchTerms(terms).join(' OR ');
  if (!match) return [];
  return db.prepare(`
    SELECT api_entries.id, api_entries.class_name, api_entries.source_file,
      api_entries.record_index, api_entries.kind, api_entries.name, api_entries.longname,
      api_entries.memberof, api_entries.category
    FROM api_search
    JOIN api_entries ON api_entries.id = api_search.rowid
    WHERE api_search MATCH ?
  `).all(match);
}

function getSearchMatches(db, candidateRows, terms, query) {
  const candidatesByFile = new Map();
  for (const row of candidateRows) {
    if (!candidatesByFile.has(row.source_file)) candidatesByFile.set(row.source_file, []);
    candidatesByFile.get(row.source_file).push(row);
  }

  const matches = [];
  for (const [sourceFile, rows] of candidatesByFile) {
    const source = db.prepare('SELECT raw_gzip, record_count FROM api_files WHERE source_file = ?').get(sourceFile);
    if (!source) throw new Error(`API source missing from index: ${sourceFile}`);
    const records = decodeApiEntry(source);
    if (records.length !== source.record_count) {
      throw new Error(`API record count mismatch in ${sourceFile}: expected ${source.record_count}, found ${records.length}.`);
    }
    for (const row of rows) {
      const api = records[row.record_index];
      if (!api) throw new Error(`API record missing from index: ${sourceFile}#${row.record_index}`);
      const searchText = getApiSearchText(row, api);
      const rank = rankEntry(row, searchText, terms, query.trim());
      if (rank.matchedTerms > 0) matches.push({ row, ...rank });
    }
  }
  return matches;
}

function runSearch(db, query, limit) {
  const exactRows = getEntryRows(
    db,
    'lower(class_name) = lower(?) OR lower(name) = lower(?) OR lower(longname) = lower(?)',
    [query, query, query]
  ).sort((left, right) => {
    const leftRank = left.class_name.toLowerCase() === query.toLowerCase() ? 0 : 1;
    const rightRank = right.class_name.toLowerCase() === query.toLowerCase() ? 0 : 1;
    return leftRank - rightRank || left.id - right.id;
  });
  if (exactRows.length > 0) {
    return {
      entries: rowsFromEntryRows(db, exactRows.slice(0, limit)),
      total: exactRows.length,
      strategy: 'exact identifier'
    };
  }

  const terms = [...new Set([...getQueryTerms(query), ...getChineseSearchTerms(query)])];
  if (terms.length === 0) return { entries: [], total: 0, strategy: 'offline FTS5 keyword search' };

  const candidates = new Map();
  for (const row of getSearchCandidateRows(db, terms)) {
    candidates.set(row.id, row);
  }
  const matches = getSearchMatches(db, [...candidates.values()], terms, query);
  matches.sort((left, right) =>
    right.score - left.score ||
    (left.row.kind === 'class' ? -1 : 0) - (right.row.kind === 'class' ? -1 : 0) ||
    left.row.class_name.localeCompare(right.row.class_name) ||
    left.row.name.localeCompare(right.row.name)
  );
  return {
    entries: rowsFromEntryRows(db, matches.slice(0, limit).map(match => match.row)),
    total: matches.length,
    strategy: 'offline FTS5 keyword search'
  };
}

function runGet(db, className, options) {
  const where = ['lower(class_name) = lower(?)'];
  const parameters = [className];
  if (options.member) {
    where.push('(lower(name) = lower(?) OR lower(longname) = lower(?))');
    parameters.push(options.member, options.member);
  }
  if (options.kind) {
    where.push('lower(kind) = lower(?)');
    parameters.push(options.kind);
  }
  const whereSql = where.join(' AND ');
  const count = db.prepare(`SELECT COUNT(*) AS count FROM api_entries WHERE ${whereSql}`).get(...parameters).count;
  const rows = db.prepare(`
    SELECT id, class_name, source_file, record_index, kind, name, longname, memberof, category
    FROM api_entries
    WHERE ${whereSql}
    ORDER BY CASE kind WHEN 'class' THEN 0 ELSE 1 END, kind, name, id
    LIMIT ?
  `).all(...parameters, options.limit);
  return {
    entries: rowsFromEntryRows(db, rows),
    total: count,
    strategy: 'class/member lookup'
  };
}

function printResults(query, result, limit) {
  process.stdout.write(`${JSON.stringify({
    query,
    strategy: result.strategy,
    total: result.total,
    returned: result.entries.length,
    truncated: result.total > limit,
    results: result.entries,
    ...(result.total === 0 ? { message: 'No matching API entries. Try a class name, method name, or shorter keyword.' } : {})
  }, null, 2)}\n`);
}

async function main() {
  const { command, positional, options } = parseArgs(process.argv.slice(2));
  if (command === '--help' || command === '-h' || !command) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (command !== 'search' && command !== 'get') throw new Error(`Unknown command: ${command}\n\n${usage()}`);
  if (positional.length !== 1) throw new Error(`${command} requires exactly one query or class name.\n\n${usage()}`);
  const query = positional[0];
  if (!query.trim()) throw new Error('Query cannot be empty.');
  if (query.length > 512) throw new Error('Query must be 512 characters or fewer.');
  if (!existsSync(defaultDatabase)) {
    throw new Error(`API index not found at ${defaultDatabase}. Rebuild it with npm run build-docs-json.`);
  }

  const db = await openApiDatabase(defaultDatabase);
  try {
    const result = command === 'search'
      ? runSearch(db, query, options.limit)
      : runGet(db, query, options);
    printResults(query, result, options.limit);
  } finally {
    db.close();
  }
}

main().catch(error => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
