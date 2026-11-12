# Batch `ship-tiles`

4 families. Draw every sprite listed below.

## Folder `ship` rules

- Folder ship, 27 sprites, all fixed size. Ships are built on a grid of 5 × 5 px deck cells and seen from straight above, bow up. Each part's bottom 5 × 5 sits on one deck cell. Parts taller than 5 px stick out above the cell toward the bow (the rudder is the exception: it sticks out below, past the stern). Guns are drawn pointing up; the game turns them to face out over the side.

## Families

### `deck-logs` (new: draw from scratch)

- `deck-logs` 5 x 5 (fixed size): Lashed logs for rafts; tiles seamlessly

### `iron-bands` (new: draw from scratch)

- `iron-bands` 5 x 5 (fixed size): Iron bands laid over the planks of an Ironbound hull; transparent between the bands

### `deck-damage` (new: draw from scratch)

- `damage-crack` 5 x 5 (fixed size): Cracked, splintered planks; transparent except the damage
- `damage-hole` 5 x 5 (fixed size): Hole in the deck showing dark water; transparent around it

### `stern-lantern` (new: draw from scratch)

- `stern-lantern` 3 x 3 (fixed size): Small brass lantern hanging off the back of the ship
