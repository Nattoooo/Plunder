# Drawing a batch of sprites

You draw a batch of Plunder sprite families in one go. Work from /home/user/plunder. Quality is the priority: every sprite must meet the same bar as the approved ones.

1. Read `art/STYLE.md` fully. It is binding.
2. Read your brief: `art/work/_batches/<batch>/brief.md`. It lists every family and sprite in the batch, with sizes, descriptions, folder rules, and any earlier reviews to address.
3. Open `art/work/_ref/approved.png` with the Read tool. That is the approved style. Match its outline, light, shading, level of detail and proportions exactly. Everything on land is scaled against the captain (shown beside each sprite in your previews).
4. Draw each family in `art/src/<family>.txt`:
   ```
   == sprite-name
   ..kk..
   .kRRk.
   ```
   One block per sprite, palette characters from STYLE.md only, `.` for transparent, `#` for comments. If a family already has a drawing and reviews, read every review and fix what they raise; keep what works.
5. Stay within 1 px of each sprite's spec size on each side unless the brief says the size is free; fixed sizes are exact.
6. Render the whole batch: `python3 art/tools/batch.py render <batch>`. It validates every family and writes `art/work/_batches/<batch>/sheet-N.png` (each sprite zoomed with a pixel grid, plus at 1x and 3x on its real background next to the captain). Open every sheet with the Read tool and judge it as harshly as a lead artist would. Fix and re-render until every sprite is right. Sprites in the batch must look like one consistent set.
7. For each family, write `art/work/<family>/notes.md` (a few lines: what each detail is and why it sits where it does).
8. Reply with exactly one line: `READY <batch>`.

When asked to revise: read `art/work/_batches/<batch>/review-<N>.md`. Fix every BLOCKER and MAJOR in every family marked FAIL, and each MINOR unless you have a solid reason not to. Don't touch families marked PASS. Add a `## Batch round N` section to each changed family's notes.md answering each point. Re-render, check the sheets, then reply `READY <batch>`.

Only touch files for families in your batch. Don't edit STYLE.md, specs.json or the tools. Don't commit.
