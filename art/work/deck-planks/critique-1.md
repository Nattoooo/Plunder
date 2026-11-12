PASS

Checked against STYLE.md, specs.json (ship / deck-planks, 5 x 5 fixed), notes.md, src/deck-planks.txt and preview.png (single tile at 24x, 1x and 3x in context, 3 x 3 tiling). No approved families exist yet in the ship folder, so there is nothing to match against.

Checks:
- Size and background: the grid is exactly 5 x 5. A tiling tile is opaque by design, and nothing is semi-transparent.
- Palette: the tile uses only `v` and `W`, both hull-wood swap characters. No other swap characters appear, and nothing outside the hull-wood set is used.
- Tones: 2 tones, under the 3-tone cap. There is no outline, which is correct for a tiling tile.
- Light: the seam `W` sits on the right edge (column 4), the shadow side under top-left light.
- View: straight down, bow up, with planks running fore-aft, which is correct.
- Tiling: the 3 x 3 tiling is seamless. Seams are 1 px wide and repeat every 5 px with no drift, no butt-joint grid, no checkerboard and no moire. Seams fall on the cell edges, so they sit under part outlines and will not cut through guns or masts. The preview shows no seam doubling or gaps at the tile borders.
- Silhouette and detail: every pixel is either plank or seam, and both are real. There is no noise, no orphan pixel and no arbitrary detail.
- Readability at 1x: in the 1x and 3x in-context previews it reads as deck planking and stays calm behind parts.

Issues:
1. [MINOR] deck-planks (0..3,0..4): the plank is one flat `v` field, so the deck has no highlight edge and looks slightly flat at 3x. Not a blocker. The notes deliberately reject a third tone, and adding one would raise the stripe density. Fix: none required. If the lead wants more life later, add a `V` highlight in column 0 only, and check it against the swap table first.
2. [MINOR] deck-planks (4,0..4): the seam repeats at exactly the same 5 px period in every row, so a large open deck shows pure vertical stripes with no break in the rhythm. The notes explain why butt joints were rejected (they would form a cross-grain grid in a 5 px tile), and that reasoning is sound for a fixed 5 x 5 tile. Fix: none for now. Revisit only if open deck without parts looks too stripy in the full game.
