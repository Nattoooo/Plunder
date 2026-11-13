# Review round 1: batch props

Set-level notes: outline (k), top-left light and wood/iron/stone ramps are consistent across the batch and sit well with approved.png. Sizes are all flexible and within a sensible range. Three families fail on readability (open chest, barrel silhouette, wreck).

## chests: FAIL
1. [MAJOR] gold-chest (0,0)-(13,3): the open chest does not read as open and the gold does not read as coins. The heap is a smooth dome (rows 0-3, only Y at (4,1),(5,1),(4,3) as detail) sitting directly on a lit rim, so at 1x it looks like a chest with a golden domed lid. There is no dark interior, no back rim and no coin edges. Fix: make row 3 a dark back wall (`kKKKKKKKKKKKKk`-style, K between the k corners) under a heap that is 1 px narrower, break the heap silhouette with 3-4 coin bumps (alternate y/Y on the top edge, e.g. row 1 `..kkYyYyyOkk..`), and place 2-3 O gaps between coins in rows 2-3 so it reads as stacked coins, not a solid gold dome.
2. [MINOR] locked-chest (11,5),(12,5): band right end is M while the left end is n (lit); acceptable as shade but the padlock body (5..8, 6..8) has no outline, so N/M merges into the n straps at (4,5)-(9,5). Fix: optional, make (4,6),(4,7) and (9,6),(9,7) stay v (already) and keep padlock as is; consider k under the padlock at row 9 cols 5-8 is not needed. No change required if gold-chest is fixed.
3. [MINOR] chest, locked-chest: the lid is flat-topped with only a 1 px corner chamfer; a 1 px lighter row (V to y at row 1 is fine) would help, but not required.

## crate: PASS
1. [MINOR] crate (all): only horizontal plank seams, so at 1x it can read as a plain box. A single diagonal brace (e.g. W pixels from (2,4) to (8,8) is too noisy) is optional; leave as is unless a frame reads better in context.
2. [MINOR] lost-cargo (3,1): single `e` glint inside the flag is a lone pixel. Acceptable as a deliberate glint; remove if the flag looks busy at 1x. The flag is 5 px wide, not 4 as the notes say; update notes.md.

## barrel: FAIL
1. [MAJOR] barrel (0,2)-(9,8): the silhouette is a straight-sided rounded rectangle. Rows 2 to 8 are all 10 px wide, so a black fill reads as a drum or bucket, not a barrel. notes.md claims a bulged outline but there is none. Fix: bulge the sides: row 0 outline cols 2-7, rows 1-2 cols 1-8 (8 wide), rows 3-7 cols 0-9 (10 wide), rows 8-9 cols 1-8, row 10 cols 2-7 (sprite 10 x 11, centre staves and hoops accordingly). Keep the hoops on the narrower rows 2 and 8 (`knMMMMMMk` style) so they follow the curve.
2. [MINOR] barrel (1,2),(2,2),(1,8),(2,8): hoop lit part is only 2 px then 6 px of M, an abrupt step. Make the lit n run cols 1-3.

## bottle: PASS
1. [MINOR] bottle (3,5)-(4,7): the paper roll is 2 px wide in a 7 px sprite, so it sits half a pixel right of centre. Fix: make it 1 px (x) or 3 px (x X X) wide, or accept. Not blocking.
2. [MINOR] bottle: the neck (3,3) is a lone G pixel between k; fine at 1x, but a second neck row would improve proportion. Optional.

## wreck: FAIL
1. [MAJOR] wreck (3,0)-(9,16): the break at the stern is a ruler-straight diagonal (left edge steps exactly 1 px right every 2 rows, from (1,0) to (9,16)) with a clean outline. It reads as a hull with a slanted transom, not as a broken ship. Fix: replace the left edge with a jagged break: vary the run lengths (e.g. 3,1,2,1,3), let 2-3 rim planks and the rib at col 13 stick out beyond the edge as splinters (V/v pixels outlined by k), and leave 1-2 transparent notches in the rim rows 1-2.
2. [MAJOR] wreck (6,3)-(25,13): the interior is K (deep shadow brown-purple) and there is no water anywhere, so it neither reads as flooded nor as half-sunk; it looks like a dark-decked boat sitting on the ground. Fix: fill the interior with the deep water ramp (A with a few a, e.g. A body, a along the bottom and right) and add a ragged A/B waterline across the lower rim so the hull is partly submerged; keep the W rib and mast stump above the water.
3. [MINOR] wreck (33,7)-(33,9): the bow tip is 3 rows tall and blunt, not pointed. Fix: end the tip at 1 row, (33,8), with rows 7 and 9 ending at col 32.
4. [MINOR] wreck (22,2)-(24,2): `VVV` bow-deck pixels are lighter than the `v` rim to their left, breaking the top-lit rim; make them v.

## dig-spot: PASS
1. [MINOR] dig-spot: smooth dome with no hole or loose-dirt cue, so it reads as a dirt lump. Adding 2 d pixels of scatter on the sand at bottom-left would help but breaks the no-noise rule; leave as is.

## x-mark: PASS
1. [MINOR] x-mark (9,9),(10,9),(10,10): the lower right stroke ends in `RR` and `R` while every other stroke edge has `r` on its right edge. Fix: (10,9) to r, (10,10) to r.

## claim-stone: PASS
1. [MINOR] claim-stone-owned (13,2)-(15,4): the K shade triangle sits against the k outline and is nearly invisible (K #3a2a3a vs k #1b1220), so the black flag reads as a dark grey M block. Fix: use K for the body and M only for the lit top-left (swap roles) or drop the shade triangle.
2. [MINOR] claim-stone, claim-stone-owned (1,17)-(1,18): lit U band is 1 px on rows 17-18 but 2 px on rows 15-16; extend (2,17),(2,18) to U for a steady band.

## shrine: PASS
1. [MINOR] shrine (13,5)-(20,12): the brief says glowing; the gem has only one I glint at (15,6). Add I pixels at (14,7) and (13,7)... or a 1 px I halo on the upper left edge for a glow cue.
2. [MINOR] shrine: the gem rests on its point on the slab line at (16,12),(17,12); a floating look is fine but a 1 px gap row (row 12 transparent) would make it clearly hover.
3. [MINOR] shrine pillars (1,20)-(7,20): the base band is one lit row with no shade row, unlike the cap (rows 1-3); add a T row at row 21 or drop the band.

## quest-mark: PASS
1. [MINOR] quest-mark (0,6)-(4,6): bar and dot share one k row with no transparent gap; reads fine at 1x. No change required.

## waypoint: PASS
1. [MINOR] waypoint (1,0)-(1,12): the pole is at column 1 of a 9 px sprite, so the sprite is not centred on the pole base; confirm the game anchors it at the pole, otherwise the marker lands 3 px off target.
