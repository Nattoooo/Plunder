FAIL

Round 2. Read: grid src/captain.txt (9 x 9), notes.md including its Round 1 section, the new preview.png and family.png, and art/src/house-cottage.txt for the door scale.

## Round 1 issues

1. Tricorn reads as a box: NOT FIXED. The box is gone, but the 9 px wings read as cat ears or horns, not a tricorn (see issue 1 below).
2. Hands at ankle height: FIXED for the standing frames. Hands are at the cuffs (row 6), clear of the boots, and in side-1 the hem skin is now coat. The new walk-frame hand creates a new problem in down-2/3 (issue 2 below).
3. Trousers and boots do not read: FIXED. The legs are 2 px wide navy `b`, with the boots aligned under them.
4. Orphan cheeks: FIXED. Cheeks (2,3) and (6,3) join the skin below.
5. Walk frames, base and lifted leg: PARTLY FIXED. The base no longer lurches and mirrors are exact. The lifted leg is now a 1 px column that reads as a thin leg, not a lifted one (minor 5).
6. Side boot slab: NOT FIXED. It is now longer (minor 7).
7. Back trim reads as a headband: FIXED. The gold is only at the corners.
8. Dark `r` merges with outline: FIXED by removing `r`. The coat is now one flat tone (minor 8).
9. Width: it grew from 7 to 9, and that now collides with the door scale (issue 3 below).

## New and remaining issues

1. [MAJOR] all sprites, rows 0-2 (hat): The tricorn still does not read, and the new wings are the cause. Silhouette rows 0-2 are `##.###.##`, `#########`, `.#######.`, so the hat looks like cat ears or horns on a helmet. The gold corner pixels (1,1) and (7,1) are enclosed by `k` on all four sides ((1,0), (0,1), (2,1), (1,2) in down-1), so they are floating dots. In the front frames the `y` run (2..5,2) plus `O` (6,2) is a solid gold bar across the forehead. In the side frames row 2 is `.kyyyyyOk`, a 6 px gold bar. Both read as a headband under a black cap, not trim on a brim. The crown `K` and outline `k` are close in tone, so the dome is a 3 px smudge. The back view is a black mass with two gold dots. Fix: build the 9 px width as a brim, not as ears. In the down frames use row 0 `k..kkk..k`, row 1 `kykKKKkOk`, row 2 `kyyyyyyOk`, and then put one outline-black pixel back at (1,2) and (7,2) if the gold touches the sprite edge. The point is that the gold wing pixels must connect orthogonally to the trim and the brim must sweep out wider than the head. Do the same in up-1/2/3 with the black brim row, and in side-1/2 with trim only along the front brim. Check the filled-black silhouette and the 1x preview before resubmitting.

2. [MAJOR] captain-down-2 (2,5) `s` and captain-down-3 (6,5) `S`: The forward-swinging hand is directly below face skin, (2,4) `s` and (6,4) `S`. The cheek, hand and arm become one continuous skin column down the side of the face. At 1x the head looks 3 px taller and the arm disappears. Fix: do not put the hand on row 5 under the cheek. Show the swing with the hand at (2,6) `s` against the coat as in down-1, with the opposite hand hidden: down-2 row 6 `.ksRpRRk.`, row 5 `.kRRpRRk.`, and mirror for down-3. Alternatively keep row 5 but separate it from the face by leaving a coat pixel or outline pixel between them. The up frames are fine, since (2,4) and (6,4) are outline there.

3. [MAJOR] all sprites, size: The captain is 9 px wide, or 7 px for the body, against the spec's 6 px. In art/src/house-cottage.txt the door is 4 px wide (cols 8-11 of rows 15-22) and 8 px tall. STYLE.md says a door fits the captain. A 7 px body does not fit a 4 px door. The notes say to measure doors against the 7 px body, which contradicts the door as drawn. Fix: either bring the body to at most 6 px wide with the hat wings not beyond 7, or have the coordinator widen the door and all door-bearing buildings to at least 7 px. One of the two must be decided and recorded before approval.

4. [MINOR] captain-down-1/2/3 row 4 `.kssssSk.`: The chin row is full width, so the head is a 7 px wide box meeting the shoulders with no neck or taper. In the back and side views the head tapers (`..kJjJk..`, `..kjssSk.`), so the front and back silhouettes differ by 1 px on each side at row 4. Fix: taper to `..kssSk..` or equivalent, and keep the cheeks joined by making (3,3) and (5,3)'s neighbours skin below them.

5. [MINOR] captain-down-2/3, captain-up-2/3 rows 7-8: The lifted leg is a 1 px column ((3,7) `b`, (3,8) `k`) with its boot still on row 8. It reads as a thinner leg, not a lifted foot. The step is carried only by that and by the hand. Fix: raise the lifted boot one row by putting `k` at (3,7) and (2,7)-(3,7) and clearing (3,8), or keep as is and rely on the 3 px context preview, where it does read as a small step. Check at 1x.

6. [MINOR] captain-side-2 row 7 `.kRbkbk..`: The coat tail is one pixel here and two pixels in side-1 (`.kRRbbk..`). It is a moving part, so it is allowed, but the tail should not shorten in a stride. Fix: keep (2,7) `R` and (3,7) `R`, and move the rear leg to (4,7) if width allows.

7. [MINOR] captain-side-1 and captain-side-2 row 8: The boot row is `..kkkkkk.` in side-1, a 6 px black bar under 2 px of leg. The heel and toe are each two pixels past the leg. Fix: shorten the toe to one pixel and keep the heel as the coat-tail outline: `..kkkkk..`.

8. [MINOR] all front and back frames: The coat is a single flat `R` with no shading on the right, so light from the top left shows only in the hat, hair and skin. Fix: shade only the lowest row of the right side with `r` where it does not touch the outline, for example (6,6), or accept the flat coat and say so in the notes.

Verdict: three MAJOR issues remain (the hat does not read as a tricorn, the swinging hand merges with the face in the down walk frames, and the sprite is too wide for the door scale), so this is FAIL.
