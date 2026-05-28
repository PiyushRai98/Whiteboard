# Whiteboard

A production-oriented monorepo foundation for a real-time 3D collaborative whiteboard platform.

## Included foundation

- **Next.js App Router frontend** with Tailwind, Zustand, React Three Fiber, Three.js, and Framer Motion
- **Express realtime API** with Socket.IO, JWT guest auth, rate limiting, Helmet, and Zod validation
- **Shared typed contracts** package using Zod
- **Prisma schema** targeting PostgreSQL
- **Redis/PostgreSQL local infrastructure** via Docker Compose
- **Vitest-based focused tests** for contracts and API validation

## Structure

```text
apps/
  api/
  web/
packages/
  shared/
infrastructure/
```

## Quick start

```bash
npm install
cp .env.example .env
npm run build
npm run test
```

Run locally:

```bash
docker compose up -d postgres redis
npm run dev -w @whiteboard/api
npm run dev -w @whiteboard/web
```

## Current scope

This repository now provides the **initial production-ready scaffold** for the larger product vision:

- workspace and environment setup
- frontend collaboration shell
- backend realtime/auth foundations
- shared schemas
- persistence schema and container config

Advanced features like full Yjs synchronization, WebRTC voice, AI generation pipelines, asset uploads, and full multiplayer presentation flows are intentionally left as next implementation slices on top of this foundation.