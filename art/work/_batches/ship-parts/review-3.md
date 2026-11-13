# Review round 3: ship-parts

Only `figurehead` is reviewed; the other twelve families passed earlier and stay passed. Size still matches spec (10x16), outline (1 px k), top-left light and gold ramp (k/o/O/y, 3 tones) match the rest of the batch and approved.png.

## figurehead: FAIL
Earlier issues:
- Round 2 #1 (no head shape): the rows I prescribed were applied exactly, so there is now a rounded head, but that direction was itself wrong (see issue 1). Not solved.
- Round 2 #2 (dark head, banded tones): partly fixed, head base is `O`; a new side effect is issue 2.
- Round 2 #3 (seam at (4,2)): fixed, (4,2) is `O`.
- Round 1 #1 (front-on bust) and #2 (solid `o` bottom row): bust gone, row 14 is `koOOOOoook`. Fixed.

1. [MAJOR] figurehead (0-9,3-10): outline widths by row are 6,8,8,8,8,6,8,10 (rows 3-10): a bulge, a waist at row 8, then wider shoulders. That hourglass reads at 1x (see sheet) as a gold gourd, chess pawn or bottle, not a carved prow figure; filled black nobody would name a figurehead. The head-over-waist-over-shoulders structure is the problem. Fix: no waist; the outline must widen monotonically (leaf/spearhead prow) and the head is shown by tone inside it. Keep rows 0-2 and 10-15; replace rows 3-9 with: row 3 `..kyyOOk..`, row 4 `.kyyOOOok.`, row 5 `.kyOOOOok.`, row 6 `.kyOOOOok.`, row 7 `kyyOOOOook`, row 8 `kyOOooOook`, row 9 `kyOOOOOook`.
2. [MAJOR] figurehead (2-7,7-8): rows 7 `.kooooook.` and 8 `..kooook..` are two near-solid `o` rows, a dark belt across the middle that is the darkest mass in the sprite and splits head from shoulders as a hard band. Fix: removed by the row set in issue 1; `o` stays only on the right edge and as the `oo` collar shadow at (4,8),(5,8).
3. [MINOR] figurehead (1-8,10-14): the shoulder/arm block is undivided gold, so little says "figure". Optional, only if it reads as noise-free: none needed once the head tones from issue 1 are in.
