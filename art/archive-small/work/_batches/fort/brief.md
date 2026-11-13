# Batch `fort`

1 families. Draw every sprite listed below.

## Folder `buildings` rules

- Folder buildings, 21 sprites. Buildings show their front wall and roof, with the bottom of the wall on the bottom row. Doors are about 8 px tall so the captain fits through them. Draw roofs and plaster walls in the swap colours so towns can vary them.
- The game assembles town forts and the player's Coastal Fort (45 to 77 px wide) from these pieces, so the stone, battlements and outline must match across all of them and the tiling edges must line up exactly.
- The ten buildings a player can put on an island they own. The Coastal Fort is built from the fort pieces above, so it has no file of its own.

## Families

### `fort` (has a drawing in art/src/fort.txt)

- `fort-tower` 14 x 18 (fixed size): Square stone corner tower: battlements around a flat top, arrow slit in the front
- `fort-wall-front` 4 x 12 (fixed size): Front stone wall with battlements on top; tiles left to right
- `fort-gate` 14 x 12 (fixed size): Arched gatehouse with heavy wooden doors, set into the front wall
- `fort-wall-side` 6 x 4 (fixed size): Side wall seen from above as a walkway; tiles top to bottom
- `fort-wall-back` 4 x 7 (fixed size): Back wall seen from inside the courtyard; tiles left to right
- `fort-flagpole` 6 x 12 (fixed size): Flagpole with a square flag (use the fort flag colour)
- `fort-crates` 8 x 7 (fixed size): A few stacked wooden crates for the courtyard
