# Review round 1: ship-parts

Set-level: outline (1 px k), top-left light and wood ramp use are consistent across the batch, and sizes all match spec (helm/mast/oar-bench/crew-quarters/cargo-hold/galley/powder-magazine/workshop/sick-bay 10x10, rudder 10x14, crows-nest 12x12, ram and figurehead 10x16). Four families break the 3-tones-per-material rule or the straight-down view/silhouette rule and fail. Brief inconsistency: the rudder entry says it sticks out 2 px below the cell, but 10x14 (4 px below) is the fixed size and the notes say 4 px; size is accepted as is.

## helm: PASS
1. [MINOR] helm (2,2)/(7,2): the rim is 1 px and the spokes use the same V as the rim, so at 1x it reads as a studded ball more than a wheel. Optional: make the four spoke ends at (4,1),(5,1),(1,4),(1,5),(8,4),(8,5),(4,8),(5,8) one tone lighter than the rim.

## rudder: FAIL
1. [MAJOR] rudder (0-9,10-13): the shield-shaped taper (rows 10-13 narrowing 8/6/4/2) with three vertical wood bands makes the sprite read as a heraldic heater shield at 1x, not a rudder blade. Fix: keep rows 10-12 full width `kVVvvvwwwk` and close the bottom with a chamfered row 13 `.kkkkkkkk.` so it is a squared blade; add one plank seam of `v` down column 5 in rows 1-12 only if it does not merge with the bands.
2. [MINOR] rudder (0,2),(0,6): M pintles replace the outline pixel, breaking the silhouette edge. Fix: leave (0,2),(0,6) as `k` and put the pintles at (1,2),(1,6) as `M`.

## mast: PASS

## oar-bench: PASS
1. [MINOR] oar-bench (1-8,1-8): plain slab with no seam or fixing; reads as a button. Optional: a `w` seam pixel at (4,4)-(5,4) is not needed; leave unless the set gets a polish pass.

## crew-quarters: PASS
1. [MINOR] crew-quarters (2,2)-(7,7): the ladder rails (col 3 V, col 6 v) are the same tone as the frame, so at 1x it reads as a shelf. Optional: darken the rails to `v`/`w` or add `K` at col 3 row 1.

## cargo-hold: PASS
1. [MINOR] cargo-hold (0-9,2-7): the straps take 4 of 8 interior rows and dominate; fine to ship, but a plank seam in the wood at (4,4)-(4,5) would read better.

## galley: FAIL
1. [MAJOR] galley (1-6,1-5): iron uses four tones (N, n, M, m) plus K in an 8x8 area, which breaks the 3-tone limit and leaves the pipe ring ragged, with lit pixels at (4,2), (3,3) and (4,5) that do not form a ring. Fix: replace every `n` with `N` so iron is N/M/m only: rows 1-5 become `kNNNMMMMmk`, `kNMMNNMMmk`, `kNMNKKmMmk`, `kMMNKKmMmk`, `kMMMNmMMmk`.
2. [MINOR] galley (3-6,6-7): the two fire rows are identical, so the glow is flat. Fix: make row 7 `kMmqqqqmMk` or put `Q` at (4,6),(5,6) only.

## powder-magazine: PASS
1. [MINOR] powder-magazine (4-5,0-9), (0-9,4-5): neighbouring keg outlines double up into 2 px dark bars, so the black cross is heavy and reads a little like a window. Acceptable for fixed 10x10; consider sharing the outline if redrawn.

## workshop: FAIL
1. [MAJOR] workshop (2-7,2-3): the hammer head uses four iron tones (N, n, M, m) in 12 px, which is muddy and breaks the 3-tone limit. Fix: row 2 `kvNNNMMmvk`, row 3 `kvMMMmmmvk` (replace `n` with `M`).
2. [MINOR] workshop (4-5,4-7): the F/f handle is the brightest thing in the set and pulls the eye from the bench. Fix: use `V`/`v` for the handle, or keep F only at (4,4)-(4,7) and `v` at col 5.

## sick-bay: PASS
1. [MINOR] sick-bay (0-9,1-8): no wood frame or edge, so it reads as a first-aid box as much as a cot. Optional: `V` outline-adjacent pixels at (0..9,8).

## crows-nest: PASS

## ram: PASS
1. [MINOR] ram (1-8,7-14): nine identical rows of N/M/m make a slab, and with the tip it reads close to a bullet. Optional: one `m` band row at y=11 across the plate.

## figurehead: FAIL
1. [MAJOR] figurehead (0-9,0-15): a front-on bust (round head, narrow neck at (4-5,7-8), wide shoulders) is a chess pawn silhouette at 1x, and it breaks the straight-down view rule for ship parts. Fix: redraw as a top-down carved prow figure: shoulders and arms on rows 9-14, a 4x4 head with `o` hair at rows 5-8 centred on cols 3-6, and a forward-leaning body tapering to a 2 px tip at rows 0-4, with no neck gap.
2. [MINOR] figurehead (1-8,14): the bottom row is all `o`, a solid shadow stripe. Fix: mix `O` at (2,14)-(5,14).
