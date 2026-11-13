# Batch `props-small`

9 families. Draw every sprite listed below.

## Folder `buildings` rules

- Folder buildings, 21 sprites. Buildings show their front wall and roof, with the bottom of the wall on the bottom row. Doors are about 8 px tall so the captain fits through them. Draw roofs and plaster walls in the swap colours so towns can vary them.
- The game assembles town forts and the player's Coastal Fort (45 to 77 px wide) from these pieces, so the stone, battlements and outline must match across all of them and the tiling edges must line up exactly.
- The ten buildings a player can put on an island they own. The Coastal Fort is built from the fort pieces above, so it has no file of its own.

## Folder `props` rules

- Folder props, 15 sprites, all flexible. Crates, barrels and the bottle also float at sea as loot, so they should read on blue water as well as on sand. The wreck is seen from straight above.

## Families

### `chests` (has a drawing in art/src/chests.txt)

- `chest` 7 x 6 (flexible size): Closed wooden treasure chest with gold trim
- `locked-chest` 7 x 6 (flexible size): Iron-banded chest with a padlock
- `gold-chest` 7 x 5 (flexible size): Open chest overflowing with gold coins

### `crate` (has a drawing in art/src/crate.txt)

- `crate` 6 x 6 (flexible size): Wooden crate
- `lost-cargo` 6 x 7 (flexible size): Crate with a small red flag, marking cargo lost when your ship sank

### `barrel` (has a drawing in art/src/barrel.txt)

- `barrel` 5 x 6 (flexible size): Wooden barrel

### `bottle` (has a drawing in art/src/bottle.txt)

- `bottle` 4 x 5 (flexible size): Message in a bottle: green glass, cork, rolled paper inside

### `dig-spot` (has a drawing in art/src/dig-spot.txt)

- `dig-spot` 6 x 4 (flexible size): Small mound of disturbed sand where treasure is buried

### `x-mark` (has a drawing in art/src/x-mark.txt)

- `x-mark` 6 x 6 (flexible size): Big red X on the ground, from a treasure map

### `quest-mark` (has a drawing in art/src/quest-mark.txt)

- `quest-mark` 3 x 5 (flexible size): Gold exclamation mark floating over a quest location

### `waypoint` (has a drawing in art/src/waypoint.txt)

- `waypoint` 5 x 7 (flexible size): Small red flag on a pole, marking your waypoint

### `dock-planks` (has a drawing in art/src/dock-planks.txt)

- `dock-planks` 4 x 4 (fixed size): Wooden pier planks for town docks; fixed size, tiles along the pier
