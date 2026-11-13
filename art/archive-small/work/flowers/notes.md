# flowers (5x3, as spec)

Grid (`src/flowers.txt`):

```
e.y.e
GhGGG
.GGG.
```

- Blooms (top row): red `e` at both ends, yellow `y` in the centre. The red and yellow wildflowers in the brief.
- Stems: `G` at (0,1) and (4,1) sit directly under each red bloom and join it orthogonally, so no bloom floats.
- Centre bloom: yellow `y` at (2,0) sits on `G` at (2,1), part of the leaf block.
- Leaves: row 1 is a block of foliage. `h` at (1,1) is the one light pixel on the top-left of the tuft, following the light from the top left. There is no matching light on the right, so the highlight is not mirrored.
- Base: `.GGG.` on the bottom row, centred left to right, touching the ground.
- Foliage swap characters are `G` and `h` only, recoloured per sea. `e` is not a swap part here and appears nowhere else in the sprite.
- No outline: at 5x3 an outline would eat the flowers and the leaves. The critic accepted this in round 1.
- Size unchanged at 5x3 (flexible in the spec, kept as it reads).

## Round 2

1. [MAJOR] Red blooms floated (fixed). The two red blooms now stand on `G` stems at (0,1) and (4,1). I took the stem option rather than `ehGhe`, since red sides would read as red stems. The yellow centre connects through `G` at (2,1).
2. [MINOR] Mirrored highlight (fixed). `G` at (3,1) replaces the `h`, so `h` appears only at (1,1), top-left.
3. [MINOR] Tuft disappears against grass (fixed in part). Row 1 is now five pixels wide, up from three, so the stems and tuft give the blooms mass. `h` is kept as the critique asked. The `h` tone is the same as the tropical grass background, so in that sea the single highlight reads as ground. The same tone is used by the approved grass-tuft. Foliage is recoloured per sea, so this changes in the other seas.
4. [MINOR] `e` versus `R` (not changed, with reason). `R` is `#a82c34`, which is 1.09:1 against the `G` stems. `e` is `#e0544a`, 1.97:1, so it reads as a bloom. The mushroom caps also use `e` for their bright red. Flowers contain no pennant, shirt or roof swap characters, so there is no swap clash.

Render: `art/work/flowers/preview.png` and `art/sprites/nature/flowers.png`.
