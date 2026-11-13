# Review round 1: ship-tiles

Batch checks: all sizes match spec exactly (5x5, 5x5, 5x5 x2, 3x3). Palette characters are all legal. No outlines on tiling tiles or effects, as STYLE.md requires. Light is top-left in every sprite. Tones per material are 3 or fewer. The set shares one flat, minimal, no-noise look with the approved deck-planks.

## deck-logs: PASS
Tiles seamlessly: col 4 `W` plus col 0 `W` of the next tile gives a clean 2 px gap, and the row 2 rope (`D f f f D`) joins into a continuous lashing. Reads as round logs with the highlight on the left. Three wood tones.
1. [MINOR] deck-logs (0,2) and (4,2): the rope ends use `D`, which is also a hull-wood swap char. The notes say this is not a swap part, so no action is needed. If the game ever recolours by character, switch these to `d`-free rope tones.

## iron-bands: PASS
Band is 2 px (`n` top, `M` bottom), runs the full width so neighbouring cells join, and is transparent elsewhere. The iron ramp is correct, with the highlight on top and shadow below. It reads clearly over the `v` planks at 1x. Ready to ship.

## deck-damage: PASS
1. [MINOR] damage-crack (1,0) and (3,2): the `V` splinters are close in tone to the `v` plank under them, so they are subtle at 1x. Acceptable. Consider no change.
2. [MINOR] damage-crack (4,3) and (4,4): the crack ends on the seam column, where `w` merges with the `W` seam. It is still legible, so ship as is.

The crack steps evenly (1,2,1,2,1) and the hole is a clean rounded pit with a 1 px `w` rim around `a` water. Both are effects with no outline, and both use hull-swap `w`/`V`, so they recolour with the hull.

## stern-lantern: PASS
3x3 brass square with the outline dropped, which STYLE.md allows at this size. `y` highlight top-left, `O` mid, `o` shadow bottom-right, `Y` glass centre. It stands out on both the sea and the hull in the sheet. The bright centre is unavoidable at 3x3 and reads as the lamp, not as pillow shading.
