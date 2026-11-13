# Review round 2: ship-guns

Only the two families that failed round 1 are re-reviewed. long-gun, carronade and mortar passed in round 1 and stay passed.

## light-cannon: FAIL
1. [MAJOR] light-cannon (0,4)-(4,5): Round-1 item 1 is NOT fixed. The carriage is still two full-width rows, `kWvWk` twice (rows 4 and 5). The bed is as wide as the wheels, so there is no wheel silhouette. At 1x it reads as a barrel standing on a brown block, the same read as long-gun's block. Rows 4 and 5 are identical, which also gives a banded look. Fix: row 4 `.kvk.` (bed only, narrower than the wheels), row 5 `kWvWk` (wheels at x=0..1 and x=3..4 with `v` axle between), row 6 `.kkk.`. If the wheels must reach the edge on row 4, use `V` at (1,4) and (3,4) so the wheel tops separate from `k`.
2. [MINOR] light-cannon (1,2)-(3,3): Barrel core is still `N` only, 1 px wide, then jumps to 3 px wide at row 2. Not required once item 1 is fixed. Optional: make row 2 `kNnMk` keep as is, and leave row 1 `.kNk.` as the muzzle.

Previous issue status: item 1 not fixed (the earlier `kvvvk`/`kWKWk` rows were changed to `kWvWk`/`kWvWk`, but the bed is still full width). Item 2 minor, left as is.

## swivel-gun: PASS
Round-1 item 1 is fixed. The sprite now reads as a thin barrel on an iron yoke with a 1 px lit post `.kVk.` at row 5 and no wide wood block, so it no longer matches long-gun's silhouette. Item 2 (three-tone band on the post) is gone. Size is 5 x 7, palette is valid, outline is intact, light is top left.
Minor: (1,3) `M` in the barrel is a dark step before the yoke and reads as a slight break in the barrel. Optional: change (1,3) to `N` or `n`. Minor: the post is only 1 px visible, so it reads closer to a hilt than a post. Acceptable at 5 x 7.
