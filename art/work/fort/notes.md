# fort notes
- Stone uses t/T/u with k outline everywhere; courses are 3 stone rows (u lip, T, T) plus a t mortar row, with joint pixels in t. Tiling pieces (wall-front, wall-back, wall-side) have no left/right (or top/bottom for side) outline so they join seamlessly.
- Battlements: 3 px merlons (k fill k) with 1 px crenel, period 4, rows 0-3 on wall-front, wall-back, gate. Tower merlons are 4 px wide (symmetric 4-1-4-1-4). Gate starts and ends with a crenel gap (symmetric), so beside a wall tile one join shows a 2 px gap.
- Tower: 2x4 arrow slit centred in the front face.
- Gate: arched opening 6 px interior wide, wooden double doors (W/w seam) with an iron band (M), doors reach the bottom outline.
- Wall-side: walkway seen from above, parapets u (lit) and t (shadow) each side, floor T, a gap/joint row every 4 rows.
- Wall-back: inside face of the back wall, same merlons and course 1 as front but only 7 px tall.
- Flagpole: 1 px wood pole with outline, 3x3 flag in B (fort flag swap colour, used nowhere else).
- Crates: two crates on the bottom sharing an outline column, one crate on top, wood V/W/w.

## Batch round 1
1. Tower re-cut for real in art/src/fort.txt (earlier notes had claimed this without applying it). Bottom-aligned with wall-front and gate: mortar rows 5/9/13, u/T/T courses at rows 6-8, 10-12, 14-16 (full bottom course above the row 17 outline), partial T row 4 under the row 3 line. Arrow slit stays 2x4 on cols 6-7, rows 6-9. Vertical joints 4 px apart, staggered between courses.
2. Tower merlons stay 4 px wide: a 14 px tower cannot hold the 3-1 period symmetrically (accepted).
3. Joints now on a 4 px cadence (see 1).
4. Gate begins and ends in a crenel and its centre merlon is 4 px, so the assembler should start the wall tile phase so both joins look alike (one side shows a 2 px notch, the other 1 px).
5. Gate door stays 6 px of wood; the 12 px canvas with a 4 row battlement allows no more.
6. Wall-back row 3 is now `uuut`, matching wall-front.
7. Wall-back merlon stays 2 rows (inside face).
8. Wall-side row 3 is now `kttttk`, joint spans the walkway.
9. Crates left as is (optional).
