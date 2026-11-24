import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync, gzipSync } from 'node:zlib';
import { getApiSearchTerms, openApiDatabase } from '../skills/mapboxgl/scripts/api-index-utils.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const platforms = {
  mapboxgl: {
    examplesDir: 'examples/mapboxgl',
    helperPath: 'dist/mapboxgl/include-mapboxgl.js'
  },
  leaflet: {
    examplesDir: 'examples/leaflet',
    helperPath: 'dist/leaflet/include-leaflet.js'
  },
  openlayers: {
    examplesDir: 'examples/openlayers',
    helperPath: 'dist/ol/include-ol.js'
  },
  maplibregl: {
    examplesDir: 'examples/maplibregl',
    helperPath: 'dist/maplibregl/include-maplibregl.js'
  },
  classic: {
    examplesDir: 'examples/classic',
    helperPath: 'dist/classic/include-classic.js'
  }
};

function getHtmlFiles(directory) {
  const files = [];
  function visit(currentDirectory) {
    for (const entry of readdirSync(currentDirectory, { withFileTypes: true })) {
      const filePath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        visit(filePath);
      } else if (entry.isFile() && /\.html$/i.test(entry.name)) {
        files.push(filePath);
      }
    }
  }
  visit(directory);
  return files.sort((left, right) => left.localeCompare(right));
}

function getIncludeTokens(html) {
  const tokens = new Set();
  for (const [scriptTag] of html.matchAll(/<script\b[^>]*>/gi)) {
    const includeMatch = scriptTag.match(/\binclude\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (!includeMatch) continue;
    for (const token of (includeMatch[1] || includeMatch[2] || includeMatch[3]).split(',')) {
      const normalizedToken = token.trim();
      if (normalizedToken) tokens.add(normalizedToken);
    }
  }
  return [...tokens].sort();
}

function getDocumentTitle(html, filePath) {
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i);
  if (!titleMatch) return path.basename(filePath, path.extname(filePath));
  const title = titleMatch[1]
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return title || path.basename(filePath, path.extname(filePath));
}

function parseHelperResources(helperSource, helperPath) {
  const includeConditions = [...helperSource.matchAll(
    /inArray\s*\(\s*includes\s*,\s*(['"])([^'"]+)\1\s*\)/g
  )];
  const resources = [];
  const resourcePattern = /input(CSS|Script)\s*\(\s*(libsurl|disturl)\s*\+\s*(['"])([^'"]+)\3\s*\)/g;

  for (let index = 0; index < includeConditions.length; index += 1) {
    const condition = includeConditions[index];
    const blockEnd = includeConditions[index + 1]?.index ?? helperSource.length;
    const block = helperSource.slice(condition.index, blockEnd);
    resourcePattern.lastIndex = 0;
    for (const resourceMatch of block.matchAll(resourcePattern)) {
      resources.push({
        include_token: condition[2],
        resource_type: resourceMatch[1].toLowerCase(),
        resource_root: resourceMatch[2],
        resource_path: resourceMatch[4],
        helper_path: helperPath,
        resource_order: resources.length
      });
    }
  }
  return resources;
}

function makeSourceRecord(platform, sourceType, filePath, sourceBytes, helperTokens = []) {
  const sourceText = sourceBytes.toString('utf8');
  const includes = sourceType === 'example' ? getIncludeTokens(sourceText) : helperTokens;
  const title = sourceType === 'example'
    ? getDocumentTitle(sourceText, filePath)
    : path.basename(filePath);
  const searchText = `${platform} ${sourceType} ${filePath} ${title} ${includes.join(' ')} ${sourceText}`;
  const searchTerms = getApiSearchTerms({
    class_name: platform,
    category: sourceType,
    name: title,
    longname: filePath,
    memberof: ''
  }, searchText);

  return {
    platform,
    source_type: sourceType,
    file_path: filePath,
    title,
    includes_json: JSON.stringify(includes),
    source_sha256: createHash('sha256').update(sourceBytes).digest('hex'),
    source_size: sourceBytes.length,
    raw_gzip: gzipSync(sourceBytes, { level: 9, mtime: 0 }),
    search_terms: searchTerms
  };
}

function getSourceFiles(platform, config) {
  const examplesDirectory = path.join(projectRoot, config.examplesDir);
  const helperFile = path.join(projectRoot, config.helperPath);
  if (!existsSync(examplesDirectory)) throw new Error(`Examples directory not found: ${examplesDirectory}`);
  if (!existsSync(helperFile)) throw new Error(`Include helper not found: ${helperFile}`);

  const htmlFiles = getHtmlFiles(examplesDirectory);
  if (htmlFiles.length === 0) throw new Error(`No HTML examples found in ${examplesDirectory}`);

  const helperBytes = readFileSync(helperFile);
  const helperSource = helperBytes.toString('utf8');
  const helperTokens = [...new Set(
    [...helperSource.matchAll(/inArray\s*\(\s*includes\s*,\s*(['"])([^'"]+)\1\s*\)/g)]
      .map(match => match[2])
  )].sort();
  const helperPath = config.helperPath.replace(/\\/g, '/');
  const sources = [
    makeSourceRecord(platform, 'include-helper', helperPath, helperBytes, helperTokens)
  ];

  for (const absolutePath of htmlFiles) {
    const filePath = path.relative(projectRoot, absolutePath).replace(/\\/g, '/');
    sources.push(makeSourceRecord(platform, 'example', filePath, readFileSync(absolutePath)));
  }

  return {
    sources,
    pluginResources: parseHelperResources(helperSource, helperPath),
    helperPath,
    htmlCount: htmlFiles.length
  };
}

function buildDatabase(database, platform, sourceData) {
  database.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    PRAGMA page_size = 4096;
    PRAGMA user_version = 1;
    CREATE TABLE knowledge_sources (
      id INTEGER PRIMARY KEY,
      platform TEXT NOT NULL,
      source_type TEXT NOT NULL,
      file_path TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      includes_json TEXT NOT NULL,
      source_sha256 TEXT NOT NULL,
      source_size INTEGER NOT NULL,
      raw_gzip BLOB NOT NULL
    );
    CREATE INDEX knowledge_sources_type ON knowledge_sources(source_type);
    CREATE TABLE plugin_resources (
      id INTEGER PRIMARY KEY,
      include_token TEXT NOT NULL,
      resource_type TEXT NOT NULL,
      resource_root TEXT NOT NULL,
      resource_path TEXT NOT NULL,
      helper_path TEXT NOT NULL,
      resource_order INTEGER NOT NULL
    );
    CREATE INDEX plugin_resources_token ON plugin_resources(include_token);
    CREATE VIRTUAL TABLE knowledge_search USING fts5(
      search_terms,
      tokenize = 'unicode61',
      detail = none,
      content = ''
    );
    CREATE TABLE index_info (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  `);

  const insertSource = database.prepare(`
    INSERT INTO knowledge_sources
      (id, platform, source_type, file_path, title, includes_json, source_sha256, source_size, raw_gzip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertSearch = database.prepare(
    'INSERT INTO knowledge_search (rowid, search_terms) VALUES (?, ?)'
  );
  const insertResource = database.prepare(`
    INSERT INTO plugin_resources
      (include_token, resource_type, resource_root, resource_path, helper_path, resource_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  database.exec('BEGIN');
  for (let index = 0; index < sourceData.sources.length; index += 1) {
    const source = sourceData.sources[index];
    const sourceId = index + 1;
    insertSource.run(
      sourceId,
      source.platform,
      source.source_type,
      source.file_path,
      source.title,
      source.includes_json,
      source.source_sha256,
      source.source_size,
      source.raw_gzip
    );
    insertSearch.run(sourceId, source.search_terms);
  }
  for (const resource of sourceData.pluginResources) {
    insertResource.run(
      resource.include_token,
      resource.resource_type,
      resource.resource_root,
      resource.resource_path,
      resource.helper_path,
      resource.resource_order
    );
  }
  const insertInfo = database.prepare('INSERT INTO index_info (key, value) VALUES (?, ?)');
  insertInfo.run('schemaVersion', '1');
  insertInfo.run('platform', platform);
  insertInfo.run('helperPath', sourceData.helperPath);
  insertInfo.run('htmlCount', String(sourceData.htmlCount));
  insertInfo.run('pluginResourceCount', String(sourceData.pluginResources.length));
  database.exec('COMMIT; VACUUM;');
}

async function validateDatabase(databasePath, expectedSources, expectedResources) {
  const db = await openApiDatabase(databasePath);
  try {
    const integrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
    if (integrity !== 'ok') throw new Error(`SQLite integrity check failed: ${integrity}`);

    const sourceCount = db.prepare('SELECT COUNT(*) AS count FROM knowledge_sources').get().count;
    const resourceCount = db.prepare('SELECT COUNT(*) AS count FROM plugin_resources').get().count;
    if (sourceCount !== expectedSources.length) {
      throw new Error(`Expected ${expectedSources.length} indexed sources, found ${sourceCount}.`);
    }
    if (resourceCount !== expectedResources.length) {
      throw new Error(`Expected ${expectedResources.length} plugin resources, found ${resourceCount}.`);
    }

    const rows = db.prepare(`
      SELECT id, file_path, source_sha256, source_size, raw_gzip
      FROM knowledge_sources
      ORDER BY id
    `).all();
    for (const row of rows) {
      const sourceBytes = gunzipSync(row.raw_gzip);
      const hash = createHash('sha256').update(sourceBytes).digest('hex');
      if (sourceBytes.length !== row.source_size || hash !== row.source_sha256) {
        throw new Error(`Compressed source integrity check failed: ${row.file_path}`);
      }
    }

    const firstTerm = expectedSources[0].search_terms.split(/\s+/).find(Boolean);
    if (!firstTerm) throw new Error('No searchable terms were generated.');
    const match = `"${firstTerm.replace(/"/g, '""')}"`;
    const searchCount = db.prepare(
      'SELECT COUNT(*) AS count FROM knowledge_search WHERE knowledge_search MATCH ?'
    ).get(match).count;
    if (searchCount === 0) throw new Error('FTS5 smoke test returned no results.');
  } finally {
    db.close();
  }
}

async function buildPlatform(platform) {
  const config = platforms[platform];
  if (!config) {
    throw new Error(`Unknown platform: ${platform}. Available: ${Object.keys(platforms).join(', ')}`);
  }

  const sourceData = getSourceFiles(platform, config);
  const outputPath = path.join(
    projectRoot,
    'skills',
    platform,
    'assets',
    `iclient-${platform}-examples.sqlite`
  );
  const outputDirectory = path.dirname(outputPath);
  mkdirSync(outputDirectory, { recursive: true });

  const tempPath = `${outputPath}.tmp-${process.pid}`;
  const backupPath = `${outputPath}.bak-${process.pid}`;
  rmSync(tempPath, { force: true });
  rmSync(backupPath, { force: true });

  let database;
  try {
    database = await openApiDatabase(tempPath);
    buildDatabase(database, platform, sourceData);
    database.close();
    database = undefined;

    await validateDatabase(tempPath, sourceData.sources, sourceData.pluginResources);
    if (existsSync(outputPath)) renameSync(outputPath, backupPath);
    try {
      renameSync(tempPath, outputPath);
    } catch (error) {
      if (existsSync(backupPath)) renameSync(backupPath, outputPath);
      throw error;
    }
    rmSync(backupPath, { force: true });

    const outputBytes = statSync(outputPath).size;
    process.stdout.write(
      `Built ${platform} examples index: ${sourceData.htmlCount} HTML files, ` +
      `${sourceData.pluginResources.length} plugin resources, ${outputBytes} bytes\n`
    );
  } catch (error) {
    database?.close();
    rmSync(tempPath, { force: true });
    if (!existsSync(outputPath) && existsSync(backupPath)) renameSync(backupPath, outputPath);
    rmSync(backupPath, { force: true });
    throw error;
  }
}

async function main() {
  const platform = process.argv[2];
  if (!platform) {
    throw new Error(`Usage: node build/build-skills-examples.mjs <${Object.keys(platforms).join('|')}>`);
  }
  await buildPlatform(platform);
}

main().catch(error => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
