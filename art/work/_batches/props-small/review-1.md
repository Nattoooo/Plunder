# Batch props-small, review round 1

Set notes: outline, top-left light and wood/iron ramps are consistent across the batch and match the approved set. Ground marks (dig-spot, x-mark) correctly have no outline. The failures are readability of specific objects (padlock, flag, bottle, quest mark), not style drift. Sizes are all within 1 px of spec or flexible.

## chests: FAIL
1. [MAJOR] locked-chest (2,2)-(4,4): the padlock does not read. The shackle bar `n` on the band row (`kMnnnMk`) is the same tone as the rest of the band, so it merges into it, and what remains is a grey plate, not a padlock. The keyhole `k` at (3,4) also touches the bottom outline at (3,5), so it reads as a notch in the outline. Fix: row 2 becomes `kMnMnMk` (two `n` shackle legs at x=2 and x=4, dark band `M` between them). Row 3 becomes `kvNkNWk` (keyhole `k` at (3,3), clear of the outline). Row 4 becomes `kvMMMWk`.
2. [MINOR] chest (3,2): the single `y` clasp sits in the strap row, so it reads as a highlight on a band, not a clasp. It is acceptable as is; if the strap is touched, make the clasp 1 px lower, on the body.
3. [MINOR] gold-chest (1,1)-(5,2): the heap is 3 tones with no coin edges, so it reads as a gold dome, which is fine at 1x. It passes on its own. Gold-chest is otherwise clean and ships unchanged.

## crate: FAIL
1. [MAJOR] lost-cargo (0,0)-(4,2): the flag does not read as a flag on a pole. The pole is 2 px tall and the red block spans 5 of the crate's 6 columns, so it looks like a red lid or label on a box. The crate underneath is cut to 4 rows (no plank seam) and no longer matches `crate`. Fix: make the sprite 6x9 (+2 px, within flexible range). Rows 0-1: pole cap and pole, `.kk...` / `.kW...`. Then the 2x2 flag with a clear transparent gap to its right and a 1 px `W` pole at x=1 for at least 3 rows. Then the full 6x6 `crate` body below, unchanged, including the `w` seam row. The pole must visibly rise above the crate and the flag hang to the right of it, as in `waypoint`.
2. [MINOR] lost-cargo notes say "the same flag as waypoint", but this flag is 2x2 and the waypoint flag is 2x3. Make them match when the flag is redrawn (use 2x2 in both, or note the difference).
3. [MINOR] crate (1,3)-(4,3): the `w` seam is nearly the outline colour, so it merges with the outline at x=0 and x=5 into a dark band. Consider `W` for the seam, as deck-planks does. Crate itself is otherwise acceptable.

## barrel: PASS
1. [MINOR] barrel (1,2)/(1,4): the two `M` hoops fill about half the interior rows, so the barrel skews grey at 1x. Optional: drop the lower hoop to `v` shade. Silhouette, rounded ends and lighting are sound.

## bottle: FAIL
1. [MAJOR] bottle (0,0)-(4,5): the silhouette is a dumbbell, not a bottle. The cork is the widest part (5 px), the neck pinches to 3 px with outline, and the body widens again. At 1x it reads as a green lantern or jar. A cork sits inside the neck, never wider than it. Also the cork `J`/`j` is leather brown where a cork would be tan. Fix: make it 5x7. Rows:
   `..k..` / `.kDk.` / `.kGk.` / `kGGGk` / `khxGk` / `kGxGk` / `.kkk.`
   (cork 1 px `D`, neck 1 px `G`, shoulder `GGG`, body with `h` glint and `x` paper unchanged).

## dig-spot: PASS
Clean mound, no outline as a ground mark, light from top left, F/D/d ramp correct, shape steps evenly.

## x-mark: PASS
Symmetric, 2 px strokes, flat `R`, no outline, reads on sand and on water.

## quest-mark: FAIL
1. [MAJOR] quest-mark (1,0)-(2,4): the mark is a 2 px wide gold stroke with no outline on sand (#cfa86a-ish ground). The lit `y` column has very low contrast against sand and the mark nearly disappears at 1x in context. The sprite is also 2 px of artwork in a 4 px box. A quest marker is the one thing that must pop. Fix: outline it with `k` and size it 4x7: row 0 `.kk.`; rows 1-3 `kyOk` x3; row 4 `.kk.` (shared outline and gap); row 5 `kyOk`; row 6 `.kk.`. This is +1 px wide and +2 px tall on the 3x5 spec, within the flexible range.

## waypoint: PASS
1. [MINOR] waypoint (2,0)-(3,3): the flag is a flat rectangle with no taper or notch; acceptable at 5x7. Pole, cap, base, outline and top-left light are correct and it reads on sand and water.

## dock-planks: PASS
Exactly 4x4, no outline, same `v` and `W` tones as deck-planks, tiles cleanly along y.
