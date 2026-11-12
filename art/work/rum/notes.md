# rum (icons, 8 x 8, fixed)

Clay jug of rum, stopped with a cork, handle on the right. Fills the full 8 x 8: body cols 0-5, handle cols 5-7, cork top on row 0, base on row 7.

## Shape
- **Body** (rows 3-6, 4 px wide inside a 1 px `k` outline): the round belly of the jug. Corners are cut on the outline (rows 2->3 and 6->7) so it reads as round, not as a box. Left/right outline is exactly symmetric about the neck.
- **Neck** (row 2, 2 px wide): centred on the body, so the shoulder steps out evenly by 1 px on each side (clean 1-1 diagonal).
- **Cork** (row 1, 2 px, outlined by row 0 and the sides): same width as the neck mouth, in the wood ramp (`v` lit left, `W` shaded right). It is darker than the clay on purpose so the plug separates from the neck in one glance, even at 1x.
- **Handle** (cols 5-7, rows 2-5): a D-shaped ear running from the neck down to the shoulder. Filled with clay (`D` top, `d` bottom, since it is on the shadow side) rather than drawn as a bare outline loop, because a hole or a 1 px `k` loop disappears against the dark inventory slot (`K`). The body's own right outline (col 5) is the interior line that keeps handle and body from merging.

## Material and light (top left)
- Clay uses the sand/tan ramp, three tones: `f` highlight, `D` base, `d` shadow. Outline `k`.
- Highlight `f` on the lit left edge of the neck and belly (2,2), (3,1), (4,1).
- One `F` glint at (3,2): the glaze catching the light on the upper-left of the belly. It is the single bright point that says "glazed clay", deliberate, touching the `f` highlight.
- Shadow `d` on the right and bottom of the belly: (4,4), (5,4), (6,3), (6,4), and the lower half of the handle.
- No texture, no label, no "XXX": the silhouette (corked round jug with an ear handle) already says rum jug.

## Notes for the rest of the icon set
- 1 px `k` outline around the whole silhouette, interior `k` only where two shapes meet (body/handle, cork/outline).
- Two to three tones per material, light top left, one optional glint pixel for shiny materials.
- Object fills the square edge to edge where its shape allows.
