# sparkle

- sparkle-1 (large frame): a plus 5 px across with a single pale centre (Y) and one-pixel gold arms (y). The four body corners are open, so it reads as a four-point star, not a blob. The centre is the only pale pixel, which gives the star its glow.
- sparkle-2 (small frame): the same plus 3 px across, in the middle of the 5 x 5 box, so the two frames swap without the marker jumping.
- No outline: it is an effect, and an outline would eat the 5 x 5 shape.

## Batch round 1
1. (2,1) and (2,3) are now y, so the centre (2,2) is the only Y and the star is symmetric left to right.
2. The four corners (1,1), (3,1), (1,3), (3,3) are transparent. The shape is a plus with open corners, as sparkle-2 is, not a diamond blob. The notes now match the grid.
3. sparkle-2 is unchanged. sparkle-1 spans 5 px against sparkle-2's 3 px, so the large frame is visibly bigger. The arms stay one pixel thick: a 2 px arm would make the 5 x 5 star a blob.
