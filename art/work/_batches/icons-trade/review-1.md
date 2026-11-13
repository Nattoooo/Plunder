# Review round 1: icons-trade

Set notes: all 16 sprites are 16 x 16 (no size drift), 1 px k outline and top-left light are consistent. Level of detail is not: rum, wine, porcelain, salt, tea and cocoa are well built, while silk, indigo, furs and whale-oil are flat slabs with no form. Sack material is inconsistent (sugar uses the d D f sand ramp, spices uses the V v W hull-wood ramp). Brown dominates (rum, sugar, tobacco, coffee, tea, spices, salt, furs): keep the hues and materials distinct when fixing.

## rum: PASS
MINOR: handle loop (13-15,8-10) is only a 1 px hole of D; acceptable and matches the approved 8x8.

## sugar: PASS
MINOR: sugar (3-12,5): the tied neck is as wide as the flared mouth above, so it reads slightly like a pot with a white lid. Narrowing row 5 to cols 5-10 would sell the sack better.

## tobacco: PASS
MINOR: tobacco leaf tips (4,1),(7,1),(8,1),(11,1) are 1 px spikes; acceptable as leaf tips. Veins j differ between upper and lower half but read as leaves.

## coffee: PASS
MINOR: coffee bean creases (jjjj) sit in the lower third of each bean (row 4 of 6) instead of the centre line. Beans are 8x6 / 7x6 / 6x6, slightly uneven.

## tea: PASS
MINOR: tea leaf stamp (5-10,7-11) has no stem or vein, so it reads as a diamond; add a 1 px G stem at (7,12) if desired. Crate sits 1 px high (margins 1 top, 2 bottom).

## spices: FAIL
1. [MAJOR] spices (1-14,7-13): sack body uses the V v W wood ramp (hull-wood swap colours) while sugar uses the d D f sand ramp for the same burlap sack. It reads as a wooden barrel/clay pot with an orange lid. Fix: recolour body to F (highlight col 2-3), D (base), d (right edge cols 11-13) exactly as sugar rows 6-13, and the f tie row 6 stays.
2. [MAJOR] spices (3-12,1-5): orange top is a flat lid shape that is outlined off from the body by a full k row 5, so it reads as a jar lid, not spice heaped in a sack. Fix: drop the k row 5 across cols 3-12 down to a 6 px wide tie at cols 5-10, and let the Q/q heap flare above it like sugar's mouth.

## silk: FAIL
1. [BLOCKER] silk (0-15,0-14): two flat pink-red rectangles with no roll shape; they read as red bricks or books, not rolled bolts of silk. Fix: redraw each bolt as a cylinder: a round end cap on the left (ellipse of E/e with a spiral R 1 px line, 5 px tall) and the body running right with a top highlight E, mid e, bottom shadow R, and a slightly different offset for the second bolt.
2. [MAJOR] silk (1-14,7-8): the bolts are separated by two stacked k rows (row 7 cols 1-13, row 8 cols 2-14), a 2 px thick staggered black line. Fix: a single shared 1 px k line, or overlap the bolts.
3. [MAJOR] silk (1-3,3-5): the diagonal R pixels at (2,3),(3,3),(3,4),(2,5),(3,5) are noise. Fix: remove them, use a clean spiral end cap.
4. [MINOR] colour is salmon/red (E e R), not pink. Fix: lean on E/e highlights, keep R only for shadow.

## cotton: FAIL
1. [MAJOR] cotton (5,4),(10,4): two isolated interior k pixels on the white mass read as eyes; the boll looks like a smiling ghost/cloud. Fix: delete them, and separate the three bolls with 2 px k notches reaching the top outline at (5,3) and (10,3), or draw three clear bolls with C shadow between them.
2. [MINOR] cotton (6-9,8-13): stem is a 2 px G column with no leaf or branch and ends flat. Fix: add one h/G leaf pixel pair at (5,11),(4,10).

## salt: PASS
MINOR: salt bowl and tea crate share the same brown family at 1x; fine.

## cocoa: PASS
MINOR: cocoa (12,6-9) o stripe next to the outline gives a slight banding on the right edge; the pod reads clearly as an orange pod.

## indigo: FAIL
1. [MAJOR] indigo (0-3,2-7): the light L block jutting left of the top brick reads as a separate small box; the geometry of top face, front and left face is incoherent. Fix: draw each brick as a front face (B/b) with a 2 px L top face and a 1 px right side, no left-hand protrusion.
2. [MAJOR] indigo (0-12,8-13): lower brick has no visible top face and the stack is offset so the right 3 columns are empty and the sprite is lopsided and disconnected. Fix: stack the bricks, lower one offset by 1-2 px, both with the same top/front/side treatment, whole stack centred in 16 x 16.
3. [MINOR] row 8 is a full-width k line wider than both bricks; remove when restacking.

## wine: PASS
MINOR: label C block (7-10,10) reads fine as text; bottle could use a 1 px L glint on the left shoulder.

## furs: FAIL
1. [MAJOR] furs (0-15,1-13): silhouette is a nearly straight-edged rectangle with a notch; it reads as a brown banner, jacket or trousers, not a pelt. Fix: irregular pelt outline: head with ears at top, four stubby legs/corner projections, a short tail, and ragged 1 px fur tufts along the sides.
2. [MAJOR] furs (1-7,2-6): D (sand) highlight forms a diagonal stripe of banding across the top left, with a hard J boundary. Fix: use J as base with D only as 2-3 highlight pixels top left and j for shadow bottom right; add 2 or 3 short j fur strokes for texture.
3. [MINOR] centre notch (6-9,11-12) looks like a trouser crotch; remove with the new outline.

## whale-oil: FAIL
1. [MAJOR] whale-oil (2-13,2-13): a square-cornered box with a blue panel reads as a monitor or framed picture, not a tin can/lamp. It also departs from the round approved 8x8 whale-oil. Fix: round the corners (drop the corner pixels at (2,3),(13,3),(2,12),(13,12)), show a top ellipse (N rim with n inner row) and a small spout or carry handle on top, and keep the blue label only on the middle band.
2. [MINOR] M bands rows 5 and 11 are full-width stripes, making a banded look; keep one at the lid and one at the base only.

## porcelain: PASS
MINOR: none beyond the thin 1 px L at (3,8).

## amber: PASS
MINOR: amber (0-15,5-8): straight sides for 4 rows make the stone slightly loaf-like; a larger Y glint at (3,4)-(4,5) and a y pixel for translucence would improve it. The o column at (13-14,9-11) hugs the outline as a band.
