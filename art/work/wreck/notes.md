wreck: 34x17 hull seen from above, bow right, rounded pointed bow, 2 px rim lit on top, darker on bottom, flooded K interior, one rib, one snapped rib stub, round mast stump, bow deck remains (v), stern broken off on a diagonal.

## Batch round 1
- Stern break is now jagged: uneven left edge steps, a splinter of rim plank sticking out at row 2, and a notch in the rim at row 1.
- Interior is deep water (A, with a in the lower and right parts) instead of K; the lower rim has a ragged B/A waterline so the hull is half-sunk. Rib and mast stump stay above water.
- Bow tip ends in a single pixel at (33,8); rows 7 and 9 end at col 32.
- Bow deck pixels at (22-24,2) are v, matching the rim.

## Batch round 2
- Stern break: left edge rebuilt with uneven run lengths (outline starts at cols 1,3,4,3,4,6,6,7,8,7,8,9,10 down rows 3-15), so it steps in and out instead of a fixed slant. Rim plank at row 2 now runs out to col 0 as a `vv` splinter outlined by k; a v plank-end fragment with k outline sits at (4,6); a notch is left at (5,8).
- Rib at col 13 now pokes up into the rim at (13,2) and down through the bottom rim at (13,15).
- The `aa` stripe right of the mast is broken: single `a` at (24,5) and (24,10), `aa` only on rows 6-9.
- Waterline at rows 14-15 now uses runs of 2 (BBA W AAB / AA W aa A) instead of per-pixel alternation.
- Right rim (22-27,3) is all v, matching the rim above.
