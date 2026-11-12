FAIL
Round 1. Reviewed STYLE.md, spec (wraith-1/-2, characters, flexible, 6x8), notes.md, src/wraith.txt, preview.png, family.png, captain preview.

1. [MAJOR] wraith-1 / wraith-2 (whole sprite): silhouette does not read as a ghost. Filled black it is a 7x8 rectangle with flat vertical sides (x=0 and x=6 are solid k for rows 1-6) and square-cut shoulders, so it reads as a box, tombstone or robot. A wraith needs a hood peak and a robe that widens or trails into a ragged hem. Fix: round the hood top and taper it, e.g. row 0 `..kkk..`, row 1 `.kiiik.`, then widen to full 7 px at row 3 or 4. Let the hem trail out in uneven points, not a straight cut.

2. [MAJOR] wraith-1 (1,7)-(2,7) and (4,7)-(5,7), wraith-2 (0,7)-(1,7), (3,7)-(4,7), (6,7): the hem is two 2 px stubs with one gap, which reads as two legs and feet, not a floating tattered robe. The spec says "no legs, floating". notes.md claims "three outline stubs", but the grid has two. The hem has no `i` robe colour in it, so it is pure outline. Fix: make the last row robe colour with a ragged k edge, e.g. row 7 `.kikik.` or `kikik.k` with `i` above the gaps, so the robe visibly tapers into tatters rather than ending in feet.

3. [MAJOR] wraith-1 / wraith-2 (1,1): the `I` highlight is the same colour as the eyes at (2,3) and (4,3). It sits in the top-left corner of the robe as a lone bright pixel, so it reads as a stray glint and competes with the eyes. notes.md says the eyes are the only bright points, which is false. A lone pixel touching only `i` and `k` is also a near-orphan. Fix: replace (1,1) with `i`, and give the light a 2 px highlight on the left edge or hood top using a tone that is not the eye colour. Keep `I` for the eyes only. Alternatively make the eyes `I` and the highlight a single `i` lighter step by adding a shadow tone `k`-adjacent on the right.

4. [MINOR] wraith-1 / wraith-2 (5,1)-(5,6): no shadow side. Light is from the top left, but the right and bottom of the robe are flat `i`, the same as the left. Fix: add a darker robe shade (or `K`) along x=5 for rows 4-6 (and the bottom row) so the form turns away from the light. Keep 3 tones max (K, i, I).

5. [MINOR] wraith-1 / wraith-2 (2,2)-(4,4): the face void is a perfect 3x3 square, with no hood lip above it, so the hood is not readable as a hood. Fix: with the hood peak from issue 1, make the opening a rounded shape, e.g. row 2 `.KKK.` (x=2..4) and row 4 `.KK.` style with a one-pixel `i` lip above.

6. [MINOR] wraith-1 vs wraith-2: the only difference is hem pixels. At 1x in context the animation is barely perceptible and frame 2's hem is asymmetric (stub at x=6 touches the side outline at (6,6), reading as a foot). Fix: when reworking the hem, also shift the body shape or eyes by 1 px between frames (a bob) so the float reads.

Palette: all characters (k, K, i, I, .) are allowed; no swap colours are misused. Size 7x8 deviation is justified and acceptable. View and transparency are fine. Outline is consistent with the captain. Readability in context: teal block with two eyes is legible against green and sand, but it reads as a robot, not a wraith.

Blockers 0, majors 3, minors 3.
