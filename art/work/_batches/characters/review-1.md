# Batch `characters`, review round 1

Read: STYLE.md, CRITIC.md, brief.md, approved.png, sheet-1.png, all six grids in art/src (the grids are the truth; several notes.md files still describe older drawings and disagree with them), the cottage grid for door scale.

Set-level notes: the outline is a consistent 1 px `k` and every palette character is legal. Light is top left throughout. All sizes are flexible, so size drift is not flagged by itself; it is flagged only where it breaks scale against the captain (7 x 9). Level of detail is mixed: captain, crab, serpent and wraith are chunky and read at 1x; skeleton is noisy (dithered ribs, 1 px stripes) and the gull breaks the outline rule. Skeleton (9 x 11) and wraith (9 x 10) tower over the captain (7 x 9) although the spec makes them smaller (5 x 8, 6 x 8).

## captain: FAIL
1. [MAJOR] all 8 sprites, scale: the captain is 7 px wide (5 px interior) against the approved house-cottage door, 4 px wide (cols 8-11, rows 15-22). STYLE.md says "a door fits the captain"; he is nearly twice the door width. The captain is the unit of scale for the whole land set, so this has to be decided now. Fix: widen the door in house-cottage (and house-long, house-shutters, house-townhouse and the other door-bearing buildings) to 6 px (the captain's body less the outline) and re-review those families; do NOT shrink the captain, 7 px is already the minimum for a readable face.
2. [MAJOR] captain-down-1/2/3 and captain-up-1/2/3 rows 0-2: the hat does not read as a tricorn. Silhouette rows 0-2 are `..###..` / `.#####.` / `#######`, a plain dome or beanie as wide as the head, with no raised corners; the "gold trim" is two lone pixels, `y` at (1,2) and `O` at (5,2), which read as earrings or buttons. Fix, front (down) rows 0-2: `kk...kk` / `kyKKKOk` / `kkkykkk` (raised side corners with gold on them, gold front point at (3,2)); back (up) rows 0-2: `kk...kk` / `kyKKKOk` / `kkkkkkk` (gold at the two rear corners only). Side frames get the same logic, see issue 4.
3. [MAJOR] captain-down-1/2/3 (2,3), (4,3): the eyes are `k` pixels hanging directly under the 3 px `k` brim at (2,2)-(4,2), alternating with skin (`kskskSk`). The brim and eyes fuse into vertical black stripes with no forehead, so the face reads as a barcode and the eyes do not read. Fix (after issue 2 gives the brim its own row): row 3 `kssssSk` (forehead), row 4 `kskssSk`... i.e. `ks` + eyes `k` at (2,4) and (4,4) with `s` at (1,4), (3,4) and `S` at (5,4): `kskskSk`. The chin is the shirt collar `p` at (3,5). Eyes now have skin above and between.
4. [MINOR] captain-side-1/2 rows 0-2: the side hat is a flat-topped box (`.kkkkk.` / `kKKKKKk` / `kkyyyOk`) with a 4 px gold bar, while the front/back hat has a dome and 2 gold pixels. Same hat must look the same when he turns. Fix: row 0 `.kk.kk.`-style raised rear corner `kk.....`? Keep it simple: row 0 `kk..kk.`, row 1 `kyKKKKk`, row 2 `kkkkyOk`, so gold is rear corner (1,1) and front point (4,2), matching front/back.
5. [MINOR] captain-up-1/2/3 (3,4), (5,3), (5,4): hair `j` pixels in a `J` field (`kJJJJjk` / `kJJjJjk`) form a speckle pattern. Fix: keep only the right column in `j` ((5,3),(5,4)) and the queue (3,4),(3,5); change (3,4) to `J`... the queue then starts at (3,5) only, row 4 `kJJJJjk`.
6. [MINOR] captain-down-2 (1,7)-(2,8), captain-down-3 (4,7)-(5,8): the lifted leg is a single navy pixel plus a boot, so the walk reads as a leg thinning, not a step. Accepted as the best that 1 row of trouser allows; keep.
7. [MINOR] captain-side-1 (1,8)-(2,8): the left boot pair sits under the coat tail (rows 7), so he seems to stand on the coat; legs are only (3,7),(4,7). Fix: row 8 `..k.kk.`-style single heel at (2,8) and toe pair (4,8),(5,8) so only one boot is under the coat tail.

Frame consistency otherwise holds: down-3 mirrors down-2, up-2/3 mirror each other, hat/head/shoulders are identical per view.

## crab: PASS
Reads as a red crab with raised claws at 1x on both backgrounds; body is a three-tone dome with light top left; frames differ only in the legs. Minor notes, none blocking:
1. [MINOR] crab-1/2 (3,0),(4,0): the eye stalks are `k` with no light pixel, so the eyes are black nubs. Optional: `y` is not warranted at this size; leave.
2. [MINOR] crab-2 (3,4),(4,4): the two centre legs touch and read as a belly bar. Fix: legs at 1,3,5,6 shifted to `.k.k.kk.`-free spacing, e.g. `.k.k.k.k` is not possible at width 8; accept.
3. [MINOR] 8 x 5 is as wide as the captain's body; a beach crab at 6 px would sit better against him. Free size, accepted.

## skeleton: FAIL
1. [MAJOR] skeleton-1/2, scale: 9 x 11 against a captain of 7 x 9 and a spec of 5 x 8. A human skeleton taller (11 vs 9) and wider (9 vs 7) than the captain breaks the land scale rule. Fix: redraw at no more than 7 x 9: skull 5 wide (rows 0-3 including bandana), shoulders 5 wide, arms hugging the torso (1 px bone columns at cols 0 and 6 touching the shoulders), 3 px ribcage, 2 rows of leg.
2. [MAJOR] skeleton-1/2 (3..5,5..6): ribs are a checkerboard of `x` and `K` (`xKx` / `KxK`), which is dithering, and the same alternation in the skull (row 3 `x k x`). It turns to noise at 1x. Fix: ribs as bars: row 5 `kxkxxxkXk`, row 6 `kxkKKKkXk` (one bone bar, one dark gap), then the pelvis row.
3. [MAJOR] skeleton-1/2 (1,5),(1,6) and (7,5),(7,6): the arms are 1 px bone columns walled in by `k` at cols 0/2 and 6/8, rows 5-6 read as vertical stripes (barcode) and the torso is 3 px under 5 px shoulders. Fix: arms flush against the ribs without a black column, e.g. rows 5-6 `kxxxKxxXk` style: `x` arm touching the ribs, `k` only on the outside.
4. [MAJOR] skeleton-1 (5,9),(6,9) and skeleton-2 (2,9),(3,9): the trailing leg is two `k` pixels with no bone `x`, so one leg ends at the knee; the stride is just one pixel difference in outline. Fix: give the trailing leg `x` at (5,9) in frame 1 and (3,9) in frame 2, ending in a `k` foot on row 10.
5. [MINOR] skeleton-1/2 (4,3): `k` nose between two teeth `x` reads as a comb; keep the teeth as a 3 px `xxx` row `..kxxxk..` under the sockets.

Pirate cue (red bandana, rows 1) works; frames 1/2 differ only in the legs as required.

## wraith: PASS
Black silhouette is a hooded, tapered ghost with a 3 x 3 void and two `I` eyes, a flaring robe and a three-tatter hem, and it reads at 1x on both backgrounds. Frames differ only in the hem (rows 8-9) as asked. Minor notes, none blocking:
1. [MINOR] size 9 x 10 is larger than the captain (7 x 9) and than the spec (6 x 8); acceptable for a floating enemy but do not grow it further.
2. [MINOR] wraith-1/2 (2,2),(4,2),(2,4),(4,4): the 3 x 3 `K` void is a hard square. Optional: `i` at (2,4) and (4,4) to round the bottom of the hood opening.
3. [MINOR] the robe (rows 5-8) is one flat `i` slab. Accepted: the teal ramp has no mid tone.

## gull: FAIL
1. [MAJOR] gull-1/2, outline: the gull is 5 x 4 with no outline. STYLE.md only allows dropping the outline at 3 px or less on a side; 5 x 4 does not qualify, and a white `P` bird without outline disappears on sand and cloud. Fix: either outline it (7 x 6, `k` around every edge, wings `u` tips inside) or cut it to 5 x 3 so the exemption applies: gull-2 `..y..` / `uPPPu` / `.PPU.`, gull-1 `..y..` / `.uPu.` / `.PPU.`.
2. [MINOR] gull-1 (1,2)-(3,2) `.uPu.` over `.PPU.`: with wings up the shape is a 3 x 2 mushroom with a stalk; it reads as a bird only in motion. Acceptable once the outline question is fixed.
3. [MINOR] notes.md still describes a 5 x 3 / 6 x 3 drawing that no longer matches the grid. Update the notes.

## sea-serpent: FAIL
1. [MAJOR] serpent-head (4,2)-(6,3): the red mouth block is 3 x 2 and off the midline. Eyes are symmetric at rows 1 and 5, centre row is 3, but the mouth fills rows 2-3, so the head is not symmetric top to bottom; the red also has no jaw outline, so at 1x it reads as a red patch on a teal ball, not open jaws, and the black silhouette is a circle with a notch. Fix: rows 2-4 `kIiikkk.` / `kiiiRRR.` / `kiiikkk.`, so two `k` jaw edges bracket a one-row red mouth on the centre row, and keep prongs (6,1), (6,5) as they are.
2. [MINOR] serpent-tail (0,2): the fork notch is one pixel deep, so the fin reads as a bean. Fix: make (0,2) and (1,2) transparent (row 2 `..iqk` with (1,2) `k` moved to (2,2)) so the notch is 2 px.
3. [MINOR] serpent-body-1/2/3: each segment is a closed-outline disc, so a chain reads as beads. Accepted for this scale; check the joins in game.
4. [MINOR] serpent-tail (3,2) `q`: sits against the stem's closing `k`. Fine.
