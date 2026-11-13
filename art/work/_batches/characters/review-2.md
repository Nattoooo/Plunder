# Review round 2: batch characters

Set-level notes: outline (k), top-left light, teal/red palettes and level of detail are consistent across the batch. All sizes are within 1 px of spec and every sprite is flexible, so no size issue. All round-1 BLOCKER/MAJOR issues were checked; the ones below are what remains or is new.

## captain: PASS
Round 1 issues all fixed: walk frames keep the lowered leg identical to standing (J row 16, k row 17) and show the step by a raised boot on row 15 with k beneath; coat tail is 10 px so legs sit under the hips; r stripes only at arm edges; back of head has a j nape row; side hand is s plus an r sleeve pixel.
Remaining MINOR (do not block):
1. [MINOR] captain-side-1 / side-2 (5,13)-(6,13): hand is still a 2 px patch in the middle of the coat. Acceptable at 1x.
2. [MINOR] captain-side-1 (3,16)-(9,16): both boots are one 7 px slab with no toe. Acceptable at 1x.

## crab: PASS
Round 1 issues: top outline closed (row 0 is `kkkk` at x4-7); claws are R with an E highlight and a pincer notch at (1,0)/(10,0); frame 1 outer legs attach via k at (1,6)/(10,6). All fixed.
Remaining MINOR (do not block):
1. [MINOR] crab-1 / crab-2 (4,0)-(7,0): with the outline closed there are no eyes at all. Optional fix: set (4,1) and (7,1) to `k` as eye dots.

## skeleton: FAIL
Round 1 issues: arms added (fixed); bandana tie hangs off the right as `r` at (9,2),(9,3) (fixed); raised foot has an `x` toe on the outer side (fixed).
1. [MAJOR] skeleton-1 / skeleton-2 (4,10)-(5,11): the ribcage's last row `xx` at (4,10),(5,10) has nothing under it, because row 11 is `.kxk..kxk..` and leaves x4-5 transparent. The 1 px outline is open between the legs and the torso floats on two sticks. Fix: add a pelvis in both frames: row 11 becomes `.kxkxxkxk..` and row 12 becomes `.kxkkkkxk..` (pelvis bone `xx` at (4,11),(5,11), `kk` beneath at (4,12),(5,12)). Rows 13-15 unchanged.

## wraith: PASS
Round 1 issues: hood opening is a clean 6x3 K block (3,3)-(8,5) with `I` eyes at (4,4) and (7,4), readable at 1x (fixed); hem is three scallops with a `k` under every fill pixel in both frames (fixed); `G` removed, shade is a K column at x9-10 (fixed); rows 12-13 taper (fixed).
Remaining MINOR (do not block):
1. [MINOR] wraith-2 (2,14)-(9,14): scallops are 3/2/1 px wide against 2/2/2 in frame 1. It reads as a ripple, but even widths shifted by 1 would match frame 1 more closely.

## gull: FAIL
Round 1 issues: wings-up are now 2 px P wings with u tips joined to the body at row 3 (fixed, one open pixel noted below); body has a `u` shade line and wings have `U` undersides (fixed); body rows match between frames (fixed).
1. [MAJOR] gull-2 (0,0)-(8,5): the silhouette is a 1 px stem with a beak on top of a 7 px flat bar, and the body stops where the wings stop. Filled black it is a "T"; in the 1x context renders it reads as a tiny sailboat (mast plus hull), not a seagull from above. Fix: give it the tail that gull-1 has. Row 5 becomes `.kkkPkkk.` (tail `P` at (4,5)) and add row 6 `...kkk...`. The sprite becomes 9x7 (1 px drift on a free size). Rows 0-4 unchanged. Leave gull-1 as is.
2. [MINOR] gull-1 (2,1) and (6,1): the wing-tip `u` pixels have transparent pixels above them at (2,0) and (6,0), so the outline is open. Fix: set (2,0) and (6,0) to `k` (row 0 becomes `kkkkykkkk`).

## sea-serpent: PASS
Round 1 issues: tail mirrored so the stalk is on the right and the fin opens left (fixed); stalk tapered, ridge runs into it (fixed); ridge shrinks 5/3/1 px over body-1/2/3 (fixed); head widened to 15 px with a `k` cap at (14,5) and `P` teeth at (10,3),(12,3),(10,7),(12,7) (fixed); `I` limited to the top-left (fixed).
Remaining MINOR (do not block):
1. [MINOR] serpent-head (9,5)-(13,5): the open mouth is still only a 1 px red line between the jaws, so "open" is subtle. Acceptable at 1x.
