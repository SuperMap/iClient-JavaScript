import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { openApiDatabase } from './api-index-utils.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(scriptDir, '..');
const projectRoot = path.resolve(skillDir, '..', '..');
const defaultPlatform = path.basename(skillDir);
const platforms = new Set(['mapboxgl', 'leaflet', 'openlayers', 'maplibregl', 'classic']);
const MAX_LIMIT = 50;
const MAX_CHARS = 200000;

function usage() {
  return [
    'Usage:',
    '  node skills/leaflet/scripts/query-examples.mjs search <query> [--platform <name>] [--limit N] [--max-chars N]',
    '  node skills/leaflet/scripts/query-examples.mjs get <source-path> [--platform <name>] [--max-chars N]',
    '',
    'Examples:',
    '  node skills/leaflet/scripts/query-examples.mjs search "mapv DataSet" --platform leaflet',
    '  node skills/leaflet/scripts/query-examples.mjs get examples/leaflet/mapVLayerQianxi.html'
  ].join('\n');
}

function parseArgs(args) {
  const [command, ...tail] = args;
  const positional = [];
  const options = { platform: defaultPlatform, limit: 8, maxChars: 12000 };
  for (let index = 0; index < tail.length; index += 1) {
    const arg = tail[index];
    if (arg === '--platform' || arg === '--limit' || arg === '--max-chars') {
      const value = tail[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`${arg} requires a value.`);
      index += 1;
      if (arg === '--platform') {
        options.platform = value;
      } else if (arg === '--limit') {
        options.limit = Number(value);
        if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > MAX_LIMIT) {
          throw new Error(`--limit must be an integer from 1 to ${MAX_LIMIT}.`);
        }
      } else {
        options.maxChars = Number(value);
        if (!Number.isInteger(options.maxChars) || options.maxChars < 1 || options.maxChars > MAX_CHARS) {
          throw new Error(`--max-chars must be an integer from 1 to ${MAX_CHARS}.`);
        }
      }
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }
  if (!platforms.has(options.platform)) {
    throw new Error(`Unknown platform: ${options.platform}. Available: ${[...platforms].join(', ')}`);
  }
  return { command, positional, options };
}

function getFtsQueries(query) {
  const terms = new Set(
    (query.match(/[\p{L}\p{N}]+/gu) || [])
      .filter(term => term.length > 1 || /\p{Script=Han}/u.test(term))
  );
  for (const run of query.match(/\p{Script=Han}+/gu) || []) terms.add(run);
  const quotedTerms = [...terms].map(term => `"${term.replace(/"/g, '""')}"`);
  return {
    all: quotedTerms.join(' AND '),
    any: quotedTerms.join(' OR ')
  };
}

function getRelatedPluginResources(database, query, helperPath) {
  const queryTerms = query.match(/[A-Za-z0-9._-]+/g) || [];
  const matchingTokens = new Set();
  const findTokens = database.prepare(`
    SELECT DISTINCT include_token
    FROM plugin_resources
    WHERE instr(lower(?), lower(include_token)) > 0
       OR instr(lower(include_token), lower(?)) > 0
  `);
  for (const term of queryTerms) {
    for (const row of findTokens.all(term, term)) matchingTokens.add(row.include_token);
  }
  if (matchingTokens.size === 0) return [];
  const placeholders = [...matchingTokens].map(() => '?').join(', ');
  return database.prepare(`
    SELECT include_token, resource_type, resource_root, resource_path, resource_order
    FROM plugin_resources
    WHERE helper_path = ? AND include_token IN (${placeholders})
    ORDER BY resource_order
  `).all(helperPath, ...matchingTokens);
}

function getDatabasePath(platform) {
  const baseDirectory = platform === defaultPlatform
    ? skillDir
    : path.join(projectRoot, 'skills', platform);
  return path.join(baseDirectory, 'assets', `iclient-${platform}-examples.sqlite`);
}

function getContent(row, maxChars) {
  const content = gunzipSync(row.raw_gzip).toString('utf8');
  return {
    content: content.slice(0, maxChars),
    truncated: content.length > maxChars
  };
}

function parseIncludes(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid include metadata in ${value}: ${error.message}`);
  }
}

function runSearch(database, query, options) {
  const matches = getFtsQueries(query);
  if (!matches.any) return { results: [], total: 0 };
  const countMatches = database.prepare(`
    SELECT COUNT(*) AS count
    FROM knowledge_search
    WHERE knowledge_search MATCH ?
  `);
  const strictTotal = matches.all ? countMatches.get(matches.all).count : 0;
  const match = strictTotal > 0 ? matches.all : matches.any;
  const total = strictTotal > 0 ? strictTotal : countMatches.get(match).count;
  const rows = database.prepare(`
    SELECT knowledge_sources.id, knowledge_sources.source_type, knowledge_sources.file_path,
      knowledge_sources.title, knowledge_sources.includes_json, knowledge_sources.source_sha256,
      knowledge_sources.raw_gzip
    FROM knowledge_search
    JOIN knowledge_sources ON knowledge_sources.id = knowledge_search.rowid
    WHERE knowledge_search MATCH ?
    ORDER BY knowledge_search.rank
    LIMIT ?
  `).all(match, options.limit);
  return {
    results: rows.map(row => ({
      sourceType: row.source_type,
      sourcePath: row.file_path,
      title: row.title,
      includes: parseIncludes(row.includes_json),
      sourceSha256: row.source_sha256,
      ...(row.source_type === 'include-helper'
        ? { pluginResources: getRelatedPluginResources(database, query, row.file_path) }
        : {}),
      ...getContent(row, options.maxChars)
    })),
    total
  };
}

function normalizeSourcePath(sourcePath) {
  const normalizedPath = sourcePath.replace(/\\/g, '/').replace(/^\.\/+/, '');
  if (path.posix.isAbsolute(normalizedPath) || normalizedPath.split('/').includes('..')) {
    throw new Error('Source path must be a repository-relative path without parent segments.');
  }
  return normalizedPath;
}

function runGet(database, sourcePath, options) {
  const normalizedPath = normalizeSourcePath(sourcePath);
  const row = database.prepare(`
    SELECT source_type, file_path, title, includes_json, source_sha256, raw_gzip
    FROM knowledge_sources
    WHERE file_path = ?
  `).get(normalizedPath);
  if (!row) throw new Error(`Indexed source not found: ${normalizedPath}`);
  return {
    sourceType: row.source_type,
    sourcePath: row.file_path,
    title: row.title,
    includes: parseIncludes(row.includes_json),
    sourceSha256: row.source_sha256,
    ...getContent(row, options.maxChars)
  };
}

async function main() {
  const { command, positional, options } = parseArgs(process.argv.slice(2));
  if (command === '--help' || command === '-h' || !command) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (command !== 'search' && command !== 'get') {
    throw new Error(`Unknown command: ${command}\n\n${usage()}`);
  }
  if (positional.length === 0) throw new Error(`${command} requires a query or source path.\n\n${usage()}`);
  const value = command === 'search' ? positional.join(' ') : positional[0];
  if (!value.trim()) throw new Error('Query or source path cannot be empty.');
  if (value.length > 512) throw new Error('Query or source path must be 512 characters or fewer.');
  if (command === 'get' && positional.length !== 1) {
    throw new Error('get requires exactly one source path.\n\n' + usage());
  }

  const databasePath = getDatabasePath(options.platform);
  if (!existsSync(databasePath)) {
    throw new Error(`Examples index not found at ${databasePath}. Build it with npm run build-skills -- ${options.platform}.`);
  }
  const database = await openApiDatabase(databasePath);
  try {
    const result = command === 'search'
      ? runSearch(database, value, options)
      : runGet(database, value, options);
    process.stdout.write(`${JSON.stringify({
      platform: options.platform,
      query: value,
      ...(command === 'search'
        ? { total: result.total, returned: result.results.length, truncated: result.total > options.limit, results: result.results }
        : { result })
    }, null, 2)}\n`);
  } finally {
    database.close();
  }
}

main().catch(error => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
