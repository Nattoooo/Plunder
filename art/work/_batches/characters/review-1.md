# Review round 1: batch characters

Set-level notes: outline (k), top-left light and teal/red palettes are consistent across the batch, and all sizes match spec exactly. The batch fails on open outlines (captain walk frames, crab, wraith, gull), a missing body part (skeleton arms), an unreadable face (wraith) and a wrongly oriented sprite (serpent tail). The 1x context renders are otherwise readable.

## captain: FAIL
1. [MAJOR] captain-down-2 (2,17)-(4,17): lowered left boot `J` sits on the last row with no `k` below it, so the 1 px outline is broken. Same in captain-down-3 (7,17)-(9,17), captain-up-2 (2,17)-(4,17) and captain-up-3 (7,17)-(9,17). Fix: keep the lowered leg exactly as in the standing frame (boots `J` on row 16, `kkkk` on row 17) and show the step by raising the other foot instead: raised leg becomes `bbb` on row 15 with its boot `J` on row 15/16 and `kkk` outline directly beneath it (row 16), nothing on row 17 for that leg.
2. [MINOR] captain-down-1..3, up-1..3 (1,15)-(10,15): trouser row `.kbbbkkbbbk.` is 2 px wider than the coat tail above (`..kRRRRRRk..`), so the legs poke out past the hips. Fix: narrow to `..kbbkkbbk..` or widen row 14 to `.kRRRRRRRRk.`.
3. [MINOR] captain-side-1 / side-2 (5,13)-(6,13): the two `s` hand pixels float in the middle of the coat with no sleeve, reading as a belly patch. Fix: add a 2 px wide `r` sleeve edge at x4 (rows 10-12) and x7 (rows 10-12) around the hand, or recolour the pair to `r` and keep one `s` at (5,13).
4. [MINOR] captain-down-* rows 9-10: `r` marks at x3, x8 and x10 alternate with `R` into vertical stripes (R r R r R). Fix: keep `r` only at x3 and x10 (arm edges) and make x8 `R`.
5. [MINOR] captain-up-*: back of head is a flat 8x4 brown slab that reads as a face of different skin. Fix: add a `j` hair-tie pixel at (5,8) or use `j` for the bottom row (y=8) to show the nape.

## crab: FAIL
1. [MAJOR] crab-1 / crab-2 (5,1)-(6,1): the top of the body (`RR` under the eye pixels) has no `k` above it, leaving the outline open between the two eye dots. Fix: set (5,0) and (6,0) to `k` in both frames (eye stalks stay at x4 and x7).
2. [MAJOR] crab-1 / crab-2 (0,0)-(3,1) and (8,0)-(11,1): claws are 3x2 blobs filled entirely with the lightest red `E`, so they read as pink pom-poms with no pincer and break the R body ramp. Fix: fill claws with `R`, put `E` only on the top-left pixel, and cut a 1 px notch at (1,0)/(10,0) (set to `.`, outline `k` at (0,0),(2,0)) so a pincer gap shows.
3. [MINOR] crab-1 (0,6)-(0,7), (11,6)-(11,7): outermost legs are 1 px `k` lines that connect to the body only diagonally; fine at 1x, but add a `k` at (1,6)/(10,6) in frame 1 so they attach.

## skeleton: FAIL
1. [MAJOR] skeleton-1 / skeleton-2 (0,6)-(9,10): there are no arm bones, only a 1-row shoulder bar at row 6, so the pirate reads as armless. Fix: add arms down both sides, e.g. `kxk` at x0-2 and x7-9 on rows 7-9 (outline `k` outside, bone `x` inside, hand `xx` at row 10), or one raised arm in each frame if animating.
2. [MINOR] skeleton-1 / skeleton-2 (2,1)-(7,1): the `R` bandana sits on top of the skull like a cap and has no knot or trailing tie. Fix: put the knot as `r` pixels at (8,2) and (8,3) hanging off the right side.
3. [MINOR] skeleton-1 (1,14), skeleton-2 (8,14): only the forward foot has a flared toe, the other leg ends in a bare `kkk` stub at row 13. Fix: give the raised foot a 1 px `x` toe on the outer side at row 13.

## wraith: FAIL
1. [MAJOR] wraith-1 / wraith-2 (3,3)-(8,5): the "glowing eyes" are `I` pixels at (4,4) and (7,4) flanking an hourglass of `K`, the same colour as the robe highlight, so no eyes read at 1x. Fix: make the hood opening a clean 6x3 `K` block at x3-8, rows 3-5, and place two `I` eye pixels at (4,4) and (7,4) fully inside it (or `Y` for stronger glow).
2. [MAJOR] wraith-1 (1,14)-(9,15): hem outline is broken: (2,14) and (5,14) `i` have nothing below, (3,15),(4,15) double up while (7,15) is empty; the bottom reads as random teeth. Same in wraith-2 (rows 14-15). Fix: draw 3 even scallops (3 px wide each) with a `k` directly beneath every fill pixel; wraith-2 shifts the scallops by 1 px.
3. [MINOR] wraith-1 / wraith-2 (8,8)-(9,13): shade uses `G`, a foliage swap character, and forms a 2 px band parallel to the outline. Fix: use `i` base with a single `I`-free shade column in `G`-free tone (e.g. `K` at x9 on rows 10-13 only) or confirm in-game that non-foliage sprites are never recoloured.
4. [MINOR] wraith-1 / wraith-2: robe is a straight 12 px slab from row 8 to row 13; add a 1 px taper (x0 and x11 `.` on rows 12-13) so it floats like a ghost rather than a block.

## gull: FAIL
1. [MAJOR] gull-1 (1,1)-(2,1) and (6,1)-(7,1): wing-tip `u` pixels have transparent pixels above them, so the outline is open, and they are isolated 1x2 stubs that read as grey dots beside a white diamond, not wings. Fix: redraw wings-up as a 2 px wide `P` wing at each side rising from the body (rows 0-3) with `u` tips, fully outlined with `k`, joined to the body at row 3.
2. [MAJOR] gull-1 / gull-2 (3,1)-(5,4): wings and body are the same `P` white with no separating line, so the shape is a lozenge. Fix: make the body `P` with a 1 px `u` shade line on the right (x5) and give the wings `p`-free two-tone (`P` top, `U` underside) so the wing edge is visible.
3. [MINOR] gull-1 vs gull-2: body length differs (tail row 4 vs row 5). Fix: keep body rows identical (head 1, body 2-3, tail 4) and change only the wings.

## sea-serpent: FAIL
1. [MAJOR] serpent-tail (0,0)-(9,6): the fork opens to the right, towards the body, and the narrow teal stalk is on the left, away from the head. With the serpent facing right the chain trails left, so the stalk must be on the right and the fin tip on the left. Fix: mirror the sprite horizontally (stalk `kIiik` at x5-9, fork opening to the left).
2. [MINOR] serpent-tail (4,3): orange `q` meets teal `i` with no outline, while the stalk is boxy (5x5 straight edges). Fix: taper the stalk with a 1 px step at rows 1 and 5 and keep the ridge `q` running into it.
3. [MINOR] serpent-body-1/-2/-3: the dorsal ridge is 5 px, 5 px, 3 px, so it does not shrink per segment. Fix: body-2 ridge 3 px (x3-5), body-3 ridge 1-2 px.
4. [MINOR] serpent-head (13,5): the red mouth ends at the sprite edge without an outline and is only 1 px tall, so "jaws open" is weak. Fix: add a `k` at (14,5)-style cap by widening to 15 px, or add `X`/`P` teeth pixels at (10,3),(12,3),(10,7),(12,7).
5. [MINOR] serpent-body-2 / body-3: the `I` highlight forms a 2 px band along the whole left edge, looking like a rim light rather than a top-left highlight. Fix: restrict `I` to the top-left quadrant only.
