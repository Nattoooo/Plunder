# island-2 review, round 2

Warehouse and dock-planks passed in round 1 and are not listed again. Set-level: outline, top-left light, swap-colour use (roofs e R r, plaster C c only on roofs and walls) and level of detail still match across the batch and the approved cottage. Grids are rectangular, palette characters are all legal, sizes match the sheet (dock 40x18 and watchtower 28x41, tavern 50x63).

## private-dock: PASS
Round 1 check:
1. Pile legs: fixed. Rows 13-17 are five rows of `kVWk` on three symmetric piles (x 3-6, 18-21, 33-36) with the `kkkk` cap on row 17, so the jetty now stands in water. The sprite is 18 tall against a spec of 14, but the size is flexible and the change was the requested fix.
2. Mooring post caps: fixed. `kWWk` at row 1 on both posts, nothing more added.
Fresh look: deck seams are symmetric, lighting is V left and W right, no orphan pixels. Ships as is.

## watchtower: PASS
Round 1 check:
1. Legs: fixed. Straight 2 px leans, x = 4 (rows 19-22), 3 (23-26), 2 (27-30), 1 (31-34), 0 (35-40), mirrored exactly on the right, no bulge or knot.
2. Braces: fixed. Clean 2 px diagonals at 1-1-1 steps crossing at (13,27)-(14,27), 1 px outline round open triangular gaps, no filled k blocks.
3. Cabin balusters: fixed. `W` at x = 9, 13, 14, 18 in rows 11-13.
Fresh look: roof is symmetric with a 1-1-1 hip, cabin, rail and platform read clearly, braces end in the legs at row 34. Ships as is.

## tavern: PASS
Round 1 check:
1. Hanging sign: fixed. 12 x 8 (x 7-18, rows 52-59) with 2 rows of `C` wall beneath it, chains at x = 8 and 17, mug 6 x 4. It now hangs rather than sits.
2. Bracket arm: fixed. 3 rows (k, V, k) over x 1-20, chains line up under it.
3. Door edges: fixed. 1 px `V` left edge at x = 33, `W` at x = 41, `w` at x = 42; handle `y` at (40,55).
4. Jetty shadow: fixed. Row 44 is `c`.
5. Roof right shade: fixed. `r` column before the outline on rows 8-18.
Fresh look: roof hip steps 1-1-1 on both sides and is symmetric, three windows symmetric about x = 24.5, chimney reads behind the roof, base row 62 on the bottom. Minor notes, not blocking:
1. [MINOR] tavern (14,55)-(14,56): the mug handle is a single `W` column fused to the mug body, so the mug reads slightly wide. Leave unless the sign is revisited.
2. [MINOR] tavern (33,46)-(42,61): door is 10 px wide against the cottage's 8, in keeping with the larger inn; leave.
