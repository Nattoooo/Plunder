# Running the sprite pipeline

State lives in `art/work/_pipeline.json`: per family `status`, `round` and `tier`. Use `python3 art/tools/pipe.py` to change it (`set <family> status=... round=N`, `next N`, `summary`).

## Models

| Tier | Which families | Artist | Reviewer |
| --- | --- | --- | --- |
| `tiny` | every sprite in the family is 9 px or less on each side | Haiku, effort xhigh | Sonnet, effort medium |
| `normal` | everything else | Sonnet, default effort | Sonnet, default effort |

Every agent is fresh (never resumed); the files carry the history.

## What to do for each status

- `queued`: start an artist. Prompt: draw family `<f>`, follow `art/tools/CREATOR.md`, reply `READY <f>`. Set `status=drawing`.
- `drawing` → artist replies `READY`: set `status=reviewing round=<round+1>`, start a reviewer for that round. Prompt: review family `<f>`, round N, follow `art/tools/CRITIC.md`, write `critique-N.md`, reply `PASS <f>` or `FAIL <f> b/m/n`.
- `ready`: the artist finished but no reviewer ran. Start the reviewer for `round` and set `status=reviewing`.
- `reviewing` → `PASS`: `set <f> status=approved` (this also adds it to APPROVED.md).
- `reviewing` → `FAIL`: if `round` < 8, set `status=revising` and start a fresh artist. Prompt: revise family `<f>`; the round N review failed (`critique-N.md`); follow the revision steps in CREATOR.md; reply `READY <f>`. At round 8, set `status=stuck` and report it to the user.
- `revising` → artist replies `READY`: as for `drawing`.

Keep the number of running agents at or under the concurrency limit, filling free slots with `queued` families. Commit and push `art/` as work lands.

If agents fail with a usage-limit error, record each family's exact state (`ready` if its drawing finished but the review died, `queued` if the drawing died, `revising` if a revision died) and stop until the limit resets.
