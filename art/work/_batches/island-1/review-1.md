# Review island-1, round 1

Batch-level: sizes all match spec exactly. Set is mostly coherent (outline, top-left light, ramps), and the three plaster huts match each other. The recurring failure is clipped silhouettes: four of five sprites have outline-less edges where the art runs into the canvas. Fix by widening the canvas (sizes are flexible) and closing the outline, not by cropping the art.

## plantation: FAIL
1. [MAJOR] plantation crops (x28-40, x44-56, x60-72; y0-43): the crops read as spiky cacti or thorned poles, not tall green crops. Each leaf is a closed `k` pod ("kHkkHhhGkkhk" at y2, "kkkk" at y15, "kggGk" at y16) hanging off a straight 4 px pole, and the tops are ragged (stray `k` at (30,1), (38,1), (66,1), (74-1,1) style orphans beside the crown). Fix: redraw as sugarcane or maize. Keep a straight 3-4 px stalk (`H h G`), add 2-3 visible joints as 1 px `G` bands, and make leaves long narrow blades that sweep up and out from the joints, alternating left and right, with the outline only on the outer edge of each blade. The crown is one clean tuft with no isolated `k` pixels. Keep the swap chars H h G g only.
2. [MINOR] plantation hut door (x16-23, y27-42): the door sits flush against the right wall corner and shares the corner outline, with no wall to its right, so it reads as a lean-to. Fix: move the door 2 px left (x14-21) and keep `CC` plaster plus the `k` corner to its right; the same applies to fishery and distillery.
3. [MINOR] plantation: the crop spacing (16 px) gives a lot of empty gap to the hut compared with the stalk width. Consider 12 px spacing once the crops are redrawn.

## lumber-camp: FAIL
1. [MAJOR] lumber-camp roof (x0, y1-8): the left edge of the roof (`V V V... v w` rows) has no `k` outline, while the right edge (x36) and every other edge do. Fix: add `k` at x0 for y1-8 by widening the canvas by 1 px (shed shifts to x1-37, roof `k` at x1 left edge) or overwrite x0 with `k` and shift the roof right.
2. [MAJOR] lumber-camp shed interior (x4-32, y9-21): a solid `K` slab with a roof reads as a dark box or counter, not an open-sided shed. Fix: give the shed visible posts apart from a back wall. Use a back wall of `w`/`W` planks with a `K` shadow strip under the roof (y9-10 only), so the posts (`V v w`, 3 px) read as posts standing in front of a lit back wall, and keep the dark opening to the lower half only.
3. [MINOR] lumber-camp floor log (x8-19, y18-20): a flat 12x3 bar of `F`/`D` with no end circle reads as a plank or bench. Fix: end the right side with a round `F` end cap and outline the bottom with `k`.
4. [MINOR] log pile (x38-63): the `F F D F D` ring noise on each log end is a 2 px speckle pattern. Simplify each end to `F` core with `D` on the bottom-right only.

## mine: FAIL
1. [MAJOR] mine ore cart (x44-59, y8-22): the cart wheels end at y22 while the hill sits on y25. The cart floats 3 px above the ground line. Fix: shift the cart down 3 px so the wheel `kk` bottoms land on y25.
2. [MAJOR] mine cart rim (x59, y12-13): the `N`/`n` rim rows run to the canvas edge with no right `k` outline, so the cart is clipped. Fix: widen the canvas to 61 px and add `k` at x60 for y12-13 (the rim is then 15 wide with outline).
3. [MAJOR] mine hill (x0, y17-24): no left outline; the hill is cut off by the canvas edge, so the silhouette is not closed. Fix: add `k` at x0 for y17-24 by widening the canvas 1 px (shift everything right) and continue the curve so the hill's left foot sits at x0-1 with a rounded base.
4. [MAJOR] mine hill shading (x4-6, y12; x32-35, y9; rim along the left edge): a floating `uuu` blob at (4-6,12) and a `uuuu` patch right of the lintel at (32-35,9) are speckle, and the lit patch at (32-35,9) is on the right, contradicting top-left light. The `u` rim also traces the outline (banding). Fix: delete both patches (set to `T`), and keep the `u` highlight only as one top-left band 2 px in from the outline, from (14,0) to (4,7), with `t` shadow only along the right and bottom.
5. [MINOR] mine cart wheels (x47-58, y19-21): 4 px wheels are seen from the front while the body is a side view. Fix: draw 3 px side-view wheels (`M` ring, `n` hub pixel).

## fishery: FAIL
1. [MAJOR] fishery rack right post (x61, y1-40): the post and beam have no right `k` outline; they are cut off by the canvas edge. Fix: widen the canvas to 63 px and add `k` at x62 for y1-41.
2. [MAJOR] fishery rack proportions (x29-61, y0-41): the rack is as tall as the hut (42 px, more than twice the captain) with fish hung 6-19 px up and 22 empty rows below them. It reads as a gallows or goal frame, and the fish are out of reach. Fix: cut the rack to about 26 px tall (about 1.4x the captain): remove rows y8-23 from the posts, hang the fish at y8-21 so the tails end about 4 px above the ground, and bottom-align the rack and hut on the same last row. The canvas becomes about 63 x 42 only if the hut stays 42 tall.
3. [MINOR] fishery door (x17-25, y24-41): the right wall outline plus the door outline make a 2 px black edge ("kk") that the left door edge does not have. Fix: let the door share the wall outline (door x17-24, drop the extra `k` at x25), or move the door 2 px left per the plantation note.
4. [MINOR] fishery fish (x34-56, y8-19): the tails (`kNNknnk` rows) are noisy with a 1 px `k` gap; simplify to a 3 px wedge tail.

## distillery: FAIL
1. [BLOCKER] distillery copper pot and lyne arm (x51, y6-8 and y23-27): the pot body (`ooo` at y22-27) and the lyne arm (`yyyyyyyy` at y6, `OOOOOOOO` at y7, `oooooooo` at y8) run off the right edge with no outline; the lyne arm is cut mid-pipe. Fix: widen the canvas by 6 px or more, close the pot's right side with `k` at every row, and finish the arm.
2. [MAJOR] distillery lyne arm (x35-51, y4-9): the notes say it bends down, but it only runs horizontal and is cut off. Fix: run it right 6 px, then bend down 3-4 px as a 3 px pipe with an `o` shadow underside and `k` outline, ending at an open spout.
3. [MAJOR] distillery firebox (x51, y34-44): the stone firebox has no right `k` outline (`tt` runs to the canvas edge). Fix: widen the canvas as in item 1 and add `k` at the new right edge for y34-44, and keep the bottom `k` row to match.
4. [MINOR] distillery pot shading (x28-51, y5-35): `y`, `O`, `o` stripes follow the outline on the left and right (banding), and the body has no band, rivet or seam. Fix: use `y` highlight only as a top-left crescent, `O` base, `o` only on the bottom-right edge, and add one `o` belt line across the waist at y28.
5. [MINOR] distillery door (x16-25, y32-45): same flush-to-corner door and 2 px outline as the fishery. Fix: as fishery item 3.
