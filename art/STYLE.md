# Plunder pixel style

Every sprite in the game follows these rules. Agents drawing or critiquing sprites treat them as hard requirements.

## The look

Small, minimal, chunky and instantly readable. Think of the cleanest tiny-sprite games: flat colour areas, strong silhouettes, two or three tones per material, nothing decorative that the eye can't name.

- Every pixel must earn its place. If a pixel doesn't make the shape read better, remove it.
- No noise, speckle, texture pixels, scattered highlights or "detail for detail's sake".
- A detail is allowed only if it shows something real (a buckle, a window, a knot in a rope) and sits exactly where that thing would physically be.
- Fewer, bigger shapes beat many small ones. At these sizes, a 1 px detail is a big decision.
- The silhouette alone (filled black) must say what the thing is.

## Palette

Use only these characters. `.` is transparent. Ramps go dark to light.

| Chars | Hex | Use |
| --- | --- | --- |
| `k` | #1b1220 | Outline, darkest shadow |
| `K` | #3a2a3a | Deep shadow, dark interiors |
| `w W v V` | #4e301c #6e4528 #93633a #bd8a52 | Wood |
| `d D f F` | #5a3e24 #8a663e #cfa86a #f0d8a0 | Sand, tan, rope, light wood |
| `j J` | #3a2214 #7a4a2a | Leather, hair, dark brown |
| `m M n N` | #2c2f36 #4b505a #787f8a #b7bec8 | Iron, steel |
| `t T u U` | #3c3c46 #62626e #9a9aa4 #d0d0d8 | Stone |
| `o O y Y` | #7a4a12 #c08022 #f0bc3c #fff0a0 | Gold, brass |
| `r R e E` | #5e1a22 #a82c34 #e0544a #ff9a80 | Red |
| `c C p P` | #a89878 #d8ccb0 #f6f0e0 #ffffff | Cloth, plaster, paper, white |
| `g G h H` | #173a24 #24603a #3f9444 #86cc5a | Foliage, green |
| `b B l L` | #16305e #2e5ea8 #6aa6e0 #b8e0ff | Blue, sky, ice |
| `a A` | #0e2a4a #2a6a9a | Deep water |
| `s S` | #f0c098 #c08060 | Skin light, skin shadow |
| `x X` | #e4dcc0 #a89a74 | Bone, parchment |
| `z Z` | #4a2a6a #9a68d0 | Purple, magic |
| `i I` | #1e7a5e #78f0c0 | Ghostly teal |
| `q Q` | #d8601e #ffa83a | Fire, orange |

### Colours the game swaps

These parts are recoloured in game, so they must use exactly these characters, and those characters must not appear anywhere else in the same sprite:

| Part | Chars |
| --- | --- |
| Roof tiles (houses, island buildings) | `e R r` |
| Plaster walls (houses) | `C c` |
| Foliage (trees, bushes, reeds, grass tufts) | `H h G g` |
| Sail cloth | `p C c` |
| Hull wood (plank deck tile, bows) | `V v W w D` |
| Pennant flag | `R` |
| Fort flag | `B` |
| Crew shirt | `R r` |

## Outline and light

- Outline: a 1 px `k` outline around the outer silhouette of characters, creatures, props, buildings, trees, deck parts and icons.
- Interior lines only where two shapes would otherwise merge. Never outline every colour patch.
- No outline on tiling tiles (deck planks, logs, lava, dock planks), sail cloth, ground marks, or effects.
- Very small sprites (3 px or less on a side) may drop the outline when it would eat the shape.
- Light comes from the top left. Highlights on top and left faces, shadow on bottom and right.
- At most 3 tones per material (shadow, base, highlight). Usually 2 is enough.
- No pillow shading (dark ring around a lighter centre), no banding (parallel stripes of tones following the outline), no dithering.

## Views

- On land (characters, trees, buildings, props, icons): front view seen slightly from above, like a classic top-down RPG. You see the front face and a little of the top.
- At sea and on deck (ship tiles, deck parts, sails, crew on deck, wrecks): straight down from above, bow pointing up.
- Sea creatures: straight down from above, facing right.
- Icons: one object, centred, filling most of the 8 x 8 square, at a slight angle from above.

## Scale

- The captain (6 x 9) is the unit of scale for everything on land. A door fits the captain; a tree is about twice the captain's height; a crate comes up to about the captain's waist.
- Ship parts sit on a 5 x 5 deck cell. A crew member on deck is 3 x 3.
- Sizes in the spec are exact for fixed sprites. Flexible sprites may change by a pixel or two if it clearly reads better; say why.

## Pixel craft

- No orphan pixels (a single pixel of a colour touching nothing of related tone) unless it is a deliberate point: an eye, a glint, a rivet.
- Clean lines: diagonals step evenly (1-1-1 or 2-2-2). No jaggies like 1-2-1-3.
- Curves step smoothly: run lengths change gradually (3-2-1-1, not 3-1-2-1).
- Symmetric objects are exactly symmetric, apart from lighting.
- Things that stand on the ground touch the bottom row and are centred left to right. Transparent background, no ground, no drop shadow.
- Animation frames of one thing match exactly except for the parts that move.
- Hard pixels only: no anti-aliasing, no semi-transparency.

## Consistency

- Match what is already approved: open the previews in `art/work/<family>/preview.png` for families listed in `art/APPROVED.md` in the same folder, and match their outline, lighting, proportions and level of detail.
- Same materials use the same ramps across sprites (all wood uses the wood ramp, all iron uses the iron ramp).
