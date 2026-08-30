# Decision Log

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
