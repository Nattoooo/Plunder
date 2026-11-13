# Review round 2: batch fort

Round 1 issues, checked against art/src/fort.txt:
1. Crates double outline: fixed. Row 7 and the x7 column (rows 8-12) are single `k` lines.
2. Crates top face: fixed. Top crate has F/V lid (rows 1-2), the lower crates show F/V lids at x1-2 and x12-13 (rows 5-6). Small but they read as lids at 1x.
3. Crates seam banding: fixed. One `w` seam row between `W` planks, `k` base directly under `W`.
4. Tower crenel gaps: fixed. K fill at x8-9 and x18-19, rows 3-4.
5. Arrow slit: partly fixed. Cap, K/k columns and the dark recess read well, but see minor 1 below (slit is now 9 rows).
6. Brick joint breaks in the `u` rows: fixed in tower and gate; mostly fixed in wall-front (see minor 3).
7. Wall-front 5-row top course: accepted as the tower shares it and courses align from the bottom.
8. Gate door seam: fixed. `kk` starts at row 9.
9. Gate right leaf light: fixed as directed (x15-18 `w`).
10. Wall-side joint: fixed. Mortar row 3 added, joint sits in a 3-row course.

Set notes: all 7 sprites match spec size exactly. Palette is clean, B only in the flagpole. Outline, top-left light and the 6-row crown are consistent. Courses align from the bottom across tower, wall-front and gate. Style matches approved.png (flat tones, 1 px k outline).

## fort: PASS
Remaining minor notes (do not block):
1. [MINOR] fort-tower (13,23),(14,23): the slit is 9 rows, not 2x8. Row 22 `kk` (mortar row) plus row 23 `kk` gives a 2 px thick base against the 1 px cap at row 15. Fix: set (13,23) and (14,23) to `u` and `T` to match the neighbouring course row (`kuuuuuuTuuuuuuuTuuuuuuuTuutk`), leaving the slit rows 15-22.
2. [MINOR] fort-gate (8,3)-(9,4),(18,3)-(19,4): crenel gaps x8-9 and x18-19, rows 3-4, are transparent while the tower's equivalent gaps are `K`. Fix: fill (8,3),(9,3),(8,4),(9,4),(18,3),(19,3),(18,4),(19,4) with `K` in the gate; optionally also (6,3),(7,3),(6,4),(7,4) in wall-front and wall-back, for a consistent set.
3. [MINOR] fort-wall-front (7,11),(7,19) and fort-wall-back (3,10): the `u` row above each vertical joint is not broken to `T`, unlike the tower and gate. Fix: set those pixels to `T`.
4. [MINOR] fort-crates (15,0)-(15,13): the artwork spans x0-14, leaving an empty column at x15, so the stack sits 1 px left of centre. Accepted because the symmetric shared divider needs an odd width; alternative is to shift nothing and leave as is.
5. [MINOR] fort-crates: the top crate (7 px interior) is wider than the two crates it sits on (6 px interior). Acceptable, but narrowing it by 1 would read more natural.
