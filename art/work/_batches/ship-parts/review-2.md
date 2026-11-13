# Review round 2: ship-parts

Only the four families that failed round 1 are reviewed; the nine that passed stay passed. Sizes still match spec (rudder 10x14, galley/workshop 10x10, figurehead 10x16) and outline, top-left light and palette use match the rest of the batch and approved.png.

## rudder: PASS
Round 1 #1 (shield taper): fixed, rows 10-12 are full width and row 13 is the chamfered `.kkkkkkkk.`; it now reads as a squared blade. Round 1 #2 (pintles breaking the outline): fixed, (0,2) and (0,6) are `k` and the `M` pintles sit at (1,2) and (1,6).
1. [MINOR] rudder (1-8,1-12): three flat vertical tone bands (VV / vvv / www) still make it read a little like a door or book at 1x. Acceptable as is; optional `w` seam pixel at (5,4)-(5,8) only if a polish pass happens.

## galley: PASS
Round 1 #1 (4-tone iron): fixed, iron is N/M/m only plus `K` for the pipe hole, and the ring now closes around the 2x2 `K` hole at (4,3)-(5,4): N at (4,2),(5,2),(3,3),(3,4),(4,5), m at (6,3),(6,4),(5,5). Round 1 #2 (flat fire): fixed, row 6 has the `Q` glow and row 7 is all `q`.
1. [MINOR] galley (1,1)-(3,3): the lit `N` L-shape at the top-left is as bright as the pipe ring, so the ring competes with the corner highlight. Optional: make (1,1),(2,1) `M`.

## workshop: PASS
Round 1 #1 (4-tone hammer head): fixed, head is `kvNNNMMmvk` / `kvMMMmmmvk`, three iron tones. Round 1 #2 (bright handle): fixed, handle is `V` in the wood ramp and no longer outshines the bench.
1. [MINOR] workshop (4-5,4-7): the `V` handle on the `v` top has modest contrast and the 2 px width makes it read as a plank stripe more than a hammer shaft. Optional: make (4,7),(5,7) `v` so it ends in the bench rather than running into the shadow edge.

## figurehead: FAIL
Round 1 #1 (front-on bust): partly fixed, the neck gap is gone and it is now top-down, but the redraw does not read. Round 1 #2 (solid `o` bottom row): fixed, row 14 is `koOOOOoook`.
1. [MAJOR] figurehead (2-7,3-8): rows 3-8 are a constant 4 px wide column (interior cols 3-6) before the jump to 8 px at row 10, so there is no head shape at all. The "head" at (3-6,5-8) is a 4x4 block of mostly dark `o` sitting below lighter `O`/`y` rows, which inverts the light and reads as a shadowed stump. At 1x (see the sheet) the silhouette is a gold bottle or chess pawn, not a carved prow figure. Fix: make the head a rounded 6 px wide mass bulging out of the body, then the shoulders step wider. Use exactly these rows: row 3 `..kyyOOk..`, row 4 `.kyyOOOok.`, row 5 `.kyOOOOok.`, row 6 `.kOOOOook.`, row 7 `.kooooook.`, row 8 `..kooook..`, row 9 `.kyyOOOok.`, and keep rows 10-15 unchanged. That gives a 6 px round head (highlight top-left, `o` shading bottom-right, hair as the `o` band at row 7 only), a 4 px waist at row 8, then shoulders.
2. [MAJOR] figurehead (3-6,5-8): hair `o` plus shaded `o` on the right fill the whole head with the darkest gold, so head and body merge with no internal separation, and the tone order (light body, dark head, light shoulders) is banded. Fix: with the new head above, keep `y` at (2,5) and (2,6) and use `O` as the head base so only the bottom row of the head (row 7) is `o`.
3. [MINOR] figurehead (4-5,1-2): the 2 px tip is `yO` with a one-pixel `y` stripe down col 4, which reads as a vertical seam. Optional: make (4,2) `O`.
