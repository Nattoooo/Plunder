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

## Round 1

The original notes above describe the round-0 draft; where they conflict, this section describes the sprite as it now stands.

1. [MAJOR] G "I/H glyph" in the middle of the canopy: fixed. The column-7 stem (7,5), (7,6) is gone. The dome underside is now a short bar at (5-8,4), with (4,4) and (9,4) h. The shadow over the front cluster is (7-9,7); (6,7) is h. The two dark marks no longer touch, so each reads as the underside of its own clump.
2. [MAJOR] H-against-G jumps and right-edge rim: fixed. Every H now has h between it and any G: (4,4) h next to the left cap, (9,4)/(10,4) h above the right cap, (6,7) h above the front cap, and (4,8) h (was G) beside (5,8) H. The 1 px G rim on the right is gone: (13,5)-(13,8) are h, and (12,4) is now inside the new outline (see 3). Right-side shade is only the lower-right wedge (10,8), (10-13,9), (9-12,10), plus the underside row 11.
3. [MAJOR] Clusters not visible in the silhouette: fixed as directed. Row 4 now spans cols 2-12 (k at (2,4)/(12,4)), row 5 spans 1-13 (k at (1,5)/(13,5)), rows 6-9 span 0-14. Left edge by row: 5,3,2,2,2,1,0,0,0,0,1,2. The dome now sits on top as its own shape, and the side clumps step out below it. Caps redone to match: left (3,4), (2-3,5); right (9-10,5). The silhouette is still exactly symmetric.
4. [MINOR] Three 1 px trunk stripes: fixed. Trunk rows 13-15 are `vvw` (lit left 2 px, shaded right 1 px), the flare row 16 is `vvvww`, and row 12 stays all w (the canopy's shadow on the trunk top).
5. [MINOR] Crevice nicks (3,3), (11,3): fixed, both h. The outline step from fix 3 now separates the dome from the side clusters.

Re-rendered and checked at zoom, 1x and 3x on grass and sand next to the captain: the canopy reads as clumps lit from the top left, with no dark glyph in the middle, and the trunk is a clean two-tone cylinder.
