# ship-tiles review, round 1

Set notes: tiles and overlays are unoutlined (allowed), bows are k-outlined with light from the top left, palette use is clean and the wood ramp is consistent. The weak points are the damage crack and the shape language of the two larger bows.

## deck-planks: PASS
- [MINOR] deck-planks (0,4)-(9,5): the two W butt-joint rows touch diagonally and make a small stair step on the deck. It tiles correctly and reads as planking; acceptable.

## deck-logs: PASS
- [MINOR] deck-logs (0,4)-(9,5): rope uses `D` (a hull-swap character) beside non-swap `f`. If raft logs are ever recoloured with the hull swap, the rope will shift. Fine as long as logs are not swapped.

## iron-bands: PASS
- [MINOR] iron-bands (1,2) and (7,2): the rivet glints are fine, but rivet positions are the same on both bands so the spacing looks mechanical. Acceptable on an overlay.

## deck-damage: FAIL
1. [MAJOR] damage-crack (0,0)-(8,7): it is a perfectly straight 45-degree stripe with a 1 px light edge, so at 1x it reads as a stick or rope lying on the deck, not a cracked, splintered plank. There are no splinters and no branching. Fix: break the line up. Shift row 3 so the split jogs (for example row 3 `...ww.V...`, row 4 `....wwwV..`), add a 1 px side branch such as `w` at (2,5) and (6,3), and lift 2 or 3 `V` splinters off the line on both sides, not only the upper right.
2. [MINOR] damage-crack (3,3)-(5,3): row 3 is 3 px wide (`www`) between 2 px rows, a one-off bulge that reads as a jaggie rather than a deliberate kink. Resolve it as part of the rework in 1.
3. [MINOR] damage-hole (1,3),(2,3),(1,4): the `A` glint makes the pit read as a glossy blue ball or button, especially on the sea background. Fix: drop the glint, or move it into the rim, and rough the outline with a splinter pixel or two (for example `v` at (0,1)) so it reads as a hole and not a porthole.

## bows: FAIL
1. [MAJOR] bow-medium (0,0)-(19,5): the brief asks for a pointed tip, but this is a flat-topped dome (4 px flat top, 3-2-1-1-1 step). Filled black it reads as a hill or mound, not a ship's bow. Fix: draw a 2-2-2 diagonal point with a 2 px tip. Outline starts at row 0 x9-10, row 1 x7-12, row 2 x5-14, row 3 x3-16, row 4 x1-18, row 5 x0-19. Fill with `V` down the left, `v` base and `w` down the right, keeping the `k` outline.
2. [MAJOR] bow-large (0,0)-(29,8): same problem. A 4 px flat top and a 4-3-2-1-1-1 step make a half-moon, not a prow. Fix: use a 2-2-2 diagonal point. Row 0 x14-15, row 1 x12-17, row 2 x10-19, row 3 x8-21, row 4 x6-23, row 5 x4-25, row 6 x2-27, row 7 x0-29, row 8 full width as now.
3. [MAJOR] bow-small versus bow-medium and bow-large: the small bow is a sharp 1:1 triangle while the other two are rounded domes, so the set has no shared shape language. Fix: after 1 and 2 all three are straight-edged points, which resolves it. Keep bow-small as it is.
4. [MINOR] bow-large (0,3)-(5,8) and (24,3)-(29,8): the light and shadow bands of 3 `V` and 3-4 `w` run parallel to the outline and verge on banding. Fix: shorten the `V` run on the left to 2 px and the `w` run on the right to 2 px on rows 5-8, leaving more flat `v`.

## stern-lantern: PASS
- [MINOR] stern-lantern (0,0)-(4,4): there is no bracket or chain pixel, so it reads as a gold dot. Acceptable at 5 px, since the game places it on the stern.
