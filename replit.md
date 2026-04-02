# The Magic Selector

A fun web app that randomly selects a person to handle a management task — "consults the oracle" with confetti and animations.

## Architecture

This is a **pnpm monorepo** with two runnable services:

- **Frontend** (`artifacts/task-picker`): React 19 + Vite 7 + Tailwind CSS 4 + Framer Motion, runs on port 5000
- **Backend** (`artifacts/api-server`): Python 3.12 + FastAPI + Uvicorn, runs on port 8000

### Shared Libraries

- `lib/api-spec`: OpenAPI spec + Orval config for API client code generation
- `lib/api-client-react`: Generated React Query hooks (auto-generated, do not edit manually)
- `lib/api-zod`: Generated Zod schemas (auto-generated, do not edit manually)
- `lib/db`: Drizzle ORM schema + PostgreSQL client

## Workflows

- **Start application**: Frontend dev server (`PORT=5000 BASE_PATH=/ pnpm --filter @workspace/task-picker run dev`)
- **Backend API**: FastAPI server (`cd artifacts/api-server && uvicorn main:app --host localhost --port 8000 --reload`)

## Development Setup

1. Install JS dependencies: `pnpm install`
2. Generate API client: `pnpm --filter @workspace/api-spec run codegen`
3. Install Python deps: `pip install -r artifacts/api-server/requirements.txt`

### After changing the OpenAPI spec

Run codegen to regenerate the API client and Zod schemas:
```
pnpm --filter @workspace/api-spec run codegen
```

## Key Files

- `lib/api-spec/openapi.yaml` — API specification (source of truth)
- `artifacts/api-server/main.py` — FastAPI backend
- `artifacts/task-picker/src/pages/Home.tsx` — Main page
- `pnpm-workspace.yaml` — Workspace + dependency catalog

## Environment Variables

- `PORT` — Required by Vite config (set to 5000 in dev)
- `BASE_PATH` — Required by Vite config (set to `/` in dev)
- `DATABASE_URL` — Required by `lib/db` if using PostgreSQL
