# crate (batch props-small)

- crate 6x6: lit top face (V) so it reads as a box seen from above, two wood planks (v) with a lighter W seam across the middle, and a W shade down the right side. Outline on the silhouette.
- lost-cargo 6x9 (spec 6x7, two rows more): a 1 px W pole at x=1 rises three rows above the crate, its cap in outline (k). A 2 x 2 red flag (R, with an r shade on its lower right) hangs to the pole's right on rows 1-2, its top outline on row 0. Column 5 stays clear, so the flag reads as a flag on a pole, not a red label on the box. Below it is the full 6 x 6 crate body, identical to crate.

## Batch round 1

- [MAJOR] lost-cargo flag: fixed. The sprite is 6 x 9 (two rows taller, within the flexible range). The pole stands three px above the crate top, and the 2 x 2 flag hangs to its right with a clear column beside it. The full 6 x 6 crate body is back, with its plank seam. The review's row strings put the pole at x=2 in rows 0-1 but at x=1 later; I used x=1 throughout, as on waypoint. The pole shows as two W pixels under its outlined cap, three rows above the crate, which is the most a 9 px sprite with a full crate body allows.
- [MINOR] lost-cargo flag size: this flag is 2 x 2 and waypoint's is 2 x 3. Kept 2 x 2, because it has to fit above the crate in three rows, and waypoint is PASS and not touched. The notes no longer say they are the same flag; the flag is the same red and style, at a smaller size.
- [MINOR] crate seam: now W, as on deck-planks, so it no longer merges with the outline at x=0 and x=5. lost-cargo uses the same seam.
