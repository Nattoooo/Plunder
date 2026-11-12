# Running the sprite pipeline (batch mode)

Remaining families are grouped into batches in `art/work/_batches.json` (`families`, `tier`, `round`, `status`). Per-family state stays in `art/work/_pipeline.json`.

| Batch tier | Artist | Reviewer |
| --- | --- | --- |
| `tiny` | Haiku, effort xhigh | Sonnet, effort medium |
| `normal` | Sonnet | Sonnet |

The `characters` batch is `normal` because it holds the captain, the scale reference for everything on land.

Every agent is fresh; the files carry the history.

1. Artist: draw batch `<b>`, follow `art/tools/BATCH-ARTIST.md`, reply `READY <b>`.
2. Reviewer for round N: review batch `<b>` round N, follow `art/tools/BATCH-REVIEW.md`, reply `REVIEWED <b> PASS: ... FAIL: ...`.
3. Mark each PASS family approved (`python3 art/tools/pipe.py set <f> status=approved round=N`), then regenerate `python3 art/tools/batch.py refsheet`.
4. If any family failed and N < 3: fresh artist revises the batch from `review-N.md`, then review round N+1. After round 3, failing families are reported to the user.

Commit and push `art/` as work lands. Keep at most 20 agents running.
