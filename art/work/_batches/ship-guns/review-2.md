# Review round 2: ship-guns

long-gun and mortar are not listed for fixes. long-gun passed in round 1. mortar's round-1 issues are fixed: the mouth is a 6 px `K` bore, the rim is lit `N`/`n` at top left, only the outer silhouette is `k`, and the profile runs 4-6-8-10-10-10-10-8-6-4 symmetrically.

## light-cannon: FAIL
Round-1 check: #1 barrel into carriage (fixed). #2 wheels (not fixed in effect). #3 muzzle bore (fixed, `K` at (4,1),(5,1)). #4 four wood tones (fixed, now `v V w`).
1. [MAJOR] light-cannon (2,1)-(7,8): the barrel is still a bottle. The muzzle ring is 4 px wide (rows 1-2), the neck is 2 px (rows 3-6), and it swells to 4 px at row 7. A neck narrower than both ends is a flask on a box, not a cannon. A cannon only gets wider toward the breech. Fix: drop the flare. Rows 1-4 become `...kNKk...`, `...kNMk...`, `...kNMk...`, `...kNMk...`. Rows 5-8 become `..kNnMk..`-style widening: row 5 `...kNMk...`, row 6 `..kNnMMk..`, row 7 `..kNnMMk..`, row 8 `.kkNnMMkk.` (keep). The muzzle keeps its `K` bore at (4,1).
2. [MAJOR] light-cannon (0,9)-(9,13): the carriage plus wheels is one flat brown rectangle (10 x 5, almost all `v`/`w`). Nothing separates a wheel from the carriage, so it reads as a crate or bucket. Row 9 `V v w` / `w v w` also bands left to right. Fix: separate by value, with no `k` gaps. Wheels at cols 1-2 and 7-8, rows 9-12: left wheel `V` (col 1) and `v` (col 2), right wheel `v` (col 7) and `w` (col 8). Carriage cols 3-6 rows 11-12 all `w`, with the breech `NM` at cols 4-5 in rows 9-10 only. Wheels one tone brighter than the carriage so they read as discs at the sides.
3. [MINOR] light-cannon (1,9)-(2,10): `k V` then `v w N` is a 5-tone run in 5 px. This goes away with fix 2.

## carronade: FAIL
Round-1 check: #1 mouth and taper (partly fixed: `K` bore present, but the silhouette is still a dome). #2 breech band and wood (fixed: band is full width, slide is `v V w`). #3 `n` wedge (fixed to a 1 px stripe).
1. [MAJOR] carronade (0,1)-(9,8): the silhouette is still a helmet or bell. Width goes 8, 8, 8, 10, 10, 10, 10, 10 in rows 1-8 with a rounded top, so the barrel gets fatter toward the base and ends in a flat dark band. Nothing marks it as a gun. Fix: make the barrel a straight 8 px cylinder with trunnion nubs. Row 1 `.kNKKKKMk.` stays. Rows 2-4 become `.kNnMMMMk.`. Rows 5-6 become `kNnMMMMMMk` (the 10 px trunnion band). Row 7 becomes `.kNMMMMMk.`. Row 8 becomes `.kKKKKKKk.`. The nubs at (0,5)-(0,6) and (9,5)-(9,6) give the gun read, and the straight sides stop the dome look.
2. [MINOR] carronade (1,9)-(8,11): the slide is 1 px wider than the barrel on each side only at row 10. Fix: after fix 1, make rows 9-11 `kvVVwwwwk`-style at full 9 px (cols 0-8) so the slide reads as a base.

## swivel-gun: FAIL
Round-1 check: #1 solid pivot block with trunnion nubs (done, but see below). #2 left arm lit (fixed, `N`/`n`). #3 post tones (fixed, `v V w` only).
1. [MAJOR] swivel-gun (0,0)-(9,8): it still reads as a dagger or a sword hilt. The barrel is 2 px wide for 7 rows, then a 10 px crossbar at row 7 with a 4 px post, so the shape is blade, crossguard and grip. Fix: make the barrel stouter and the crossbar short. Rows 0-4 become 4 px interior: row 0 `..kkkkkk..`, row 1 `..kNKKMk..`, rows 2-4 `..kNnMMk..`. Row 5 becomes `.kNnMMMMk.`. Row 6 becomes `kNnMMMMMMk` (nubs, the one 10 px row). Row 7 becomes `.kMMMMMmk.`. Row 8 becomes `..kkMMkk..`. The post keeps rows 9-11 as is but starts at row 8. This puts the widest point in the middle of a fat barrel, not at the base of a thin blade.
2. [MINOR] swivel-gun (4,9)-(5,11): post is 2 px wide and 3 px tall under a 10 px head, so it looks like a stem. Fix: with fix 1 widen the post to 4 px (`kvVwk` rows) at rows 9-11 and keep `k` at row 12.

## Set
After the fixes above, the three long-barrel guns should share one rule: muzzle with a `K` bore, then a straight or widening barrel (never a neck), then wood. Outline, top-left light and iron/wood palette use are already consistent across all five.
