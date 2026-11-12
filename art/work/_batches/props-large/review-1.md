# props-large review, round 1

Batch-level: outline (1 px k), top-left light and stone/wood ramps are consistent and match approved.png. Detail level is right for claim-stone and shrine; wreck is noisier than anything in the approved set.

## wreck: FAIL
1. [MAJOR] wreck (3-9,3-6): the mast stub and ribs are a scatter of 1 px `k` and `W` pixels (row3 `kk` at 7-8; row4 `kk` at 3-4, `k` at 6 and 9; row5 `k` at 3,5,6,9; row6 `kk` at 4-5, `k` at 8). Reads as noise; the snapped mast is not identifiable. Fix: clear the interior to solid `K`; keep two straight `W` ribs (cols 5 and 10, rows 2-6); draw the mast stub as one 3x3 block (cols 7-9, rows 3-5) of `kWW / WWv / kvv`-style outline-plus-wood with a `V` top-left pixel, and nothing else inside.
2. [MAJOR] wreck (11-16,1-8): the stern tapers smoothly to a clean point (rows 3-5 end in `wk`, `vwk`, `wk`), so it reads as an intact pointed boat, not a snapped hull. Fix: break the stern off with a jagged, uneven edge (e.g. row2 ends x12, row3 ends x14, row4 ends x12, row5 ends x15, row6 ends x13), open `K` interior visible at the break, and drop the extra `kk` at (13,7)-(14,7) that makes row 7 inconsistent with rows 6 and 8.
3. [MINOR] wreck: "half-sunk" is not conveyed; the lower rim (row 7-8, `wv`/`wwww`) is the same wood as the top. Fix: make row 8 `K`/`k` dark to suggest waterline.

## claim-stone: FAIL
1. [MAJOR] claim-stone (4-5,3-4): the pole jogs sideways. It is at x=4 in rows 1-3 and at x=5 in row 4 (`..kkkwkk.`). Fix: row 4 becomes `..kkwkk..` so the pole is straight at x=4 and the stone top (x2-6) is centred on x=4 like rows 5-9.
2. [MAJOR] claim-stone (3,1)-(3,3): the pole has no outline on its left side and the top of the pole is missing above the flag, so the silhouette is ragged. Fix: add `k` at (3,1), (3,2), (3,3) and make (4,0) `k` (already is) so the pole is a 1 px `w` with a `k` edge, or widen the pole to `kw`.
3. [MINOR] claim-stone (1,8): `u` where the lit left edge should be `U`; light breaks on the bottom row. Fix: (1,8) = `U`.

## claim-stone-owned: FAIL
1. [MAJOR] claim-stone-owned (4-5,3-4): same pole jog as claim-stone. Fix: same as above (row 4 = `..kkwkk..`).
2. [MAJOR] claim-stone-owned (3,1)-(3,3): same unoutlined pole as claim-stone. Fix: same as above.
3. [MAJOR] claim-stone-owned (5-7,1-2): `K` flag against the `k` outline is almost invisible; the flag reads as a dark hole, not a black flag. Fix: use `m M` as a visible black/iron cloth highlight: (5,1)=`M`, (5,2)=`M`, rest `K`, so a lit top-left edge separates it from the outline.
4. [MINOR] claim-stone-owned (1,8): same as claim-stone, set to `U`.

## shrine: PASS
Reads as an altar between two pillars with a gem on it, on sand and on water. Notes only:
1. [MINOR] shrine (0-4,9-10): pillar bases are not distinguished while the top has a `TTT` cap seam at row 2; add a matching `TTT` base seam at row 9 for symmetry.
2. [MINOR] shrine (8,2)-(8,6): gem has no glow. Optionally add a `Y` glint at (7,4) in place of `H`.
