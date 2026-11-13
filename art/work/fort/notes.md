# fort notes
- Stone uses t/T/u with k outline everywhere; courses are 3 stone rows (u lip, T, T) plus a t mortar row, with joint pixels in t. Tiling pieces (wall-front, wall-back, wall-side) have no left/right (or top/bottom for side) outline so they join seamlessly.
- Battlements: 3 px merlons (k fill k) with 1 px crenel, period 4, rows 0-3 on wall-front, wall-back, gate. Tower merlons are 4 px wide (symmetric 4-1-4-1-4). Gate starts and ends with a crenel gap (symmetric), so beside a wall tile one join shows a 2 px gap.
- Tower: 2x4 arrow slit centred in the front face.
- Gate: arched opening 6 px interior wide, wooden double doors (W/w seam) with an iron band (M), doors reach the bottom outline.
- Wall-side: walkway seen from above, parapets u (lit) and t (shadow) each side, floor T, a gap/joint row every 4 rows.
- Wall-back: inside face of the back wall, same merlons and course 1 as front but only 7 px tall.
- Flagpole: 1 px wood pole with outline, 3x3 flag in B (fort flag swap colour, used nowhere else).
- Crates: two crates on the bottom sharing an outline column, one crate on top, wood V/W/w.

## Current batch revision
Aligned tower courses to bottom-aligned wall-front and gate: mortar rows 5/9/13, lit course starts 6/10/14, and a complete u/T/T bottom course above row 17 outline. Arrow slit stays a centred 2 x 4 opening at rows 6–9. Vertical joints use a four-pixel cadence, staggered between courses. Back-wall lit lip now includes its mortar joint. Side-wall cross joint spans its walkway cleanly. Existing 14 px tower merlon rhythm and gate join-phase asymmetry are retained as previously accepted; a gate begins/ends in a crenel and therefore one wall join has a two-pixel notch. All seven fixed canvases remain exact.
