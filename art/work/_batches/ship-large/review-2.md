# ship-large review, round 2

Checked from the updated grids in art/src (sail-square.txt, sail-main.txt, sail-lateen.txt). Only sheet-1.png exists (round-1 render, no sheet-2), so verdicts are from the grids. Sizes unchanged and match the brief. Palette: cloth only p C c, yards/spars only W v. bows passed in round 1 and are not relisted.

## sail-square: PASS
Round 1: #1 fixed (full rows 0-1 now x2-10 and x1-11, widths 9/11/13/13, symmetric). #2 fixed (furled roll x1-11, margins 1/1). #3 fixed enough (p runs 4,4,6,6 are monotonic). #4 fixed (half, full and furled now agree).
No new issues.

## sail-main: PASS
Round 1: #1 fixed (full topsail rows 5/7/9 wide, centred on x8). #2 fixed (half row 0 x4-12, row 2 x2-14). #3 fixed (full row 2 `....ppCCCCCcc....`). #4 fixed (furled yard stubs are `W`).
Fresh look: mainsail widths 11/15/17/17 step evenly, yards symmetric (x3-13 and x0-16), light top-left consistent. No new issues.

## sail-lateen: PASS
Round 1: #1 fixed (half `p` runs down x1 to row 12). #2 fixed (full row 12 `vpCCc`). #3 partly fixed: foot now widens to 5 on rows 10-12, so the sail reads as a triangle, though rows 4-9 are still a 4 wide plateau. #4 fixed (furled roll is `C` throughout).
Notes (MINOR, not blocking):
1. [MINOR] sail-lateen-full (3,4)-(3,9): 6 row plateau of `c` at x3 before the foot widens. Optional: start the widening at row 8 (`vpCCc` rows 8-12) for a smoother ramp.
