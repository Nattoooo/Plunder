FAIL
Reviewed: STYLE.md, specs (bush, berry-bush: 10x6, flexible), notes.md, src/bush.txt, preview.png, family.png, and the tree and captain references.
Checked and fine: size 10x6, bottom row touched, centred, left-right symmetric apart from lighting, palette (k H h G R only), foliage swap chars not mixed with R, light top left, shadow bottom right, 3 tones for the foliage, scale (6 px high is about waist height on the 9 px captain).

1. [MAJOR] bush and berry-bush (3..6,5): The bottom row is G with no k beneath or around it, so the underside has no outline. Only (1,5),(2,5),(7,5),(8,5) are k. STYLE.md requires a 1 px k outline around the whole silhouette, and the tree closes its base with k. At 1x the bush looks open at the bottom and bleeds into the ground. Fix: make row 5 `.kkkkkkkk.` (k at x=1..8). Rows 1..4 then carry all the fill. Keep the G shadow in rows 3 and 4 as it is.

2. [MAJOR] bush and berry-bush (0..9,0..5): The outline is a smooth, flat-topped dome with straight sides at (0,3),(0,4),(9,3),(9,4). Filled black it reads as a slime or a grass mound, not a bush. The tree has a lumpy leafy edge and the bush does not match it. Fix: give the crown two lobes. With fix 1 applied, use these rows for bush:
   r0 `.kkk..kkk.`
   r1 `kHHhkkhhhk`
   r2 `kHhhhhhhhk`
   r3 `khhhhhhhGk`
   r4 `khhhhGGGGk`
   r5 `.kkkkkkkk.`
   Size stays 10x6 and the silhouette stays symmetric. Use the same silhouette (k positions) for berry-bush.

3. [MAJOR] berry-bush (4,2),(7,3),(2,4): The spec asks for "clusters of red berries". Three lone R pixels scattered over the dome read as speckle at 1x in context, not as fruit. This breaks the no-scattered-pixels rule in STYLE.md. Fix: draw two small clusters of 2 px each, for example R at (3,3),(4,3) in the lit area and R at (6,2),(6,3) on the right lobe, each fully surrounded by h. Use the new row layout from issue 2 when picking coordinates. Remove (2,4).

4. [MINOR] berry-bush (7,3): R touches the G shadow pixel at (8,3), so the red loses contrast. Fix: keep every R at least 1 px from G and from k. This is covered by issue 3 if the clusters sit in the h area only.

5. [MINOR] bush (2..4,1..2): The H highlight is a 3 px patch, with no h clump hints in the right lobe. After issue 2, add one `H` at (6,1) only if it reads as a leaf clump. If it reads as speckle, leave the lobe flat h.

Counts: 0 blockers, 3 majors, 2 minors.
