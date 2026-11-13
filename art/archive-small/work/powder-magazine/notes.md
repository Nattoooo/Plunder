# powder-magazine

Four powder kegs, one per quadrant, split by a dark k cross. Each outer corner of the sprite is k, so every keg reads as a rounded tile with its own dark corner. Keg tops are lit V on the top row. Rims are v. Shadow is w on the bottom and right.

## Batch round 1

- MAJOR 1 (no outline, reads as a waffle): the four outer corners are now k. Each keg gets a rounded corner, and the k cross separates the kegs. The review's pattern `Vv/vw` with the lit pixel at each keg's top-left conflicts with the corner rule: the top-left keg's top-left pixel is its outer corner. Its lit pixel moved to the top rim (0,1). The other kegs keep their top-row lit pixels. The bottom-right keg's bottom-left pixel is now w, so the bottom row reads as shadow. Known limit: no pixel is transparent, so the filled silhouette is still square. The corners and cross carry the read at 1x.
- MINOR 2 (hull-swap wood): kept. Every wood ramp character (w W v V) is in the hull-swap set, so the palette has no non-hull wood for barrels. Sand (d D f F) or leather (j J) would change the material.
- Optional hoop glints at (1,2) and (3,2) skipped. Those pixels sit on the k seam, and an iron glint there would turn the separator into a rim.
