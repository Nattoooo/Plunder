# Batch `characters`, review round 3 (captain only)

Read: review-1.md and review-2.md first, STYLE.md, CRITIC.md, brief.md, sheet-1.png, art/src/captain.txt and the door rows of house-cottage, house-long, house-shutters, house-townhouse and warehouse. Crab, skeleton, wraith, gull and sea-serpent passed earlier and are not listed again.

## captain: FAIL
Earlier issues: 2, 3, 4, 5, 7 fixed in round 2; 6 accepted. Issue 1 (door scale) is still NOT fixed.
1. [MAJOR] all 8 sprites, scale (round 1 issue 1, round 2 issue 1, still open): the captain is 7 px wide (5 px interior). Doors are unchanged in the repo: house-cottage, house-shutters and house-townhouse `wwww` at cols 8-11 (`wWWW` below), house-long `wwww` at cols 13-16. warehouse has no matching door to measure. STYLE.md says "a door fits the captain"; the captain is still almost twice the door's width, so he cannot walk through any door in the set. Do not shrink the captain. Fix: widen the door in house-cottage, house-long, house-shutters, house-townhouse (and any other door-bearing building) to 6 px, and re-review those families. Alternative if the director decides the approved doors stand: amend STYLE.md scale rule and the brief to say the captain is a 7 x 9 sprite that reads larger than a door, and accept; the sprites themselves need no change either way. The captain passes as soon as one of these is done.
2. [MINOR] captain-side-1/2 row 0 `kk..kk.`: rear hat corner detached by a 2 px gap; matches front/back logic, keep.
3. [MINOR] captain-down-2/3 (3,7): lifted-leg trouser is one `b` plus a boot; accepted, keep.
4. [MINOR] art/work/captain/notes.md is modified in the working tree; make sure it describes the 7 x 9 grid.

Sprites otherwise read cleanly at 1x on green and sand: tricorn with gold corners, forehead then eyes, red coat with white shirt, navy trousers; frames match except for the legs.
