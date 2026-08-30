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
