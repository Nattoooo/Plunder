# deck-planks

## deck-planks (5 x 5, fixed)

- **Columns 0-3, `v` (wood base):** one plank, 4 px wide, running fore-aft. Bow is up, and real deck planking runs bow to stern, so the plank runs vertically.
- **Column 4, `W` (wood shadow):** the caulked seam between this plank and the next. It sits on the right of the plank, the shadow side under top-left light.
- Tiled, this gives an even rhythm of 4 px plank and 1 px seam across the whole deck, with seams running exactly along the right edge of each deck cell. That puts every seam under the outlined edge of a part, so the planking never cuts through the middle of a gun or mast.
- **No butt joints (plank ends):** with a 5 px tall tile, any joint would repeat in the same row of every tile and line up into a cross-grain grid that reads as tiles, not planks, and would fight the parts on top.
- **No highlight edge, no grain, no knots:** a third tone would add a stripe per plank and make the deck busier than the parts. Two tones are enough to say "planks".
- **Seam colour `W`, not `w`:** the darkest wood was too strong a line at deck scale; `W` keeps the deck calm while still reading.
- No outline, as STYLE.md requires for tiling tiles. Only hull-wood swap colours (`v`, `W`) are used, so pine, oak and iron hulls recolour the whole tile.
- Size unchanged (fixed 5 x 5).
