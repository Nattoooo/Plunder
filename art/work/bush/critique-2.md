PASS
Reviewed: STYLE.md, specs (bush, berry-bush, 10x6 flexible), notes.md, src/bush.txt, preview.png, family.png, critique-1.md, and the tree and captain references.

Round 1 issues:
1. Bottom outline (row 5): fixed. Row 5 is `.kkkkkkkk.` on both sprites; the base is closed.
2. Silhouette: fixed. Both sprites use the two-lobed crown from my rows, with identical k positions and symmetric outline.
3. Berry clusters: fixed. Two 2 px clusters, (3,3),(4,3) and (6,2),(7,2), in the lit and mid h area; (2,4) removed. They read as fruit in context at 1x and 3x.
4. R next to G: fixed orthogonally. No R touches G or k edge-to-edge.
5. Right-lobe highlight: left flat h, as I allowed. Fine.

Fresh review: size 10x6, standing on the bottom row, centred, palette k H h G R only, foliage swap chars not mixed with R, 3 tones for foliage, light top left with shadow bottom right, front-above view, and scale (knee to waist on the 9 px captain) are all correct. The silhouette reads as a bush against the tree. Frames match: berry-bush differs only by the R pixels.

Remaining notes (none blocking):
1. [MINOR] bush and berry-bush (0,1),(9,1): The side corners step from 3 px wide to 10 px in a single row, so the outline is a little boxy compared with the tree's rounded edge. Fix (optional): none needed to ship; if revisited, change (0,1) and (9,1) to `.` and (0,2),(9,2) stay k, giving the lobes a rounded shoulder.
2. [MINOR] berry-bush (4,3)/(5,4): The left cluster touches the G pixel at (5,4) diagonally. Contrast is fine at 1x. Fix (optional): none needed.

Counts: 0 blockers, 0 majors, 2 minors.
