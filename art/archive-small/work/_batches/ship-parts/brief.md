# Batch `ship-parts`

13 families. Draw every sprite listed below.

## Folder `ship` rules

- Folder ship, 27 sprites, all fixed size. Ships are built on a grid of 5 × 5 px deck cells and seen from straight above, bow up. Each part's bottom 5 × 5 sits on one deck cell. Parts taller than 5 px stick out above the cell toward the bow (the rudder is the exception: it sticks out below, past the stern). Guns are drawn pointing up; the game turns them to face out over the side.

## Families

### `helm` (has a drawing in art/src/helm.txt)

- `helm` 5 x 5 (fixed size): Ship's wheel

### `rudder` (has a drawing in art/src/rudder.txt)

- `rudder` 5 x 7 (fixed size): Wooden rudder blade; sticks out 2 px below the cell

### `mast` (has a drawing in art/src/mast.txt)

- `mast` 5 x 5 (fixed size): Base of a mast with rigging lines (sails are drawn over it)

### `oar-bench` (has a drawing in art/src/oar-bench.txt)

- `oar-bench` 5 x 5 (fixed size): Rowing bench across the deck (oars are a separate sprite)

### `crew-quarters` (has a drawing in art/src/crew-quarters.txt)

- `crew-quarters` 5 x 5 (fixed size): Deck hatch with a ladder going below

### `cargo-hold` (has a drawing in art/src/cargo-hold.txt)

- `cargo-hold` 5 x 5 (fixed size): Closed cargo hatch with two iron straps

### `galley` (has a drawing in art/src/galley.txt)

- `galley` 5 x 5 (fixed size): Iron cooking stove with a chimney pipe and a glow of fire

### `powder-magazine` (has a drawing in art/src/powder-magazine.txt)

- `powder-magazine` 5 x 5 (fixed size): Four powder kegs seen from above

### `workshop` (has a drawing in art/src/workshop.txt)

- `workshop` 5 x 5 (fixed size): Carpenter's workbench with a hammer

### `sick-bay` (has a drawing in art/src/sick-bay.txt)

- `sick-bay` 5 x 5 (fixed size): Cot with a red cross

### `crows-nest` (has a drawing in art/src/crows-nest.txt)

- `crows-nest` 6 x 6 (fixed size): Round lookout basket seen from above, drawn on top of the sails

### `ram` (has a drawing in art/src/ram.txt)

- `ram` 5 x 8 (fixed size): Pointed iron ram plate on the bow, sticking out forward

### `figurehead` (has a drawing in art/src/figurehead.txt)

- `figurehead` 5 x 8 (fixed size): Gold carved figurehead on the bow, sticking out forward
