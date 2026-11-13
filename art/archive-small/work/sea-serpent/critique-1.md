FAIL

Round 1. Sizes match the spec (7x6, 6x6, 5x5, 4x4, 5x4). Palette is clean (k, i, I, y, R, q only), outline is 1 px k, light is top-left, and the sprites face right. The body segments are sound. The head and the tail do not read.

1. [MAJOR] serpent-head (4,2)-(6,3): the open jaws do not read and the mouth is asymmetric. The silhouette is a teal blob with a 1 px notch at x=6 (rows 2-3). The upper mouth edge is `kk` at (4,2),(5,2), but the lower edge is only one `k` at (5,3). The red `RR` at (3,3),(4,3) sits in the lower half only, so the mouth axis is off the head axis (rows 2.5). Filled black, this is a Pac-Man C, not a serpent head with jaws. Fix: make the jaws symmetric about the row 2/3 midline. Open a wedge to the right: (5,2)=`k`, (5,3)=`k`, (6,2)=`.`, (6,3)=`.`, keep prongs at (6,1) and (6,4), and put the red mouth on both middle rows: (3,2)=`R`, (4,2)=`R`, (3,3)=`R`, (4,3)=`R`. Rows 2 and 3 should then mirror each other. Alternatively keep the 2 px mouth but centre it on the axis.

2. [MAJOR] serpent-tail (0,0)-(4,3): the fluke is not forked. The left edge is a solid straight column of `k` at x=0 for rows 0-3, so there is no notch and no fork. The `i` at (1,0) and (1,3) are 1 px stubs boxed in by `k`. The stem is muddled: (3,1) is `k` and (3,2) is `q`, so the body-side interior is not continuous teal. The `q` fin at (3,2) is asymmetric against `k` at (3,1). Fix: draw a real fan that is wide on the left and narrows to the right. Suggested grid: row0 `k.k..`, row1 `kiikk` or `kIikk`, row2 `kiiqk`, row3 `k.k..`. That makes (1,0) and (1,3) transparent so the left edge shows a V notch. Use row1 `kIiik` and row2 `kiiik` so the stem stays teal. Move `q` to the spine at (2,1) or (2,2). Pick one and keep it inside the teal.

3. [MINOR] serpent-head (1,1)-(2,1): the highlight `I` at (1,1) touches the gold eye `y` at (2,1), so two bright pixels cluster and the eye reads as a highlight smear. Fix: move `I` to (1,2) (row 2 is `kIiikk.`) or move the eye to x=3. Keep the eyes symmetric, at (x,1) and (x,4).

4. [MINOR] serpent-body-1, body-2, body-3: only two tones (`I`, `i`) with no shadow on the bottom-right, so the segments are flat discs. The captain and approved props show a shadow tone on the bottom and right. Fix: if a darker teal is wanted, the palette has none (`g` is foliage, so don't use it). Accept flat, or lose one `i` on the bottom row. Note only. Not blocking.

5. [MINOR] notes.md vs serpent-body-1 (3,2),(3,3): the notes say "a q dorsal pixel", but body-1 has two stacked `q` pixels, while body-2 has one. This is acceptable as a growth step, but the notes should say so. Check that the fin runs along the facing axis. It sits on the central column, so a horizontal 2 px bar at (2,2),(3,2) would match the body axis better than a vertical pair. Optional.

Readability at 1x: bodies read as small teal beads with an orange fleck. The head reads as a blob until issue 1 is fixed. The tail reads as a dark scrap with an orange pixel until issue 2 is fixed.

Counts: 0 blockers, 2 majors, 3 minors.
