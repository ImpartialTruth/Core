## Project Soul

**What:** iGaming frontend — visual game clients only (slots-adjacent mini-games,
crash games, and survival-themed instant games), built to pitch to game
providers/aggregators and to pursue licensing certification.
**Why:** Need a portfolio of playable games to bring to iGaming providers, and
clean, standards-compliant code because it will go through licensing audits.
**Stack:** React (app shell — nav, balance, menus) + PixiJS (WebGL canvas for
actual game rendering: reels, crash-curve animation, particle effects).
Frontend only — RNG/wallet/game-logic backend lives in a separate repo.
**Phase:** MVP
**Focus:** Deciding the initial game roster — game types confirmed (mini-games,
crash games, survival-themed instant games) but specific first titles not yet chosen.
**Critical constraints:** No backend/RNG/game-logic in this repo — frontend
only, talks to the backend repo via API. Code must be clean and auditable —
no dead code, consistent structure — since it will go through licensing
review. Target license/market not yet decided (see open-questions.md) —
don't hardcode jurisdiction-specific compliance (age gates, RG tooling,
disclaimers) until confirmed.
**Architecture:** Each game is a self-contained PixiJS module (own scene,
own asset set) mounted inside a shared React app shell that handles
navigation, balance display, and cross-game chrome. Games talk to the
backend repo's API for RNG results, balance, and game state — no
game-outcome logic lives on the frontend.

## Strategic Memory

Session start: follow .claude/rules/memory-protocol.md
Session end: follow .claude/rules/memory-protocol.md
Auto-memory (MEMORY.md) handles technical patterns — do not duplicate there.

## Reference Docs

- `docs/frontend-design-tools.md` — catalog of Claude Skills / MCP tools for
  frontend & UI/UX work (Frontend Design, UI/UX Pro Max, Taste, shadcn/ui,
  21st.dev, Vercel React, GSAP, Motion, Convex, Vercel React Native).
  Check here before reaching for a design/animation/component tool.
