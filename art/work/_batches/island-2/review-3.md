# Review island-2, round 3

Families warehouse and tavern passed in round 1 and are not listed again. Re-reviewed private-dock and watchtower against `art/src/*.txt` and sheet-1.png.

## private-dock: FAIL
Round-2 check: issue 2 (`ww` mark) fixed, row 5 is clean `w`. Issue 3 (right post lit on the wrong side) fixed, V at x15, v at x16. Issue 1 (still a bench) NOT fixed: row 6 is still a solid `k` line across x0-19 (`kkkkwkkkkkwkkkkwkkkk`), so the "piles" are only a 1 px row of `k` at row 7 under it. Nothing is open between them, and the silhouette is a slab with small feet. Round 1/2 direction asked for light to show between piles.
1. [MAJOR] private-dock (1,6)-(18,7): silhouette still reads as a bench/chest with feet, not a jetty on piles. Fix: make row 6 transparent everywhere except the three piles (x3-5, x9-11, x14-16 as `kwk`), keep row 5 `w` front face with `k` only at x0 and x19, and keep row 7 `kkk` under each pile, so water shows between the piles.
2. [MAJOR] private-dock (4,6),(10,6),(15,6): single `w` pixels inside a `k` run read as noise/orphans (dots in the black line), and the pile is only 1 row of `kkk` beneath. Fix: with the piles opened per issue 1, make each pile `kwk` over two rows (rows 6 and 7 both `kwk` at x3-5, x9-11, x14-16) so the `w` is a 2 px post core, not a speck.
3. [MINOR] private-dock (9,6)-(11,7): the middle pile is 3 px wide at x9-11, 0.5 px off the sprite centre (centre is x9.5). Fix: make the middle pile 2 px (`kk` at x9-10, row 6 and 7) or 4 px (`kwwk` at x8-11) so it is symmetric.
4. [MINOR] private-dock (3,1)-(4,1): left post is `VV` (both lit) while the right is `Vv`. Fix: make left `Vv` at x3-4, rows 1 and 2, to match the right post.

## watchtower: FAIL
Round-2 check: issue 1 partly fixed, (4,16)/(9,16) now `v` and the bottom bar moved to row 17, so the bay is finished; the splay (issue 3) is now 5/2/2 and accepted. Issue 2 (2x2 crossing) accepted. But the X is still malformed and the sheet still shows a ring at 1x.
1. [MAJOR] watchtower (4,13)-(9,16): the brace arms are not symmetric top to bottom. Row 13 has 1 px arms at x5 and x8, rows 14-15 the 2x2 `vv` at x6-7, but row 16 has 2 px arms at x4-5 and x8-9, so the lower half is a thick wedge and the shape reads as an hourglass/ring, not a crossed X. Fix: in row 16 set x4 and x9 to `.`, leaving single `v` at x5 and x8, so the arms mirror row 13 and land on the row 17 bar (x4-9), which already touches both legs.
2. [MINOR] watchtower (2,18)-(1,20): feet step out by 1 px per leg at rows 18-19 (x1) then `kkk` at row 20 (x0-2). Accepted as the final splay step; no change required.
3. [MINOR] watchtower (4,12)-(9,12): the top bar `wwww` at row 12 is the same colour as the X's neighbouring leg `k` gaps and is low contrast. Accepted, consistent with the bar at row 17.

## Set notes
warehouse and tavern remain the reference for outline, light and roof treatment. Dock and tower still carry the weakest craft in the batch.
