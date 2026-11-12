# tree (nature) - artist notes

## tree, 15 x 18 (spec size, unchanged)

Front view, slightly from above. 18 px tall = twice the captain's 9 px. Trunk base sits on the bottom row, centred on column 7. The silhouette is exactly symmetric (every row spans the same columns either side of column 7); only the shading is asymmetric, for the top-left light.

### Canopy (rows 0-11): four leaf clusters

The round canopy is built from four overlapping leaf clusters so it reads as foliage, not a green ball:

- **Top dome cluster** (rows 1-4, at the back). Highlight `H` on its upper-left (row 1 cols 5-7, row 2 cols 3-5). Its underside is the `G` band at row 4 cols 4-9, which rises to the outline at (3,3) and (11,3). Those two `G` pixels are the crevices where the dome tucks behind the side clusters; they also make the small shoulder in the silhouette (rows 2-3 at col 2/12, then stepping out at rows 4-5) read as two separate clumps.
- **Left and right side clusters** (rows 4-10). Each has its lit cap on its upper-left: left at (2-3,4) and (1-2,5), right at (10,4) and (8-9,5). The 1 px `G` seam at column 7 (rows 5-6) is the gap between them, under the dome. Their shade sits on their lower-right: the left cluster's wedge at (4,8), (3-4,9), (2-4,10); the right cluster's along column 13 thickening to a block at rows 9-10, since the right side is furthest from the light.
- **Front-bottom cluster** (rows 8-11, nearest the viewer, where the trunk enters). Its lit cap is (5-6,8); the `G` above it at row 7 (cols 6-9) is the shadow the clusters above cast onto it, and (10,8)-(10,9) is its own shaded right side against the right cluster. Its underside (row 11 cols 5-9) is `G`, the shadow directly over the trunk.

Rows 10-11 give the canopy a slightly lobed bottom: the side clusters end at row 10 and the front cluster dips one row lower, right over the trunk.

**Foliage colours:** only the swap characters `H h G` are used for leaves (highlight, base, shade), and none of them appears anywhere else in the sprite, so each sea can recolour the canopy. STYLE.md allows at most 3 tones per material, so the fourth foliage character `g` is deliberately unused; adding it would mean a fourth leaf tone. If the critic prefers `g` for the deepest crevices (the row 5-6 seam and the row 11 underside), it is a one-character swap.

On grass the base `h` matches the ground colour; the full `k` outline keeps the tree separate, and the `H` caps and `G` shade still give it form (checked in the in-context preview).

### Trunk (rows 12-17)

- Wood ramp: `v` lit left face (col 6), `W` base (col 7), `w` shaded right face (col 8): a round trunk lit from the top left.
- Row 12 is all `w`: the canopy shades the top of the trunk right under the leaves.
- Interior 3 px wide (5 px with outline), about a third of the canopy, a sturdy broadleaf trunk next to the 6 px wide captain.
- Row 16 widens by 1 px each side: the root flare where the trunk meets the ground (lit `vv` on the left, shaded `ww` on the right).
- Row 17 is the bottom outline, so the trunk stands on the bottom row, outlined like the captain's feet.
