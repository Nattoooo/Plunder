# Review round 2: batch `sails`

Families that passed in round 1 (sail-square, sail-main, sail-lateen, sail-patched, oar, flags, deck-people) stay passed and are not repeated. Only `fire` is re-reviewed.

## fire: PASS
Round 1 issues:
1. [MAJOR] solid pillow base: FIXED. fire-1 now has (0,3) empty and (5,4) empty, and fire-2 mirrors it ((5,3) empty, (0,4) empty), so the base edge is a ragged tongue outline instead of a vertical wall. The q/Q/Y layering is now a flame core (Y at (3,3),(2,4),(3,4)) inside a body, not a ring around a blob.
2. [MAJOR] frames indistinguishable at 1x: FIXED. fire-1 vs fire-2 now differ at the tip ((2,0) vs (4,0)), the side tongues (rows 1-2, cols 1-4), and both base edges in rows 3-4; well over 4 px change, and the flicker reads on the sheet at 1x on deck and sea backgrounds. Row 5 base `qqQQqq` is identical in both, so the fire stays planted.
3. [MINOR] lone tip Q: now sits over a ragged body, acceptable.

Fresh look, minor notes only:
1. [MINOR] fire-1 (4,1): q side tongue is separated from the Q at (2,1) by a transparent (3,1); this reads as a second tongue, as intended. Keep.
2. [MINOR] fire-2 (1,1) q over (1,2) q: same, a left tongue; keep.
3. [MINOR] fire-1/fire-2 rows 4-5: the left and right walls are still near vertical at (0,4)-(0,5) and (5,3)-(5,5); acceptable at 6x6 with no outline, and the notches break it up.
