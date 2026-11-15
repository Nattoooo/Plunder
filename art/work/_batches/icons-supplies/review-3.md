# Review round 3: icons-supplies

Scope: rations, salted-pork, fish, chain-shot, heated-shot, pistol-shot, canvas, rope, tar. Families that passed in round 2 (grog, medicine, cannonball, grapeshot) are not listed. Coordinates are 0-based from the top-left of each 16 x 16 sprite. Set-level: outline and top-left light are consistent. Three families now pass. The six failures are silhouettes that still read as the wrong object (salted-pork as a heart, pistol-shot as a clay jar, rope as a shell or leaf, tar as a pot with a stick) or unfinished round-2 fixes (fish, heated-shot).

## rations: PASS
Round 2: #1 fixed (three equal biscuits, each 4 rows, 10 px wide, stepped x3, x2, x3, with a single shared `k` row between). #2 fixed (the sides alternate +1/-1 consistently).
1. [MINOR] rations (4,2),(8,2): the hole grid is a single row of two `D` per biscuit, so each biscuit has almost no dock pattern. Fix (optional): add a second `D` row at (5,3)... or leave as is, it reads.
2. [MINOR] rations rows 0-15: the stack touches rows 0 and 15 with no margin. Fix (optional): none, the outline is unbroken.

## salted-pork: FAIL
Round 2: #1 not fixed. #2 partly fixed (`R` is limited to a 1 px right edge, the `C` fat stripe is at (4,6)-(7,6), the `E` highlight is 2 x 2 at (3,4),(4,4),(3,5)... but see below). #3 partly fixed (the tip ends `RR` with `k`).
1. [MAJOR] salted-pork (1,2)-(14,14): the silhouette is still a heart or a strawberry. It is flat across the top (row 2, x4-9, with shoulders at rows 3-5, x1-12) and tapers symmetrically to a point at (7,12)-(8,12), so it reads as a heart, not a ham leg. The bone at (11,11)-(13,13) is a separate lump to the lower right that the shank does not point at (the shank ends at x7-8, the bone starts at x11 with a `k` gap). Fix: draw a haunch at the upper left (x1-10, rows 2-9, rounded top-left) with a straight shank running diagonally to the lower right, 3 px wide by (10,10), and continue it into the bone at (11,11)-(13,13) with no gap, outlined by `k` all round. Remove the symmetric taper at (5,10)-(8,12).
2. [MAJOR] salted-pork (2,3)-(11,10): the body is still one flat `e` mass with only a 2 x 2 `E` highlight and a 4 px `C` stripe at (4,6)-(7,6) that floats mid-body and reads as a cut or a mouth. Fix: run the `C` fat stripe along the upper right edge of the haunch as a 2 px band (x7-11, rows 3-5) instead of mid-body, keep the `E` highlight, and put `R` on the lowest haunch row only.
3. [MINOR] salted-pork (11,11)-(13,13): the bone is `XXX`/`XXx`/`Xxx` with a `k` all round, only 3 x 3, so it is small against the haunch. Fix: make it 4 px wide with a `x` shadow on the right.

## fish: FAIL
Round 2: #1 not fixed. #2 not fixed. #3 partly fixed (the dorsal fin is wider, `bbBB`).
1. [MAJOR] fish (11,3)-(14,10): the tail is not a tail. The body ends at x11 on rows 6-8 (`k` at (11,6),(11,7),(12,8)) with no tail stalk, and the two fork pieces are joined to the body only through the top row 5 (`B` to x13) and bottom row 9 (`BBB` x11-13), leaving an open notch 3 rows deep from x12 to x14. It reads as a crab claw or a C, not a forked tail. A lone `k` at (12,3) is an orphan. Fix: draw a 2 px wide `B` stalk at x11-12 rows 6-7, then fork out to two points at (13,4)-(14,5) and (13,8)-(14,9) with the notch only at (13,6),(14,6)-(14,7); delete (12,3) and (12,4)-(13,4) `BB`.
2. [MAJOR] fish (1,6)-(4,6): the eye is still a lone `P` at (2,6) between `k` at (1,6) and (3,6), directly on the mouth/outline row, with no pupil. Fix: `k` pupil at (3,6) and `P` glint at (2,6) inside a `B` head, with the gill line as `k` at (4,6)-(4,8).
3. [MINOR] fish (2,5)-(11,10): the belly is `N`/`U` in three tones against `b`/`B`, so the fish looks banded in horizontal stripes. Fix (optional): use `N` only for the belly.

## chain-shot: PASS
Round 2: #1 fixed (both balls are inside the canvas with a 1 px margin: rows 1-6 and rows 9-14, columns 1-14). #2 fixed (three links run along the diagonal, connected to both balls, no stray `k` at (10,7)). #3 acceptable.
1. [MINOR] chain-shot (9,1)-(13,6) and (1,9)-(6,14): the balls are not the same size (the top ball is 5 rows, the bottom ball 6) and both use four tones `N n M m`. Fix: add one row to the top ball or remove one from the bottom, and drop `m`.
2. [MINOR] chain-shot (3,9)-(7,10): `kkk` at (3,9)-(5,9) and (5,10)-(7,10) makes a thick black blob where the last link meets the ball. Fix: make (6,10),(7,10) `.` and let the link share the ball outline.

## heated-shot: FAIL
Round 2: #1 partly fixed (an iron crust `M`/`m` is now on the right). #2 n/a. #3 fixed (the circle is symmetric).
1. [MAJOR] heated-shot (8,4)-(12,11): the right side is banding. Rows 5-11 run `e`, `R`, `M`, `m` as four parallel diagonal stripes that follow the outline (for example row 8: `eeeeeeRMmmk` at x3-12). That breaks the rule of no banding and at most 3 tones per material (red `e R Q Y` plus iron `M m`). It reads as a red apple with a grey edge, not a hot iron ball with a crust. Fix: remove the `m` column at x11-12, keep `R` only on the bottom-right 1 px rim, and draw the crust as 3 or 4 irregular `M` patches (2 x 2 at (10,5),(11,8), 1 x 2 at (8,11)) with the `e` glow showing between them. Keep `Q`/`Y` at the upper left.
2. [MINOR] heated-shot (2,3)-(13,12): the `k` outline is 2 px thick at the diagonals (`kk` at (4,3),(5,3)... (2,10),(3,10),(12,10),(13,10)). Fix: step the outline 2-2-1-1 so no corner has `kk` above `k`.

## pistol-shot: FAIL
Round 2: #1 partly fixed (the lead balls are 2 x 2 `N n / M m` blobs at x10-13 and x9-14). #2 partly fixed (there is a pinched neck and a `ffff` tie at (3,4)-(6,4)). #3 fixed.
1. [MAJOR] pistol-shot (1,1)-(8,13): the pouch is a flat `J` mass with a flat `kkkkkkkk` lip at row 1 and a narrow neck at rows 3-5, so the silhouette is a clay jar or a vase with a wide mouth, not a drawstring pouch. The `j` shade is one 4 px row at (3,12)-(6,12) plus (7,5),(7,6). Fix: close the top with a gathered tuft: rows 1-2 become a 4 px `J` gather at x3-6 with `j` fold pixels at (3,2),(6,2), the `ff` tie at row 3, and the body widens below it with a rounded belly (rows 5-11, x1-8) with a `j` fold at (4,7)-(4,9) for a drooping sack.
2. [MAJOR] pistol-shot (8,8)-(14,13): the balls are 2 x 2 blobs sharing outlines and a solid `kkkkkk` bar at (8,11)-(13,11), so they read as one lump, and the bottom pair fuses with the pouch wall at (8,11),(8,12). Fix: draw 3 separate 3 x 3 balls: `N` top-left, `n` centre, `M` bottom-right, `k` outline, at x9-11 rows 8-10, x12-14 rows 10-12 and x9-11 rows 12-14, with a 1 px gap from the pouch wall at x8.
3. [MINOR] pistol-shot (1,1)-(14,13): the pouch is flush left at x1 and the balls are flush right at x14, so the icon is not centred. Fix: shift everything right by 1 px.

## canvas: PASS
Round 2: #1 fixed (the left end is a rounded spiral cap, `k` core at (3,7), `c` ring). #2 fixed (the top row is `C` with `PP` at (8,4)-(9,4) only, and row 10 is `c`). #3 fixed (`D` at (9,5) and (10,10)).
1. [MINOR] canvas (1,3)-(14,11): the left cap is only a 1 px curve (`k` at x2, x1, x2 on rows 4, 5-9, 10), so the cylinder reads slightly squarish. Fix (optional): add `k` at (2,3) and (2,11) to round the top and bottom.
2. [MINOR] canvas (13,4)-(14,10): the right end is a flat vertical edge. Fix (optional): none.

## rope: FAIL
Round 2: #1 partly fixed (there is an outer and an inner loop, with `f`/`D` strand ticks). #2 not fixed.
1. [MAJOR] rope (1,1)-(14,13): the silhouette is a teardrop or a spiral shell. The upper left is a point at (4,1)-(7,1), and the lower right is a fat bulge that runs to x14, so it reads as a snail or a leaf with a hole, not a coil. The `K` hole is a 3 x 3 square at (7,7)-(9,9) offset right of the sprite centre. Fix: make the coil a round ring (x1-14, rows 2-13) with a round 4 x 4 hole at (6,6)-(9,9), a 2 px strand band all round, and clip the upper-left point at (4,1)-(7,1).
2. [MAJOR] rope (10,11)-(14,13): the free end is still not a free end. Rows 11-12 are `ffDDfDfDk` and `ffDDfffDk` running into the coil bottom, then a straight `kkkkkkkkk` baseline at row 13. Fix: end the rope with a 2 row by 3 px `f`/`D` tail that leaves the coil at the lower right at (12,11)-(14,13) with a gap of `.` between the tail and the coil outline and a `D` fray pixel at the tip.
3. [MINOR] rope (2,3)-(4,10): the `F` highlight on the left runs down 5 rows as a stripe. Fix: limit `F` to (2,4)-(3,5).

## tar: FAIL
Round 2: #1 fixed (the brush is one diagonal, handle `D` (11,1)-(9,3) into `jj` bristles at (8,4)-(9,6)). #2 partly fixed (a `M` bail arc at (2,6)-(13,6) over (5,3)-(7,3), a `N` glint at (5,7)). #3 fixed (a 1 px handle). #4 fixed (`V`/`w` staves).
1. [MAJOR] tar (2,3)-(13,8): the bucket mouth is unreadable. The opening is a single `m` row at (6,7)-(11,7) under a ragged `MkMMMkjjkmkM` row 6, with `kk` pieces at (3,6),(7,6),(10,6),(12,6). The bail arc is not continuous (the arc goes (5,3)-(7,3), then is cut by the brush at (8,3)-(10,3), and the right half is a stray `M` at (11,4),(12,5)), and the left half at (4,4),(3,5),(2,6) is 1 px higher than the right. It reads as a black pot with a stick and a hoop, not a bucket of tar. Fix: draw the mouth as a 2 row ellipse of `m` at (5,6)-(10,7) with a `M` rim above it at (4,5)-(11,5), a `N` glint at (6,6), and make the bail a symmetric `M` arc from (3,6) up to (4,4),(5,3)-(10,3) down to (12,6), passing behind the brush with the brush `k` drawn over it.
2. [MAJOR] tar (4,8)-(11,13): the bucket body is only 5 rows, one of which is a full `N` band at row 10 (`kNNNNNMk`), so the bucket reads as a flower pot with a silver stripe, and the body (x4-11 narrowing to x6-9) is narrower than the rim (x3-12) with no visible hoop. Fix: make the body 6 rows (rows 8-13), taper x4-11 to x5-10, use the `N` band as a 1 px hoop only at (4,10)-(11,10) with `M` under it, and keep `V`/`w` staves between.
3. [MINOR] tar (11,0): a lone `k` on the top canvas edge caps the handle. Fix: start the handle at (10,1) so row 0 is empty.
