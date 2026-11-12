FAIL
Reviewed: STYLE.md, specs (bush, berry-bush: 10x6, flexible), notes.md, src/bush.txt, preview.png, family.png, and the tree reference.
Checked and fine: size 10x6, bottom row touched, centred, symmetric 1-1-1 outline steps, palette (k H h G R only), foliage swap chars H h G g not mixed with R, light top left, shadow bottom right, outline 1 px k.

1. [MAJOR] bush (0..9,0..5): The silhouette is a smooth, flat-bottomed dome, which reads as a green slime or a grass mound, not a bush. Filled black, nobody names it. The tree beside it has a lumpy, leafy outline and the bush does not match. Fix: break the crown into two lobes. Make row 0 `.kkk..kkk.` (k at x=1-3 and x=6-8, transparent notch at x=4-5). Fill row 1 so the notch closes with k at (4,1),(5,1) and the lobes keep H at (2,1),(3,1). Keep rows 2-5 as they are. The silhouette stays symmetric, and the bush stays at 10x6 and 6 px high.

2. [MINOR] bush (3..4,1..2): The H highlight is 3 px, and the rest of the lit side is a flat field of h. After fix 1, put one `h` leaf-clump hint in the lobe on the right. Only add it if it still reads as a clump and not as speckle. If not, leave the field flat.

3. [MINOR] berry-bush (4,2),(7,3),(2,4): The spec says "clusters of red berries". Three lone R pixels scattered across the dome read as speckle at 1x in context (see the x1 preview), not as fruit. (2,4) also sits next to the left outline. Fix: group them as two 2 px pairs or L-shapes, such as R at (3,2),(4,2) in the lit area and R at (6,3),(7,3) mid-right. Keep each one surrounded by h, and keep R out of the G shadow area. Remove (2,4).

4. [MINOR] berry-bush (7,3): R touches the G shadow pixel at (8,3). The red loses contrast against the shadow edge. Fix: move it to (6,3), so h surrounds it.

5. [MINOR] bush vs berry-bush: Apply any silhouette change from issue 1 identically to both sprites, so the two stay interchangeable.

Counts: 0 blockers, 1 major, 4 minors.
