# Batch fort, review round 2

Read review-1.md first. Checked STYLE.md, CRITIC.md (all 10 points), brief.md, approved.png, art/src/fort.txt, notes.md and sheet-1.png. Every shipped PNG in art/sprites/buildings was compared pixel for pixel with art/src/fort.txt: all seven match, sizes are exact, palette is legal (B only on the flag).

## Round 1 issues
1. fort-tower course alignment (MAJOR): FIXED. Mortar rows are now 5/9/13 and courses u/T/T at rows 6-8, 10-12, 14-16 with a full bottom course and a partial T row 4. Bottom-aligned (tower row = wall row + 6) they line up with wall-front (row 7 mortar = tower 13, row 4 u lip = tower 10, row 8 u lip = tower 14) and with the gate. Slit is 2x4 on cols 6-7, rows 6-9. Joints sit on a 4 px cadence and are staggered between courses.
2. Tower merlons 4 px: accepted, unchanged.
3. Tower brick joints: FIXED by the re-cut.
4. Gate crenel ends: now documented in notes.md. FIXED.
5. Gate door width: accepted, unchanged.
6. fort-wall-back row 3: FIXED (`uuut`).
7. fort-wall-back merlon 2 rows: accepted.
8. fort-wall-side row 3: FIXED (`kttttk`).
9. fort-crates: optional, left as is. See below.
Process note: notes.md now matches src and PNGs.

## fort: PASS
1. [MINOR] fort-crates (0,4)-(7,5): lower crates are unequal (interior `VW` 2 px against `VVW` 3 px), have no brace, and most of the sprite is outline. Accepted at 8 px wide, as in round 1. Fix: optional `w` diagonal brace in each lower crate.
2. [MINOR] fort-tower (6,6)-(7,9): the course joint spacing across the slit is 7 px (cols 4 and 11) on rows 6-8. It is hidden by the slit and reads fine. Fix: none.

Set-level: outline, top-left light, stone ramp use and level of detail are consistent across all seven pieces and sit with approved house-long and shrine. Tiling edges are open and the course rhythm now matches across wall, gate and tower.
