# Review round 3: batch characters (families skeleton and gull only)

Set-level notes: outline (k), top-left light, palette use and level of detail match the rest of the batch and the approved captain. Sizes are within 1 px of spec and the sprites are flexible, so there is no size issue. Both families were checked against the grids in art/src and the batch sheet.

## skeleton: PASS
Round 2 issue checked:
- [MAJOR] ribcage floating on two sticks: FIXED in both frames. Row 11 is `.kxkxxkxk..` and row 12 is `.kxkkkkxk..`, so the pelvis bone `xx` at (4,11),(5,11) has `kk` beneath it at (4,12),(5,12) and the outline between the legs is closed.
Round 1 issues (arms, bandana tie, raised-foot toe) remain fixed. Rows 0-12 are identical in both frames, and only the feet differ (lowered foot on row 15, raised foot on row 14), which is what a walk needs. Light is from the top left (`x` on the left, `X` on the right) and the palette is clean. At 1x on green and sand the bandana, skull and ribs read as a skeleton pirate.
Remaining MINOR (do not block):
1. [MINOR] skeleton-1 / skeleton-2 (1,10) and (8,10): the arms end in the same 1 px `x` as the arm with no hand, and the legs start 1 px further in at (2,11) and (7,11), so each arm and leg reads as one zigzag line. Acceptable at 1x.
2. [MINOR] skeleton-1 / skeleton-2 (2,11)-(7,11): the legs hang from the outer corners of the pelvis, joined to it only through `k` pixels at (3,11),(6,11). It reads as a skeleton, because the joints are loose.

## gull: PASS
Round 2 issues checked:
- [MAJOR] gull-2 "T" / sailboat silhouette: FIXED. Row 5 is `.kkkPkkk.` (tail `P` at (4,5)) and row 6 is `...kkk...`. The sprite is 9x7 (free size, 1 px drift). It now reads as a bird with head, spread wings and tail.
- [MINOR] gull-1 open outline above the wing tips: FIXED. Row 0 is `kkkkykkkk`, so (2,0) and (6,0) are `k`.
Both frames use only `k y P u U`, with a 1 px `y` beak as the deliberate point at (4,0). The outline is closed in both frames and light is from the top left.
Remaining MINOR (do not block):
1. [MINOR] gull-2 (1,3)-(3,4) and (5,3)-(7,4): the wings are straight 2 px bars, not "swept back" as notes.md says. Optional fix: step the outer wing pixels down 1 row on each side, for example row 3 `kPPPPuPPk` becomes `.PPPPuPP.` with `k` below.
2. [MINOR] gull-1 / gull-2 body: gull-1 ends its rump on row 4 with `kkk` on row 5, while gull-2 has an extra tail pixel (4,5) and `kkk` on row 6, so the body is 1 px longer in frame 2. It is not visible as more than a slight bob. Optional fix: add the same tail row to gull-1 (the wings-up frame would also become 9x7).
3. [MINOR] gull-1 silhouette: filled black, rows 0-3 are a solid 9x4 block because the `k` gaps at (3,1),(5,1),(3,2),(5,2) merge with the wing outline. At 1x the white interior still reads as a bird. Accepted in round 2 ("leave gull-1 as is").
