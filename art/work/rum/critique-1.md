FAIL
Round 1. Grid reviewed (x,y, 0-based):
```
..kk....   y0
.kvWk...   y1
.kfDkkk.   y2
kfFDDkDk   y3
kfDDdkdk   y4
kDDDdkk.   y5
kDDddk..   y6
.kkkk...   y7
```
No approved icon family exists yet (only deck-planks, a ship family), so this icon sets the standard for all 80 and is held to STYLE.md strictly.

What works: 1 px `k` outline, light from top left, symmetric neck/shoulder steps, cork separated from the clay, transparent background, exact 8 x 8, fills the square. No orphans, no banding, no dithering.

1. [MAJOR] rum (2,3),(1,3),(1,4),(2,2),(4,4): clay uses four tones, `F f D d`. STYLE.md allows at most 3 per material, and the notes call `F` a "glint" but it is a full fourth tone, not a deliberate single point: it sits in a 2 x 2 lump of light (`f` at (1,3), `F` at (2,3), `f` at (1,4), `f` at (2,2)) that reads as a muddy blob, not a glaze highlight. Fix: set (2,3) `F` -> `f`, and (1,4) `f` -> `D`. Clay is then `f D d` only, with the highlight as an L on the upper-left: (2,2), (1,3), (2,3).

2. [MAJOR] rum handle (5..7, 2..5): the handle is only two clay pixels, (6,3) `D` and (6,4) `d`, in a box of `k`. In silhouette it is a 2 x 4 lump stuck on the right, plus a flat 3 px `k` shelf along row 2 (cols 4-6) that extends the neck sideways. It reads as a bulge or a teapot spout, not an ear handle, and the handle is the one thing that separates "jug" from "pot" at 8 px. It also never touches the neck: it attaches below the shoulder, where a jug handle springs from the neck. Fix: spring it from the neck and make it three rows tall. Rows 1-3 become `.kvWkk..`, `.kfDkDk.`, `kfDDDkDk` (adds `k` at (5,1), `D` at (5,2), `k` at (6,2), `D` at (4,3), and (5,3) stays the `k` body wall). Keep (6,3) `D`, (6,4) `d`, and the bottom `k` at (5,5),(6,5). The ear then runs (5,2) -> (6,3) -> (6,4) as a visible curve.

3. [MINOR] rum body (0..5, 3..6): the belly is a rectangle with only the bottom corners cut ((0,7) and (5,7) empty), and the top corners are square ((0,3) is `k`, full width right under the shoulder). It reads boxy (a jar) rather than round. Fix: after the handle change, also clear (0,3)'s square look by making row 3 `.kffDkDk`-style is not possible at this size, so instead leave (0,3) `k` and make (0,6) transparent and (1,6) `k`, with row 6 `.kDDdk..`, giving a 1-px chamfer at both lower corners. Row 7 stays `.kkkk...`.

4. [MINOR] rum cork (2,1),(3,1): `v`, `W` and the clay `D` are all in the hull-wood swap set (`V v W w D`). STYLE.md says swap characters must not appear elsewhere in the same sprite. This sprite is not a hull, so nothing breaks today, but a blanket recolour would turn the jug brown-red. Also `v` (#93633a) is almost the same value as clay `D` (#8a663e), so the cork's lit pixel is not distinct from the body. Fix: use the leather ramp for the cork, (2,1) `J`, (3,1) `j`, which is clearly darker than the clay.

5. [MINOR] rum outline on slot: outline `k` (#1b1220) on the inventory slot `K` (#3a2a3a) is very low contrast, so the outline nearly disappears and the silhouette is carried by the fill. That is acceptable, but it is a set-wide rule: every icon fill must stay lighter than `K` along its edge. Keep that in mind for dark items.

6. [MINOR] notes.md: the coordinates in "Material and light" are given as (y,x) and do not match the grid (for example, "glint at (3,2)" is actually (2,3)). Fix: restate them as (x,y) after the edits so later icons copy the convention correctly.

Totals: 0 blockers, 2 majors, 4 minors.
