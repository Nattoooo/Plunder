# props-large review, round 1

Batch-level: only the wreck is under review. Outline (1 px k), top-left light and the wood/K ramps match approved.png, and the detail level is restrained (no noise). The problems are shape and view.

## wreck: FAIL
1. [MAJOR] wreck (0-16,0-8): view and proportions. STYLE says ship wrecks are seen straight down with the bow up, but the hull is 17 wide x 9 tall, so it reads as a sideways boat or a seed pod (blunt end on the left, ragged cut on the right) and the "bow at top" in notes.md is not what the silhouette says. A real hull is about 2.5-3x longer than it is wide. Filled black, nobody would say "ship wreck". Fix: redraw bow-up and tall, flexible size about 9 wide x 14 tall: pointed bow at the top (rows 0-3 narrowing 1,3,5,7 wide), straight sides with the V/v lit rim on the left and w shaded rim on the right, and the snapped, ragged break across the bottom rows with open K showing. Put the mast stub on the centre line.
2. [MAJOR] wreck (6,7)-(6,8): the bottom outline has a 1 px gap (row 8 is `kkkk.kkkk`) directly under interior `K` at (6,7), so it looks like a missing pixel / hole in the outline, not a break. STYLE requires a closed outline. Fix: make (6,8) `k`, and show the break instead with a stepped, uneven edge (e.g. row 7 ending at different columns on each side) where the K interior meets the k outline.
3. [MINOR] wreck (7-9,5-6): the mast stub is a neat 3x2 rounded box (`VVv / vvw`) with no jagged top, so it reads as a hatch or crate rather than a snapped mast. Fix: after the redraw make it a 2x2 block with a one-pixel step in its top edge (V at the high side, v lower), surrounded by K.
4. [MINOR] wreck (4,3), (12,3): the single `K` pixels at either end of the W rib mean the rib does not reach the walls, contradicting notes.md ("wall to wall"). Fix: extend the rib (W) to the rim, or shorten the note.
5. [MINOR] wreck (2-3,7): `ww` on the lower left puts the shaded rim colour on the lit side. Fix: use `v` at (2,7) and (3,7).
6. [MINOR] wreck: "half-sunk" is only implied by dark K. Fix: optional, make the bottom interior row `K` against a `k` waterline as the dark area, nothing more.

Readability at 1x: on sand the dark body reads, on blue the k outline separates it, but the identity (ship wreck) is not clear until the silhouette is fixed.
