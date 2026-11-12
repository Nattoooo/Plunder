# Batch `ship-large`

4 families. Draw every sprite listed below.

## Folder `sails` rules

- Folder sails, 21 sprites, all fixed size, all seen from straight above. A sail's wooden yard (the pole it hangs from) is its bottom row, and the cloth bellies upward because the wind pushes it forward. Use only the sail cloth colours for the cloth, since every ship recolours its sails. Each sail comes full, half-reefed and furled (rolled up on its yard).

## Folder `ship` rules

- Folder ship, 27 sprites, all fixed size. Ships are built on a grid of 5 × 5 px deck cells and seen from straight above, bow up. Each part's bottom 5 × 5 sits on one deck cell. Parts taller than 5 px stick out above the cell toward the bow (the rudder is the exception: it sticks out below, past the stern). Guns are drawn pointing up; the game turns them to face out over the side.

## Families

### `bows` (new: draw from scratch)

- `bow-small` 5 x 3 (fixed size): Pointed front tip of a 1-cell-wide hull, point at the top
- `bow-medium` 10 x 3 (fixed size): Pointed front tip of a 2-cell-wide hull
- `bow-large` 15 x 5 (fixed size): Pointed front tip of a 3-cell-wide hull

### `sail-square` (new: draw from scratch)

- `sail-square-full` 13 x 5 (fixed size): Square sail, full
- `sail-square-half` 13 x 3 (fixed size): Square sail, half-reefed
- `sail-square-furled` 13 x 2 (fixed size): Square sail, furled on its yard

### `sail-main` (new: draw from scratch)

- `sail-main-full` 17 x 9 (fixed size): Great mainsail with a topsail above it on its own yard, both full
- `sail-main-half` 17 x 5 (fixed size): Mainsail and topsail, half-reefed
- `sail-main-furled` 17 x 3 (fixed size): Mainsail and topsail, both furled

### `sail-lateen` (new: draw from scratch)

- `sail-lateen-full` 5 x 13 (fixed size): Triangular lateen sail on a long spar down the left edge, cloth bellying right, full
- `sail-lateen-half` 3 x 13 (fixed size): Lateen sail, half-reefed
- `sail-lateen-furled` 2 x 13 (fixed size): Lateen sail, furled along its spar
