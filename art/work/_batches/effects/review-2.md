# Review round 2: batch effects

Families that passed in round 1 (glint, muzzle-flash) stay passed and are not listed again. Sheet-1.png was regenerated after the fixes and matches the current grids.

## sparkle: PASS
Round 1 issues:
1. (2,1) and (2,3) were `Y`: fixed. They are now `y`, and the centre (2,2) is the only `Y`. The star is symmetric left to right and top to bottom.
2. Corner pixels filled: fixed. (1,1), (3,1), (1,3) and (3,3) are `.`, so sparkle-1 is a plus with open corners. The notes and the grid now agree.
3. Frame size difference: fixed. sparkle-1 spans 5 px (arms at (2,0), (0,2), (4,2), (2,4)) and sparkle-2 spans 3 px in the middle of its box, so the frames are clearly different and swap without the marker jumping. The 1 px arms are right, because a 2 px arm would make the 5x5 star a blob.
Fresh look: the palette is `y` and `Y` only, with no outline (effect), and the star reads at 1x on the water and dark backgrounds. No orphans and no banding. It matches the unoutlined effect treatment of glint and muzzle-flash. Both sizes are exactly 5x5.

## cutlass-swing: PASS
Round 1 issues:
1. Not a blade, just a stripe: fixed. The blade narrows from 3 px (rows 4-6), to 2 px (rows 1-3), to a 1 px tip at (7,0). A brass guard `O` and a leather grip `j` sit at the bottom left. It reads as a sword at 1x on both backgrounds.
2. Clipped at both ends: fixed. The tip (7,0) is complete and inside the canvas, and the base is complete with the guard and grip inside the box. No square cut remains.
3. Three full-length stripes: fixed. The upper blade has two tones (`N` edge, `n` body). `M` appears only on the lower-right edge at (5,4), (4,5) and (3,6), as a short shadow, which is not banding. The lit edge steps a clean 1-1-1.
4. Curve (MINOR, optional): not taken, and that is acceptable. The approved cutlass icon has a straight blade, and a curve would break the even diagonal.
Fresh look:
- The guard (0,6), (1,7), (2,8) is perpendicular to the blade and centred on its axis at (1,7). It touches the blade at (1,6). Correct.
- The palette is all allowed (`N n M O j`), with the light from the top left and no outline, which is right for an effect. The size is exactly 9x9.
- [MINOR] cutlass-swing (0,7): the grip `j` sits beside the guard and not on the blade's axis, which would be (0,8). The hilt therefore reads as a guard with a small nub. It is acceptable at 9x9 and the artist gave a reason. Optional: move `j` to (0,8) and leave (0,7) transparent. Not blocking.
