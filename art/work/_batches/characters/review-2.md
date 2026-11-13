# Batch `characters`, review round 2

Read: review-1.md first, STYLE.md, CRITIC.md, brief.md, sheet-1.png, the grids in art/src (captain, skeleton, gull, sea-serpent) and the door grids of house-cottage, house-long, house-shutters, house-townhouse. Crab and wraith passed in round 1 and are not listed again.

Set-level notes: outline is a consistent 1 px `k`, palette characters are all legal, light is top left throughout, and the four remaining families now share the same chunky level of detail. Skeleton (7 x 9) is the same size as the captain, so the scale break from round 1 is gone for it.

## captain: FAIL
Round 1 check: issue 2 (tricorn corners and gold) fixed; issue 3 (forehead row, eyes at (2,4),(4,4)) fixed; issue 4 (side hat) fixed; issue 5 (hair speckle, queue at (3,5)) fixed; issue 6 accepted; issue 7 (single heel (2,8), toe pair (4,8),(5,8)) fixed. Issue 1 is NOT fixed.
1. [MAJOR] all 8 sprites, scale (round 1 issue 1, still open): the captain is 7 px wide (5 px interior) but every door is still 4 px wide: house-cottage cols 8-11 (`wWWW` between `C` walls), house-shutters and house-townhouse `wwww` at cols 8-11, house-long `wwww` at cols 12-15. STYLE.md says a door fits the captain; he is still nearly twice the door. Nothing in the repo changed these grids. Do not shrink the captain. Fix: widen the door in house-cottage, house-long, house-shutters, house-townhouse (and any other door-bearing building) to 6 px, and re-review those families. The captain family passes as soon as that is done; the sprites themselves need no change.
2. [MINOR] captain-side-1/2 row 0 `kk..kk.`: the rear hat corner at (0..1,0) is detached from the front corner by a 2 px gap, which at 1x reads slightly as ears. Matches the front/back hat logic, so keep.
3. [MINOR] captain-down-2/3 (3,7): the lifted-leg trouser is a single `b` plus a boot. Accepted in round 1; keep.

## skeleton: PASS
Round 1 check: issue 1 (scale) fixed, now 7 x 9 like the captain; issue 2 (dithered ribs) fixed, ribs are one `K` bar on row 5; issue 3 (arm columns) fixed, arms merge into a solid 5 px torso with `k` only outside; issue 4 (trailing leg) fixed, both legs have `x` on row 7 and a `k` foot on row 8; issue 5 (teeth) not done, minor.
Reads at 1x as a pale figure with a red bandana and dark sockets on both backgrounds. Frames differ only in row 8 (feet).
1. [MINOR] skeleton-1/2 (2..4,3): the jaw row `xxX` has no teeth and the skull joins the shoulders (row 4) with no neck line, so head and torso read as one bone mass. Optional: `kxkxk`-free teeth are not wanted; leave.
2. [MINOR] skeleton-1/2 row 7 `.kxkxk.`: legs are one bone row and a foot row, stubby but in line with the captain's legs.

## gull: PASS
Round 1 check: issue 1 (outline) fixed by cutting to 5 x 3, exactly the grids I gave (`..y..` / `.uPu.` / `.PPU.` and `..y..` / `uPPPu` / `.PPU.`), which uses the 3 px exemption; issue 2 accepted; issue 3 (notes) only partly fixed, see below.
Reads as a small white bird with a yellow beak on green and sand; the two frames differ only in the wings.
1. [MINOR] art/work/gull/notes.md still holds several contradictory older sections (5 x 4, 6 x 3, `C` shading) above the last line that matches the grid. Tidy the notes so they describe only the 5 x 3 drawing.

## sea-serpent: PASS
Round 1 check: issue 1 (head) fixed, rows 2-4 are `kIiikkk.` / `kiiiRRR.` / `kiiikkk.`, symmetric top to bottom with a one-row red mouth bracketed by jaw edges; issue 2 (tail notch) fixed, row 2 is `..kqk` so the fork is 2 px deep; issues 3 and 4 accepted.
Eyes `y` at (2,1) and (2,5) are symmetric, segments step down 6, 5, 4 px, the `q` fin sits on the spine in every segment and the head faces right. Reads as a serpent chain on both backgrounds.
1. [MINOR] serpent-tail (3,2): the stem is a single `q` pixel between two `k`, so the join to body-3 is orange rather than teal. Acceptable as the dorsal fin continuing; check the join in game.
2. [MINOR] serpent-body-1/2/3: closed-outline discs read as beads. Accepted in round 1.
3. [MINOR] art/work/sea-serpent/notes.md still describes an 8 x 6 head and a 5 x 5 tail that no longer match the grids (8 x 7 and 5 x 5 with the fixed rows). Update.
