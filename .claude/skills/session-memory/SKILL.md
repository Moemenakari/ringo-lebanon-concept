---
name: session-memory
description: Keeps a small memory file so work continues in a fresh chat or session instead of a huge one. Use at the start of every Claude Code session (read the memory), after each milestone (update it), and whenever the user says checkpoint, save memory, handoff, new chat, خلص الشات, احفظ, or the conversation is getting long (about 30+ messages or many screenshots). Also works in claude.ai chats by producing a paste-ready handoff block.
---

# Session memory: write a checkpoint, start fresh, read only that

Why this saves tokens: every new message makes the model re-read the **whole** conversation. A 200-message chat costs about 200× per reply. One ~1–2k-token memory file plus a fresh chat is far cheaper and also more accurate.

## In Claude Code (a repo)

**Files** live in `.claude/memory/` and are committed with the project:
- `STATE.md`: **the only file read at session start.** At most 150 lines. Use `templates/STATE.md`.
- `LOG.md`: append-only history, one line per milestone. **Never read it at start.** Grep it only when asked "why did we…".

**At session start**
1. Read `.claude/memory/STATE.md` (and `CLAUDE.md`). Do **not** re-read the codebase. Use the *File map* in STATE to open only what the next task needs.
2. If STATE is missing, create it from the template after the first answer.

**Checkpoint**: after each milestone (feature done, deploy, a decision made with the user, before any risky step) or when asked:
1. Rewrite `STATE.md`. Keep it **current, not historical**: replace stale lines, don't append. Hard cap 150 lines; move old detail into `LOG.md`.
2. Append one line to `LOG.md`: `YYYY-MM-DD · what changed · commit sha`.
3. Commit both with the work. A plain message like "Update project memory" is fine.
4. Tell the user in one line: "Memory saved. Safe to open a new session."

**When the session is long** (many screenshots, 30+ turns, or compaction happened): checkpoint, then tell the user: *"Open a new session and just say: continue from .claude/memory/STATE.md."*

## In a claude.ai chat (no repo)

When asked, or when the chat gets long, reply with **one** fenced block the user copies into a new chat:

```
CONTINUE FROM HANDOFF — <project>
Goal: …
Decisions (don't re-ask): …
Done: …
Next (in order): 1… 2… 3…
Links/files: …
User prefs: short Lebanese Arabic, …
```

Keep it under 40 lines. No history, no reasoning, only what's needed to act. If the user uses a claude.ai Project, suggest saving the block into Project knowledge as `STATE.md`.

## What goes in STATE (and what never does)
- **Yes:** goal, current status, decisions with their *why* in 1 line, open questions, next 3–5 steps, file map (path → purpose), commands (dev/test/build/deploy), live URLs, user preferences, known blockers.
- **Never:** secrets or tokens, full logs, code blocks longer than 5 lines, anything already in `CLAUDE.md`, completed TODO lists (move them to LOG).
