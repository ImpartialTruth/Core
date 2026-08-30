#!/bin/bash
# project-memory skill — SessionStart hook
# Surfaces unprocessed session logs from previous sessions
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

PENDING=$(ls memory/daily/*-pending.md 2>/dev/null | head -5)
if [ -n "$PENDING" ]; then
  echo "ATTENTION: Unprocessed session logs found: $PENDING"
  echo "Process them per memory-protocol.md before starting new work."
fi
