# Review round 1: batch effects

Set-level: all sprites are unoutlined effects with flat hard pixels and a top-left light, which matches the batch rules. Sizes match the brief exactly. The cutlass-swing is the weak one: it is a clipped stripe, not a tapered blade.

## sparkle: FAIL
1. [MAJOR] sparkle-1 (2,1) and (2,3): these two pixels are `Y` as well as the centre (2,2), so a pale vertical bar runs through the star. The star is no longer symmetric left to right and it reads as a vertical cross or capsule. The notes say the centre is the only pale pixel, which is not what the grid has. Fix: change (2,1) and (2,3) from `Y` to `y`, so the pale centre (2,2) is the only `Y`.
2. [MINOR] sparkle-1 (1,1), (3,1), (1,3), (3,3): the notes say the body corners are left open, but the grid fills them with `y`. The result is a fat diamond blob, not a four-point star. Fix: after the change above, make these four pixels transparent (`.`), so the shape is a plus with a pale centre. That would match sparkle-2. Alternatively keep the diamond and correct the notes. Choose one, because the notes and the grid must agree.
3. [MINOR] sparkle-2: fine in itself. Once sparkle-1 is a plus, the large frame needs to be visibly bigger than the small one. Keep the 5-px arm span (arms at (2,0), (0,2), (4,2), (2,4)) and use a 2-px-thick arm if more body is wanted.

## glint: PASS
Four frames: white pixel, 3-px line, plus with open corners, then pale blue `L.L`. The shapes are clear and the progression reads well. The sizes are exact (1x1, 3x1, 3x3, 3x1), and the palette is `P` and `L` only. There is no outline, which is right for an effect.
- [MINOR] glint-4: the fade drops to `L`, which is faint against the lighter water tiles. Acceptable as it is, since it is the fade frame.

## muzzle-flash: PASS
The white-hot `P` centre, the `Y` ring and the `y` spikes read as a burst with a clear centre at 1x on both the water and dark backgrounds. The size is 5x5, and the shape is symmetric and open at the corners.
- [MINOR] muzzle-flash (0,0), (4,0), (0,4), (4,4): the corner spikes touch the body only diagonally, and with (2,0) and (0,2) they form a checkerboard rhythm along the edges. It is near the limit for a "few bright pixels" brief. Optional fix: drop the four corner pixels to `.` for a cleaner 8-spike star. Not blocking.

## cutlass-swing: FAIL
1. [MAJOR] cutlass-swing (whole sprite): the shape does not read as a cutlass. It is a straight bar 4 px wide, measured horizontally, running corner to corner, with no point, no guard or hilt and no curve. The silhouette is a stripe or ruler, and the notes' claim of a "taper to a point" is not true of the grid. Fix: redraw it as a blade that narrows toward the top right. Use full width (N, n, M) in the lower half and narrow to 1-2 px by row 0, so the tip ends as a clear point inside the canvas and not at the edge. Put a small guard at the bottom left, for example two `o` or `O` pixels perpendicular to the blade at about (1,7) and (2,8) or (0,6), plus a `j` grip pixel at (0,8).
2. [MAJOR] cutlass-swing (7,0), (8,0), (8,1) and (0,7), (0,8): the blade is clipped by the canvas at both ends. Row 0 would continue to `NnMM` but is cut at x=8, leaving a blunt 2-px edge (`Nn`) at the top. Row 8 would start at x=-1, so its `N` is lost (`nMM`). The top-right end is a square cut, not a point. Fix: shift the whole blade 1 px down-left, or shorten it, so both ends are drawn in full.
3. [MAJOR] cutlass-swing: three parallel stripes (`N`, `n`, `M`) run the full length of the blade. This is banding, which STYLE.md forbids ("parallel stripes of tones following the outline"). Fix: use two tones. Make the top-left edge `N` (1 px) and the body `n`, and add `M` only as a 1-px shadow edge on the lower-right side of the lower half. Do not shade it in full-length stripes.
4. [MINOR] cutlass-swing: it does not look like the approved `cutlass` icon (16x16, with guard and hilt). For a swing effect, a slightly curved blade of about 1-2 px width would match it better. Optional once the blade is redrawn.
