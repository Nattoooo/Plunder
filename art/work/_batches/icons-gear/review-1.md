# icons-gear review, round 1

Set notes: outline (1 px k), top-left light and palette use are consistent across the batch, all grids are 16 x 16 with legal characters. The weak points are silhouettes that read as the wrong object (shovel, spyglass, sextant, boarding-axe, fishing-net), muddy hilts (cutlass family, rapier), and outline-parallel banding on the garments. Steel ramp (N n M) is used consistently on blades and barrels.

## shovel: FAIL
1. [MAJOR] shovel (3-13,6-14): the blade is a huge steel wedge (about 10 px wide, 9 rows) with a 5 px stub handle, so it reads as a trowel or spatula, not a shovel. Fix: shorten the blade to about 5 px wide x 5 rows at the bottom-left (rows 10-14), lengthen the wooden shaft (V/v) along the diagonal from (10,3) to (7,9), and keep the D-grip at the top.
2. [MINOR] shovel (5-10,6-9): the blade is three flat tones with no edge highlight. Fix: put N only on the left edge and use n/M for the rest once the blade is slimmer.

## spyglass: FAIL
1. [MAJOR] spyglass (1-14,0-14): a uniform 3 px tube tapering to points at both ends reads as a pencil or baton; no objective bell, no eyepiece, no telescoping sections. Fix: widen the top-right (objective) end to 5 px with a gold rim and the L/l lens at its centre, keep a 3 px mid tube, and narrow to a 2 px eyepiece at the bottom-left; separate sections with a single `o` band row across the tube at about (7,7) and (4,10).
2. [MINOR] spyglass (12,0): lone `k` pixel above the tip. Fix: delete it once the end is reshaped.

## compass: PASS
1. [MINOR] compass (6-8,7-10): the hub is off-centre and the `k` at (7,7) reads as a stray hole in the needle. Fix: move the hub to (7-8,7-8) and make the needle a clean 1 px diagonal, red `R` toward the top right, `N` toward the bottom left.

## sextant: FAIL
1. [MAJOR] sextant (0-15,1-14): a dark `K` wedge with a vertical line and a flat bar reads as a sail, tent or boat. The defining parts (graduated arc, swinging index arm, telescope, handle) are missing. Fix: make the frame a fan whose bottom edge is a gold arc with `C` tick pixels every 2 px, draw the index arm as a diagonal `N` line from the apex (7,1) to the arc, add a small telescope stub on the left, and fill the frame with `M` or leave it open rather than a solid `K` mass.
2. [MINOR] sextant (1-14,3-10): the interior is a flat 10 x 8 block of `K`. Fix: open the frame with transparent cut-outs between the arms.

## lockpick: FAIL
1. [MAJOR] lockpick (2-3,3-13 and 5-14,5-13): the picks are 1 px of `N` between two `k` outlines, so the outline dominates and the shapes read as two plain keys. There are no pick tips (hook or rake). Fix: draw the vertical pick as 2 px `N`/`n` with a bent hook tip at the bottom, the diagonal one as a rake with a 1-2 px zig at its end, and keep the ring (0-7,0-7) with its `n` shading.
2. [MINOR] lockpick (0-7,0-7): the ring has a 2 x 2 hole with irregular steps. Fix: round the ring to a clear 3 x 3 hole.

## repair-kit: FAIL
1. [MAJOR] repair-kit (1-14,9): a full-width `r` stripe splits the body in the middle, and the gold clasp (7-9,10-11) sits below it on the body instead of on the lid seam. Fix: move the seam to row 8 (r across), put the clasp at (7-8,7-9) straddling that seam, and keep rows 9-14 as R with r only on the bottom row and right edge.
2. [MINOR] repair-kit (1-14,5-6): lid highlight `E` is a full-width row, which looks like banding. Fix: keep `E` on the left half only, with `e` for the rest.

## fishing-net: FAIL
1. [MAJOR] fishing-net (2-13,0-3): three red floats stacked on top read as cat ears on a sack; the net body is a smooth rounded bag. It does not read as a bundled net. Fix: draw the net as a loose rolled bundle with a rope (`F`/`d`) edge and a diagonal mesh (2 px `k`/`d` knots on `f`), with the floats as 2 x 2 `R`/`E` dots spaced evenly along the top edge, not an ear cluster.
2. [MINOR] fishing-net (0-15,0-13): content is shifted up (rows 14-15 empty). Fix: shift everything down 1 px.
3. [MINOR] fishing-net (7-8,0): orphan `kk` above the middle float. Fix: remove it.

## diving-helmet: PASS
1. [MINOR] diving-helmet (6-9,5-8): the round window is a 4 x 4 square with no corner rounding. Fix: remove the `B` at (9,8) and set (6,8) to `o` to round the window.

## rusty-cutlass: FAIL
1. [MAJOR] rusty-cutlass (7-14,0-9): the blade is dead straight; a cutlass is defined by its curved blade. Fix: bow the blade out 1 px along its length (shift the middle rows 3-5 one pixel right on the cutting edge) and widen toward the tip.
2. [MAJOR] rusty-cutlass (2-7,7-12): the guard and grip are a muddy cluster of `k`, `o`, `O`, `J` pixels. The guard is not perpendicular to the blade, and the grip merges with it. Fix: draw the guard as a clear 5 px `O`/`o` bar running top-left to bottom-right through (3,7)-(7,11), then a 3 px `J`/`j` grip and a pommel.
3. [MINOR] rusty-cutlass: the `q` rust pixels are fire orange and glow. Fix: use `o` and `O` for rust and drop to 4 patches.

## cutlass: FAIL
1. [MAJOR] cutlass (7-14,0-9): same dead-straight blade as above. Fix: curve it as for rusty-cutlass, keeping the two sprites identical except for the rust.
2. [MAJOR] cutlass (2-7,7-12): the gold guard is a single `y` at (3,7) plus an `OO` blob at (4-5,8) that is not perpendicular to the blade. Fix: draw a 5 px `y`/`O` guard running top-left to bottom-right through (3,7)-(7,11), separate from the `J`/`j` grip.

## boarding-axe: FAIL
1. [MAJOR] boarding-axe (2-12,1-6): the head is a symmetric steel dome with a flat bottom, so it reads as a fan, mushroom or hammer. There is no eye, poll or beard. Fix: make the head asymmetric: a 3 px poll at the handle end and a flared cutting edge (5 px tall, `N` highlight on the edge) on the top-left side, with a 2 px dark `M` eye where the handle passes.
2. [MINOR] boarding-axe (0-6,7-14): the handle is wood `V v`, correct, but it has no grip end. Fix: add a `W` knob at (0,13).

## rapier: FAIL
1. [MAJOR] rapier (1-8,8-15): the swept hilt is a clump of `k` pixels with interior blacks at (4-6,12-13) and (5,10), with the `J` grip barely visible. Fix: draw the guard as a 1 px `y`/`O` cross-bar plus a single swept arc `O` from the bar to the pommel, show a 3 px `J`/`j` grip, and remove interior `k` unless it separates shapes.
2. [MINOR] rapier (8,12-13): `o` pixels float beside the clump as orphans. Fix: connect them to the arc or delete them.

## flintlock: PASS
1. [MINOR] flintlock (8-9,8-9): the trigger guard is two stray `o` pixels. Fix: draw a 3 px `o` hook under the lock at (8,8)-(10,9).

## blunderbuss: PASS
1. [MINOR] blunderbuss (9-14,4-10): the grip and lock are copied from flintlock, so the two read as one silhouette family apart from the flare; that is acceptable, but a 1 px `y` lock plate would differentiate them. Fix: set (9,5) to `y`.

## musket: PASS
1. [MINOR] musket (0-5,12-14): the butt is a flat rectangle with a `w` plate. Fix: round the butt by dropping (0,12) and giving the bottom a 1 px downward curve.

## leather-vest: FAIL
1. [MAJOR] leather-vest (2,1-12 and 13,2-13): a 1 px `v` stripe runs down the whole left edge and a `j` stripe down the right edge, which is banding parallel to the outline. Fix: remove both stripes (make them `J`) and keep a highlight only on the top-left shoulder and a shadow only on the bottom-right hem.
2. [MAJOR] leather-vest (1-14,2-13): the silhouette is a box with no armhole notches, so it reads as a bib or apron. Fix: cut a 2 x 3 armhole notch from each side at rows 4-6 (remove (1-2,4-6) and (13-14,4-6) and outline them).
3. [MINOR] leather-vest (7-8,8-12): the zig-zag `F` buttons alternate columns. Fix: put 3 `F` buttons in one column at (6,8), (6,10), (6,12) on one side of the seam.

## tricorn: FAIL
1. [MAJOR] tricorn (1-14,1-13): the `K` body (#3a2a3a) is almost the same value as the `k` outline and as the dark inventory slot, so the hat dissolves into a flat dark shape with one gold line. Fix: build the hat from `M`/`m` (steel black) with `K` only for the underside shadow, and give the crown a top-left `n` highlight.
2. [MAJOR] tricorn (4-11,1-5): the crown is a flat 6 x 4 rectangle and the brim a flat wedge, so no three-corner shape reads. Fix: show two raised brim corners at the left and right (rows 3-6) and a front corner pointing down, with the gold trim `O` following all three brim edges, and give the crown a 1 px curved top.
3. [MINOR] tricorn (5,2-3): the lone `M` highlight reads as a stripe. Fix: extend it to a 2 px top-left highlight.

## captains-coat: FAIL
1. [MAJOR] captains-coat (1-14,3-11): repeated vertical stripes `E R r R e R R r r` read as banding, with an `E` edge column at x=1 (rows 3-9) and an `e` lapel line at x=5 on the left only. Fix: remove the `E` column, keep one lapel line per side (`e` at x=5 and `r` at x=10), and shade only the top-left and bottom-right.
2. [MAJOR] captains-coat (1-2,10-11): gold `yO`/`oo` cuff pixels appear on the left side only, breaking symmetry. Fix: mirror them to (13-14,10-11) or remove them.
3. [MAJOR] captains-coat (1-14,2-14): the silhouette is the same box as the vest, with no long skirt or flare, so it does not read as a long coat. Fix: flare the lower hem to 16 px at rows 13-14 with a centre split `k` at (7,13)-(8,14), and add armhole notches as for the vest.
4. [MINOR] captains-coat (2-3,2 and 12-13,2): the gold epaulettes are asymmetric (`yO` vs `OO`). Fix: use `yO` on the left and `Oo` on the right.
