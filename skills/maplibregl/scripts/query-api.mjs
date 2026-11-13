import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeApiEntry, getApiSearchText, openApiDatabase } from './api-index-utils.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultDatabase = path.resolve(scriptDir, '..', 'assets', 'iclient-maplibregl.sqlite');
const MAX_LIMIT = 50;
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'api', 'are', 'can', 'class', 'create', 'does', 'do', 'for', 'from',
  'function', 'generate', 'get', 'how', 'i', 'make', 'method', 'name', 'need', 'of', 'on',
  'or', 'please', 'show', 'supermap', 'the', 'to', 'use', 'using', 'want', 'with'
]);

function usage() {
  return [
    '用法：',
    '  node skills/maplibregl/scripts/query-api.mjs search <关键词> [--limit 数量]',
    '  node skills/maplibregl/scripts/query-api.mjs get <类名> [--member <成员名>] [--kind <类型>] [--limit 数量]',
    '',
    '示例：',
    '  node skills/maplibregl/scripts/query-api.mjs search "热力图专题图"',
    '  node skills/maplibregl/scripts/query-api.mjs search "HeatMapLayer featureWeight"',
    '  node skills/maplibregl/scripts/query-api.mjs get HeatMapLayer --member addFeatures',
    '  node skills/maplibregl/scripts/query-api.mjs get FeatureService --limit 10'
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
      if (!value || value.startsWith('--')) throw new Error(`参数 ${arg} 必须提供一个值。`);
      index += 1;
      if (arg === '--limit') {
        options.limit = Number(value);
        if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > MAX_LIMIT) {
          throw new Error(`--limit 必须是 1 到 ${MAX_LIMIT} 之间的整数。`);
        }
      } else {
        options[arg.slice(2)] = value;
      }
    } else if (arg.startsWith('--')) {
      throw new Error(`未知选项：${arg}`);
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
      if (!source) throw new Error(`索引中缺少 API 来源文件：${row.source_file}`);
      sources.set(row.source_file, decodeApiEntry(source));
    }
    const api = sources.get(row.source_file)[row.record_index];
    if (!api) throw new Error(`索引中缺少 API 记录：${row.source_file}#${row.record_index}`);
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
  const nameText = [row.name, row.longname, row.memberof].filter(Boolean).join(' ').toLocaleLowerCase();
  const classText = String(row.class_name || '').toLocaleLowerCase();
  const categoryText = String(row.category || '').toLocaleLowerCase();
  let score = 0;
  let matchedTerms = 0;
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
    }
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
    if (!source) throw new Error(`索引中缺少 API 来源文件：${sourceFile}`);
    const records = decodeApiEntry(source);
    if (records.length !== source.record_count) {
      throw new Error(`API 记录数量不匹配：${sourceFile}，预期 ${source.record_count} 条，实际 ${records.length} 条。`);
    }
    for (const row of rows) {
      const api = records[row.record_index];
      if (!api) throw new Error(`索引中缺少 API 记录：${sourceFile}#${row.record_index}`);
      const rank = rankEntry(row, getApiSearchText(row, api), terms, query.trim());
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
      strategy: '标识符精确匹配'
    };
  }

  const terms = [...new Set([...getQueryTerms(query), ...getChineseSearchTerms(query)])];
  if (terms.length === 0) return { entries: [], total: 0, strategy: 'FTS5 关键词检索' };

  const candidates = new Map();
  for (const row of getSearchCandidateRows(db, terms)) candidates.set(row.id, row);
  const matches = getSearchMatches(db, [...candidates.values()], terms, query);
  matches.sort((left, right) =>
    right.score - left.score ||
    (left.row.kind === 'class' ? -1 : 0) - (right.row.kind === 'class' ? -1 : 0) ||
    String(left.row.class_name || '').localeCompare(String(right.row.class_name || '')) ||
    String(left.row.name || '').localeCompare(String(right.row.name || ''))
  );
  return {
    entries: rowsFromEntryRows(db, matches.slice(0, limit).map(match => match.row)),
    total: matches.length,
    strategy: 'FTS5 关键词检索'
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
    strategy: '类/成员查询'
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
    ...(result.total === 0 ? { message: '没有找到匹配的 API。请尝试类名、方法名或更短的关键词。' } : {})
  }, null, 2)}\n`);
}

async function main() {
  const { command, positional, options } = parseArgs(process.argv.slice(2));
  if (command === '--help' || command === '-h' || !command) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (command !== 'search' && command !== 'get') throw new Error(`未知命令：${command}\n\n${usage()}`);
  if (positional.length !== 1) throw new Error(`${command} 命令必须且只能接收一个关键词或类名。\n\n${usage()}`);
  const query = positional[0];
  if (!query.trim()) throw new Error('查询内容不能为空。');
  if (query.length > 512) throw new Error('查询内容不能超过 512 个字符。');
  if (!existsSync(defaultDatabase)) {
    throw new Error(`未找到 API 索引：${defaultDatabase}。请先生成 MapLibreGL API 索引。`);
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
