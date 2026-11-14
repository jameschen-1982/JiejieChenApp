# Restore the retired CMS database locally

The public `www.jiejiechen.com` pages are static and do not use PostgreSQL at request time. The old cloud CMS Lambda still points at the retired RDS endpoint; it is **not** a working publishing service. Use an isolated local PostgreSQL 14 instance for future CMS work, then explicitly export a new `jiejiechen-react/src/content/snapshot.json`, review it, and merge it to publish static pages. Never commit a database dump or credentials.

## Backups

- Local, complete PostgreSQL custom-format dump created 2026-11-14: `C:\Users\James\AppData\Local\Temp\opencode\jiejiechen-db-backup\strapi_db-2026-11-14T02-02-35-979Z.dump`.
- Private versioned S3 object: `s3://c2j-backup/jiejiechen/rds/2026-11-14/strapi_db-2026-11-14T02-02-35-979Z.dump`; version `IrVXNu8PcQS2x7qRzm5pQNDrKUZdUIoL`.
- SHA-256: `4ebe7db08c1f3f591c24c87c0776adab356d2d224caa0245fe318a9f468769dd` (verify after downloading).
- Independent encrypted RDS manual snapshot: `jiejiechen-db-pre-static-20261114000322`; the RDS deletion also requested a final manual snapshot `jiejiechen-db-final-static-20261114`. Snapshots are for restoring RDS, not directly importing into a local PostgreSQL container.

The existing `c2j-backup` lifecycle moves objects to Deep Archive after 14 days. An archived object must be restored within S3 before `get-object` can download it; retrieval takes time and costs extra. Keep the local dump secure and retain both recovery paths. The database dump contains private CMS records, including accounts; it does **not** include file bytes stored in the separate Strapi media S3 bucket.

## Download and check (PowerShell)

```powershell
$dump = Join-Path $env:LOCALAPPDATA 'Temp\opencode\jiejiechen-db-backup\strapi_db-2026-11-14T02-02-35-979Z.dump'
New-Item -ItemType Directory -Force (Split-Path $dump) | Out-Null
aws s3api get-object --bucket c2j-backup --key 'jiejiechen/rds/2026-11-14/strapi_db-2026-11-14T02-02-35-979Z.dump' --version-id IrVXNu8PcQS2x7qRzm5pQNDrKUZdUIoL $dump --profile AdministratorAccess-773631419510
(Get-FileHash $dump -Algorithm SHA256).Hash.ToLowerInvariant() # must equal the SHA-256 above
```

If the local file already exists, compare its hash before re-downloading. Use an AWS identity with access to the private backup bucket; no public URL is provided.

## Restore to a local PostgreSQL 14 container

```powershell
# Choose a NEW local password; never reuse or commit the former RDS password.
$env:POSTGRES_PASSWORD = '<unique local-only password>'
docker run -d --name jiejiechen-postgres -p 127.0.0.1:5432:5432 `
  -e POSTGRES_PASSWORD -e POSTGRES_DB=strapi_db `
  -v jiejiechen-postgres-data:/var/lib/postgresql/data postgres:14.22
# Wait for container initialization to finish; check with: docker logs jiejiechen-postgres
docker cp $dump 'jiejiechen-postgres:/tmp/strapi_db.dump'
docker exec jiejiechen-postgres pg_restore --no-owner --no-acl --exit-on-error `
  -U postgres -d strapi_db /tmp/strapi_db.dump
docker exec jiejiechen-postgres psql -U postgres -d strapi_db -At -c `
  'SELECT (SELECT count(*) FROM articles), (SELECT count(*) FROM pages), (SELECT count(*) FROM files)'
# Expected restored counts at backup time: 3 | 3 | 12.
```

Use a **new, empty** container/volume for each restore trial; do not replay the dump into a populated CMS database. This full archive was already round-tripped through S3 and restored into an isolated PostgreSQL 14 container: 955 archive entries, 96 tables, 3 articles, 3 pages, and 12 file records. A custom-format `pg_dump` does not include global roles; `--no-owner --no-acl` makes the archive portable to the local `postgres` user. The example binds the port to localhost only.

For local Strapi, use `DATABASE_CLIENT=postgres`, `DATABASE_HOST=localhost`, `DATABASE_PORT=5432`, `DATABASE_NAME=strapi_db`, `DATABASE_USERNAME=postgres`, `DATABASE_PASSWORD=<local password>`, and `DATABASE_SSL=false` (see `config/database.js`). The S3 upload provider still needs its own configuration and access to existing media; do not point it at the static-site deployment bucket. The running CMS has not been verified against this restored database; review its schema and perform a separate local test before publishing new content.
