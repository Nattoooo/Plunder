# rum (icons, 8 x 8, fixed)

Clay jug of rum, stopped with a cork, ear handle on the right. Fills the full 8 x 8: body x 0-5, handle x 5-7, cork top at y 0, base at y 7.

All coordinates are (x,y), 0-based, x to the right, y down.

```
..kk....   y0
.kJjkk..   y1
.kfDkDk.   y2
kffDDkDk   y3
kDDDdkdk   y4
kDDDdkk.   y5
kDDddk..   y6
.kkkk...   y7
```

## Shape
- **Body** (y 3-6, 4 px wide inside a 1 px `k` outline): the belly of the jug. Both lower corners are cut ((0,7) and (5,7) empty) so the base reads rounded; the shoulder steps in by 1 px on each side to the neck. Left and right walls are exactly symmetric about the neck.
- **Neck** (y 2, interior (2,2)-(3,2)): centred on the body.
- **Cork** (y 1, (2,1) `J`, (3,1) `j`, outlined by y 0 and the sides): leather ramp, clearly darker than the clay so the plug separates from the neck at 1x.
- **Handle** (x 5-7, y 1-5): an ear that springs from the neck at (5,2) and curves out and down through (6,3), (6,4) to rejoin the belly at (5,5)/(6,5). It is filled with clay (`D`, `D`, then `d` at the bottom on the shadow side) rather than drawn as a bare `k` loop, because a hole or 1 px `k` loop disappears against the dark inventory slot `K`. The body's right wall (5,3)-(5,4) is the interior line that keeps handle and belly apart.

## Material and light (top left)
- Clay: three tones only, `f` highlight, `D` base, `d` shadow. Outline `k`.
- Highlight `f` as an L on the upper left, where the light hits neck and shoulder: (2,2), (1,3), (2,3).
- Shadow `d` on the right and bottom of the belly: (4,4), (4,5), (3,6), (4,6), plus the bottom of the handle (6,4).
- No texture, no label, no "XXX": the silhouette (corked jug with an ear handle) already says rum jug.

## Rules this icon sets for the rest of the set
- 1 px `k` outline around the whole silhouette; interior `k` only where two shapes meet (body/handle, cork/neck walls).
- At most three tones per material, light top left: highlight on the upper-left, shadow on the lower-right.
- Every fill along the edge stays lighter than the slot colour `K`, so the silhouette reads on the dark inventory slot even though `k` on `K` is low contrast. Dark items (iron, leather) need their lightest tone on the edge facing the light.
- The object fills the square edge to edge where its shape allows.

## Round 1
1. [MAJOR] four clay tones / muddy highlight blob: fixed. (2,3) `F` -> `f` and (1,4) `f` -> `D`. Clay is now `f D d` only, highlight is the L (2,2), (1,3), (2,3).
2. [MAJOR] handle reads as a bulge, does not touch the neck: fixed as suggested. y1 `.kJjkk..`, y2 `.kfDkDk.`; the ear now springs from the neck at (5,2) and runs (5,2) -> (6,3) -> (6,4) back to the belly. (4,3) was already `D`; (5,3) stays the body wall. Preview confirms it now reads as a jug handle, not a spout.
3. [MINOR] boxy belly: not applied as written. The suggested y6 `.kDDdk..` chamfers only the left lower corner (the right wall stays at x 5), which would make a symmetric jug asymmetric, against STYLE.md "symmetric objects are exactly symmetric". Both lower corners are already cut at y 7, and rounding the top too would need the belly to be narrower at y 3 than at y 4, which at a 2 px neck leaves no shoulder at all. Kept the symmetric shape.
4. [MINOR] cork in hull-swap characters and too close to clay: fixed. Cork is now `J` / `j` (leather), clearly darker than the clay. Note: the clay base `D` is also in the hull-swap set; that set only applies to hull sprites and there is no alternative mid tan in the palette, so `D` stays for clay.
5. [MINOR] `k` outline low contrast on the `K` slot: acknowledged; added as a set-wide rule above (edge fills must stay lighter than `K`). All edge fills here (`f`, `D`, `d`, `J`) are lighter than `K`.
6. [MINOR] notes coordinates in (y,x): fixed. All coordinates are now (x,y) and match the grid above.
