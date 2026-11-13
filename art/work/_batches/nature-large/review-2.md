# nature-large review, round 2 (palm only)

Tree, jungle-tree, pine, snow-pine, dead-tree and whale passed in round 1 and are not repeated. Palm is now 38 x 38 (spec 37 x 39, flexible size, within 1 px, not flagged).

Round 1 issues on palm:
1. Crown reads as two claw lobes: FIXED. Six separate fronds (two upper, two arching side, two inner drooping) fan from the hub with clear transparent gaps and tapered tips. It reads as a coconut palm at 1x on both backgrounds.
2. Interior `kk` blobs: FIXED. Separation is only gaps plus a normal 1 px outline.
3. Trunk width wobble and jog: FIXED. Constant 3 px `vWw` leaning one way, stepping 3-3-4-3-4 rows, with a flare on the last row (note: the final 1-row steps at rows 35-37 are slightly quicker than the rest, MINOR below).
4. Scattered coconuts: FIXED. One 2x2 `J` cluster at (18,17)-(19,18) with `k` outline.
5. Unordered foliage tones: MOSTLY FIXED. Right frond group is clean; the left upper frond still has leftovers (MINOR below).

## palm: PASS
1. [MINOR] palm (7,2) and (9,3),(11,3): a `G` on the lit upper-left edge, then `h G h H h` alternating in the tip of the upper-left frond is speckle. The mirrored right frond (27-31,2-3) is clean `H H H G G`. Fix: set (7,2)=H, (9,3)=h, (11,3)=h to match the right frond.
2. [MINOR] palm (29,15)-(33,18) and (23,13)-(26,17): the right inner and right side fronds have no `H` on their top-left edges (flat `h` only) while the left fronds do (`kHhhGk`). Fix: add `H` on the first interior pixel of each row of the right-hand fronds' left edge, e.g. (30,15) and (31,17).
3. [MINOR] palm (18,17)-(19,18) vs trunk (18,19)-(20,19): the coconut cluster is 2 px wide centred on x=18.5 while the trunk is 3 px wide centred on x=19, so the cluster sits half a pixel off. Fix: shift `JJ` right by 1 to (19,17)-(20,18) or widen to 3 px.
4. [MINOR] palm (16,16)-(20,16): a 4 px `kkkk` bar over the coconuts and (11,12)-(15,12) / (23,12)-(27,12) `kkkkk` bars under the `G` rows read as heavy black dashes. Fix: acceptable as gaps; optionally make the `G` band at (11,11)-(15,11) taper one pixel at its hub end.
5. [MINOR] palm trunk (12,35)-(11,36): the last two rows step left on every row (x=12, then x=11) after four rows at x=13, which reads as the flare starting early. Fix: hold the left edge at x=13 for rows 31-35 and keep the flare only on row 36.
6. [MINOR] palm upper fronds (0..12,0..9): both upper fronds are straight 45 degree bars and the pair forms a stiff X. Fix: optional, shorten the run at rows 6-8 by one pixel so the last three rows curve toward vertical.
