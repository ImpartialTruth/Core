---
name: project-memory
description: >
  Strategic memory layer for Claude Code that complements built-in auto-memory (MEMORY.md).
  Use this skill proactively — do not wait to be asked. Trigger whenever: a new Claude Code
  session starts on a known project, the user mentions past decisions or context, the user
  says "remember", "save session", "update memory", "what did we decide", "what's the plan",
  "open questions", "blockers", "continue where we left off", or when the project has a
  CLAUDE.md with a "Project Soul" block. Also trigger at natural session end to persist
  strategic context. This skill captures what auto-memory does NOT: architectural decisions,
  project vision, monthly progress, open blockers — so Claude feels like it truly remembers
  the project across sessions with minimal token cost.
---

# Project Memory Skill

A **strategic** memory layer that works alongside Claude Code's built-in auto-memory.

## Division of Responsibility

| What | Where |
|------|-------|
| Build commands, code patterns, technical preferences | Built-in `MEMORY.md` (auto, never edit) |
| Architecture decisions, project vision, monthly progress, blockers | **This skill** |

**Rule: never duplicate what MEMORY.md already captures.**

---

## Folder Structure

```
project-root/
├── CLAUDE.md                  ← soul block (< 200 lines total)
├── MEMORY.md                  ← Claude's auto-memory (never edit manually)
├── .claude/
│   └── rules/
│       └── memory-protocol.md ← session start/end instructions
└── memory/
    ├── decisions.md           ← strategic decisions + reasoning (append-only)
    ├── open-questions.md      ← unresolved questions and blockers
    ├── YYYY-MM.md             ← monthly summaries (max 150 tokens each)
    ├── weekly/
    │   └── YYYY-WNN.md        ← weekly details (on demand)
    └── daily/
        └── YYYY-MM-DD.md      ← daily session logs (on demand)
```

---

## CLAUDE.md Soul Block

Add this to `CLAUDE.md`. Keep under 80 lines total. Auto-loaded every session.

```markdown
## Project Soul

**What:** [One sentence — what does this project do?]
**Why:** [One sentence — what problem does it solve?]
**Stack:** [Key technologies, comma-separated]
**Phase:** [Current stage: MVP / Beta / Production]
**Focus:** [What are we actively building right now — 1 sentence]
**Critical constraints:** [Things that must never be violated]
**Architecture:** [2-3 sentences max on core design decisions]

## Strategic Memory

Session start: follow .claude/rules/memory-protocol.md
Session end: follow .claude/rules/memory-protocol.md
Auto-memory (MEMORY.md) handles technical patterns — do not duplicate there.
```

---

## .claude/rules/memory-protocol.md Content

When setting up, create this file with exactly this content:

```markdown
# Memory Protocol

## Session Start

1. CLAUDE.md soul block is already loaded (auto).
2. Announce: "Project: [name], phase: [X]. Loading strategic context..."
3. Load memory/open-questions.md — always.
4. Load memory/[YYYY-MM].md for current month — if it exists.
5. Load memory/weekly/[YYYY-WNN].md — only if task continues from last session.
6. Load memory/decisions.md — only if task involves architecture or past decisions.
7. Load memory/daily/[YYYY-MM-DD].md — only on explicit request.
8. Never load all files at once.
9. Confirm: "Context ready. [N] open questions. Last activity: [date]."

## Session End

Run when user says "save session" or "update memory".
If hooks are installed (see Automation section), missed sessions are caught
automatically via pending markers. If hooks are NOT installed, remind the user:
"Say 'save session' when done so I can update memory files."

1. Append to memory/decisions.md — any decisions made this session.
2. Update memory/open-questions.md — close resolved, add new blockers.
3. Create or update memory/daily/[YYYY-MM-DD].md — session log.
4. Update memory/weekly/[YYYY-WNN].md — done / in-progress / blockers.
5. Update memory/[YYYY-MM].md — only if significant progress.
6. Update CLAUDE.md soul block — ONLY if architecture or phase changed.
7. Never touch MEMORY.md.
8. Confirm: "Memory saved. Next session will resume from here."
```

---

## File Formats

### memory/decisions.md
```markdown
# Decision Log

## [YYYY-MM-DD] [Short Title]
**Decision:** What was decided.
**Why:** Reasoning.
**Alternatives rejected:** What else was considered and why not.
---
```

### memory/open-questions.md
```markdown
# Open Questions

- [ ] [Question or blocker] — [YYYY-MM-DD]
- [x] [Resolved question] — resolved [YYYY-MM-DD], answer: [one line]
```

### memory/YYYY-MM.md
```markdown
# [Month Year]

## Built
- [completed features, bullets only]

## Decisions
- [short refs → see decisions.md for details]

## Pivots
- [direction changes, if any]
```

### memory/weekly/YYYY-WNN.md
```markdown
# Week [N] [Year]

## Done
- ...

## In Progress
- ...

## Blockers
- ...
```

### memory/daily/YYYY-MM-DD.md
```markdown
# [YYYY-MM-DD]

## Goal
What we set out to do.

## Done
What actually happened.

## Carry-forward
What to pick up next session.
```

---

## Relevance Guide

| Task type | Load |
|-----------|------|
| New feature | soul + current month |
| Architecture decision | soul + decisions.md |
| Continuing last session | soul + open-questions + current week |
| "What did we decide about X?" | decisions.md only |
| Debugging old issue | soul + relevant month + daily if needed |
| Session end | write all updated files |

---

## Compression Rules

1. No prose where a bullet works
2. No bullet where a phrase works
3. soul block: never exceed 80 lines
4. Monthly files: never exceed 150 tokens — compress aggressively
5. decisions.md: append only, never rewrite old entries
6. decisions.md compression: when file exceeds 100 entries, archive old entries to memory/decisions-archive-YYYY.md and keep only last 30 in decisions.md
7. Relative dates banned — always YYYY-MM-DD
8. Never log what MEMORY.md already tracks (commands, patterns, preferences)

---

## Error Recovery

- Missing file → check parent level (monthly covers missing weekly)
- Corrupted file → reconstruct from daily logs, note gap in open-questions.md
- MEMORY.md missing → do not recreate, Claude Code manages it
- Never halt — proceed with available context, flag what's missing

---

## Conflict Detection

- Run `git status` before writing if available
- Conflict markers found → keep both versions under separate dated headings
- Notify user: "Conflict in [file] — merged both versions. Please review."

---

## Automation via Hooks (Recommended)

The manual "save session" command is the weakest link — users forget.
Solve it with Claude Code hooks. During setup, offer to install this:

### .claude/settings.json

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/save-memory.sh"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/load-memory.sh"
          }
        ]
      }
    ]
  }
}
```

### .claude/hooks/save-memory.sh

```bash
#!/bin/bash
# Auto-snapshot on session end. Claude processes it into memory files next session.
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

MEMORY_DIR="memory"
TODAY=$(date +%Y-%m-%d)
SNAPSHOT="$MEMORY_DIR/daily/$TODAY-pending.md"

mkdir -p "$MEMORY_DIR/daily"

# Mark that a session ended without processed memory
if [ ! -f "$MEMORY_DIR/daily/$TODAY.md" ]; then
  echo "# $TODAY — UNPROCESSED SESSION" > "$SNAPSHOT"
  echo "" >> "$SNAPSHOT"
  echo "Session ended without 'save session'. Next session: process transcript" >> "$SNAPSHOT"
  echo "and update decisions.md / open-questions.md / weekly accordingly." >> "$SNAPSHOT"
fi
```

### .claude/hooks/load-memory.sh

```bash
#!/bin/bash
# On session start: surface pending unprocessed sessions
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

PENDING=$(ls memory/daily/*-pending.md 2>/dev/null | head -5)
if [ -n "$PENDING" ]; then
  echo "ATTENTION: Unprocessed session logs found: $PENDING"
  echo "Process them per memory-protocol.md before starting new work."
fi
```

`CLAUDE_PROJECT_DIR` is set by Claude Code to the project root for every hook
invocation, regardless of the shell's current directory when the session
started — the `cd` guard keeps the relative `memory/` paths correct even if
a session is launched from a subdirectory.

### How the safety net works

1. User forgets "save session" → `SessionEnd` hook creates a `-pending.md` marker
2. Next session → `SessionStart` hook surfaces the marker
3. Claude sees "ATTENTION" message → processes the missed session retroactively
4. After processing → Claude renames `-pending.md` to the normal daily log

**Result: no session is ever silently lost.**

---

## Setup Command

When user says "set up memory for this project":

1. Check if `CLAUDE.md` exists — append soul block if yes, create if no
2. Create `memory/` folder with empty `decisions.md` and `open-questions.md`
3. Create `memory/weekly/` and `memory/daily/` subfolders
4. Create `.claude/rules/memory-protocol.md` with the full content from above
5. Add `memory/daily/` to `.gitignore` — daily logs are personal, not team-shared
6. Ask: "Install automatic session hooks? (recommended — prevents lost sessions)"
   If yes: create `.claude/settings.json` hooks config + `.claude/hooks/save-memory.sh` + `.claude/hooks/load-memory.sh` with content from the Automation section, then `chmod +x` both scripts
7. Ask user to fill in the soul block fields in CLAUDE.md
8. Confirm: "Memory system ready. MEMORY.md handles technical patterns automatically. Fill in the soul block to complete setup."

**Note on multiple projects:** each project has its own `memory/` folder. soul blocks are project-scoped. If running Claude Code from a monorepo root, use subdirectory CLAUDE.md files per project.

**Note on team use:** `decisions.md`, `open-questions.md`, and monthly summaries should be committed to git — they are shared team knowledge. `memory/daily/` should be gitignored — it is personal session logs.
