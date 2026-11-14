// Fallback when the Strapi API is unavailable. Reads published content only, in one read-only transaction.
// Never prints credentials or unpublished row contents. Review output before committing/deploying.
const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const destination = path.resolve(__dirname, '../../jiejiechen-react/src/content/snapshot.json');
const mediaBase = 'https://cjj-prod-fu4c-strapi-assets.s3.ap-southeast-2.amazonaws.com';

function publicMedia(url) {
  if (!url) return url;
  if (url.startsWith('/uploads/')) return mediaBase + url.slice('/uploads'.length);
  if (url.startsWith('https://')) return url;
  throw new Error('Unsupported media URL; export stopped to prevent broken images.');
}

function indexById(rows) { return new Map(rows.map((row) => [row.id, row])); }
function strapiFile(file) {
  return { id: file.id, attributes: { url: publicMedia(file.url), name: file.name, alternativeText: file.alternative_text } };
}

async function main() {
  if (!process.env.RDS_SECRET_NAME || !process.env.RDS_HOST || !process.env.RDS_CA_BUNDLE) {
    throw new Error('Set RDS_SECRET_NAME, RDS_HOST and RDS_CA_BUNDLE before exporting.');
  }
  const response = await new SecretsManagerClient({ region: 'ap-southeast-2' }).send(
    new GetSecretValueCommand({ SecretId: process.env.RDS_SECRET_NAME })
  );
  const { username, password } = JSON.parse(response.SecretString);
  const client = new Client({
    host: process.env.RDS_HOST, port: 5432, user: username, password, database: 'strapi_db',
    ssl: { ca: fs.readFileSync(process.env.RDS_CA_BUNDLE, 'utf8'), rejectUnauthorized: true },
    connectionTimeoutMillis: 10000,
  });
  let snapshot;
  try {
    await client.connect();
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
    const select = async (sql) => (await client.query(sql)).rows;
    const [articles, pages, authors, categories, files, articleAuthors, articleCategories, relations,
      articleComponents, pageComponents, articleTexts, articleVideos, articleSeos, pageTexts, pageMetadata] = await Promise.all([
      select('SELECT id, slug, title, description, created_at, updated_at, published_at FROM articles WHERE published_at IS NOT NULL ORDER BY id'),
      select('SELECT id, slug, heading, description, short_name, locale, created_at, updated_at, published_at FROM pages WHERE published_at IS NOT NULL ORDER BY id'),
      select('SELECT id, name FROM authors'),
      select('SELECT id, name, slug FROM categories'),
      select('SELECT id, name, alternative_text, url FROM files'),
      select('SELECT article_id, author_id FROM articles_authors_bio_links'),
      select('SELECT article_id, category_id FROM articles_category_links'),
      select('SELECT file_id, related_id, related_type, field FROM files_related_morphs'),
      select('SELECT entity_id, component_id, component_type, field, "order" FROM articles_components ORDER BY "order"'),
      select('SELECT entity_id, component_id, component_type, field, "order" FROM pages_components ORDER BY "order"'),
      select('SELECT id, body FROM components_shared_rich_texts'),
      // The database retains its historical table name after the component was renamed.
      select('SELECT id, url FROM components_sections_video_embeds'),
      select('SELECT id, meta_title, meta_description FROM components_shared_seos'),
      select('SELECT id, body FROM components_sections_rich_texts'),
      select('SELECT id, meta_title, meta_description FROM components_meta_metadata'),
    ]);
    if (!articles.length) throw new Error('No published articles; refusing empty export.');

    const authorById = indexById(authors);
    const categoryById = indexById(categories);
    const fileById = indexById(files);
    const articleTextById = indexById(articleTexts);
    const articleVideoById = indexById(articleVideos);
    const seoById = indexById(articleSeos);
    const pageTextById = indexById(pageTexts);
    const pageMetadataById = indexById(pageMetadata);

    function media(relatedType, relatedId, field) {
      const relation = relations.find((item) => item.related_type === relatedType && item.related_id === relatedId && item.field === field);
      const file = relation && fileById.get(relation.file_id);
      if (relation && !file) throw new Error('Missing linked media file; export stopped.');
      return { data: file ? strapiFile(file) : null };
    }
    function blocks(links, entityId, field, components) {
      return links.filter((link) => link.entity_id === entityId && link.field === field).map((link) => {
        const table = components[link.component_type];
        if (!table) throw new Error(`Unsupported component: ${link.component_type}`);
        const component = table.get(link.component_id);
        if (!component) throw new Error(`Missing component: ${link.component_type}`);
        return { id: component.id, __component: link.component_type, ...component };
      });
    }
    function uniqueSlugs(rows, collection) {
      if (rows.some((row) => !row.slug) || new Set(rows.map((row) => row.slug)).size !== rows.length) {
        throw new Error(`${collection}: missing or duplicate published slugs`);
      }
    }
    uniqueSlugs(articles, 'articles');
    uniqueSlugs(pages, 'pages');

    snapshot = {
      articles: articles.map((article) => {
        const authorId = articleAuthors.find((link) => link.article_id === article.id)?.author_id;
        const author = authorById.get(authorId);
        const categoryId = articleCategories.find((link) => link.article_id === article.id)?.category_id;
        const category = categoryById.get(categoryId);
        const seoLink = articleComponents.find((link) => link.entity_id === article.id && link.field === 'seo');
        const seo = seoLink && seoById.get(seoLink.component_id);
        if (seoLink && !seo) throw new Error('Missing linked SEO component.');
        return {
          id: article.id,
          attributes: {
            title: article.title, description: article.description, slug: article.slug,
            createdAt: article.created_at, updatedAt: article.updated_at, publishedAt: article.published_at,
            cover: media('api::article.article', article.id, 'cover'),
            category: { data: category ? { id: category.id, attributes: { name: category.name, slug: category.slug } } : null },
            authorsBio: { data: author ? { id: author.id, attributes: { name: author.name, avatar: media('api::author.author', author.id, 'avatar') } } : null },
            blocks: blocks(articleComponents, article.id, 'blocks', {
              'shared.rich-text': articleTextById, 'shared.video-embed': articleVideoById,
            }),
            seo: seo ? { id: seo.id, metaTitle: seo.meta_title, metaDescription: seo.meta_description } : null,
          },
        };
      }),
      pages: pages.map((page) => {
        const metaLink = pageComponents.find((link) => link.entity_id === page.id && link.field === 'metadata');
        const metadata = metaLink && pageMetadataById.get(metaLink.component_id);
        if (metaLink && !metadata) throw new Error('Missing linked page metadata.');
        return {
          id: page.id,
          attributes: {
            slug: page.slug, heading: page.heading, description: page.description,
            shortName: page.short_name, locale: page.locale,
            createdAt: page.created_at, updatedAt: page.updated_at, publishedAt: page.published_at,
            metadata: metadata ? { id: metadata.id, metaTitle: metadata.meta_title, metaDescription: metadata.meta_description } : null,
            contentSections: blocks(pageComponents, page.id, 'contentSections', { 'sections.rich-text': pageTextById }),
          },
        };
      }),
    };
    await client.query('ROLLBACK');
  } finally {
    // Rollback is harmless even if the previous one succeeded; no writes can occur in this transaction.
    try { await client.query('ROLLBACK'); } catch {}
    await client.end();
  }

  const serialized = JSON.stringify(snapshot, null, 2);
  if (serialized.includes('/uploads/')) throw new Error('Unresolved CMS media URL in content; export stopped.');
  const temporary = `${destination}.tmp`;
  fs.writeFileSync(temporary, serialized + '\n');
  fs.renameSync(temporary, destination);
  console.log(`Exported ${snapshot.articles.length} published articles and ${snapshot.pages.length} published pages to ${destination}`);
}

main().catch((error) => {
  // Only error class/code to avoid leaking row contents or credentials to CI logs.
  console.error('Published content export failed:', error.name, error.code || '(validation error)');
  process.exitCode = 1;
});
