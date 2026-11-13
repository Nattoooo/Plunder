# Batch fort, review round 1

Checked against STYLE.md, CRITIC.md (all 10 points), brief.md, approved.png, art/src/fort.txt, the shipped PNGs in art/sprites/buildings, work/fort/notes.md and sheet-1.png. Sizes match spec exactly (14x18, 4x12, 14x12, 6x4, 4x7, 6x12, 8x7). Palette is legal (t T u U k stone, M iron, V W w wood, B only on the flag). Light is top left, outline matches approved buildings, tiling pieces correctly have no outline on their tiling edges.

Process note: work/fort/notes.md ("Current batch revision") claims the tower courses were re-cut to mortar rows 5/9/13, the back-wall lip got its joint and the side-wall cross joint was changed. None of that is in art/src/fort.txt or the shipped PNGs (tower mortar is still on rows 7/11/15, wall-back row 3 is still `uuuu`, wall-side row 3 is still `kTttTk`). The sprites were judged as drawn, not as the notes describe. The notes must be corrected or the edits actually applied.

## fort: FAIL
1. [MAJOR] fort-tower (0,4)-(13,16): stone courses do not line up with wall-front and gate. Bottom-aligned (tower row = wall row + 6), the wall's mortar rows land on tower rows 13 and 9, but the tower's mortar rows are 7, 11 and 15, so the course lines jump by 2 px at every wall/tower join. The foot is also a stub: row 15 (`t`) then a single `T` row 16 with no `u` lip, unlike the full u/T/T course at the foot of wall-front and gate. Fix: re-cut rows 4-16 bottom-aligned, each course u lip, T, T, then t mortar: rows 14 u, 15 T, 16 T (full bottom course); row 13 t; rows 10 u, 11 T, 12 T; row 9 t; rows 6 u, 7 T, 8 T; row 5 t; row 4 T (partial course under the row 3 `k` line). Keep the 2x4 `kk` slit on cols 6-7, rows 6-9 (it now sits inside the row 6-8 course and the row 9 mortar). Space vertical joints 4 px apart, staggered between courses.
2. [MINOR] fort-tower (0,0)-(13,2): merlons are 4 px wide (`kuuk`) against 3 px (`kuk`) on wall-front, wall-back and gate. A 14 px tower cannot hold the 3-1 period symmetrically, so accepted. Fix: none.
3. [MINOR] fort-tower (4,4),(9,4),(3,8),(10,8): brick joints give 3-5 px bricks, walls use 4 px bricks. Fix: resolved by the re-cut in issue 1 (joints on a 4 px cadence).
4. [MINOR] fort-gate (0,0),(13,0): begins and ends with a crenel, so one join with a wall tile makes a 2 px notch and the other a 1 px notch; centre merlon (cols 5-8) is 4 px against 3 px. Unavoidable at 14 px; the assembler must start the wall tile phase so both joins look alike. Fix: document in notes.md.
5. [MINOR] fort-gate (3,5)-(10,10): door opening is 6 px of wood (7 with the arch) against "about 8 px". The 12 px canvas with a 4 row battlement cannot give more. Fix: none, do not shrink further.
6. [MINOR] fort-wall-back (0,3)-(3,3): `uuuu` has no joint pixel while the joint runs from row 4 down; wall-front has `uuut`. Fix: row 3 to `uuut`.
7. [MINOR] fort-wall-back (0,1)-(2,1): merlon is 2 rows against 3 on the front wall. Reads fine as the inside face. Fix: none required.
8. [MINOR] fort-wall-side (1,3)-(4,3): `kTttTk` reads as a loose grey smudge on a 6 px strip. Fix: row 3 to `kttttk` so the joint spans the walkway cleanly.
9. [MINOR] fort-crates (0,4)-(7,5): lower crates differ in width (interior 2 px vs 3 px, `VW` vs `VVW`), no slat or brace, and about 70 percent of the sprite is outline, so it reads as dark blocks. Fix: optional, add a `w` diagonal brace in each lower crate; the 8 px width does not allow equal crates with a shared outline column.

## Set-level notes
- Outline, light and level of detail are consistent across the seven pieces and fit approved house-long and shrine.
- fort-wall-front, fort-wall-back, fort-gate, fort-wall-side, fort-flagpole and fort-crates are acceptable individually, but the family fails as a set because the tower, the corner piece every wall meets, breaks the course rhythm. Fix issue 1 and the batch should pass round 2.
