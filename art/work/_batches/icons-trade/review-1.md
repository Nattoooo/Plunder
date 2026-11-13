# Review round 1: icons-trade

Set-level notes: all 15 icons are 8 x 8 (no size drift), use only palette characters, have a 1 px `k` outline and top-left light. Against the approved rum icon (clipped corners, 3 tones per material, a clear silhouette), several icons fall short on silhouette. Spices, cocoa and amber are all near-identical orange-gold discs. Sugar and salt are both a white top on a brown base. Tea, furs and wine fill the full square width with no corner relief, so they look like blocks.

## sugar: PASS
1. [MINOR] sugar (2,1): the white heap is flat `P` with no `p` shade tone. Fix: change (3,2),(4,2) to `p` if a heap volume cue is wanted.
2. [MINOR] sugar (5,5),(5,6): the `d` pixels form a vertical stripe. Fix: shift (5,6) to `D`, keeping one `d` at (5,5).

## tobacco: FAIL
1. [MAJOR] tobacco (0,0)-(7,7): silhouette is a near-rectangle with 1 px clipped corners, the shape of a spool, barrel or burger, not a leaf bundle. No leaf shape or tapering ends read. Fix: taper the ends to point or curl, e.g. rows 0 and 7 as `..kkkk..` with leaf tips leaning diagonally (`.k` stagger at x1 and x6), and make the flare asymmetrical (one lean) so it reads as leaves, not a cylinder.
2. [MAJOR] tobacco (1,6): `W` shadow sits on the lit left side of the lower leaves, against top-left light. Fix: set (1,6) to `V` and put `W` on the right (x5,x6) only.
3. [MINOR] tobacco (1,4)-(6,4): the `f` string spans the whole waist as a full band, so it reads as a stripe. Fix: keep it 4 px but add `k` knot ends, or add a visible knot.

## coffee: PASS
1. [MINOR] coffee (2,2) vs (5,5),(5,6): the seam is 1 px on bean 1 and 2 px on bean 2, so the two beans differ. Fix: make the seam `w` at (2,1),(2,2) for bean 1, matching bean 2.
2. [MINOR] coffee (0,0)-(7,7): the beans are small rounded squares with a lot of empty corner. Fix: optional, widen each bean by 1 px to 6 x 4 for a more bean-like oval.

## tea: FAIL
1. [MAJOR] tea (3,3)-(5,5): the `H`/`h` stamp is a plus-shaped cross, which reads as a medical cross or clover, not a leaf. Fix: draw a diagonal leaf: (5,3) `H`, (4,4) `H`, (3,5) `h`, (4,3) `H`, (3,4) `h`, with a 1 px stem at (2,6) in `h`, and clear the rest of the cross.
2. [MAJOR] tea (0,0)-(7,7): a perfect filled square with no top face and no corner relief. This is not "slight angle from above" like rum. Fix: add a lid row (`F` highlight at row 1, `V` row 2, `k` line at row 3) and clip the four corners with `.`.
3. [MINOR] tea (6,5): a lone `W` pixel on the right edge reads as noise. Fix: make it `v`, or extend a `W` column along x6 from row 3 to row 5.

## spices: FAIL
1. [MAJOR] spices (0,0)-(7,7): the silhouette is a plain octagon disc, identical to cocoa. The heap and sack share one outline and read as an orange ball on a brown base. Fix: make the sack narrower and taller (`.kvvvvk.` rows 4-6) with a visible `f` tie at row 4, and make the heap a smaller 4-5 px wide mound above it (`..kQQk..` / `.kQqqqk.`), outlined so the sack neck is visible.
2. [MINOR] spices (1,4)-(6,4): the heap/sack boundary has no `k` or tone step, so the colours just butt together. Fix: add a row of `k` or `W` at the sack mouth under the mound.

## silk: FAIL
1. [MAJOR] silk (0,0)-(7,7): the "rolled bolts" are flat pink rectangles with no roll cue, so they read as pink bricks or sausages. Fix: round the ends of each bolt and draw a spiral end on the left: `E` ring at x1, with `R` at (2,1) as the rolled inner turn.
2. [MAJOR] silk (0,0)-(7,3) vs (0,4)-(7,7): the upper bolt has 2 interior rows and the lower bolt has 3, so the bolts differ in size. Fix: make both bolts 3 rows high (shift the k divider to row 3 and shrink the lower bolt by removing the (1,6) row), or make both 2-high with a 4 + 4 row split.
3. [MINOR] silk (6,2),(5,3): `R` stacks diagonally at the right edge and looks like a hard band. Fix: use only `R` at the two outermost columns.

## cotton: FAIL
1. [MAJOR] cotton (0,0)-(7,7): the two lobes plus the pointed `C` base give a heart silhouette, and the green below looks like a radish or turnip top. It does not read as a boll on a stem. Fix: draw 3 distinct puffs (lobes at x1-2, x3-4, x5-6 with `k` notches between at row 1) over a 4-point `G` calyx and a 2 px `h` stem running to the bottom row.
2. [MINOR] cotton (6,3): a lone `C` pixel on the right edge. Fix: extend `C` shadow to (6,2) and (5,3) so the shading is a coherent shape.

## salt: FAIL
1. [MAJOR] salt (0,0)-(7,7): the silhouette is a narrow white cone over a brown trapezoid, essentially the same read as sugar (white top, brown base). In the hold the two are hard to tell apart. Fix: widen the heap to 6 px with an uneven crystal top (`.kPpPk.` then `kPPPpCk`), deepen the bowl with a `V` lip and a round `W` base, and put a bowl rim `k` line under the heap.
2. [MINOR] salt (3,0): the top `kk` is a 2 px cap, so the heap reads as a pointed tip rather than coarse crystals. Fix: replace with a stepped 3-1-2 profile.

## cocoa: FAIL
1. [MAJOR] cocoa (0,0)-(7,7): the silhouette is an exact 4-6-8-8-8-8-6-4 circle, so the pod reads as an orange fruit or ball, not a cocoa pod. Fix: make it an elongated oval leaning diagonally, 5 x 8, with a pointed tip at upper right and a small stalk (`o` at (6,0)), keeping `Q` top-left, `q` body and `o` right shade.
2. [MAJOR] cocoa vs spices: the two icons look the same colour and shape at 1x. Fix: the diagonal pod above resolves this.
3. [MINOR] cocoa (5,1),(6,2)-(6,6): the `o` forms a continuous 1 px stripe along the right outline (banding). Fix: break it up so `o` is only on the lower right.

## indigo: FAIL
1. [MAJOR] indigo (0,3)-(7,4): the perspective is wrong. The `k` row 3 is the bottom of the top brick, but the lower brick's `l` top face (row 4) then sits in front of the brick above, so it reads as a pedestal or stool, not stacked bricks. Fix: draw both bricks the same width (6 px), the top one offset 1 px right; the top brick shows its `l` top and `B` front, and the lower brick shows only its `B` front below, with `l` visible only on the exposed left strip.
2. [MINOR] indigo (0,5)-(7,6): two identical `B` rows with no shade. Fix: add `b` shade on the right column x6 for rows 5-6.
3. [MINOR] indigo (0,3)-(7,3): an unbroken full-width `k` row reads as a heavy black bar. Fix: reduce to `.kkkkkk.` and let the lower brick's corners step.

## wine: FAIL
1. [MAJOR] wine (0,4)-(7,6): the body is the full 8 px width and only 2 rows tall, with a 2 px neck, so it reads as a round potion flask or an Erlenmeyer, not a wine bottle. Fix: narrow the body to 6 px (x1-6) with straight sides across rows 3-6, and a 2 px neck over rows 0-2.
2. [MAJOR] wine (1,3)-(6,6): the red area is flat `R` with no highlight or shadow tone, which contradicts the 2-3 tone rule and the top-left light. Fix: add `e` at (2,3),(2,4) as the lit left edge and `r` at (6,5),(6,6) as shadow.
3. [MINOR] wine (2,2),(3,2): the `kJJk` cork is dark leather brown, not cork tan. Fix: use `f`/`D` for the cork.

## furs: FAIL
1. [MAJOR] furs (0,0)-(7,7): the silhouette (two bumps on top, a full-width rectangle, a bottom fringe) reads as a tunic or backpack, not a pelt. Fix: make an irregular pelt outline with a skewed edge: a notched neck at top, four stubby leg bumps at the corners (x0 row 1, x7 row 1, x0 row 6, x7 row 6), and a tail nub at the bottom right.
2. [MAJOR] furs (1,1)-(1,4): the `D` column is a 1 px stripe running along the left outline (banding). Fix: limit `D` to (1,1),(2,1),(1,2).
3. [MINOR] furs (2,6),(4,6): the fringe notches are uneven. Fix: notch at x1, x3, x5 for a regular shaggy edge.

## whale-oil: PASS
1. [MINOR] whale-oil (0,0)-(7,7): the plain cylinder is clear as a tin but has no lid rim or handle. Fix: optional, add an `M` ring at row 1 under the top face.

## porcelain: PASS
1. [MINOR] porcelain (3,0),(4,0): the top is a closed `kk` cap with no mouth opening or lip, so the neck reads as a bottle neck. Fix: widen row 0 to `..kkkk..` and show a `K` mouth at (3,1),(4,1)... or flare the lip by 1 px each side at row 1.
2. [MINOR] porcelain (1,5)-(6,5): the band is flat `B`. Fix: add `l` at (1,5),(2,5) as the highlight for blue and white contrast.

## amber: PASS
1. [MINOR] amber (1,2),(2,1),(2,2),(1,3): the highlight uses `Y`, `y`, `O` and `o`, which is 4 tones, despite the notes saying exactly three. Fix: drop (1,2) `Y` to `y`, or accept it as the single glint pixel and correct the notes.
2. [MINOR] amber (0,0)-(7,7): the shape is a generic blob with no facet, so it reads as a gold nugget. Fix: add a `o` facet edge on the lower right to suggest a polished face.
