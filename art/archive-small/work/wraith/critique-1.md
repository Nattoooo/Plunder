FAIL
Round 1. Reviewed STYLE.md, spec (wraith-1/-2, characters, flexible, 6x8), notes.md, src/wraith.txt, preview.png, family.png, and the captain preview and source. No earlier critiques. Palette characters are all allowed (k, K, i, I, .) and no swap colours are used. The 7x8 size deviation is justified. View (front, slightly above), transparency and centring are fine.

1. [MAJOR] wraith-1 / wraith-2 (whole sprite): the silhouette does not read as a ghost. Filled black it is a 7x8 rectangle with flat vertical sides (x=0 and x=6 are solid k for rows 1-6) and a square-cut top (row 0 is a straight run of 5 k, x=1..5), so it reads as a box, tombstone or robot. A wraith needs a tapered hood peak and a robe that trails into a ragged hem. Fix: round and taper the hood, e.g. row 0 `..kkk..`, row 1 `.kiiik.`, row 2 `kiKKKik` (widening to full 7 px by row 3), and let the hem trail out in uneven points (see issue 2).

2. [MAJOR] wraith-1 (1,7)-(2,7) and (4,7)-(5,7); wraith-2 (0,7)-(1,7), (3,7)-(4,7), (6,7): the hem is two 2 px stubs with a gap, which reads as two legs and feet, not a floating tattered robe. The spec says "no legs, floating". notes.md claims "three outline stubs", but the grid has two (frame 1) and 2+2+1 (frame 2). The hem row contains no `i` robe colour, so it is pure outline. In frame 2 the stub at (6,7) touches the side outline at (6,6) and reads as a foot. Fix: put robe colour into the last rows with a ragged k edge, e.g. wraith-1 row 6 `kiiiiik`, row 7 `.kikik.` (k under the gaps, i above) and wraith-2 row 7 `kikik.k`-style mirrored so the tatters visibly taper; no stub should be wider than 1 px.

3. [MAJOR] wraith-1 / wraith-2 (1,1): the `I` highlight is the same colour as the eyes at (2,3) and (4,3). It sits alone in the top-left corner of the robe, touching only `i` and `k`, so it reads as a stray glint and competes with the eyes. notes.md says the eyes are the only bright points, which is false. Fix: change (1,1) to `i`; keep `I` for the eyes only. If a highlight is wanted, express it by shading the right side darker instead (issue 4), not by a second `I`.

4. [MINOR] wraith-1 / wraith-2 (5,1)-(5,6) and row 6: no shadow side. Light is from the top left, but the right and bottom of the robe are flat `i`, the same as the left. Fix: use `K` (or leave `i` and add a darker step) along x=5 for rows 4-6 so the form turns away from the light. Keep 3 tones max.

5. [MINOR] wraith-1 / wraith-2 (2,2)-(4,4): the face void is a perfect 3x3 `K` square with a single i row above it, so the hood is not readable as a hood. Fix: with the new hood peak, round the opening: row 2 `.KKK.` (x=2..4 K, corners stay `i`), row 4 `.KK.` style (x=2..4 K with x=2 or x=4 trimmed to `i`), keeping the eyes at (2,3) and (4,3).

6. [MINOR] wraith-1 vs wraith-2: the only difference is hem pixels, so at 1x in context the animation is barely perceptible. Fix: when reworking the hem, also bob frame 2 by 1 px (shift the eyes or hood by one row) so the float reads.

Readability in context (preview.png, x1 on green and sand): a teal block with two eyes is legible but reads as a robot, not a wraith, and is clearly blockier than the captain.

Blockers 0, majors 3, minors 3.
