# island-2 review, round 1

Set-level notes: outline (1 px k, none on dock-planks), top-left light, swap-colour use (e R r roofs, C c plaster) and level of detail are consistent across the batch and match house-cottage and the approved wood tones. Sizes all match spec (dock is 15 tall vs 14, within 1 px and flexible). Weak points are the tavern sign, the dock piles and the tower legs.

## warehouse: PASS
Minor notes (not blocking):
1. [MINOR] warehouse (66,2)-(66,11): the roof right edge is plain R, while house-cottage carries an `r` shade column down the right slope. Fix: replace the R at the end of each slope row 2-11 (the pixel left of the outline k) with `r`, to match house-cottage lighting.
2. [MINOR] warehouse (4,22) and (54,22): the sill rows `V` are 10 px wide under 8 px windows. This matches the cottage and tavern convention, so leave it unless the whole set changes.

## private-dock: FAIL
1. [MAJOR] private-dock (3,13)-(36,14): the pile legs are one row of `VW` plus the outline, so the jetty reads as a bench or sofa with ears rather than a pier standing in water. Fix: make the sprite 18 tall by repeating the pile rows `...kVWk` 4 more times (rows 13-16) on each of the three piles, with the `kkkk` cap on the new last row (17), so the legs are about 5 px visible.
2. [MINOR] private-dock (3,0)-(6,3) and (33,0)-(36,3): the mooring posts are plain 2 px bars with no cap or rope. Fix: add a `W` row cap at (4,1)-(5,1), or accept as is, but do not add more detail than that.

## watchtower: FAIL
1. [MAJOR] watchtower (3,21)/(4,21) left leg and mirror (21,21)-(23,21) right leg: the legs are 2 px wide down to row 20, then bulge to 3 px (`kWVWk`, W-V-W is pillow shading on a 3 px leg) at row 21, which looks like a knot. The splay steps also run 2,7,5,4,3 rows (x = 4,3,2,1,0), so the legs bow instead of leaning straight. The notes claim 1 px every 5 rows, which is not what the grid does. Fix: rebuild both legs as a straight 2 px wide lean, 1 px outward every 4 rows from row 19 (x = 4 for rows 19-22, 3 for 23-26, 2 for 27-30, 1 for 31-34, 0 for 35-39), keep V on the left px and W on the right px (mirrored shade on the right leg), and remove the extra W at (4,21) and (6,21), plus their mirrors.
2. [MAJOR] watchtower (6,24)-(8,26), (19,24)-(21,26) and the X centre (10,25)-(17,29): the enclosed gaps between leg and brace fill with solid 2x2 and 2x3 blocks of `k`, which read as black blobs. The brace is also 4 to 6 px thick near the centre against 2 px legs. Fix: make the braces a clean 2 px diagonal at 1-1-1 steps (leg top inside corner at (7,22) to the centre at (13,27), mirrored), and leave 3 px wide open gaps so the outline is a 1 px line round the transparent hole, not a filled block.
3. [MINOR] watchtower (6,9)-(21,13): the cabin interior is a flat 22x5 slab of `K` with no rail or post detail, reads as a dark window. Fix: add 1 px `W` vertical balusters at x = 9, 13, 14 and 18 in rows 11-13, or lighten with `K`/`k` rail top row.

## tavern: FAIL
1. [MAJOR] tavern (6,52)-(19,61): the hanging sign hangs 10 px tall and its bottom `k` row (61) lands on the base outline (row 62), so it sits on the floor like a crate and is wider than the captain. A hanging sign needs air beneath it. Fix: shrink the sign to 12 x 8 (cols 7-18, rows 52-59: k outline, `y` body, `O` right and bottom shade, mug 6 wide x 4 tall), and fill rows 60-61 below with `C`, so 2 px of wall shows under it.
2. [MINOR] tavern (1,46)-(21,49): the bracket arm is a 4 row thick two-tone beam that starts flush at the wall outline, so it reads as a shelf or awning. Fix: make it 2 rows (row 46 `k`, row 47 `v`... or one `V` row plus `k` under it) and end it at x = 19 over the sign chains at x = 8 and x = 17.
3. [MINOR] tavern (35,44)-(46,61): the door has a 1 px `V` left edge but a 2 px `ww` right edge (and the cottage door is 1 and 1). Fix: change the column at x = 41 in rows 46-61 from `w` to `W`, keeping x = 42 as `w`. The handle stays at (41,55) as `y`, so move it to (40,55).
4. [MINOR] tavern (2,44)-(47,44): the ground-floor wall has no `c` shadow row under the jetty beam, unlike under the eave at row 22. Fix: make row 44 `c`.
5. [MINOR] tavern (2,8)-(37,20): roof right slope has no `r` shade column (cottage has one). Fix: put `r` in the last pixel before the outline on each slope row.

## dock-planks: PASS
Minor notes (not blocking):
1. [MINOR] dock-planks (0,0)-(7,7): flat two-tone stripes, with no V light tone and no butt joints, so it is plainer than deck-planks. It is consistent with the earlier approved dock tile (same v / W seam every 4th row) and tiles cleanly on y, so it ships; consider a staggered butt joint only if the pier looks too striped in play.
