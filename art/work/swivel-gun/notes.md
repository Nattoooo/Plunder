# swivel-gun

## swivel-gun (5 x 7, fixed)

- **Muzzle, row 0:** the outline closes the top of the barrel.
- **Barrel, rows 1-3 (`k N k`):** a small 1 px iron barrel. Swivel guns were the smallest pieces on a ship, so the barrel is thin.
- **Yoke, row 4 (`N n M`):** the iron clamp that holds the barrel and turns it on its pivot. It is one row, so it reads as a joint rather than a block. Highlight on the left, like the barrel above it.
- **Post, row 5 (`V v W`):** the wooden stanchion the swivel sits on. In wood, because posts were, and it sets the iron yoke apart from the barrel. Lit from the left like everything else on the sprite.
- **Base, row 6:** the outline closes the post.

## Current batch revision
Thin overhead barrel, iron pivot yoke and small wooden post. The yoke and post now use left-to-right lighting (N n M and V v W) instead of symmetric dark-light-dark bands, which read as pillow shading on a 3 px part. Exact5x7.

## Batch round 1
- MAJOR silhouette: the post is now one 1 px `V` stalk (row 5, `.kVk.`), not a 3 px wood block, so it no longer matches long-gun's block. The base is the outline closing row 6.
- MAJOR barrel: the bright iron barrel is 2 rows (rows 1-2). Row 3 is a dark `M` neck that links it to the yoke, so the visible barrel is clearly shorter than long-gun's four rows. A muzzle narrower than the barrel is not possible at 5 px wide with a 1 px bore, so the muzzle end is the outline cap in row 0.
- MINOR post shading: the `V v W` three-tone bands are gone. The 1 px post is `V`, lit from the left.
