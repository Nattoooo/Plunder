# Review round 1: ship-guns

Batch notes: all five sprites are the exact spec sizes, transparent, outlined in `k`, and light from the top left (N left, M right) is consistent. Weaknesses shared by the set: every wood part uses four wood tones (`v V w W`), where STYLE allows 3 per material; and the muzzles of the three long-barrel guns are closed `k` rows with no bore, so at 1x they read as poles or bottles, not guns. The set is not yet one confident family: the mortar has a bore and the rest do not.

## light-cannon: FAIL
1. [MAJOR] light-cannon (0,8)-(9,13): silhouette reads as a bottle or vase on a bucket, not a cannon. The barrel stops at row 8 and never overlaps the carriage, and the carriage is a plain 4x4 block. Fix: continue the barrel down into the carriage: rows 9-10 cols 4-5 become `NM` (breech, with `k` at cols 3 and 6), leaving the wood as cheeks at col 3 (`v`) and col 6 (`w`). Row 11-12 keep the wood `VV`/`Vw` rear transom so it reads as a gun lying on a carriage.
2. [MAJOR] light-cannon (1,9)-(8,12): wheels are 1 px `W`/`w` strips with a `k` gap on each side, so they read as stripes, not wheels. The `W` over `w` split also gives a banding pattern. Fix: draw each wheel 2 px wide (cols 0-1 and 8-9, one `W` and one `w` edge-lit, `k` outline outside only) and drop the `k` at cols 2 and 7 in rows 9-12 so the wheel merges with the carriage; keep a single tone per wheel.
3. [MINOR] light-cannon (2,0)-(7,0): muzzle is a solid `k` row with no mouth. Fix: row 1 cols 3-6 `KKKK`-style bore (`K` at cols 4-5) so the muzzle ring reads.
4. [MINOR] light-cannon (3,9)-(6,12): four wood tones `W v V w`. Fix: limit to `v V w`.

## long-gun: PASS
Reads as a long slim gun on a block; width, length and breech swell are right, and it is clearly distinct from the light cannon and carronade. Notes (MINOR, not blocking):
1. [MINOR] long-gun (3,0)-(6,1): muzzle has no bore. Fix: set (4,1) and (5,1) to `K` (or `m`) for a mouth.
2. [MINOR] long-gun (1,13)-(8,14): four wood tones `v V w W`. Fix: change the `W` at (2,14) and (7,14) to `w` so only `v V w` remain.

## carronade: FAIL
1. [MAJOR] carronade (0,1)-(9,7): silhouette is a domed helmet or thimble; nothing says "cannon". There is no muzzle mouth, no trunnion or ring, and the barrel flares wide at the top rows, so it looks like a rock or a hood. Fix: set row 1 to `.kNKKKKMk.` (4 px dark `K` bore), row 2 to `.kNnnMMMk.` unchanged, and make the barrel taper toward the mouth by trimming rows 3-4 to `.kNnnMMMMk.`-width 8 (cols 1-8) so it widens only toward the breech; add an `n` lip at (2,1).
2. [MAJOR] carronade (1,8)-(8,12): the `K` breech band at row 8 is narrower (cols 2-7) than the barrel above (cols 0-9), so the barrel looks cut off and sitting on a plate, and the wood slide has four tones with an inverted `W...W` row 11 that bands. Fix: extend row 8 to `kKKKKKKKKk` (cols 1-8 inner, matching rows 6-7 outline) and make row 11 `kvvvvwwwwk`-style two tones; drop `W`.
3. [MINOR] carronade (1,3)-(5,7): the diagonal `n` wedge is a blobby 4-wide cluster. Fix: reduce to a 2 px wide `n` stripe along col 2-3.

## swivel-gun: FAIL
1. [MAJOR] swivel-gun (1,6)-(8,8): the yoke arms plus `k` gaps read as a sword crossguard and the 2 px post as a blade, so the silhouette is a dagger stuck in the ground. Fix: replace the open arms with a solid pivot block: rows 6-8 cols 2-7 filled (`MNMMk` style, `n` on the left, `M` right, `m` bottom) with no inner `k` gaps at cols 3 and 6, and add 1 px trunnion nubs at cols 1 and 8 on row 7.
2. [MINOR] swivel-gun (2,6)-(2,7): left yoke arm is `M` (mid) and not lit. Fix: left arm `n`, right arm `M`.
3. [MINOR] swivel-gun (4,9)-(5,11): four wood tones `V W v w` in a 2 px post. Fix: use only `v` left and `w` right (V highlight optional at row 9).

## mortar: FAIL
1. [MAJOR] mortar (3,3)-(6,6): the brief asks for a "wide dark mouth", but the mouth is 4 px of 10 with a 2x2 `K` core inside a heavy `k` ring; it reads as a button or speaker. Fix: widen the mouth to 6 px: rows 3-6 become `kNkKKKKkMk` is too wide for the rim, so use rows 2-7 of the interior: row 3 `kNkKKKKkMk`, row 4 `kNKKKKKKMk`, row 5 `kMKKKKKKMk`, row 6 `kMMkKKkMMk` (K bore cols 2-7 in rows 4-5), keeping the lit rim `N n` on the top-left.
2. [MINOR] mortar (0,3)-(9,6): `k` ring inside plus `k` outline give a thick double black ring. Fix: use `K` for the mouth's inner edge, keeping `k` only for the outer silhouette.
