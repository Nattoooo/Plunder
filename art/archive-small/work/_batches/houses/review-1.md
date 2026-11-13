# Review round 1: batch houses

Read: STYLE.md, CRITIC.md, brief.md, approved.png, sheet-1.png, src/house-long.txt, src/house-townhouse.txt, both notes.md, src/house-cottage.txt (approved standard).

Set-level: both sprites match the approved cottage (1 px k outline, top-left light, flat R roof with e left hip / r right hip, c eave row, 4x4 k-framed windows with l/B glass and V sill, w/W door with y knob, u/T stone chimney). Sizes are exact (30x23 and 20x31), both stand on the bottom row, are centred and use only legal palette characters with swap colours kept to roof (e R r) and plaster (C c). Chimneys differ from each other and from the cottage (see MINOR notes); that is the only set-level drift.

## house-long: PASS
1. [MINOR] house-long (1,10): the left hip highlight `e` is missing on the bottom roof course ("krrrr..."), so the lit left hip column breaks one row early. The approved cottage keeps `e` at (1,10). Fix: set (1,10) to `e`.
2. [MINOR] house-long (20..24,1..4): the chimney is a plain 5 px wide, 4 row block (uuuuT) with no cap lip, unlike the approved cottage chimney (3 px body, 5 px lip). It is wide and takes the whole right third of the ridge. Fix: either accept, or narrow the body on rows 2-4 to x21-24 (`uuT` plus k at x20 and x25 shifts) and keep rows 0-1 as a 5 px cap. Not required.
3. [MINOR] house-long (3..11,15..19) and (18..26,15..19): windows and door are separated by only 1 px of plaster (x2, x7, x12, x17, x22, x27), which is crowded. It matches the approved cottage spacing, so accept.

## house-townhouse: FAIL
1. [MAJOR] house-townhouse (16..18,4..6): the roof is not symmetric and the right hip breaks the even 2-2-2 step. The left edge steps 4,3,2,2,1,1,0,0 on rows 3-10, so the right edge should be 15/16,16,17,17,18,18,19,19. It is actually 16,17,18,18,18,18,19,19: a 1-4-2 run, one px too wide on rows 4-6, so the right slope bulges out and the diagonal jags. It is visible at 1x as a lopsided roof. Fix: row 4 `...keeeeeeekuuuTk...` (delete the k at (17,4)); rows 5 and 6 `..keRRRRRRRRRRRRrk..` (R x4-15, r at (16,5) and (16,6), k at x17, x18 and x19 transparent). Rows 7-10 stay as they are. Right edge then reads 16,16,17,17,18,18,19,19, an even 2-2-2.
2. [MINOR] house-townhouse (11..16,0..4): the chimney is 4 px stone wide with no cap lip, which does not match the cottage (lip) or house-long (5 px). Fix: optional, give rows 0-1 a 1 px lip or accept; make sure the chimney matches house-long after the fix above (body x12-15 against roof edge k at x16).
3. [MINOR] house-townhouse (3..16,13..17) and (3..16,22..26): windows are 12 of 16 interior columns with 1 px plaster gaps, crowded but consistent with the cottage. Accept.
