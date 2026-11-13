# island-1 review, round 2

Round-1 sources now match the notes (checked against art/src/*.txt and sheet-1.png). Lumber-camp and mine pass. Plantation, fishery and distillery still have a MAJOR each. Sizes: plantation 38x21, fishery 32x18, distillery 28x20, all flexible and fine.

## plantation: FAIL
Round-1 check: #1 banding fixed (two tone H/G, h steps only). #2 y speckle fixed (4 ears, all in the upper half). #3 D tub fixed (base row is G). #4 tip stagger fixed (pointed, flat, leaning). New issue below remains.
1. [MAJOR] plantation crops (16..21, 0..19), (24..29, 2..19), (32..37, 1..19): each crop is still a perfectly straight 4 px wide capsule with a k outline all the way round, rounded at the top. The silhouette alone says cactus or green bottle, not sugar cane or corn. The "leaf" pixels (22,8), (30,11), (31,14) are single `G` pixels sandwiched between `k` pixels inside the 2 px gap, so they read as dark links or fence rungs between pillars, not leaves, and they do not break any silhouette. Fix: make leaves break the outline. On each crop, replace the outline `k` on 2 rows (alternating sides, e.g. rows 8 and 12 on the left, rows 10 and 14 on the right) with a 2 px diagonal leaf `G`/`H` plus `k` tip that sticks out into the gap, and give the top of each crop a 2 px leaf spray (a `H` pixel either side of the tip, so the head is wider than the stalk) in place of the plain rounded cap.
2. [MINOR] plantation crops: `h` step pixels at (18,10), (18,15), (25,7), (26,12), (33,13) read as scatter on a 4 px stalk. Fix: keep at most one `h` per crop.

## fishery: FAIL
Round-1 check: #1 fish redrawn 3 wide x 4 tall with k string, same x3, so fixed in construction (but see 3). #2 hut wall now 10 rows, fixed. #3 brace added, but wrongly (see 2).
1. [MAJOR] fishery rack (15..31, 0..17): two 1 px posts 12 px apart and 18 rows tall with a beam on top and nothing below row 6 for 11 rows. It reads as a gateway or torii, not a drying rack, and it is twice the height of the hut roof line for no reason; the fish occupy 4 of 18 rows. Fix: cut the posts down so the rack is about 12 rows tall (delete rows 8..11 of the rack columns 15..31 and let the posts and the hut share the bottom row), keeping the fish under the beam.
2. [MAJOR] fishery braces (18..19, 8..9) and (27..28, 8..9): the `w` pixels sit 6 rows under the beam, rise away from the posts and end in mid air, so they are orphans that read as dirt, not braces. Fix: delete them; if a brace is wanted put a single `w` at (18,2) and (28,2) (left and right of the beam underside, touching post and beam) and shift fish 1 and 3 in by 1 px if they collide.
3. [MINOR] fishery fish (18..20, 3..6), (22..24, 3..6), (26..28, 3..6): 3x3 `N/L/n` squares with no head taper read as ice cubes or cloth at 1x. Fix: make each tail a forked `k.k` at row 6 (x18 and x20, x22 and x24, x26 and x28) so the fish has a tail, (the 3x3 bodies stay as they are).

## distillery: FAIL
Round-1 check: #1 chimney now 4 rows above roof, no mid band, roof has a right slope: fixed (see MINOR 2). #3 firebox opening centred (x19..22 under pot centre) with Q above the flame: fixed. #2 lyne arm: not fixed in effect (below).
1. [MAJOR] distillery pot still (17..27, 4..8): the arm leaves the top of the neck, runs right, then drops 2 px and its `kkkk` cap at (24..27,8) lands on the shoulder of the bulb at row 9, enclosing a transparent hole at (23,7..8). The result is a closed loop: the whole object reads as a jug or ewer with a handle, not a still. Fix: the arm must leave the bulb. Widen the sprite by 4, run the arm along rows 5..6 out to x31, drop it as a 2 px `O/o` pipe at x30..31 down to row 12 (clear of the bulb, which ends at x27), and end it in a `k` cap over empty space; remove the hole by filling (23,7) and (23,8) with `o`.
2. [MINOR] distillery chimney (7..10, 0..8): the 4 px column runs down through the roof to the eave line and splits the roof in two, so it reads as a downpipe on the facade. The approved cottage chimney sits on the roof slope and stops at the roof. Fix: end the chimney at row 5 with a `k` base on the roof, as the cottage does.
3. [MINOR] distillery bulb (17,5..14): `y` forms a single column highlight along the whole left outline, which is banding. Fix: keep `y` on rows 5..9 only and use `O` below.

## lumber-camp: PASS
Round-1 check: #1 right post now `v`/`w`, shadow on the right, fixed. #2 bench and log removed, interior is a clear `K` gap, fixed. #3 log ends left, acceptable. Pile is symmetric (tops centred on x25), shed and pile stand on the bottom row, outline and light match the approved set.
MINOR (does not block): shed roof (14..16,2) `vvv` reads as a stray dark patch; make it `VVV` or continue `v` to the whole last 2 columns on rows 1..2.

## mine: PASS
Round-1 check: #1 rock banding fixed (one `U` blob top left, `T` base, `t` right edge and bottom row). #2 right post now `v`/`w`, fixed. #3 cart clear of the hill by 1 px, 7 px box, wheels inset, fixed. #4 floor rail removed, fixed. Dome steps are even on both sides, opening fits the captain, standing on the bottom row.
MINOR (does not block): cart wheels (25,11), (29,11) are single `M` pixels inside `k` and read as stubby feet; widening each to a 2 px `MM` with `k` below would read as wheels.
