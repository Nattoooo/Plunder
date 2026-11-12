FAIL

Round 3. Read: STYLE.md, specs.json (families.captain, notes.characters), notes.md (Rounds 1-2 sections), src/captain.txt (9 x 9, current), preview.png, family.png, critique-1.md, critique-2.md, and src/house-cottage.txt for door scale. The captain is the first character family, so there is no approved character to match; it is the standard the rest will follow.

## Round 2 issues

1. [MAJOR] Tricorn reads as ears/horns: FIXED. Rows 0-2 are now `k..kkk..k` / `kykKKKkOk` / `kyyyyyyOk` as directed. The brim sweeps wider than the head and the corner gold joins the trim. At 1x it reads as a pirate hat. Residuals are minors 1 and 4 below.
2. [MAJOR] Swinging hand merges with the face (down-2/3): FIXED. Row 5 is plain coat, the hand is at the cuff row 6.
3. [MAJOR] Width against door scale: NOT FIXED. See issue 1 below. The notes still push the decision to the coordinator and nothing is recorded in specs.json.
4. [MINOR] Front chin taper: NOT FIXED. The artist's reason (a taper orphans the cheeks) is accepted, but the front/back head mismatch remains (minor 2).
5. [MINOR] Lifted leg reads as a thin leg: accepted as is. It reads as a step in the 3x context preview.
6. [MINOR] Side-2 coat tail: FIXED. Row 7 `.kRRbkbk.` keeps two coat pixels. It opens an outline gap (minor 3).
7. [MINOR] Side boots: FIXED. Side-1 row 8 is `..kkkkk..`, side-2 is `...kk.kk.`.
8. [MINOR] Flat coat: accepted. Light direction is carried by the gold `y`/`O`, hair `J`/`j` and skin `s`/`S`.

Round 1 items 1-8 are fixed or accepted as noted in critique-2. Frame consistency checked: down-3 is an exact mirror of down-2 (rows 6-8), up-2 and up-3 mirror each other and reuse the down lower bodies, hat, head and shoulders are identical in all frames of each view. The palette is clean (only k K y O s S R p b J j; no `r` used, the header comment still mentions it). The outline is closed except where noted. Light is from the top left. Feet are on row 8 and the figure is centred on column 4.

## Issues

1. [MAJOR] all sprites, size/scale: the captain is 9 x 9 (7 px body) against the spec's 6 x 9. The approved house-cottage door is 4 px wide (cols 8-11, rows 15-22) and 8 px tall, and STYLE.md says "a door fits the captain". A 7 px body (9 px with the hat) cannot fit a 4 px door; the captain is also a square 9 x 9 instead of the intended 2:3 figure. Round 2 required that one of the two fixes be decided and recorded before approval; neither was. Fix (coordinator, not the artist): record in specs.json `notes.characters` that the captain is 9 x 9 with a 7 px body, and widen the door to at least 7 px in house-cottage and every door-bearing building (and re-review those families). If that is rejected, the captain must be redrawn at 6-7 px wide total (body 5, face interior 3 with a single centre eye pair removed to 2 px eyes).
2. [MINOR] captain-down-1/2/3, captain-up-1/2/3 (1,0) and (7,0): the gold corners (1,1) `y` and (7,1) `O` have transparent pixels above them, so the outline is open on top of the wing. Fix: row 0 `kk.kkk.kk` in all six frames (side frames: (1,0) `k` in row 0 giving `kk.kkkk..`).
3. [MINOR] captain-side-2 (2,7) `R`: the coat tail has transparent (2,8) below it, so the outline is open (side-1 closes it with `..kkkkk..`). Fix: row 8 `..kkk.kk.`... only if (2,8) `k` does not merge the rear boot into a bar; otherwise change (2,7) to `k` and shift the tail to `.kkRbkbk.`. Pick the first and check at 1x.
4. [MINOR] captain-down-1/2/3 (2..5,2) `y`, (6,2) `O`: the front trim is a flat 7 px gold bar directly above the eyes, so it still reads partly as a headband. A centre front point would say tricorn more clearly. Fix: (4,2) `k` is too heavy; instead make (4,2) `O` and keep the rest, so the bar dips in tone at the centre. Optional.
5. [MINOR] captain-down-1/2/3 vs captain-up-1/2/3 row 4: the front chin row is 7 px wide (`.kssssSk.`) but the back head is 5 px (`..kJjJk..`), so the head changes width by 2 px between views and the figure seems to shrink when it turns. Fix: back row 4 `.kJJjJjk.` with (2,4) and (6,4) hair, so the back jaw is as wide as the front.
6. [MINOR] captain-side-1/2 (7,3)-(7,4): the face is a straight vertical edge at column 7, so the profile shows no nose or brow. Fix: make (7,3) `s` and (8,3) `k` in side-1/2 (the nose pixel), with (7,4) staying `k`; mind that (8,3) sits under the brim end (8,2).

Verdict: one MAJOR remains (the captain is wider than the approved door and the scale decision is still unrecorded), plus five minors. FAIL.
