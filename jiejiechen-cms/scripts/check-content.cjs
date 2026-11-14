// Read-only inventory of the Strapi PostgreSQL database. Never logs credentials or row contents.
const fs = require('node:fs');
const { Client } = require('pg');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function main() {
  const secretId = process.env.RDS_SECRET_NAME;
  const bundle = process.env.RDS_CA_BUNDLE;
  if (!secretId || !bundle) throw new Error('Set RDS_SECRET_NAME and RDS_CA_BUNDLE.');

  const response = await new SecretsManagerClient({ region: 'ap-southeast-2' }).send(
    new GetSecretValueCommand({ SecretId: secretId })
  );
  const { host, port, username, password } = JSON.parse(response.SecretString);
  const client = new Client({
    host: process.env.RDS_HOST || host, port: Number(process.env.RDS_PORT || port || 5432),
    user: username, password, database: 'strapi_db',
    ssl: { ca: fs.readFileSync(bundle, 'utf8'), rejectUnauthorized: true },
    connectionTimeoutMillis: 10000,
  });
  try {
    await client.connect();
    await client.query('BEGIN TRANSACTION READ ONLY');
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('articles', 'pages', 'files') ORDER BY table_name"
    );
    const counts = {};
    for (const { table_name } of result.rows) {
      // Only identifiers from this hardcoded allowlist are interpolated.
      counts[table_name] = Number((await client.query(`SELECT COUNT(*) AS n FROM public."${table_name}"`)).rows[0].n);
    }
    console.log(JSON.stringify({ database: 'strapi_db', counts }));
    const published = {};
    for (const table of ['articles', 'pages']) {
      published[table] = Number((await client.query(`SELECT COUNT(*) AS n FROM public."${table}" WHERE published_at IS NOT NULL`)).rows[0].n);
    }
    console.log(JSON.stringify({ published }));
    if (process.env.INVENTORY_SLUGS === '1') {
      const articleSlugs = await client.query('SELECT slug FROM articles WHERE published_at IS NOT NULL ORDER BY slug');
      const pageSlugs = await client.query('SELECT slug, locale FROM pages WHERE published_at IS NOT NULL ORDER BY slug, locale');
      console.log(JSON.stringify({ articleSlugs: articleSlugs.rows, pageSlugs: pageSlugs.rows }));
    }
    if (process.env.INVENTORY_SCHEMA === '1') {
      const schema = await client.query(
        "SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public' AND (table_name LIKE '%article%' OR table_name LIKE '%page%' OR table_name LIKE '%file%' OR table_name LIKE '%author%' OR table_name LIKE '%categor%' OR table_name LIKE '%component%') ORDER BY table_name, ordinal_position"
      );
      const tables = {};
      for (const { table_name, column_name } of schema.rows) {
        (tables[table_name] ||= []).push(column_name);
      }
      console.log(JSON.stringify({ tables }));
    }
    if (process.env.INVENTORY_RELATIONS === '1') {
      const relations = {};
      for (const table of ['articles_components', 'pages_components', 'files_related_morphs']) {
        const key = table === 'files_related_morphs' ? 'related_type' : 'component_type';
        const rows = await client.query(`SELECT field, ${key} AS type, COUNT(*)::int AS n FROM public."${table}" GROUP BY field, ${key} ORDER BY field, ${key}`);
        relations[table] = rows.rows;
      }
      console.log(JSON.stringify({ relations }));
    }
  } finally {
    try { await client.query('ROLLBACK'); } catch {}
    await client.end();
  }
}

main().catch((error) => {
  console.error('Read-only database inventory failed:', error.name, error.code || '(no code)');
  process.exitCode = 1;
});
