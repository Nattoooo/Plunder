# Review round 2: batch props

Only the three families that failed round 1 (chests, barrel, wreck) are re-reviewed; every other family stays passed.

## chests: PASS
Round 1 check:
1. gold-chest read as a domed lid: improved, partly fixed. Alternating y/Y coin bumps and O gaps now break up the heap, and in context at 1x and 3x it reads as a gold pile in an open chest. The dark back wall was only done as K corners at (1,3) and (12,3), not across the row. Accepted because the result reads.
2. locked-chest padlock merge: no change required, accepted.
3. flat lid chamfer: optional, accepted.

Remaining MINOR notes:
1. [MINOR] gold-chest (1,3),(12,3): the two K pixels sit against k and are nearly invisible, so they read as outline thickening rather than interior shadow. Fix: optional, make the whole of row 3 between the corners K where the heap is not covering it, or set both pixels to k.
2. [MINOR] gold-chest (3,1)-(8,1): Y y Y y alternation is close to dithering on a 6 px run. Fix: optional, make it `YYyyYy` style runs of 2.

## barrel: PASS
Round 1 check:
1. Straight-sided silhouette: fixed. Widths are now 6, 8, 8, 10 (rows 3-7), 8, 8, 6, so the silhouette bulges and reads as a barrel in context on sand and on water.
2. Hoop lit run: fixed. Hoops at (2,2)-(7,2) and (2,8)-(7,8) are n n n then M M M, with no abrupt step.

Remaining MINOR note:
1. [MINOR] barrel (0,3)-(9,7): the bulge is mild (1 px per side) and there are no stave seams, so the body is a flat three-tone block. Acceptable at this size.

## wreck: FAIL
Round 1 check:
1. Stern break was a ruler-straight diagonal: NOT fixed. The left outline runs (3,3), (3,4), (4-5,5), (5,6), (5,7), (6-7,8), (6,9), (7-8,10), (8,11), (7,12), (8-9,13), (9,14): the same 2-rows-per-pixel slant as before with a one-pixel kink at row 12. The only protrusion is a single k pixel at (2,2). No rim plank or rib sticks out as a splinter, and there are no transparent notches. Rows 3-14 also have no rim on the stern side, so the water simply meets the outline and the stern reads as a clean slanted cut, not a break.
2. Interior flooded: fixed. Interior is deep water (A with a), the lower rim has a B/A waterline, and the rib and mast stump stay above it. It now reads as half-sunk.
3. Bow tip single pixel: fixed. (33,8) is the tip, rows 7 and 9 end at col 32.
4. Bow deck pixels (22-24,2) v: fixed.

1. [MAJOR] wreck (2,2)-(9,14): the stern break is still a regular diagonal and does not read as snapped. Fix: rebuild the left edge with varied run lengths (e.g. 3,1,2,1,3 rows). Let the rim plank at row 2 run out to col 1 as a 2-3 px `vv` splinter outlined by k. Extend the W rib at col 13 up to (13,2) and down to (13,15) so it pokes past the rim at both ends. Leave transparent notches at (3,5)-(4,5) and (5,9)-(6,9) so the edge steps in and out. Add a 1 px v rim fragment on the stern side at (5,7),(6,8) to show a plank end, outlined with k.
2. [MINOR] wreck (24,5)-(25,10): the `aa` column on the right of the mast forms a straight vertical stripe of dark water, which reads as banding. Fix: break it so it follows the hull curve, e.g. `a` at cols 24-25 on rows 6-9 only, with a single `a` at (24,5) and (24,10).
3. [MINOR] wreck (10,14)-(16,15): `BABWABW` and `AaAAaA` alternate every pixel along the waterline, which looks noisy. Fix: use runs of 2-3 (`BBAAWWBBA`) so the waterline reads as a wave edge.
4. [MINOR] wreck (25,3)-(27,3): `VVV` at the right-hand rim is lit while the rim above is v. Fix: make (25,3),(26,3),(27,3) v, or lighten the whole rim consistently.
