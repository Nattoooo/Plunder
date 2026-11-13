# ice-shard (8x8, flexible, kept at 8x8)

- Tall centre shard (x2-5): one-pixel tip at (3,0), a white P glint on the top-left facet at (3,1), L lit left face, B shadowed right face, k outline.
- Left shard (x0-2): tip at row 3, one L face between the k outline at x0 and the k seam at x2.
- Right shard (x5-7): tip at (6,2), one B face at x6, k outline at x7 and the seam at x5.
- Seams: the k columns at x2 and x5 are the centre's outline and run down to the base, so every shard reads as a separate crystal.
- Base: row 7 is k under x1-6 with transparent corners, so the cluster stands on a foot rather than a plinth.
- Only k, L, B and P are used. Light from top left.

## Batch round 1
1. [MAJOR] Left shard separated: the k seam at x2 runs from the centre down to the base. The 8 px width leaves a 1 px body for each side shard. A 2 px side body with seams on both sides needs 9 px, which I did not take, to stay at spec.
2. [MAJOR] Right shard: the k seam at x5 runs down to the base, so the right shard is a single B face with no L, and no light and shadow mixed in a 2 px space.
3. [MINOR] Extra glint: the left P is now L. The only P is at (3,1).
4. [MINOR] Doubled peak: the centre tip is one pixel at (3,0). The (5,2) k is the centre's own outline, and (6,2) is the right tip, so the right shard's top does not add a second tip pixel.
5. [MINOR] Base: row 7 has transparent corners and a 6 px k foot, not an 8 px solid row.
