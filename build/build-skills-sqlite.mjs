import { createHash } from 'node:crypto';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { getApiSearchTerms, getApiSearchText, openApiDatabase } from '../skills/mapboxgl/scripts/api-index-utils.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const platforms = ['mapboxgl', 'leaflet', 'openlayers', 'maplibregl', 'classic'];
const platform = process.argv[2] || 'mapboxgl';
if (!platforms.includes(platform)) {
  throw new Error(`Unknown platform: ${platform}. Available: ${platforms.join(', ')}`);
}

const sourceDir = path.join(projectRoot, 'docs-json', `iclient-${platform}`);
const outputPath = path.join(projectRoot, 'skills', platform, 'assets', `iclient-${platform}.sqlite`);
if (!existsSync(sourceDir)) throw new Error(`API JSON source directory not found: ${sourceDir}`);
const sourceFiles = readdirSync(sourceDir).filter(name => name.endsWith('.json')).sort();
if (sourceFiles.length === 0) throw new Error(`No API JSON files found in ${sourceDir}`);

const digest = createHash('sha256');
const sourceRows = [];
const entryRows = [];
for (const sourceFile of sourceFiles) {
  const sourceBytes = readFileSync(path.join(sourceDir, sourceFile));
  digest.update(sourceFile);
  digest.update('\0');
  digest.update(sourceBytes);

  let records;
  try {
    records = JSON.parse(sourceBytes.toString('utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON in ${sourceFile}: ${error.message}`);
  }
  if (!Array.isArray(records)) throw new Error(`Expected a JSON array in ${sourceFile}`);

  const className = path.basename(sourceFile, '.json');
  const classRecord = records.find(record => record.kind === 'class');
  const classCategory = classRecord?.modulecategory?.category || '';
  const fileId = sourceRows.length + 1;
  sourceRows.push({
    id: fileId,
    className,
    sourceFile,
    category: classCategory,
    recordCount: records.length,
    rawGzip: gzipSync(sourceBytes, { level: 9, mtime: 0 })
  });
  for (let recordIndex = 0; recordIndex < records.length; recordIndex += 1) {
    const record = records[recordIndex];
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      throw new Error(`Expected object entries in ${sourceFile}`);
    }
    entryRows.push({
      fileId,
      recordIndex,
      className,
      sourceFile,
      kind: String(record.kind || ''),
      name: String(record.name || ''),
      longname: String(record.longname || ''),
      memberof: String(record.memberof || ''),
      category: String(record.modulecategory?.category || classCategory),
      searchText: getApiSearchText({
        class_name: className,
        category: String(record.modulecategory?.category || classCategory),
        name: String(record.name || ''),
        longname: String(record.longname || ''),
        memberof: String(record.memberof || '')
      }, record)
    });
  }
}

const outputDir = path.dirname(outputPath);
mkdirSync(outputDir, { recursive: true });
const tempPath = `${outputPath}.tmp-${process.pid}`;
const backupPath = `${outputPath}.bak-${process.pid}`;
rmSync(tempPath, { force: true });
rmSync(backupPath, { force: true });

let db;
try {
  db = await openApiDatabase(tempPath);
  db.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    PRAGMA page_size = 4096;
    PRAGMA user_version = 2;
    CREATE TABLE api_files (
      id INTEGER PRIMARY KEY,
      class_name TEXT NOT NULL UNIQUE,
      source_file TEXT NOT NULL,
      category TEXT NOT NULL,
      record_count INTEGER NOT NULL,
      raw_gzip BLOB NOT NULL
    );
    CREATE TABLE api_entries (
      id INTEGER PRIMARY KEY,
      file_id INTEGER NOT NULL REFERENCES api_files(id),
      record_index INTEGER NOT NULL,
      class_name TEXT NOT NULL,
      source_file TEXT NOT NULL,
      kind TEXT NOT NULL,
      name TEXT NOT NULL,
      longname TEXT NOT NULL,
      memberof TEXT NOT NULL,
      category TEXT NOT NULL,
      UNIQUE(file_id, record_index)
    );
    CREATE INDEX api_entries_class ON api_entries(class_name, kind, name);
    CREATE INDEX api_entries_name ON api_entries(name, longname);
    CREATE VIRTUAL TABLE api_search USING fts5(search_terms, tokenize='unicode61', detail=none, content='');
    CREATE TABLE index_info (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  `);

  const insertFile = db.prepare(`
    INSERT INTO api_files (id, class_name, source_file, category, record_count, raw_gzip)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const insertEntry = db.prepare(`
    INSERT INTO api_entries
      (id, file_id, record_index, class_name, source_file, kind, name, longname, memberof, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertSearchTerms = db.prepare('INSERT INTO api_search (rowid, search_terms) VALUES (?, ?)');

  db.exec('BEGIN');
  for (const row of sourceRows) {
    insertFile.run(row.id, row.className, row.sourceFile, row.category, row.recordCount, row.rawGzip);
  }
  for (let index = 0; index < entryRows.length; index += 1) {
    const row = entryRows[index];
    insertEntry.run(
      index + 1,
      row.fileId,
      row.recordIndex,
      row.className,
      row.sourceFile,
      row.kind,
      row.name,
      row.longname,
      row.memberof,
      row.category
    );
    insertSearchTerms.run(index + 1, getApiSearchTerms(row, row.searchText));
  }
  const insertInfo = db.prepare('INSERT INTO index_info (key, value) VALUES (?, ?)');
  insertInfo.run('schemaVersion', '2');
  insertInfo.run('sourceSha256', digest.digest('hex'));
  insertInfo.run('sourceFiles', String(sourceRows.length));
  insertInfo.run('recordCount', String(entryRows.length));
  db.exec('COMMIT; VACUUM;');
  db.close();
  db = undefined;

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
    `Built API index: ${sourceRows.length} source files, ${entryRows.length} entries, ${outputBytes} bytes\n`
  );
} catch (error) {
  db?.close();
  rmSync(tempPath, { force: true });
  if (!existsSync(outputPath) && existsSync(backupPath)) renameSync(backupPath, outputPath);
  rmSync(backupPath, { force: true });
  throw error;
}
