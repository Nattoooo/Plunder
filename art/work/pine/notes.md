# pine (nature) - artist notes

Both sprites are 11 x 19 (spec size, unchanged), front view from slightly above, exactly symmetric silhouette, trunk base on the bottom row at column 5. About twice the captain's height.

## pine
- Three stacked branch tiers (rows 0-4, 5-9, 10-14), each wider than the one above (7, 9, 11 px), so the layers read as a conifer.
- Foliage uses only the swap chars H h G. H is the lit upper-left of each tier, G is the shaded skirt (underside) of each tier, which separates the layers.
- Row 15 is the outline under the lowest skirt; the trunk is 3 px wide (v W w, lit left), short (3 rows), with the bottom outline on the last row.

## snow-pine
- Identical silhouette and trunk. Each tier's upper-left is snow (P), with foliage showing at the lower right and the G skirt underneath, so snow sits on the top faces of the layers.
- P is not a swap colour, so only the foliage recolours.

## Round 1
One shading rule now applies to every tier: H/h lit on the upper left, and the last body row of each tier carries a 2 px G shade at the right edge; the G skirt sits under each tier. The left edge never has G.
1. Fixed. pine (2,8) is now h. Tier 1 row 3 and tier 2 row 8 now have a 2 px right shade (GG), matching tier 3.
2. Fixed. snow-pine (2,8) is now h, with the same tier rule as the pine.
3. Fixed. Trunk rows 16 and 17 are both `kvvwk` (lit left, dark right), in both sprites.
4. Fixed. Row 9 is now `.kGGGGGGGk.` (no 2 px kk corners), and row 10 is `..kHhhhhk..`. Every tier now steps in 1 px under the skirt above.
5. Fixed. Snow gets L shadow pixels at the lower right edge of each patch: (6,3) on tier 1, (5,7) on tier 2, (5,12) on tier 3.
6. Fixed. pine (5,1) is now h. H stays on the left edge only.
