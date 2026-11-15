# icons-gear review, round 2

Only the families that failed in round 1 are reviewed. Compass, diving-helmet, flintlock, blunderbuss and musket passed in round 1 and are not listed. Outline, top-left light and palette use remain consistent across the set. The grids were rendered at 20x and checked against the sheet.

## shovel: PASS
Round 1: blade slimmed to 5 px and shaft lengthened (fixed); blade has an N left edge (fixed). Reads as a spade with a T-grip.
1. [MINOR] shovel (4-10,10): the top row of the blade is all `M`, so the darkest tone sits on the top face against top-left light. Fix: make (5,10) `N` and (6-8,10) `n`, keep `M` at (9,10).

## spyglass: PASS
Round 1: objective bell widened with gold rim and lens (fixed), sections banded with `o` rows (fixed), lone `k` removed (fixed). Reads as a telescope.
1. [MINOR] spyglass (9-14,1-6): the bell is only 5 px against a 2 px tube, which leans toward a sceptre with a gem. Fix (optional): widen the tube to 3 px for rows 6-9.

## sextant: FAIL
Round 1: arc ticks (fixed), diagonal index arm (fixed, but see 2), telescope stub (fixed), handle (fixed). Interior is still a solid block.
1. [MAJOR] sextant (2-13,3-12): the frame still reads as a bell or tent on a post. Both sides run almost vertical below row 7 (left edge x=4,4,3,3,2,2), so the fan is narrow, the interior is a solid 8 x 8 `M` grey mass, and the "brass" instrument is mostly steel grey. Fix: widen the fan so each side steps out 1 px per row from the apex (7,1) to the arc ends at (1,12) and (14,12); cut transparent windows into the interior between the index arm and each side arm (for example (4-5,8-10) and (10-11,8-10), outlined with `k`), leaving the gold `y`/`O` frame arms as the main mass.
2. [MINOR] sextant (6-10,3-11): `N` index arm on `M` has low contrast and disappears at 1x. Fix: draw the arm in `Y`/`y` so it reads as a brass arm.

## lockpick: FAIL
Round 1: ring now has a clear 3 x 3 hole (fixed). Vertical pick has a hook foot (fixed). Diagonal pick has no tip (not fixed).
1. [MAJOR] lockpick (6-13,6-15): the diagonal pick is a plain 2 px bar that tapers away, with no rake or hook. With the L-shaped vertical pick the set reads as calipers or a plain bar and bracket, not a pick set. Fix: end the diagonal at (12,13) with a 1 px zig: set (13,13) to `N`, (12,14) to `k`, (13,14) `N`, (14,14) `N`, (13,15) `k`, so the tip shows two teeth.
2. [MINOR] lockpick (2-5,5-6): a `k` row at row 6 separates the ring from the vertical pick, so the picks hang loose. Fix: set (2-3,6) to `N`/`n` so the pick grows out of the ring.

## repair-kit: PASS
Round 1: seam moved to row 8 (fixed), clasp straddles the seam (fixed), lid highlight split `E`/`e` (fixed). Reads as a red toolbox with a handle.
1. [MINOR] repair-kit (14,9-13): `r` stripe down the right edge reads slightly as banding. Fix: keep `r` only at (14,13) and the bottom row.

## fishing-net: FAIL
Round 1: floats are now spaced evenly (fixed), orphan `kk` removed (fixed), content shifted down (fixed). Silhouette and bundle (not fixed).
1. [MAJOR] fishing-net (0-15,4-14): the body is still a flat 14 x 9 rectangle with square corners and a regular checker of `d` pixels, so it reads as a woven mat, basket or placemat with cherries on top, not a bundled net. Fix: round the body: row 5 `..kFFFFFFFFk..` style (drop (1,5) and (14,5)), row 13 `..kDDDDDDDDk..`, row 14 `...kkkkkkkk...`; cinch it with a 2 px `F`/`d` rope band at x=7-8 running down rows 5-13; and leave 2 `F` rope tails hanging at (5,14)-(5,15) and (10,14)-(10,15) so it looks tied up.
2. [MINOR] fishing-net (1-4,2-3): floats have a bright `E` on the left only and `kk` caps; fine, but they sit exactly in the gaps of the mesh. Fix: none required.

## rusty-cutlass: FAIL
Round 1: rust is now `o`/`O` in 4 patches (fixed). Blade curve (not fixed). Guard and grip (not fixed).
1. [MAJOR] rusty-cutlass (5-14,0-8): the blade is still dead straight, stepping exactly 1 px left per row. Nothing says cutlass. Fix: shift blade rows 3-5 one pixel right (x+1) so the edge bellies out on the lower right, keep rows 1-2 and 6-8 as they are, and let the tip row 0-1 curl back to (12,0).
2. [MAJOR] rusty-cutlass (1-6,8-10): the guard is `OO` at (2-3,8) plus `o` at (4-5,9), a shallow near-horizontal smear, not perpendicular to the blade, with interior `k` at (3-4,9). Fix: draw a 5 px guard running up-left to down-right: (2,7) `O`, (3,8) `O`, (4,9) `o`, (5,10) `o`, (6,11) `o`, outlined, with the grip `J`/`j` starting below it.

## cutlass: FAIL
Round 1: blade is still straight (not fixed); guard still not a clear perpendicular bar (not fixed).
1. [MAJOR] cutlass (5-14,0-8): same dead-straight blade as the rusty-cutlass. Fix: identical curve, so the two sprites match except for the rust: shift blade rows 3-5 one pixel right (x+1), curl the tip to (12,0).
2. [MAJOR] cutlass (1-6,8-10): the gold guard is `yy` at (2-3,8) plus `y`/`O` at (4-5,9), a short horizontal blob with interior `k`. Fix: draw the 5 px guard up-left to down-right: (2,7) `y`, (3,8) `y`, (4,9) `O`, (5,10) `O`, (6,11) `o`, outlined, same cells as rusty-cutlass.

## boarding-axe: PASS
Round 1: head is now asymmetric with a flared left edge, dark poll on the right, and eye (fixed); `W` knob at (1-2,14) (fixed). Reads as an axe at 1x.
1. [MINOR] boarding-axe (6-8,1): the 3 px `kkk` cap above the head is a flat top that makes the head look slightly domed. Fix: shorten to (7-8,1) `kk` and step the head up one row on its left.

## rapier: PASS
Round 1: hilt now has a perpendicular `y` guard, a swept `O` arc and a `J` grip with pommel (fixed); orphan `o` pixels connected (fixed). Reads as a swept-hilt rapier.
1. [MINOR] rapier (3-5,13-14): interior `k` at (3-5,13) is a black hole between grip and arc. Fix: change (4,13) to `K`.

## leather-vest: PASS
Round 1: edge stripes removed (fixed); armhole notches cut (fixed, only 1 px deep, acceptable); buttons in one column (fixed). Reads as a vest.
1. [MINOR] leather-vest (7,4-12): the full-height dark `j` seam is a hard vertical line. Fix: stop it at row 11 and let the hem `j` row take over.
2. [MINOR] leather-vest (1-2,4-6): notches are 1 px deep, not 2. Fix: optional, deepen by 1 px.

## tricorn: FAIL
Round 1: `K` body replaced by `M`/`m` (fixed); gold trim follows the brim (fixed); crown highlight extended (fixed). The result no longer reads as a black hat with three corners.
1. [MAJOR] tricorn (0-15,1-14): the hat is mid steel grey (`M`/`n` highlights) so it reads as a grey helmet or shield, and the brief asks for a black tricorn. The crown (4-11,1-5) is separated from the brim by a ruler-straight 16 px gold bar at row 6, so it looks like a grey cone in a gold dish, and the side corners (0-3,3-5) and (12-15,3-5) read as detached ears. Fix: use `m` as the base with `M` only as the top-left highlight and `K` for the underside; drop the gold bar to a 1 px trim that follows the brim edge, rising from (1,5) over the sides and curving down to the front point at (7-8,13), and attach the raised corners to the crown with `m` fill at (3-4,4-5) and (11-12,4-5).
2. [MINOR] tricorn (14,5-6): `Mm` pixels at the right wing read as a stripe. Fix: set (13,5) to `m`.

## captains-coat: PASS
Round 1: `E` edge column removed, one lapel line per side (fixed); cuffs removed (fixed); armhole notches and a flared hem with a centre split (fixed); epaulettes mirrored (fixed). Reads as a crimson coat with gold buttons.
1. [MINOR] captains-coat (5-10,3-12): three vertical lines (`e` lapel, dark `rr` centre, `r` lapel) still verge on banding. Fix: shorten the dark centre `rr` to rows 5-11.
2. [MINOR] captains-coat (0-15,2-14): no sleeves, so it sits close to the vest silhouette. Fix (optional): extend the shoulders to rows 5-10 at x=0 and x=15 as sleeve stubs.
