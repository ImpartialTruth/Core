# Decision Log

## 2026-08-30 Iteration 0 built: Next.js scaffold + ASCENT landing page
**Decision:** Scaffolded the frontend in `web/` (Next.js App Router,
TypeScript, Tailwind v4) rather than at repo root, since the repo root also
holds `docs/`, `memory/`, `.claude/`. Installed the official `frontend-design`
skill (anthropics/skills) into `.claude/skills/` and used it to design and
build the iteration-0 landing page: dark ink/steel palette with a two-stop
rise→flare (cyan→red-orange) signal accent tied to actual crash-game risk
color conventions, Space Grotesk (display) + IBM Plex Sans (body) + IBM Plex
Mono (data) type system, and a signature animated "tension curve" (an
SVG/CSS looping rise-then-crash animation) as the hero's centerpiece —
chosen because it's literally the mechanic these games are built on, not a
decorative flourish. Used placeholder brand name "ASCENT" (ties to the
rising-curve motif, clearly marked as swappable in the footer and README)
since no real studio name exists yet.
**Why:** User asked to start iteration 0 (landing page, zero backend) using
the frontend-design tools saved earlier, deployable to Vercel for testing.
**Verification:** `npm run build` and `npm run lint` both clean; visually
checked via Playwright screenshots at desktop (1440px) and mobile (390px)
in both dev and production (`next start`) mode; confirmed Next.js's dev-only
indicator does not appear in production.
**Alternatives rejected:** scaffolding at repo root (would mix Next.js
tooling with docs/memory/.claude); Phaser/raw Canvas for the curve (see
earlier engine decision).
**Still open:** actual Vercel deploy not performed from this session (no
Vercel credentials available here) — see open-questions.md. Real brand name
still needed before any public/provider-facing use.
---

## 2026-08-30 Backend = .NET (separate repo), iteration 0 = landing page only
**Decision:** Backend will be built in .NET, in its own repo (not yet
created/linked) — not needed yet. Work starts with the visual side only,
zero backend integration. Iteration 0 scope: a landing page, built to be
deployed to Vercel for testing/preview.
**Why:** User wants to validate the visual direction and get something
live before any backend work exists — de-risks the "which stack/design"
questions before dotnet backend work starts.
**Alternatives rejected:** none — explicit user sequencing choice.
**Still open:** .NET backend repo not yet created/linked (see open-questions.md).
---

## 2026-08-30 Project scope: iGaming frontend, React + PixiJS
**Decision:** `Core` is the frontend-only repo for an iGaming games platform —
visual game clients (mini-games, crash games, survival-themed instant games)
to pitch to providers/aggregators and take through licensing. Backend
(RNG, wallet, game logic) will live in a separate repo. Stack: React for the
app shell (nav, balance, menus) + PixiJS for the actual game rendering
canvas, one self-contained PixiJS module per game.
**Why:** User's stated goal — build a game portfolio for providers, code
needs to be clean/standards-compliant for licensing audits. PixiJS chosen
over Phaser and raw Canvas because the roster is many varied small games
(not one deep game) — PixiJS is a lean WebGL 2D renderer, the de facto
standard for iGaming instant-games (e.g. Aviator-style crash games), and
doesn't impose Phaser's heavier per-game framework opinions.
**Alternatives rejected:** Phaser (too opinionated/heavy per game for a
multi-game roster); raw Canvas (reinvents what PixiJS already solves).
**Still open:** target license/market, first game titles, backend repo link
— see open-questions.md.
---

## 2026-08-30 Install project-memory skill as the repo's first commit
**Decision:** Bootstrap the empty `ImpartialTruth/Core` repo with the
`project-memory` Claude Code skill (from ImpartialTruth/project-memory-skill)
instead of starting with application code. Installed at
`.claude/skills/project-memory/`, with `.claude/hooks/save-memory.sh` +
`load-memory.sh`, `.claude/settings.json` (SessionStart/SessionEnd hooks),
`.claude/rules/memory-protocol.md`, and the `memory/` folder tree.
**Why:** User wants persistent strategic memory (decisions, blockers, monthly
progress) across sessions from day one, before any real project work starts.
**Alternatives rejected:** none — user explicitly asked to review and install
this specific skill first.
**Fixes applied during install (not yet upstreamed to the source repo):**
1. Hardened `save-memory.sh` / `load-memory.sh` to `cd "${CLAUDE_PROJECT_DIR:-.}"`
   before touching `memory/`, so the hooks resolve correctly even if a
   session is launched from a subdirectory.
2. Fixed a duplicate "7." in SKILL.md's Compression Rules numbering.
---

## 2026-08-30 Catalog frontend design tools as a reference doc
**Decision:** Store the list of 10 frontend/UI Claude Skills & MCP tools
(Frontend Design, UI/UX Pro Max, Taste, shadcn/ui, 21st.dev, Vercel React,
GSAP, Motion, Convex, Vercel React Native) at `docs/frontend-design-tools.md`,
pointed to from CLAUDE.md's Reference Docs section.
**Why:** User wants a fixed, discoverable location to consult when frontend
work needs a design/animation/component tool, instead of re-explaining it
each session.
**Alternatives rejected:** memory/decisions.md itself (wrong fit — this is a
static reference catalog, not a decision or session log).
---

## 2026-08-30 Add a read-only "advisor" subagent pinned to Opus 5
**Decision:** Add `.claude/agents/advisor.md` — a subagent with
`model: opus` (tracks current Opus, i.e. Opus 5) and read-only tools
(Read/Glob/Grep/Bash/WebSearch/WebFetch, no Edit/Write). Scoped to
second-opinion consults: called when the main thread is stuck on a bug or
decision after multiple failed attempts, or on explicit request.
**Why:** User wants a stronger-reasoning model available specifically for
"we're stuck" moments, without it being able to make changes itself —
keeps a clean separation between diagnosis and implementation.
**Alternatives rejected:** giving it Edit/Write access (rejected — advisor
role is diagnose-and-recommend, not implement, to avoid it acting on an
unverified hypothesis).
---
