# Review round 1: icons-trade

Set notes: outline (1 px k) and top-left light are consistent. Level of detail is not. rum, wine and porcelain are well built, while silk, indigo, furs and whale-oil are flat slabs. Sack material is inconsistent (sugar uses the d D f ramp, spices uses the V v W wood ramp). No size drift (all 16 x 16).

## rum: PASS
1. [MINOR] rum (13,11)/(14,11): the body outline jumps from x=13 (rows 6-10, 12) to x=14 at row 11, a 1 px bump under the handle. Fix: make row 11 `..kfDDDDDDDDdk..` and move the handle-bottom k row up or down by one so the joint has no bump.
2. [MINOR] rum (5,0)-(10,2): the cork is a 1 px-high cap as wide as the neck, so the neck reads as a lid. Optional: narrow the neck rows 3-4 to 4 px inside.

## sugar: PASS
1. [MINOR] sugar (4,5)-(11,5): the 1 px rope row is the only sack cue. Optional: add one `d` fold pixel at (5,8) so it reads less like a jar with a white lid.

## tobacco: FAIL
1. [MAJOR] tobacco (2,2)-(13,13): reads as a brown walnut or acorn, not leaves. The mass has no leaf separations, and the wandering 1 px `j` veins (x=7,7,6,7,7,8 on rows 5,6,9-12) look like noise. Fix: draw 3 distinct overlapping leaves fanned from the tie, each with its own k edge on the inside, and one straight midrib `j` per leaf.
2. [MAJOR] tobacco (1,7)-(2,8): the string band's `kk` ends poke out 1 px past the body outline on the left only (body k at x=2 on rows 4-6, band k at x=1), so it is asymmetric and a black blob. Fix: keep the band inside the silhouette (k at x=2 on both sides, or add a matching bulge at x=14), with `f`/`D` string and a 1 px knot.
3. [MINOR] tobacco (4,1),(7,1),(8,1),(11,1): leaf-tip outline pixels are single dots. Fix: give each tip 2 rows or remove them.

## coffee: FAIL
1. [MAJOR] coffee bean 1 (2,4)-(5,4), bean 2 (10,4)-(13,4)... (all three beans): the crease is a straight `jjjj` bar on the 4th of 5 rows, near the bottom, not through the centre. The bean reads as a barrel or bowl. Fix: put a 1 px `j` S-curve through the middle of each bean (3 px diagonal, 1-1-1), leaving the body `v`/`W`.
2. [MAJOR] coffee (0,3)-(0,4) and (15,5)-(15,6): beans touch the canvas edges (x=0 and x=15) with no margin, and the group is a loose triangle with 1 px overlaps in rows. Fix: tighten into a cluster inside x=1..14 and give each bean 7 x 6 or larger, with enough shared contact to read as one pile.
3. [MINOR] coffee: the three beans are identical stamps. Vary one by 1 px (rotate 1 bean 90 degrees) so it doesn't look pasted.

## tea: FAIL
1. [MAJOR] tea (5,7)-(10,11): the green stamp is a symmetric blob with no stem or midrib. At 1x it reads as a green cross or arrow (first-aid mark), not a leaf. Fix: redraw as a tilted leaf with a 1 px `G` midrib and a 1-2 px stem at the lower left, e.g. tip at (9,7), widest at row 9, stem ending (6,12).
2. [MINOR] tea (0,3)-(15,12): the crate runs edge to edge (x=0 and x=15) and has no slats or nails. Fix: narrow to x=1..14 and add two 1 px `D` nail dots at (2,4) and (13,4).

## spices: FAIL
1. [MAJOR] spices (3,6)-(12,13): the sack uses the wood ramp `V v W`, while the sibling sack (sugar) uses `d D f`. The same material must use the same ramp. Fix: recolour the sack body to `f` (rope neck), `D` base, `d` shadow, `F` left highlight.
2. [MAJOR] spices (2,1)-(13,5): the orange mound is a flat lid whose width equals the rim, sitting on a full-width 12 px black bar at row 5, so the whole thing reads as a honey pot with an orange cap. Fix: make the mound a dome narrower than the sack mouth (cols 4-11), rise 4 rows, drop the black bar to the ordinary rim of `k` at the mouth (cols 3-12), and add a 2 px `Q` highlight at top left.
3. [MINOR] spices: the sack body is a plain rectangle with no taper to the tie. Fix: round the shoulders (rows 6-8 inset by 1).

## silk: FAIL
1. [MAJOR] silk (1,1)-(14,14): two red rectangles read as bricks or books, not rolled cloth. There are no cylinder ends, only a 4 px `R` swirl at the left (3,3),(4,3),(3,5),(4,5). Fix: draw each bolt as a cylinder with a rounded elliptical end cap (a `kEEk` ring with a spiral `R` pixel) at the left and a 1 px cloth fold highlight `E` along the top.
2. [MAJOR] silk (0,7)-(15,8): rows 7 and 8 are both solid `k`, a 2 px black seam between the bolts (outlines only 1 px). Fix: drop one k row so the bolts share a single 1 px line, or overlap the bolts diagonally.
3. [MAJOR] silk: colour is `E e R` red, not pink silk, and bolt 2 touches x=15. Fix: keep it from the red palette but lead with `E` (ff9a80) and keep `e` only for shadow, or shift to `P`/`E` pink highlights; keep both bolts inside x=1..14.

## cotton: FAIL
1. [MAJOR] cotton (5,4),(10,4): two isolated `k` pixels inside the white mass read as eyes, so the boll looks like a ghost. Fix: replace with a proper notch: 2 px tall `C` shadow lines between three separate bolls, or give each boll its own k outline.
2. [MAJOR] cotton (1,3)-(14,7): one flat white cloud, not "bolls". Fix: draw 3 bolls (centre one higher) each with a `C` lower-right shadow, and add a husk `j`/`J` or `G` star calyx under each.
3. [MINOR] cotton (6,11)-(9,13): the stem is straight 2 px with no highlight. Fix: add `h` at (6,11)-(6,13) and a short leaf at (9,10).

## salt: PASS
1. [MINOR] salt (3,3)-(13,5): the mound is smooth, and "coarse" salt could take 2 `p` grain pixels. Optional.
2. [MINOR] salt (10,5)-(13,5): `pppC` is a 4-tone-wide band at the right. Fix: use `pp C` run lengths of 2-1.

## cocoa: FAIL
1. [MAJOR] cocoa (2,6)-(13,9): the pod is 12 wide x 14 tall, too fat and squat, and one centre `q` ridge plus a dark right strip read as a pumpkin, lantern or gem. A cocoa pod is long and pointed with several ridges. Fix: narrow to about 9 px wide by 14 tall, taper both ends to a point, and draw 2 ridge lines `q` curved from the top left.
2. [MAJOR] cocoa (10,5)-(12,10): `q q o` is a banded stripe following the outline, and `o` is a gold-ramp colour on an orange object. Fix: drop `o`, use `q` shadow on the right column only, and add a `Y`-less 2 px `Q` highlight at top left (5,5).
3. [MINOR] cocoa (7,1)-(8,2): the J stem is 2 px with a k cap. Fix: bend it 1 px to one side.

## indigo: FAIL
1. [MAJOR] indigo (0,3)-(3,7): the light-blue `L` strip and `kkkk` rows at the left of the upper brick make no physical sense (a floating side face). The construction of the stack is unreadable: the top brick is shifted right, the bottom brick has no visible top face, and the perspective is inconsistent. Fix: redraw as 2-3 bricks stacked straight with the same top-face (`L`) and front-face (`B`) rows each, offset by at most 1 px.
2. [MAJOR] indigo (0,1)-(15,13): both bricks touch x=0 or x=15, and the composition is not centred (right heavy on top, left heavy on bottom). Fix: centre within x=1..14.
3. [MINOR] indigo front faces: flat `B` with only a right `b` column. Fix: add a 1 px `L` highlight on the left edge of each front face.

## wine: PASS
1. [MINOR] wine (4,10)-(10,10): `CCC` on the label row reads as text or a notch. Fix: use `ppppCC` so shade is on the right edge only.

## furs: FAIL
1. [MAJOR] furs (0,1)-(15,13): the silhouette is a 16 x 13 rectangle with two notches (a tunic or bow-tie), and it touches x=0 and x=15. There are no limb stubs, tail or fur edge, so it does not read as a pelt. Fix: draw an irregular hide: 4 leg stubs, a head point at the top, a tail at the bottom, a ragged 1-2 px fur edge, within x=1..14.
2. [MAJOR] furs (1,2)-(10,6): the `D` diagonal patch top left sits on `J` as a hard two-ramp split (sand over dark brown), so it looks like two materials. Fix: use `J` base, `J`/`j` shadow and a `D` highlight of at most 2 px along the top left only, or `D` for the whole belly with `J` back patch.
3. [MINOR] furs (11,11)-(12,13): the notch is a rectangle gap. Fix: taper it into two feet.

## whale-oil: FAIL
1. [MAJOR] whale-oil (2,2)-(13,13): a flat square frame with a blue panel reads as a monitor or picture frame, not a tin can or lamp. It also departs from the approved 8x8 design (round can seen from above). Fix: draw a cylinder with an elliptical top rim (`N` highlight, `n` inner ellipse, `k` outline), a body with a vertical `N` left highlight and `M` right shade, and a blue label band across the middle only.
2. [MINOR] whale-oil (4,6): the single `l` pixel is a deliberate glint but is the only `l` in the sprite. Fix: pair it with `l` at (4,7).

## porcelain: PASS
1. [MINOR] porcelain (2,7)-(13,10): the widest part runs 4 rows at constant width. Optional: taper row 10 to x=3..12.

## amber: PASS
1. [MINOR] amber: four gold tones (`Y y O o`) when STYLE allows 3. `Y` is only 3 glint pixels, so it is acceptable, but do not add more.
2. [MINOR] amber (0,5)-(15,8): the stone touches x=0 and x=15. Optional: trim to x=1..14.
