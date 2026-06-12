# CMS (main site)

Content is stored in `data/cms.json` and managed through a **separate admin app**.

| Repo / folder | Role |
|---------------|------|
| **omtatva** (this project) | Public site + APIs |
| **omtatva-admin** (sibling folder) | Admin UI only |

## APIs (this project)

- `GET /api/content` — public read
- `GET /PUT /api/admin/content` — admin (Bearer `ADMIN_API_KEY`)

## Env (this project)

```env
ADMIN_API_KEY=your-secret
ADMIN_ORIGIN=http://localhost:3001
```

## Run admin

```bash
cd ../omtatva-admin
npm install
npm run dev
```

See `../omtatva-admin/README.md` for full admin setup.
