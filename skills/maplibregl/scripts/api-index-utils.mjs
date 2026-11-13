import { gunzipSync } from 'node:zlib';

const EXCLUDED_SEARCH_KEYS = new Set([
  'examples',
  'example',
  'usage',
  'usagecodebrowser',
  'usagecodees6',
  'globalparams',
  'comment',
  'meta',
  'modulecategory',
  'source',
  'sourcecode',
  'tags',
  'see',
  'seealso'
]);

function collectSearchText(value, key, values) {
  if (key && EXCLUDED_SEARCH_KEYS.has(key.toLowerCase())) return;
  if (typeof value === 'string') {
    values.push(value.replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|lt|gt|amp|quot);/g, ' '));
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectSearchText(item, '', values);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) {
      values.push(childKey, childKey.replace(/([a-z])([A-Z])/g, '$1 $2'));
      collectSearchText(childValue, childKey, values);
    }
  }
}

export function getApiSearchText(row, api) {
  const values = [row.class_name, row.category, row.name, row.longname, row.memberof];
  collectSearchText(api, '', values);
  return values.join(' ').toLocaleLowerCase();
}

export function getApiSearchTerms(row, searchText) {
  const terms = new Set(searchText.match(/[\p{L}\p{N}]+/gu) || []);
  for (const run of searchText.match(/\p{Script=Han}+/gu) || []) {
    const characters = Array.from(run);
    for (let size = 1; size <= 3; size += 1) {
      for (let index = 0; index <= characters.length - size; index += 1) {
        terms.add(characters.slice(index, index + size).join(''));
      }
    }
  }
  for (const identifier of [row.class_name, row.name, row.longname, row.memberof]) {
    for (const run of String(identifier || '').toLocaleLowerCase().match(/[a-z0-9]+/g) || []) {
      const characters = Array.from(run);
      for (let size = 2; size <= 3; size += 1) {
        for (let index = 0; index <= characters.length - size; index += 1) {
          terms.add(characters.slice(index, index + size).join(''));
        }
      }
    }
  }
  return [...terms].join(' ');
}

export function assertSupportedNode() {
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 5)) {
    throw new Error(`需要 Node.js 22.5.0 或更高版本；当前版本为 ${process.versions.node}。`);
  }
}

export async function openApiDatabase(databasePath) {
  assertSupportedNode();
  const { DatabaseSync } = await import('node:sqlite');
  const db = new DatabaseSync(databasePath);
  db.exec('PRAGMA query_only = ON');
  return db;
}

export function decodeApiEntry(row) {
  return JSON.parse(gunzipSync(row.raw_gzip).toString('utf8'));
}
