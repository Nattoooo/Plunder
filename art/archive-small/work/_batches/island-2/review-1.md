# Review island-2, round 1

Set notes: all four sprites match spec size exactly (34x21, 20x7, 14x21, 25x32), stand on the bottom row, use only palette characters, keep a continuous 1 px `k` outline and light from the top left. Roof swap colours (`e R r`) and plaster swap colours (`C c`) are used only on roofs and walls. Weak points across the set: the tavern roof has no `r` shadow row while warehouse and watchtower do, and the thin 1 px legs/posts with `k` on both sides (dock, watchtower) read heavier and noisier than the approved buildings.

## warehouse: PASS
Silhouette (hip roof, wide front, stacked crate on the right) reads as a barn. Doors are 10 px wide by 7 px tall inside a 1 px `k` frame, symmetric, and fit the captain. Minor notes only:
1. [MINOR] warehouse (3,16)-(9,19): the base crate is banded V / w / v top to bottom, so the darkest tone sits in the middle and breaks the top-left light. Fix: make rows 17-19 `V` (row 17), `v` (row 18), `v` with `w` only at the right-hand pixel (row 19), or add a single vertical `w` slat instead of a horizontal band. Same for the right crate (24,16)-(30,19).
2. [MINOR] warehouse: the sprite uses four wood tones (`V W v w`: doors `V W w`, crates `V v w`), over the 3-tone limit, and notes.md claims the fourth tone was removed. Fix: change door `W` to `v` (rows 13-19, x13-14 and x19-20) so wood is `V v w`, and correct the notes.
3. [MINOR] warehouse (2,16) and (10,16): the 1 px plaster slivers between wall outline, crate and door read as a doubled outline. Fix: none required; if redrawing, move the left crate one px left is not possible, so accept.

## private-dock: FAIL
1. [MAJOR] private-dock (0,3)-(4,4) and (15,3)-(19,4): the end clusters are muddy. A 1 px `V`/`v` pile at x1, a `k` at x2, a 1 px post interior at x3 and a `k` at x4 sit inside 5 px, so rows 3-4 read as a stripe of dark pixels rather than a post and a pile. Same on the right mirror. Fix: drop the extra pile column (make (0,3),(0,4),(1,3),(1,4) the plank colours `V`/`v` with the outline only at x0 and the front), and widen each mooring post to a 2 px interior (`VV` lit/`vV`) over x2-5 so the post is one clear shape from row 0 to the deck.
2. [MAJOR] private-dock (5,3),(14,3),(5,4),(14,4): the plank seams at x6 and x13 leave 1 px slivers at x5 and x14 and a 6 px plank between. Plank widths 1/6/1 are uneven and the seams look like post shadows. Fix: remove both seams and put a single seam at x9 or x10 (`v` in row 3, `w` in row 4), keeping mirror symmetry only if the seam is centred (use x9 and x10 as a 2 px seam, or none).
3. [MAJOR] private-dock as a whole: with a deck only 2 rows deep and a 1 row front face, the silhouette reads at 1x as a log/bench or fence with two bumps, not a jetty. Fix: deepen the deck to 3 rows (rows 2-4 plank top, `V` row 2 under the outline, `v` rows 3-4), keep the `w` front face on row 5, and let the sprite stay 20x7 by shortening the posts to 2 rows (rows 0-1).

## watchtower: FAIL
1. [MAJOR] watchtower (4,12)-(9,17): the bracing reads as a ring or bullseye, not X bracing. Row 12 bar, outer pixels at (5,13) and (8,13), a 2x2 `ww` block at (6,14)-(7,15), outer pixels again at (5,16) and (8,16), and a bar at row 17 make an hourglass with a thick centre. Fix: draw a true X with 1 px diagonals: (5,13),(6,14),(7,15),(8,16) and (8,13),(7,14),(6,15),(5,16), with no 2x2 centre.
2. [MAJOR] watchtower (4,17)-(9,19): an extra bar at row 19 with an empty row 18 above it leaves a second bay with no bracing, so the legs look unfinished and the horizontal bars are arbitrary. Fix: remove the row 17 bar (leave the X to run into row 17 corners) and keep only the bars at rows 12 and 19, or extend the X to span rows 13-18 between those two bars.
3. [MINOR] watchtower (2,5)-(11,5) and row 4: the eave `k` row 4 plus a second solid `k` row 5 make a 2 px black band under the roof. Fix: make row 5 x3-10 `w` (eave shadow) instead of `k`, keeping `k` at x2 and x11.
4. [MINOR] watchtower braces are `w` (#4e301c) against `k` and a dark background, so they are low contrast at 1x. Fix: use `v` for the X diagonals.

## tavern: PASS
Roof with chimney, 3 symmetric windows, floor beam and 8 px door read clearly and match the approved townhouse. Minor notes only:
1. [MINOR] tavern (4,26)-(8,28): the hanging sign is a blank gold plate and is 7 px wide, wider than the 6 px door frame, so it reads as a lit window or plaque rather than a tavern sign. Fix: put a 3x3 mug glyph in `w`/`k` on the `y` face (e.g. `k` at (6,26),(6,27),(6,28) and (7,26)), or shrink the sign to 5 px wide.
2. [MINOR] tavern roof rows 4-9: no `r` shadow row, unlike warehouse and watchtower. Fix: make row 9 x2-22 `r` for batch consistency.
3. [MINOR] tavern (2,14)-(22,18): the window frames sit 1 px from the wall outline at x2 and x22, which crowds the edges. Fix: none required.
