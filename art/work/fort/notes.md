# fort notes
- Stone ramp t/T/u, k outline. Brick courses are 4 rows (u top, T x2, t mortar), counted from the bottom, so tower, gate and wall-front courses line up; the top course is a row taller where needed.
- Battlements: tower and gate use 8 px merlons with 2 px crenels (28 wide); wall-front and wall-back use 6 px merlons + 2 px crenel, so the 8 px tile repeats seamlessly. Merlons are lit top-left, shaded right.
- fort-tower: 2x8 arrow slit centred, a K sill above it as the dark recess.
- fort-gate: arched opening with k outline, two wooden leaves (light left edges, centre seam) and two iron bands.
- fort-wall-side: walkway from above: lit left parapet, T paving with a joint row so it tiles vertically, shaded right parapet.
- fort-wall-back: same merlons seen from the courtyard, plain bricks, k base row.
- fort-flagpole: wood pole with gold-free cap, 7x7 flag in B only, k base.
- fort-crates: three crates (two below, one on top), wood ramp, light top-left edges and a plank seam.

## Batch round 1
1. Crates outline: top crate and lower crates now share single 1 px k lines (row 7 and the x7 column); no doubled edges.
2. Crates top faces: top crate has a 2 row lid (F, V) under a k top; the two lower crates show F/V lids at their exposed outer tops. Crates are 15 px wide inside the 16 px sprite (k at x0, 7, 14) so the shared divider can stay a single symmetric pixel.
3. Crates seam: one `w` seam row between `W` planks; base is `k` directly under `W`.
4. Tower crenels: rows 3-4 of the crenel gaps filled with K (courtyard shadow); rows 0-2 stay clear.
5. Arrow slit: now 2x8, k cap row, K left column and k right column, k base, so it reads as a dark recess.
6. Brick joints: `u` row set to `T` at each vertical joint column in tower, gate and wall-front to break the stripes.
7. Wall-front top course: kept at 5 rows deliberately; the tower and gate share the same 5 row top course, so alignment from the bottom holds. Deleting a row would break the 24 px height and course alignment.
8. Gate: door seam `kk` now starts at row 9.
9. Gate: right leaf outer W columns changed to w so light stays top-left.
10. Wall-side: added a t mortar row at row 3, so the x5 joint sits in a 3 row course.
