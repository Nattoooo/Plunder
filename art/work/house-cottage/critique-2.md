PASS

Round 2 re-review. I re-read src/house-cottage.txt, notes.md (including its Round 1 section) and the new preview (1x, 3x and the captain beside the door).

## Round 1 issues

1. [MAJOR] Roof banding: fixed. Rows 4-9 are now one flat `R` area, with an `e` left hip column, an `r` right hip column and a single `r` eave row (row 10). The banding is gone, and the 1x preview reads as a lit roof with shadow under the eaves.
2. [MINOR] `r` sliver beside the chimney: fixed. The sliver is gone. It has been replaced by a doubled outline, see issue 4 below.
3. [MINOR] Chimney too thin: fixed. The body is now `u u T` (x12-14, rows 2-4) under a 5 px cap (x11-15 on row 1, with `k` at x10 and x16). It reads as a stone chimney at 1x.
4. [MINOR] Windows too dark, 3 tones in 4 px: fixed. The pane is now `l l` over `B B`.
5. [MINOR] Sill flush with the frame: accepted. The artist's reason holds: widening it would close the plaster gaps to the wall outline and the door.
6. [MINOR] Squashed wall: fixed. The wall is now 11 rows plus the bottom outline, with 3 rows of plaster above the door and windows. The extra row (20 x 24) is explained in the notes and is within the flexible spec. The captain fits the door in the preview.
7. [MINOR] Notes inaccurate: fixed.

## Fresh review

Spec and craft are clean. All rows are 20 wide, the sprite stands on row 23 on a transparent background, and the wall, door and windows are exactly symmetric about x9.5. The palette is legal, and `e R r` and `C c` appear only on the roof and wall. Every material has 3 tones or fewer. Light comes from the top left (stone `u` left and `T` right, `e` left hip, `r` right hip and eaves, door jamb `w` on the left and top). The outline diagonal steps evenly (4,3,3,2,2,1,1,0,0). There are no orphan pixels apart from the knob at (10,19), which sits at hand height. The silhouette is clearly a hip-roofed cottage with a chimney. The door matches the captain's scale, and at 1x on green and sand the house reads well.

Minor notes only. None blocks shipping.

1. [MINOR] house-cottage (15..16, 2..4): the chimney's right outline (x15) and the roof's right outline (x16) sit side by side, which makes a 2 px thick black edge on rows 2-4 while the rest of the sprite has a 1 px outline. It is visible in the 3x preview as a heavy dark right side. Fix (optional): shift the whole chimney one pixel left (body x11-13, outline k10 and k14) and make the roof edge on rows 2-4 a single `k` at x15. That is too big a change to require now, so I would also accept leaving it.
2. [MINOR] notes.md, Roof section: it says the last roof pixel of every row is `r`, but on rows 3-4 the chimney replaces it. Fix: add "except rows 2-4, where the chimney sits".
3. [MINOR] house-cottage (3..6,15..18) and (13..16,15..18): the frame is still 12 of 16 pixels `k`. It reads cleanly in the preview and I accept it. If the windows are reused across other buildings, consider a `K` frame so the openings do not go heavier than the door.

Summary: 0 blockers, 0 majors, 3 minors. I would ship this as the building standard.
