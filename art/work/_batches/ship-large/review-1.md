# ship-large review, round 1

Sizes checked against the brief: all 12 sprites match spec exactly. Palette: bows use only k V v w; sails use only p C c plus wood v/W (same hull-wood swap chars as the approved deck-planks). Set-level: bows are consistent with each other and with deck-planks wood (v base). Sail rows are consistent in cloth ramp but several silhouettes are lopsided (see below).

## bows: PASS
Notes (MINOR, not blocking):
1. [MINOR] bow-large (0-14,0-4): widths 3/7/11/13/15 make a rounded dome rather than a sharp stem; it reads as a pointed bow at 1x but is blunter than bow-medium's straight 2-2 diagonal. Optional: none required.
2. [MINOR] bow-medium (4-5,1): interior is only `Vw` with no `v`; fine at this size, no change needed.

## sail-square: FAIL
1. [MAJOR] sail-square-full (0-12,0-1): cloth silhouette is not symmetric. Row 0 spans x3-10 (margins 3/2) and row 1 spans x1-12 (margins 1/0), so the sail looks sheared left. Fix: row 0 -> `..ppppCCCcc..` (x2-10) and row 1 -> `.ppppCCCCCcc.` (x1-11); rows 2-3 stay full width.
2. [MAJOR] sail-square-furled (0-12,0): roll spans x1-12 over a yard x0-12, so the left end shows 1 px of gap and the right none. Fix: row 0 `.ppCCCCCCCCcc` -> `.ppCCCCCCCcc.` (x1-11, margins 1/1, yard ends W visible equally).
3. [MINOR] sail-square-full (0-5,0-3): the `p` run lengths are 4,5,6,4 top to bottom, a ragged light/mid boundary. Fix: after the row 0-1 fix, make row 3 `ppppppCCCCCcc` so the run is monotonic.
4. [MINOR] sail-square-half vs full: half row 0 is centred (x2-10) but full row 0 is not; fixing issue 1 will make the three sprites agree.

## sail-main: FAIL
1. [MAJOR] sail-main-full (4-12,1-2): topsail rows are lopsided. Row 1 spans x4-11 (margins 4/5) while row 2 spans x4-12 (margins 4/4), so the right edge notches at (12,1). Fix: row 1 -> `.....pCCCCCc.....` (x5-11, symmetric about x8); rows 0 and 2 unchanged in extent.
2. [MAJOR] sail-main-half (5-12,0) and (3-14,2): topsail row 0 spans x5-12 (margins 5/4) and the mainsail top row spans x3-14 (margins 3/2), both off-centre against the symmetric yards (x3-13) and the 17 px bottom row. Fix: row 0 -> `....ppCCCCCcc....` (x4-12, 9 wide, matches the topsail width in full); row 2 -> `..pppppCCCCCccc..` (x2-14).
3. [MINOR] sail-main-full (4-12,2): topsail `p` run is 1,1,1 then jumps; make row 2 `....ppCCCCCcc....` so the left edge reads 1,1,2 and the right 2,1,2 consistently. Fix: apply with issue 1.
4. [MINOR] sail-main-furled (3,0),(13,0) use light `v` for the topsail yard stubs while every other yard end in the batch is dark `W`. Fix: change both to `W`.

## sail-lateen: FAIL
1. [MAJOR] sail-lateen-half (1,9)-(1,12) and (2,12): the `p` highlight column drops out at row 9 (`vCc`) and the last row is `vcc`, so the light tone vanishes exactly where the cloth is widest and the bottom row is all shadow. Light goes from left to right on every row elsewhere. Fix: rows 9-11 `vpc`, row 12 `vpc` (keep p on x1 all the way down).
2. [MINOR] sail-lateen-full (1,12): bottom row `vCCCc` loses the `p` column that runs rows 1-11. Fix: `vpCCc`.
3. [MINOR] sail-lateen-full (4,7)-(4,12): the right edge is a 6-row vertical plateau after a 1-2-3 ramp, so the lower half reads as a rectangle, not a triangle. Fix: step the width out by one more column so the foot is widest, e.g. c at x4 from row 8 and x4 wide only on rows 10-12 (`vpCc.` for rows 7-9), keeping the full sail's wider foot than the half's.
4. [MINOR] sail-lateen-furled (1,1)-(1,12): the single cloth column changes tone down its length (p, C x10, c) which reads as a gradient along the roll, not a roll. Fix: use `C` for the whole roll x1, rows 1-12.

SUMMARY: bows pass; sail-square, sail-main and sail-lateen fail for lopsided silhouettes and lost highlights.
