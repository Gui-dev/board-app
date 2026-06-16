# board

Next.js 16 + React 19 App Router with a Hono API layer (Vercel serverless), Drizzle ORM + PostgreSQL, and Better Auth (GitHub OAuth).

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server on `:3000` |
| `pnpm build` | Production build |
| `pnpm lint` | Biome check (lint + format, no write) |
| `pnpm check` | Biome check --write (auto-fix) |
| `pnpm format` | Biome format --write |
| `pnpm typecheck` | `tsc --noEmit` |

Run in order: `lint -> typecheck -> build` (or `check -> typecheck -> build`).

## Style

- Biome: single quotes, no semicolons, trailing commas (es5), arrow parens as needed
- Tailwind classes must be sorted (`useSortedClasses` is error)
- Path alias `@/*` → `./src/*`
- Commits: Conventional Commits, English, imperative mood

## Architecture

- **API layer** lives in `src/api/` using Hono's `OpenAPIHono` with Zod OpenAPI schemas
- **Bridge**: `src/app/api/[[...route]]/route.ts` exports `GET/POST/PATCH/PUT/DELETE` via `hono/vercel` handle
- Each route is its own file in `src/api/routes/` — each exports a `new OpenAPIHono()` instance, registered in `src/api/index.ts`
- Auth middleware (`src/api/middlewares/auth.ts`) for protected routes
- Session middleware runs on all API routes; `/api/docs` and `/api/openapi.json` are excluded
- DB: Drizzle ORM, PostgreSQL, `snake_case` casing, schema in `src/api/db/schema.ts`
- DB migrations: `pnpm drizzle-kit generate` (output in `src/api/db/migrations/`)
- Seed: `tsx src/api/db/seed.ts` (resets and seeds 50 issues + comments)

## Database

Start Postgres: `docker compose up -d`

Env vars (see `.env.example`):
```
DATABASE_URL
BETTER_AUTH_SECRET (min 32 chars)
BETTER_AUTH_URL
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

`.env` is gitignored. `.env` values have leading spaces on lines 2-5 — trim them if copy-pasting.

## Testing

No tests written yet. Planned stack (from `docs/TESTING_GUIDELINE.md`):
- Vitest, React Testing Library, `user-event` over `fireEvent`
- MSW for API mocking
- Specs co-located as `*.spec.tsx` / `*.spec.ts`

## Docs

- `docs/TESTING_GUIDELINE.md` — frontend testing conventions (Portuguese)
- `docs/skills/COMMITS_GUIDELINE.md` — commit conventions (English)
