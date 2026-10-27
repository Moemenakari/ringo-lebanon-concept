---
name: lean-session
description: Use at the start of every session in this repo to keep token use and back-and-forth low. Rules for reading files, screenshots, tool calls, subagents and reply length.
---

# Lean session rules

**Talking**
- Reply in short Lebanese Arabic: what changed, what's next, any question. No long recaps, and no options you won't pursue.
- Ask every open question in **one** message, each with a recommended answer, so Moemen can reply "ok".
- Don't start big work until the plan is confirmed. After that, don't re-ask what's already decided.

**Reading and searching**
- `grep`/`rg` first, then read only the needed line range. Never re-read a file you just wrote or edited.
- Pipe long command output through `tail -20` or `grep`. Never dump build logs, lockfiles or minified code.
- Look at images and videos as **contact sheets**: `ffmpeg -i v.mp4 -vf "fps=6/DUR,scale=240:-2,tile=6x1" -frames:v 1 sheet.jpg`. One image per video, not frame by frame.

**Doing**
- Batch independent tool calls in one turn. Write whole files with one Write instead of many small edits.
- No subagents unless Moemen asks.
- Screenshots only at milestones: one phone (400 px) and one desktop (1440 px), with the same script reused.
- Run the full test suite and Lighthouse once per milestone, not after every change.
- When something is blocked (network, permission), say so in one line and offer the workaround. Don't retry the same thing.
