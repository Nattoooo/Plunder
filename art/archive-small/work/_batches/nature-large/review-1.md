# nature-large review, round 1

Set check: all three sprites use the shared `k` outline, top-left light and the approved ramps (foliage `H h G` only in the palm crown, wood `v w W d`, whale `B b l`). Level of detail is consistent with approved.png. Sizes differ from spec (palm 19x20 ok; dead-tree 13x13 vs 13x11; whale 16x7 vs 14x5) but all three are flexible and justified in notes, so no size penalty. Sheet-1 reviewed at 1x on green and sand: palm and dead tree read, whale reads as a blue whale with tail flukes.

## palm: PASS
Round 1 major (dome crown) is fixed: the underside is notched, fronds droop to different depths, the crown is mirror-symmetric about x=9 apart from lighting.
1. [MINOR] palm (4-11,7-18): the trunk is only 2 px of fill (`v` and `w`) between outlines, thin against the 19 px crown and the captain's 6 px width. Fix (optional): widen the trunk to 3 px of fill from row 9 down with `v v w`.
2. [MINOR] palm (4-11,19): the base is centred at x=7.5, 1.5 px left of the sprite centre (x=9). Documented in notes as a deliberate lean; acceptable if the game anchors palms by sprite centre, otherwise shift the base right by 1 px.

## dead-tree: PASS
Round 1 majors are fixed: limb tips are capped with `k`, the trunk kinks at rows 7-8, both limbs have a twig or stub, the crown is 6 rows tall and the shade side uses the cooler `d`.
1. [MINOR] dead-tree (11,2) and (1,2)-(1,3): the twig fills (`d` at (11,2), `v` at (1,2),(1,3)) are fully enclosed by `k`, so they read as dark dots inside a black stroke. Fix (optional): drop the enclosing `k` at (12,2) and set (11,2)-(11,3) to `d`, or replace the twig fill with `k` so it is a clean 1 px stick.
2. [MINOR] dead-tree (3-7,12): the base is centred at x=5 against sprite centre x=6. Fix (optional): shift the lower trunk rows 8-12 one px right.

## whale: FAIL
Round 2 issues check: flukes now have a transparent notch at (0,3) with two lobes (fixed); the flippers are mirrored top and bottom on the 16x7 sprite (fixed); belly shade `b` and back highlight `l` present (fixed).
1. [MAJOR] whale (13,2) and (13,4): fill pixels with no outline. Row 1 is `kBk..kBBkkkkk...`, so (13,1) is `.`; row 5 is `kBk..kBbkkkkk...`, so (13,5) is `.`. The `B` at (13,2) and the `b` at (13,4) therefore sit directly against transparency, leaving a bite in the head outline between the body wall ending at (12,1)/(12,5) and the nose pixels (14,2)/(14,4). Fix: set (13,1) and (13,5) to `k` (rows become `kBk..kBBkkkkkk..` and `kBk..kBbkkkkkk..`), giving a stepped diagonal from (12,1) to (14,2).
2. [MINOR] whale (8-11,2)-(8-11,3): the highlight is a solid 4x2 block of `l` in the middle of the back, reading as a patch rather than a back strip. Fix: taper it, e.g. make (8,3) and (11,3) `B` and (11,2) `B`, so the `l` follows the top-left light and tails off toward the head.
3. [MINOR] whale (3-5,3): the stock is a single row of `B` between `k` walls, so filled black the tail stock is thick but in colour is a 1 px line. Acceptable at 1x; no change required.
