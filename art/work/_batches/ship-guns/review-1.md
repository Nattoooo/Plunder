# Review round 1: ship-guns

Set notes: all five sprites are the exact spec size, use only palette characters, keep a 1 px `k` outline, and are lit from the top left with the iron ramp `N n M`. They are consistent with each other. Two families fail on readability. At 1x, long-gun and swivel-gun are nearly the same sprite, and the light-cannon carriage is not legible.

## light-cannon: FAIL
1. [MAJOR] light-cannon (0,4)-(4,5): The carriage reads as stacked horizontal bands, not a carriage with wheels. Row 4 `kvvvk` and row 5 `kWKWk` are both full width, so the wheels do not stand out from the bed. The `W` wheel pixels (#6e4528) sit against `k`, `K` and `v` and merge into mud at 1x, and the sprite reads as mostly black. Fix: make the carriage bed narrower than the wheels. Row 4 `.kvk.` (bed only), row 5 `kWvWk` (wheels at x=1 and x=3 with a `v` axle between), row 6 `.kkk.`. If the wheels must reach the edge, use `V` for the wheel top so it separates from `k`.
2. [MINOR] light-cannon (1,2)-(3,3): The barrel core is `N` only, 1 px wide, for 2 rows, then jumps to 3 px. The swell is abrupt and the gun reads as barely different from carronade. Fix: acceptable once item 1 is fixed. Optionally make row 2 `kNnMk` so the highlight runs down the left edge.

## long-gun: PASS
Reads clearly as a long slim barrel with a breech on a wooden block. The four-row `kNk` barrel gives the right proportion at 8 px. Minor: (2,1)-(2,4) is a flat single column of `N` with no shade, which is fine at 1 px wide. Minor: the muzzle has no flare or lip, which could be a nice upgrade but is not required.

## carronade: PASS
Short, fat and wheel-less, clearly distinct from the long gun. The `K` breech ring (row 4) and `v` slide are correct. Minor: rows 1-3 are three identical `kNnMk` rows, which is a flat vertical gradient. Replacing (1,1) with `n`-based rim variation is optional. Minor: `K` at row 4 against `k` outline is low contrast, but it reads as a shadow band.

## swivel-gun: FAIL
1. [MAJOR] swivel-gun (0,0)-(4,6): The silhouette is almost the same as long-gun. It is a 1 px barrel (rows 0-3), a 3 px iron breech, a 3 px wood block, and a closing outline row, one row shorter than long-gun with a brighter wood tone. Two different items cannot be told apart at 1x. The brief asks for a small gun on a post. Fix: make the post a post. Row 4 `kNnMk` stays as the yoke or pivot. Row 5 becomes `.kVk.` (a 1 px post, `V` lit). Row 6 becomes `.kkk.`. Shorten the barrel by adding a muzzle that is clearly smaller, so the gun reads as a small gun on a stalk. This also keeps the lower 5x5 on the deck cell.
2. [MINOR] swivel-gun (1,5)-(3,5): `V v W` is a 3 px ramp on a 3 px part, so it reads as shading bands. Resolved by the 1 px post in item 1.

## mortar: PASS
A squat round pot with a wide dark mouth, correct for the brief. The round silhouette with transparent corners works and the 5x5 size is exact. Minor: the right side of the mouth `K` (3,2), (3,3) touches the `k` outline directly, so the shadow side has almost no rim and merges at 1x. Optional fix: change (3,3) to `M` and (4,2) to `M` to give the right-hand shadow rim. Minor: nothing shows the mortar sits on a bed, but a top-down view makes this acceptable.
