# nature-large review, round 1

Set notes: outline is a consistent 1 px `k`, light is top-left throughout, foliage uses only H h G (plus P/L snow on snow-pine), no semi-transparency. All sizes are within 1 px of spec except palm width (39 vs 37, flexible, so not flagged). Palm is the one sprite that does not belong with the rest.

## tree: PASS
1. [MINOR] tree (16,9)-(16,11): the single-pixel-wide `H` vertical streak reads as a stripe rather than a leaf clump. Fix: widen to a 2 px arc or drop it to `h`.
2. [MINOR] tree (13,14): lone `G` surrounded by `h` is a stray pixel. Fix: change to `h`.

## jungle-tree: PASS
1. [MINOR] jungle-tree (16,4)-(16,8) and (26,4)-(26,8): two 1 px `H` vertical lines in the canopy look like seams. Fix: break into short 2 px arcs or merge into `h`.

## palm: FAIL
1. [MAJOR] palm (whole crown, rows 0-27): the crown reads as two mirrored claw or ear lobes, not as separate drooping fronds. There are no distinct frond blades and no clear fan from the crown. Fix: redraw as 5 to 7 fronds radiating from (19,17), each a 2 to 3 px wide blade with a clear gap, two short upward and the rest arching and drooping, ending in tapered tips.
2. [MAJOR] palm (11,4)-(12,4), (12,8)-(13,8), (12,12)-(14,14) and mirrored (24,4)-(25,4): isolated `kk` interior blobs read as eyes or holes, and they are neither real gaps nor deliberate outline. Fix: remove them, and where fronds separate, leave a 1 px transparent gap with a normal outline.
3. [MAJOR] palm trunk (11,28)-(18,38): the width wobbles (4 px at row 19, 3 to 4 px lower down). The trunk steps left, then jogs back right at rows 35-38, which does not match the "gentle S" and gives uneven jaggies. Fix: pick one lean, 3 px of `vWw` plus outline, stepping evenly 1 px every 2 rows to the base, with a small flare on the bottom row.
4. [MINOR] palm (21,17),(22,17),(16,18),(17,18),(21,18),(22,18): coconut `J` pixels are asymmetric and scattered and don't read as a cluster. Fix: one 2x2 `J` cluster with a `k` outline under the crown at (18,18)-(21,19).
5. [MINOR] palm: foliage uses 3 tones in an unordered patchwork (`G` islands at (10,11), (9,12), (11,19)). Fix: keep `H` on the top-left edge of each frond, `h` base, `G` on the lower-right edge only.

## pine: PASS
1. [MINOR] pine (every tier-bottom row 9, 16, 23, 31): a full-width `G` row makes a hard horizontal band under each tier. Fix: acceptable as the tier shadow, but taper the band's ends one pixel in.
2. [MINOR] snow-pine (13,13)-(14,14) and (11,6)-(12,6): snow patches in the tier middles are blobby and the drips are uneven. Fix: make each snow cap follow the tier's top edge, with 1 to 2 px drips at 2 px spacing.

## dead-tree: PASS
1. [MINOR] dead-tree: wood shading uses `d` (sand ramp) instead of the wood ramp `v W w`. Fix: swap `d` for `w` and keep `W` as the mid tone.
2. [MINOR] dead-tree (1,20)-(2,20) vs (13,20)-(16,20): the root flare shades `d` on the lit left side and more on the right, so it is inconsistent. Fix: make the left root `W`.
3. [MINOR] dead-tree: reads plain brown, not grey-brown as the brief asks. Fix: optional, shade the right limbs with `T` or `t` highlights, or note the palette limit.

## whale: PASS
1. [MINOR] whale (2,4)-(3,5): the notch between the flukes is a 2 px thick `k` blob, which is a heavier outline than elsewhere. Fix: reduce to 1 px `k`.
2. [MINOR] whale (9,1)-(15,2) and (11,8)-(16,8): the flippers sit mid-body and fuse with the body rim, so they read slightly like fish fins. Fix: shift them 1 to 2 px toward the head, with a 1 px gap before the body.
