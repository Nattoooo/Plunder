# Review island-2, round 2

Families warehouse and tavern passed in round 1 and are not listed again. Re-reviewed private-dock and watchtower against `art/src/*.txt` and sheet-1.png.

## private-dock: FAIL
Round-1 check: issue 1 (muddy end clusters) fixed, posts are now clean 4 px shapes with a 2 px interior. Issue 2 (uneven seams) fixed, the x6/x13 seams are gone, but a new isolated mark replaced them (see 2). Issue 3 (reads as a log/bench) NOT fixed: the deck is now 3 rows deep but still a solid slab with two stubs.
1. [MAJOR] private-dock (0,0)-(19,7): silhouette still reads as a chest or bench, not a jetty. A jetty is a deck raised on piles over water; here the front face `w` row 6 sits directly on the bottom `k` row 7 as a solid block, and the posts are only 2 rows tall (rows 0-1) above the `k` line in row 2. Fix: keep rows 0-4 as they are, make row 5 the `w` front face (x1-18) with its `k` underside at row 6, and drop 2 px wide piles `kwk`/`kwk` to row 7 at x3-5, x9-11 and x14-16 (row 6 and 7 transparent elsewhere, so light shows between the piles). Silhouette then shows deck + posts + legs. Size stays 20x8.
2. [MAJOR] private-dock (9,5)-(10,5): the 2 px `ww` mark in the middle of the lowest plank row is an arbitrary detail (reads as a keyhole or dent on a bench), not a plank seam. Fix: delete it (make (9,5),(10,5) `v`), or replace with a full-height seam `v` at (9,4) and `w` at (9,5) spanning both lower rows.
3. [MINOR] private-dock (15,1),(16,1),(15,2),(16,2): the right post is `v` left / `V` right, so its lit side is on the right, against the top-left light. Fix: swap to `V` at x15 and `v` at x16 in rows 1 and 2, and the same as the left post for the cap row.
4. [MINOR] private-dock: sprite is 20x8 against spec 20x7. Within the 1 px tolerance and the size is flexible, so accepted.

## watchtower: FAIL
Round-1 check: issue 3 (double black band under the eave) fixed, row 5 is `w`. Issue 4 (low-contrast braces) fixed, diagonals are `v`. Issue 1 (bullseye): diagonals are now true 1 px (the 2x2 crossing is inherent), but the arms float free of the legs so the shape still reads as a diamond in sheet-1.png. Issue 2 (unfinished bays) NOT fixed: the row 17 bar is gone but the X stops at row 16, leaving empty rows 17-18 above the row 19 bar.
1. [MAJOR] watchtower (4,16)-(9,18): the X ends at (5,16) and (8,16), one px short of the legs (x4 and x9 are transparent at row 16) and two empty rows above the bottom bar at row 19. The bracing floats and the lower bay is unfinished. Fix: set (4,16) and (9,16) to `v` so the diagonals touch the legs, and move the bottom bar from row 19 to row 17 (row 17 x4-9 `wwwwww`), leaving rows 18-19 as plain legs.
2. [MINOR] watchtower (6,14)-(7,15): the 2x2 `vv` crossing is inherent to the even 4 px brace width and matches the round-1 direction, so it is accepted; it reads as an X at 1x once the arms reach the legs (issue 1). Fix if redrawing: none required.
3. [MINOR] watchtower legs (rows 16-19): the splay steps 5 rows at x2, 3 rows at x1, 1 row at x0, which is uneven. Fix: 3-3-2 rows (x2 rows 11-13... ) or hold the leg straight to row 17 and step once (x1) rows 18-19.
4. [MINOR] watchtower roof (2,3)-(11,3): the top-left `e` at (2,3) is a single lit pixel on a 10 px row; consistent with the batch roofs, accepted.
