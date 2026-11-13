# Review round 1: icons-gear

Set-level notes. All 18 grids are exactly 8 x 8, palette-legal, outlined with `k`. The set matches the approved `rum` / `sugar` icons in outline and general tone use. Too many silhouettes fall back on the same thing: a 2 px diagonal stick (shovel, spyglass, rusty-cutlass, cutlass, rapier, musket) or a symmetric boxy blob with two "ears" at the top (fishing-net, leather-vest, tricorn, captains-coat). Rum and sugar (approved) are readable from the silhouette alone; these must be too. Light direction is inconsistent in several sprites (rusty-cutlass, leather-vest, tricorn).

## shovel: FAIL
1. [MAJOR] shovel (3,4)-(5,7): the spade is 2 px wide inside, the same width as the handle (2 px), so there is no blade silhouette. It reads as a hammer or paddle. Fix: widen the blade to 4 px interior at rows 5-6 (e.g. row 5 `kNNnMk` spanning x0-5, row 6 `kNnnMk`), keep the handle 2 px, and round the bottom corners on row 7.
2. [MINOR] shovel (3,1)-(5,1): the T-grip `VVw` is only 3 px wide and the same tone as the handle. Fix: leave, or make it 4 px wide with the `k` ends so it reads as a D-grip.

## spyglass: FAIL
1. [MAJOR] spyglass (1,2)-(6,5): a uniform 2 px brass diagonal with no change of width. It reads as a brass rod or a baton, and the notes promise rings and a dark eyepiece that are not drawn. Fix: widen the objective end at (5,1)-(6,2) to 3 px, add one dark ring `o`/`k` band across the tube at about (3,3)-(4,3), and make the eyepiece end (0,5)-(1,6) narrower and darker (`K`/`o`).
2. [MINOR] spyglass (0,5),(1,5): the `kk` at the left of row 5 is a 2 px outline stub that breaks the diagonal's step rhythm. Fix: make the diagonal 1-1-1 by removing (0,5).

## compass: PASS
1. [MINOR] compass (3,4),(2,5): two `p` pixels in the lower-left of the dial are scattered highlights with no physical meaning. Fix: change both to `F`, or reduce to one `p` at (2,4).
2. [MINOR] compass (4,2),(4,3): the red needle is only two diagonal pixels. Acceptable at this size; keep it.

## sextant: FAIL
1. [MAJOR] sextant (0,1)-(6,7): the whole shape is a solid gold wedge. It reads as a gold nugget or a cheese slice (and sits too close to `amber`), not as an instrument. A sextant needs an open arc frame. Fix: redraw as a 3 px thick arc along the lower-right edge with an empty (`.`/`K`) interior and a 1-2 px index arm from the pivot at (1,1) to the arc, plus a small telescope stub.
2. [MAJOR] sextant (2,4) and (4,3): the dark pivot `k` at (2,4) is in the middle of the body, not at the apex of the arc, and `y` at (4,3) is a stray highlight on a shadow-side tone. Fix: move the pivot to the apex near (1,1)-(2,2) and remove (4,3) `y` (use `O`).

## lockpick: FAIL
1. [MAJOR] lockpick (4,3)-(7,6): the two picks are single `n` pixels separated by `k` pixels, e.g. row 4 `kMMnknk`, so they merge into a dark noisy mass and the object reads as a key or a magnifier. Fix: draw two clearly separate 1 px picks fanning from the ring, each with a 1 px bent tip, separated by a transparent gap rather than `k` fill, or draw one long pick and one short pick.
2. [MINOR] lockpick (2,2),(3,2),(2,3),(3,3): the ring hole is a 2 x 2 solid `k`, which is heavier than the ring itself. Fix: use `K` for the hole.

## repair-kit: PASS
1. [MINOR] repair-kit (1,4)-(6,4): no lid seam, so the gold clasp floats on the body. Fix: draw the seam as `r` along row 3 under the `e` highlights, or leave.
2. [MINOR] repair-kit (1,3),(2,3): the `e` highlight is a pink-orange that is slightly brighter than other red highlights in the game. Acceptable.

## fishing-net: FAIL
1. [MAJOR] fishing-net (1,0)-(6,1): the two red floats are 2 x 1 flat blobs at the upper corners and, with the rounded tan body, the icon reads as a sack with ears or a bear head, not a net. Fix: make the floats 2 x 2 round bobbers with an `E` highlight pixel, spaced along the top edge of the bundle, and break the silhouette of the body with a trailing rope end at the bottom.
2. [MAJOR] fishing-net (3,3),(4,4),(3,5),(5,5): the `d` mesh pixels are scattered with no regular pattern, so the net does not read as a net and looks like noise. Fix: draw a regular diagonal lattice of `d` (every other pixel, checker pattern) over rows 3-6.

## diving-helmet: FAIL
1. [MAJOR] diving-helmet (1,3)-(5,4): the window is off-centre and not round: row 2 has `BB` at x3-4, rows 3-4 have blue from x1/x2 to x5, and the `l` highlight at (1,3) touches the outline with no brass frame on the left while the right has a frame at x6. Fix: centre a 3 x 3 window at x2-4 (rows 2-4) with a clean brass ring around it, `l` at (2,2) only.
2. [MAJOR] diving-helmet (0,0)-(7,7): a gold ball with a blue spot is nearly the same silhouette as `compass`. Fix: add the helmet identity: a wider flared collar on rows 6-7 (x0-7), and a 1 px top finial or rivet at (3,0)-(4,0).

## rusty-cutlass: FAIL
1. [MAJOR] rusty-cutlass (1,4)-(5,4): the guard `nnn` is the same iron tone as the blade, so there is no crossguard and the item reads as a stick. Fix: draw the guard as 3 px `M`/`m` at (1,4)-(3,4) offset from the blade, with a visible `k` gap between guard and blade.
2. [MAJOR] rusty-cutlass (6,1),(5,2): light is reversed. `N` (highlight) is on the right of row 1 (`knNk`) while `n` is on the left, which contradicts the top-left light used on `cutlass`. Fix: swap to `kNnk` as in `cutlass`.
3. [MINOR] rusty-cutlass (3,3),(2,5): the rust uses wood `W`, which is acceptable, but only two patches exist. Fix: add one more `W` at (5,1) for a pitted edge, and keep the blade 2 px wide.

## cutlass: PASS
1. [MINOR] cutlass (2,0)-(6,3): the blade is straight and short; a cutlass should show a slight curve. Fix: shift the tip to (6,0)/(7,0) so the last two rows step 1-2-2.
2. [MINOR] cutlass (1,5)-(2,6): the grip is a 2 x 2 lump with no pommel. Fix: add a `O` pixel at (1,7) as pommel.

## boarding-axe: FAIL
1. [MAJOR] boarding-axe (1,1)-(6,3): the head is a symmetric rounded blob with no cutting edge flare, so it reads as a hammer or mallet. Fix: make the head a wedge: a 3 px tall bit flaring to the left at x0-2 (rows 1-3) with a bright `N`/`U` edge at x0, and a thin 2 px poll on the right at x4-5.
2. [MINOR] boarding-axe (4,1),(5,1): `kk` bump on the head's top edge steps unevenly. Fix: smooth the outline to one straight step.

## rapier: PASS
1. [MINOR] rapier (2,0)-(6,3): the blade is 2 px wide, the same as `cutlass`, so "slim" is not visible. Fix: none required; optionally make the tip 1 px wide at (6,0).
2. [MINOR] rapier (2,6): the grip is a single `J` pixel. Fix: none required.

## flintlock: FAIL
1. [MAJOR] flintlock (0,1)-(7,7): a 6 x 2 barrel directly above a 3 x 3 block stock reads as an anvil or a boot. There is no angled grip, no trigger guard, no muzzle projection. Fix: redraw with the barrel as a 1-2 px band along the top (x1-7, rows 2-3) and a grip angled down-left from the breech, 2 px wide for rows 4-7, with a 1 px `k` trigger gap at (4,4).
2. [MINOR] flintlock (4,4): single `O` lock-plate pixel; reads as an orphan. Fix: make it a 2 px lock plate at (3,3)-(4,3) or remove.

## blunderbuss: FAIL
1. [MAJOR] blunderbuss (2,1)-(6,4): the barrel is a horizontal 5 x 3 slab with a vertical 2 px column at x5-6, so the shape is an L-block with no flared muzzle. Fix: draw the barrel as a diagonal band from the stock to the top right, with the muzzle end widening from 2 px to 4 px over the last 2 rows (rows 0-1, x4-7).
2. [MINOR] blunderbuss (4,4): `n` between stock and barrel is a lone tone step. Fix: use `M` to keep the shadow side continuous.

## musket: FAIL
1. [MAJOR] musket (0,0)-(6,7): a 2 px diagonal stick with a small brown block at the end: the silhouette is identical to `rapier`/`cutlass` and nothing says gun. Fix: make the stock a clear 3 px wide butt at (0,5)-(2,7) with a downward hook, add a 1 px `O` lock/trigger at (2,4), and keep the barrel 1-2 px.
2. [MINOR] musket (4,5): `M` pixel sits on the stock top and breaks the diagonal. Fix: change to `W`.

## leather-vest: FAIL
1. [MAJOR] leather-vest (0,0)-(7,2): the two 2 px shoulder straps with a 2 px gap between them read as bear ears; with the centre seam it looks like a bear face, not a vest. Fix: shoulders as one 2 x 1 strap each, widened to 3 px, with a V neck, or cut the sides into armholes at rows 1-3 and open the neck as a V (1 px at row 1, 2 px at row 2).
2. [MAJOR] leather-vest (5,4),(5,5),(1,6),(5,6): shadow `j` appears on the left side of the right panel (x5) and on the left edge at (1,6), against the top-left light. Fix: put `J` highlight on the left edge of each panel and `j` on the right edge of each panel (x2 and x6), not at x5 and x1.
3. [MINOR] leather-vest (3,6),(4,6): the two gold buckles are side by side on the seam. Fix: one `y` buckle per panel at (2,6) and (5,6).

## tricorn: FAIL
1. [MAJOR] tricorn (0,0)-(7,4): a 6 x 4 rectangle with two ears and a notch reads as a cat or a bag, not a tricorn. A tricorn is a brim wider than the crown with upturned corners. Fix: draw a low crown at x2-5 (rows 1-3), a wider brim at x0-7 (rows 3-4) with the corners lifted at (0,2) and (7,2), and the gold trim along the brim edge.
2. [MAJOR] tricorn (2,1),(6,1),(2,3): `M` highlights are placed symmetrically and at random (including the right side), which contradicts the top-left light. Fix: keep one highlight run on the upper-left edge only, (1,1)-(2,1).
3. [MINOR] tricorn (all): dark `m` body on the dark inventory panel has low contrast. Fix: use `M` as the base and `m` as shadow.

## captains-coat: FAIL
1. [MAJOR] captains-coat (0,0)-(7,7): the silhouette is a solid 8 x 8 square with a flat top edge. There are no shoulders, sleeves, collar, neck opening or skirt flare, so it reads as a red box or book, not a long coat. Fix: cut a V neck at (3,0)-(4,0), narrow the shoulders by cutting (0,0),(7,0), flare the skirt at the bottom (widen row 7 and open a 1 px centre vent at (3,7)-(4,7)), and show the sleeves with an `r` line at x2 and x5 from rows 2-4.
2. [MAJOR] captains-coat (3,1),(4,1),(3,2),(4,2): the lapel is a 2 x 2 cream block, not a V. Fix: make it a V: `CC` at (2,1),(5,1) narrowing to `C` at (3,2),(4,2) and converging to a point at (3,3)/(4,3).
3. [MINOR] captains-coat (3,3)-(3,6): the button column alternates `r`/`y`/`r`/`y`, which reads as banding. Fix: put `y` buttons at (3,3),(3,5) only on a straight `R` placket and drop the `r` pixels.
