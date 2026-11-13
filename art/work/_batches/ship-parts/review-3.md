# Review round 3: ship-parts

Only `figurehead` is reviewed; the other twelve families passed earlier and stay passed. Size still matches spec (10x16), outline (1 px k), top-left light and gold ramp (k/o/O/y only, 3 tones) match the rest of the batch and approved.png.

## figurehead: FAIL
Earlier issues:
- Round 2 #1 (no head shape): the rows I prescribed were applied exactly (row 3 `..kyyOOk..` through row 9 `.kyyOOOok.`), so the head is now a 8 px bulge, but the direction itself was wrong, see new issue 1. Treat as applied, not solved.
- Round 2 #2 (dark head, banded tones): mostly fixed; head base is `O` and only row 7 is a full `o` band. A new side effect is listed in issue 2.
- Round 2 #3 (seam at (4,2)): fixed, (4,2) is `O`.
- Round 1 #1 (front-on bust / pawn) and #2 (solid `o` bottom row): bust is gone and row 14 is `koOOOOoook`.

1. [MAJOR] figurehead (0-9,3-10): the silhouette widths run 4/6/8/8/8/8/6/8/10 (outline widths rows 3-10: 6,8,8,8,8,6,8,10). The bulge in rows 4-7, the 2 px waist at row 8, then the wider shoulders at row 10 make an hourglass. At 1x on the sheet it reads as a gold gourd, chess pawn or bottle, not a carved prow figure. Filled black, nobody would name a figurehead. The head-over-waist-over-shoulders structure is the problem, not the pixels. Fix: remove the waist so the outline widens monotonically (a leaf/spearhead prow), and show the head only by tone inside it. Use exactly: row 3 `..kyyOOk..`, row 4 `.kyyOOOok.`, row 5 `.kyyOOOok.`, row 6 `.kyOOOOok.`, row 7 `kyyOOOOook`, row 8 `kyOOooOook` (hair/brow `oo` at (4,8),(5,8)... see next), row 9 `kyOOOOOook`; keep rows 0-2 and 10-15 unchanged. Cols 1-8 at rows 4-6 are then the 6 px head, row 7-9 the shoulders, with no step narrower than the row above.
2. [MAJOR] figurehead (2-7,7-8): rows 7 `.kooooook.` and 8 `..kooook..` are two consecutive near-solid `o` rows 6 px wide, a dark belt across the middle of the sprite. It is the darkest mass on the sprite, sits where the highlight should be on the upper body, and splits the head from the shoulders as a hard band (banding). Fix: removed by the row set in issue 1 (rows 7-9 contain no more than 2 `o` pixels in the interior); `o` stays only on the right edge column and the `oo` at (4,8),(5,8) as the chin/collar shadow.
3. [MINOR] figurehead (0-9,10-14): arms/shoulders are one undivided gold block, so nothing says "figure". Optional: one `o` pixel pair at (3,12),(6,12)... skipped if it adds noise; the head tones from issue 1 are enough.
