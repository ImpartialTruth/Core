# web

Frontend for the ASCENT (placeholder name) iGaming platform — visual game
clients only. Backend (RNG/wallet/game-logic, .NET) lives in a separate repo
and is not wired up yet.

Stack: Next.js (App Router) + React for the app shell, PixiJS for game
rendering, Tailwind CSS v4, TypeScript.

See `/CLAUDE.md` at the repo root for the full project context and
`/memory/` for decisions and open questions.

## Iteration 0

Landing page only, zero backend integration — built to deploy to Vercel for
a visual/testing preview.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Root directory for the Vercel project should be set to `web/` (this repo
also contains non-app files — `docs/`, `memory/`, `.claude/` — at its root).
