# Review round 2: icons-supplies

Scope: rations, salted-pork, grog, medicine, fish, cannonball, chain-shot, grapeshot, heated-shot, pistol-shot, canvas, rope, tar. Coordinates are 0-based from the top-left of each 16 x 16 sprite. All 13 grids are 16 x 16 and use palette characters only. Set-level: outline and top-left light are now consistent. The remaining failures are silhouettes that still do not name the object (salted-pork, heated-shot, rope, canvas, tar, pistol-shot) and unfinished round-1 fixes (rations, fish, chain-shot).

## rations: FAIL
Round 1: #1 partly fixed (the top biscuit is now about 9 x 8 and square, with a 2 x 2 hole grid, so #3 is fixed). #2 not fixed.
1. [MAJOR] rations (2,9)-(13,13): the two lower biscuits are slivers, one `f` + `D` row pair (rows 10-11) and one lone `f` row (row 13), each closed by a full-width `kkkkkkkkkkkk` line at rows 9 and 12. The bottom half is still stacked bands (`f`/`D`/`k`/`f`/`D`/`k`/`f`) and reads as drawers or a book on a shelf, not a stack of square biscuits. The `D` shade is missing on the bottom biscuit. Fix: redraw rows 8-13 as two more biscuits of equal size to the top one. Each shows a 2 row `F` top face and a 2 row `f`/`D` front edge, offset 1 px left then 1 px right. Use a single `k` only where biscuit edges overlap, and drop the `kkkkkkkkkkkk` rows. Rebalance heights so the stack is three biscuits of about 5 rows visible each.
2. [MINOR] rations (3,1)-(12,14): the stack steps x2-13 (row 9), x2-12 (rows 10-11), x3-13 (row 13), so the sides wobble 1 px. Fix: follow the offset plan above consistently (alternate +1/-1 per biscuit).

## salted-pork: FAIL
Round 1: #2 mostly fixed (the sprite is off the right edge). #4 fixed. #1 and #3 not fixed.
1. [MAJOR] salted-pork (1,2)-(14,13): the silhouette is still a heart or strawberry, widest at rows 5-7 (x1-14) and coming to a point at the bottom-left (5,12), with a tiny bone off to the right. Filled black it reads as a heart or a tomato, not a ham leg. The knuckle bone points the opposite way to the taper, so the leg has no direction. Fix: draw a haunch at the upper left (about x1-10, rows 2-9) with a straight shank tapering diagonally to the lower right (3 px wide by (12,12)), ending in the bone. Make the bone `X`/`x`, 3 px wide and 3 rows tall, at (11,11)-(13,13), continuing the shank line and fully outlined by `k`.
2. [MAJOR] salted-pork (9,5)-(12,12): `R` forms a diagonal band 3-4 px wide along the whole right and bottom edge (banding), and the body is otherwise one flat `e` mass with no fat or highlight except two `E` at (3,4),(4,4),(3,5). Fix: limit `R` to the lowest row of the haunch and a 1 px right edge. Add a `C` fat stripe across the upper body (the rind line at (2,2)-(9,2) is already `C`) and put a 2 x 2 `E` highlight near (4,4).
3. [MINOR] salted-pork (4,12)-(8,12): `RRr` at the tip is a muddy tail, and the bone has a 1 px `x` shadow only. Fix: end the shank in `R` with a `k` cap.

## grog: PASS
Round 1: #1 fixed (the handle at x10-14 is a complete 3 x 5 loop inside the canvas, the hole at (11,7)-(12,9) is 2 x 3). #2 fixed (the foam is a clean 2 row `P` cap with `p` on the right side only, the stray `kk` is gone). #3 fixed (one `N` band at row 8, and the body tapers at rows 11-12).
1. [MINOR] grog (2,1)-(9,1): the top rim is a flat `kkkkkkkk` line, so the foam has no bump. Fix (optional): turn (4,1),(5,1) into `P` with `k` above at (4,0),(5,0) for one foam bump.
2. [MINOR] grog (8,3)-(9,12): the `v`/`w` columns are a 2 px stripe along the whole right side (mild banding). Fix (optional): use `v` only.
3. [MINOR] grog rows 1-13: the sprite is 1 px high; rows 14-15 are empty and row 0 is empty, so it is slightly low. Fix (optional): move down 0 or shift up 0.5 px; leave as is.

## medicine: PASS
Round 1: #1 fixed (the cross is symmetric: vertical x7-8 rows 8-11, horizontal x5-10 rows 9-10). #2 fixed (the shoulders step 1-1-1).
1. [MINOR] medicine (12,13)-(13,13): the bottom row 13 has its right `k` at x=13 but its left `k` at x=3, so the bottom-left corner steps 2-1-1 and the bottom-right steps 0-2. The bottle is not symmetric at the base. Fix: set (13,13) to `.` and (12,13) to `k`, with `g` at x4-11.
2. [MINOR] medicine (7,8)-(8,11): the vertical arm runs the full label height with no margin, while the horizontal arm has a 1 px margin. Fix (optional): make the label rows 7-12 or keep as is.

## fish: FAIL
Round 1: #3 fixed (a dorsal fin at (6,3)-(8,4) and a ventral fin at (6,11)-(7,11)). #4 fixed for the nose (x=1), but the tail now touches the right edge. #1 and #2 not fixed.
1. [MAJOR] fish (12,4)-(15,9): the tail is still a 1 px `B` stick with an outline on both sides: (13,5), then (14,7),(14,8), with a `k` at (15,6),(15,7),(15,8). It is neither forked nor 3 px deep, and its position wobbles x13 to x14. The `k` at (15,6)-(15,8) touches the canvas edge. Fix: draw a forked tail with two `B` fork points at (14,4) and (14,9), notched at (14,6)-(14,7), joined to the body by a 2 px wide `B` neck at x12-13 rows 5-8, with `k` all round. Keep x15 empty.
2. [MAJOR] fish (1,7)-(3,7): the eye is still a lone `P` at (2,7) between `k` at (1,7) and (3,7), with no pupil, sitting on the outline row of the mouth. Fix: put `k` pupil at (3,6) with `P` glint at (2,6) in the head, and move the gill line to `k` at (4,6)-(4,8) (x4 rows 6-8).
3. [MINOR] fish (3,4)-(11,4): the dorsal fin is only `kkk bBB kkk` and merges with the body top. Fix: widen the fin to 4 px: `b` at (5,3),(6,3).

## cannonball: PASS
Round 1: #1 fixed (the right ball's `k` is on x=15 at every row). #2 fixed (each lower ball is a clean 8 px circle: 4-6-8-8-8-8-6-4, left ball x0-7, right ball x8-15, top ball x4-11). #3 fixed (no `kk` clusters on the top ball). #4 fixed (`N` glints at (6,2),(2,8),(10,8)).
1. [MINOR] cannonball (7,9)-(8,12): the two lower balls meet in a 2 px `kk` seam. Fix (optional): overlap by 1 px for a single `k`.
2. [MINOR] cannonball (0,9)-(0,12),(15,9)-(15,12): the lower balls' outlines sit on the canvas edge with no margin. Fix (optional): none, the outline is unbroken.

## chain-shot: FAIL
Round 1: #1 partly fixed (there is a chain now, but it is a 1 px diagonal). #2 not fixed.
1. [MAJOR] chain-shot (9,0)-(15,6) and (0,9)-(6,15): both balls are 7 px but are pressed into opposite canvas corners. The top ball has `k` on row 0 and column 15, the bottom ball `k` on row 15 and column 0 (the round-1 instruction was a 1 px clear margin). The whole icon is a corner-to-corner diagonal with no breathing room. Fix: shrink each ball to 6 px (rows 1-6 at x9-14 for the top ball, rows 9-14 at x1-6 for the bottom ball: run lengths 2-4-6-6-4-2) and leave rows 0 and 15 and columns 0 and 15 empty.
2. [MAJOR] chain-shot (6,6)-(10,9): the chain is three single pixels, `n` (9,6), `M` (8,7), `n` (7,8), each with irregular `k` fragments: (8,6), (7,7), (9,7),(10,7), (6,8),(8,8), (6,9),(7,9). It does not connect to either ball (it touches both only diagonally), and the stray (10,7) `k` is an orphan. It reads as a dotted line. Fix: with the smaller balls above, draw 3 chain links, each a 2 x 2 oval with a `k` outline, alternating `n` and `M`, running along the diagonal from (8,6) to (6,9) so the first link overlaps the top ball's outline and the last overlaps the bottom ball's. Remove (10,7).
3. [MINOR] chain-shot (11,1)-(14,5): the ball is `N`,`n`,`M`,`m` with all four tones (the same as the cannonball). Fix: acceptable once the margin is fixed.

## grapeshot: PASS
Round 1: #1 fixed (6 shot are clean 3 x 3 clusters, 3 + 2 + 1, `n`/`M`/`m`). #2 fixed (the tie is `kDfDk` at x5-9, with `kk`+`CCC`+`kk` below). #3 fixed (the `P` runs are single pixels).
1. [MINOR] grapeshot (2,4),(4,3): two lone `P` pixels on the cloth cap are not adjacent. Fix: keep (4,3) only, or `C` at (2,4).
2. [MINOR] grapeshot (1,5)-(13,14): only rows 2-4 are cloth, so the shot reads partly as a bunch of grapes in a cloth cap rather than a full bag. Fix (optional): add a `C`/`c` cloth edge between the lower shot columns at (5,8),(11,8). Not required.
3. [MINOR] grapeshot (12,4): `c` shadow is the only dark cloth pixel. Fix: none needed.

## heated-shot: FAIL
Round 1: #1 not fixed. #2 mostly fixed (the highlight is now a blob `YYQ`/`QQQ` at (3,4)-(6,5)). #3 fixed (the circle steps 6-8-10-12).
1. [MAJOR] heated-shot (2,2)-(13,13): it is still a plain red sphere with a glossy orange top-left highlight, so it reads as a tomato or an apple (the sheet 1x thumbnail looks like a red apple), not red-hot iron. The only iron is three `m` pixels at (11,8),(11,9),(10,10), which read as a dark slit inside the `R` shading, not a crust. Fix: draw the body as `e` and `R` (lower right) with a thick `m`/`M` iron crust on the lower right: replace (12,7)-(12,9),(11,10),(11,11),(10,11) with `m` and (9,11),(8,12) with `M`. Put a `Q` and `Y` glow (as now) at the upper left. This makes the glow read as heat in an iron ball.
2. [MINOR] heated-shot (12,3)-(13,4): the outline is 2 px thick on the right (`kk` at (12,4),(13,4),(12,5),(13,5)) but 1 px on the left, so the circle is slightly lopsided. Fix: make row 4 `k` at (12,4) only and row 5 `k` at (13,5) only, or add the matching `k` on the left.

## pistol-shot: FAIL
Round 1: #2 fixed (`J` and `j`). #3 partly fixed (a single 2 px drawstring `ff` at x6-7). #1 not fixed.
1. [MAJOR] pistol-shot (8,9)-(14,12): the lead balls are still an amorphous clump of 1-2 px `N`/`n`/`M`/`m` pieces: (11,10),(12,10); (9,11),(10,11),(11,11); (9,12),(10,12),(11,12); and a 1 px wide column at (13,11),(13,12) between `k` at x12 and x14. There are no recognisable round balls, and `kk` at (9,10),(10,10),(13,10),(14,10) and `kkk` at (12,9)-(14,9) cut the pouch right wall. Fix: restore the pouch outline down the right at (12,9)-(12,11),(11,12)..., and draw 3 separate 3 x 3 balls tumbling out at the lower right: ball 1 at x8-10 rows 11-13, ball 2 at x11-13 rows 12-14, ball 3 at x10-12 rows 9-11 on top. Each is `N` top-left, `n` centre, `M`/`m` bottom-right, `k` outline.
2. [MAJOR] pistol-shot (3,5)-(11,12): the pouch is a flat `J` mass with `j` only on the bottom row (3,12)-(7,12) and (11,9). It reads as a brown sack or a pot of dirt, with no gathered neck. The drawstring is a 2 px stick (6,2)-(7,4). Fix: add a gathered neck: rows 4-5 narrow to 4 px (x6-9), a `f` 4 px tie at (6,4)-(9,4), with `J`/`j` folds at (5,6),(9,7) so the neck pinches.
3. [MINOR] pistol-shot (12,5)-(14,9): the right side of the pouch has a `jkkk` step (11,9),(12,9),(13,9),(14,9). Fix: as in item 1.

## canvas: FAIL
Round 1: #2 fixed (the tie is `ff` at x9-10 on every row). #3 fixed (the right end is x14 on every row). #1 not fixed.
1. [MAJOR] canvas (1,3)-(6,11): the rolled end is still a flat rectangle with a lone `k` orphan at (3,7), so the sprite reads as a book, a folded sheet or a door rather than a rolled bolt. Both ends are square (rows 3 and 11 are straight `kkkkkkkkkkkk`), and the cap has no spiral. Fix: draw the left end as a circle (x1-6, rows 3-11, run lengths 2-4-6-6-6-6-6-4-2, with `k` outline). Inside it put a 2 ring spiral: `c` ring, `C` ring, `k` dot at (3,7) as the core, and `c` at (4,5),(5,6). Taper the top of the roll to show the cylinder: round the right end the same way.
2. [MAJOR] canvas (7,4)-(13,4): the top row is seven `P` (pure white), a flat bright stripe across the roll that reads as banding. The rest of the roll is a flat `C`/`c` block with no cylinder shading. Fix: make row 4 `C`, with `P` at only (8,4)-(9,4) as a highlight, and shade the lower row 10 as `c`; keep the base `C`.
3. [MINOR] canvas (9,5)-(10,10): the `ff` tie is low contrast against `C`. Fix: make it `f`/`D` at (10,10) as now, and add `D` at (9,5).

## rope: FAIL
Round 1: #2 fixed (the hole is rounded: 4, then 2, then 4 wide). #1 not fixed.
1. [MAJOR] rope (1,3)-(14,12): the coil is a single doughnut ring with 3 parallel tones (`F`, `f`, `D`) running down the left side (rows 5-10 at x2-4) and `D`, `f`, `D` on the right: banding that follows the outline, reading as a lifebuoy or a doughnut. Strand twist exists only at the top and bottom rows. Fix: draw 2 loops (an outer and a smaller inner one offset down-right) with diagonal 2 px `f`/`D` strand ticks across every part of the band, including the sides, and an `F` highlight only on the upper left (2,5)-(3,7).
2. [MAJOR] rope (11,11)-(14,13): the free end is a 2 px `ff` stub at (12,12),(13,12) inside `kkk` / `kkk` / `k` outlines, so it reads as a blob on the donut, not a loose end. Fix: draw the free end as a 2 row by 3 px `f`/`D` tail leaving the coil at the lower right, at (12,11)-(14,13), with a `D` fray pixel at the tip.

## tar: FAIL
Round 1: #1 partly fixed (the bucket now tapers x3-11 to x5-9, with one `N` band at row 10). #2 not fixed. #3 not fixed.
1. [MAJOR] tar (5,3)-(10,4): the brush is two separate pieces. The `D` handle ends at (9,4) on the right, while the `jj` bristles at (5,4),(6,4) sit 3 px to the left, capped by `kk` at (5,3),(6,3). They are not connected, so it is a stick and a loose smudge. Fix: draw one diagonal brush: handle `D` from (10,1) to (8,3) (1-1-1), then a `j` bristle head 2 x 3 at (6,3)-(7,5) resting in the tar, with `k` around it.
2. [MAJOR] tar (3,4)-(11,6): the tar surface is `m` (#2c2f36) inside `k` (#1b1220), so the near-black top is a void, and nothing says "tar" or "liquid". The rim is 4 rows tall (rows 4-7) with `M` ears at (2,5),(2,6),(12,5),(12,6) that read as pot handles, not a bucket bail. Fix: make the surface `m` with a `M` highlight at (5,5),(6,5) and a `N` glint at (5,6), and replace the ears with a bail: `M` arc from (2,5) up over to (12,5) through (4,3)-(10,3) (steps 1-1-1).
3. [MINOR] tar (9,1)-(11,4): the handle steps 2-1-1 wide (`DD`, `D`, `D`) with `kk` at (10,1),(11,1). Fix: make it a 1 px `D` diagonal, as in item 1.
4. [MINOR] tar (4,8)-(10,12): the `V`/`v` bucket staves are 1 px shade with `w` at the right edge (mild banding). Fix: use `V` and `w` only.
