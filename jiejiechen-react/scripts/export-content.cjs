// Run while Strapi is still available; never embed credentials in the snapshot.
const fs = require('node:fs');
const path = require('node:path');

const origin = process.env.STRAPI_URL?.replace(/\/$/, '');
const token = process.env.STRAPI_TOKEN;
const mediaBase = process.env.MEDIA_BASE_URL?.replace(/\/$/, '');
if (!origin || !token || !mediaBase || !/^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$)/.test(origin) || !/^https:\/\//.test(mediaBase)) {
  throw new Error('Set STRAPI_URL (HTTPS or local HTTP), STRAPI_TOKEN, and MEDIA_BASE_URL (HTTPS) before exporting.');
}

const destination = path.join(__dirname, '../src/content/snapshot.json');

function encodeQuery(value, prefix, params) {
  for (const [key, item] of Object.entries(value)) {
    const field = prefix ? `${prefix}[${key}]` : key;
    if (item && typeof item === 'object') encodeQuery(item, field, params);
    else params.append(field, String(item));
  }
}

async function collect(collection, populate) {
  const entries = [];
  let page = 1;
  let pageCount;
  do {
    const params = new URLSearchParams();
    encodeQuery({ populate, pagination: { page, pageSize: 100 } }, '', params);
    const query = params.toString();
    const response = await fetch(`${origin}/api/${collection}?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`${collection} page ${page}: HTTP ${response.status}`);
    const result = await response.json();
    if (!Array.isArray(result.data) || !Number.isInteger(result.meta?.pagination?.pageCount)) {
      throw new Error(`${collection} page ${page}: invalid Strapi response`);
    }
    entries.push(...result.data);
    pageCount = result.meta.pagination.pageCount;
    page++;
  } while (page <= pageCount);
  return entries;
}

function rewriteMedia(value) {
  if (Array.isArray(value)) return value.map(rewriteMedia);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => {
      if (key === 'url' && typeof item === 'string') {
        const mediaPath = item.startsWith(origin + '/uploads/') ? item.slice(origin.length) : item;
        // S3 upload provider stores object keys at bucket root, unlike Strapi's /uploads/ URL prefix.
        if (mediaPath.startsWith('/uploads/')) return [key, mediaBase + mediaPath.slice('/uploads'.length)];
      }
      return [key, rewriteMedia(item)];
    }));
  }
  return value;
}

function validate(collection, entries) {
  const slugs = new Set();
  for (const entry of entries) {
    const attributes = entry?.attributes;
    if (!Number.isInteger(entry?.id) || !attributes?.slug || slugs.has(attributes.slug)) {
      throw new Error(`${collection}: missing/duplicate slug or invalid ID`);
    }
    slugs.add(attributes.slug);
    if (collection === 'articles' && !Array.isArray(attributes.blocks)) {
      throw new Error(`Article ${attributes.slug}: missing blocks`);
    }
    if (collection === 'pages' && !Array.isArray(attributes.contentSections)) {
      throw new Error(`Page ${attributes.slug}: missing contentSections`);
    }
  }
}

async function main() {
  const articles = await collect('articles', {
    cover: '*', category: '*', authorsBio: { populate: '*' },
    blocks: { populate: '*' }, seo: { populate: '*' },
  });
  const pages = await collect('pages', { contentSections: { populate: '*' }, metadata: { populate: '*' } });
  if (!articles.length) throw new Error('No articles exported; refusing to replace the snapshot.');
  validate('articles', articles);
  validate('pages', pages);
  const snapshot = rewriteMedia({ articles, pages });
  // Reject media URLs which would stop working when the CMS is turned off.
  const serialized = JSON.stringify(snapshot, null, 2);
  if (/"url"\s*:\s*"\/uploads\//.test(serialized) || serialized.includes(origin + '/uploads/')) {
    throw new Error('Snapshot still references CMS-hosted media; check MEDIA_BASE_URL.');
  }
  const temporary = `${destination}.tmp`;
  fs.writeFileSync(temporary, serialized + '\n');
  fs.renameSync(temporary, destination);
  console.log(`Exported ${articles.length} articles and ${pages.length} pages to ${destination}`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
