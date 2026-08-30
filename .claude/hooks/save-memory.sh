#!/bin/bash
# project-memory skill — SessionEnd hook
# Creates a pending marker if session ended without "save session"
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
