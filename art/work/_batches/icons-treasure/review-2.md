# Review round 2: icons-treasure

Only the 17 families that failed in review-1 are reviewed. All 17 grids are 16 x 16 with legal palette characters. Coordinates are 0-based from the top-left of the sprite.

## silver-coins: PASS
Round-1 issue 1 (flat slab): fixed. There is now a 10 px top coin with rim, three coin edges and left/right offsets, so it reads as a stack. Issue 2 (muddy n/M on the top face): partly fixed.
1. [MINOR] silver-coins (10,3)-(11,3): two `n` pixels still sit on the top face next to the `M` rim. Fix: make them `N`.
2. [MINOR] silver-coins (1,8),(1,11): the separator rows are 13 px wide and poke 1 px past both coins they divide. Fix: end them at the wider coin edge.

## gold-doubloon: PASS
Round-1 issue 1 (brick silhouette): fixed. The offset zigzag edge separates the discs. Issue 2 (same as silver): fixed. It has 4 edges and an `OO` emblem on the top coin at (7,3),(8,3).
1. [MINOR] gold-doubloon (2,6)-(12,13): unlike silver-coins there are no `k` lines between coins, so the edges read as Y/O stripes and rely on the offsets. Fix: if the family is ever touched again, add a `k` line between coins for consistency with silver.

## pearl: FAIL
Round-1 issues: (1) not an oyster, not fixed. (2) inner black ring, fixed (the pearl has no ring now). (3) p band mimicking sail ramp, fixed.
1. [MAJOR] pearl (0,1)-(15,15): still a round plate or dish with a window in it, not an oyster. There is no hinge and no radiating ridges. The shell is a 16 px circle of flat `c` with 3 scattered `C` pixels at (5,5),(5,6),(10,5) that read as noise, and the k line at row 10 reads as a table edge. Fix: draw the shell as a wider-than-tall clam: back shell as an arc (rows 1-8, `C` rim, `c` inside) and front shell below (rows 9-14). Add 3 radiating ridge lines in `c` fanning from a 2 px hinge at (7,14)-(8,14), a scalloped lip, and remove the (5,5),(5,6),(10,5) specks.
2. [MAJOR] pearl (5,4)-(10,9): the pearl is a 6 x 6 boxy square (rows 5-9 all 6 wide) clipped at the bottom by the lip line at (6..9,10). It has no round silhouette or glint. Fix: make it a round 6 px disc (row widths 4-6-6-6-6-4), put a single `P` glint at (6,5) and `p` shade at the bottom right, and sit it fully above the lip.

## black-pearl: FAIL
Round-1 issues: (1) pearl greys, mostly fixed (the pearl is `m`/`M`/`K` with an `N` glint at (6,6)). (2) shell problems, not fixed.
1. [MAJOR] black-pearl (0,1)-(15,15): the shell has the same plate or dish construction as pearl, with no oyster reading. Fix: same clam redraw as pearl (hinge, 3 ridge lines, scalloped lip).
2. [MAJOR] black-pearl (5,4)-(10,10): boxy 6 x 6 pearl clipped by the lip line, same as pearl issue 2. The sheet reads it as a dark square window. Fix: same round disc, with `m` base, `M` and `K` at the bottom right, `N` glint at (6,5).

## ruby: PASS
Round-1 issue 1 (flat banded lozenge): mostly fixed. There is now a crown with a diagonal `E` highlight, a `k` girdle at row 7 and a pavilion triangle. Issue 2 (nubs): fixed.
1. [MINOR] ruby (2,8)-(11,12): the pavilion is three vertical e/R/r bands that follow the outline. It is acceptable as facets, but a `k` facet line from (7,7) to (7,13) would be cleaner.

## sapphire: PASS
Round-1 issue 1: fixed the same way as ruby (L/l highlight, B base, b shade).
1. [MINOR] sapphire: the silhouette is identical to ruby and diamond. Fix: acceptable for the set because emerald is the designated different cut.

## emerald: FAIL
Round-1 issue 1 (flat lozenge, must differ from the round gems): not fixed. It is now a flat rounded rectangle.
1. [MAJOR] emerald (1,2)-(14,13): the silhouette is a 14 x 12 rounded rectangle, with only 1 px corner trims at rows 2 and 13. It reads as a green screen, button or tile, not an emerald cut. Fix: cut each corner as a 2 px step (row 2 cols 4-11, row 3 cols 3-12, row 4 cols 2-13, mirrored at the bottom) to make a true octagon.
2. [MAJOR] emerald (2,4)-(13,12): the `h` frame is 2 px thick on the left and 1 px elsewhere, and the right column alternates `h`/`G` at (12,6)-(12,12), which is banding along the outline. The inner `H`/`G` table has a ragged right edge. Fix: make the table a clean 6 x 6 rectangle centred in the octagon, with the step frame in `h` on the top and left and `G` on the bottom and right. The stepped corners should carry 1 px `H`/`G` diagonals so the frame reads as three facet steps.

## diamond: PASS
Round-1 issue 1 (P/p near-white body): fixed. The left facets are `P`, the right and lower facets `L`/`l`, and the girdle is a `k` line. Issue 2 (flat lozenge): fixed to the same level as ruby. The 3 x 3 cross glint with `y` centre sits at (1,2)-(3,4) in the corner, so it is not on the stone.
1. [MINOR] diamond (1,2)-(3,4): the glint is detached from the gem and floats in the corner. Fix: move it 1 px right and down so it touches the upper-left facet edge at (4,5).

## golden-idol: FAIL
Round-1 issues: (1) head flat, partly fixed (`O` on the right column and under the brow). (2) body stub, not fixed. (3) teeth, fixed (3 wide teeth).
1. [MAJOR] golden-idol (1,8)-(14,14): the body is a 14 px wide box that is wider than the 12 px head, with no shoulders, arms or waist. It reads as a face on a gold block or a robot. Fix: narrow the body to 10 px (cols 3-12), add 1 px notches at (3,8) and (12,8) for shoulders, put a `y` belly of 6 px, and give two legs 4 px wide each with a 2 px gap.
2. [MAJOR] golden-idol (8,12)-(9,13): the leg gap is not centred. The `kk` sits at cols 8-9, so the left leg is 6 wide and the right is 4 wide. A symmetric idol breaks here. Fix: centre the notch at cols 7-8 and make both legs the same width.

## ancient-coin: FAIL
Round-1 issues: (1) bread roll shape, partly fixed (round disc with rim). (2) wood ramp, fixed (`o`/`O`/`y`).
1. [MAJOR] ancient-coin (2,10)-(13,13): the lower edge is noise. Rows 10-12 mix `k` pixels inside the body at (3,10),(4,11),(2,12),(4,12),(11,12), so `kokoooook` reads as speckle rather than a rim thickness. Fix: draw one clean 2 row edge: row 12 `o` cols 3-12 and row 13 `k` outline stepping in by 1, with no interior `k`.
2. [MAJOR] ancient-coin (4,5)-(7,6): the worn mark is a `K` U-shape that reads as a smiling mouth or a face, not a worn crown or arc. The right `K` smudge at (10,9),(9,10),(10,10) is unrelated to it. Fix: replace both with one 3 px `y` or `K` crown mark centred slightly above the middle (for example (6,6),(7,6),(8,6) plus (6,5),(8,5)), and drop the scattered `K` pixels.

## lucky-charm: PASS
Round-1 issue 1 (horseshoe magnet): fixed. The gap is 4 px, the outer sides bow out at rows 5-10, and the heel is rounded. Issue 2 (nail holes): fixed, with 3 `K` holes per arm.
1. [MINOR] lucky-charm (2,3)-(4,12): each arm is a 3 tone N/n/M stripe set, so the holes sit between stripes and read as a dark seam. Fix: keep as is, or offset the holes into the `n` column.

## kraken-ink: PASS
Round-1 issue 1 (flat dish): fixed. It is now a necked jar with a rim and `C`/`c` body, standing on the bottom row. Issue 2 (quill not entering the pot): fixed. The ink `Z`/`z` is visible in the opening and the quill goes into it.
1. [MINOR] kraken-ink (4,6)-(10,7): the opening is only 2 rows tall, so it reads more as a rectangle than an ellipse. Fix: use row 6 `Z` cols 5-9 and row 7 `z` cols 6-8 with the rim rounding at the corners.
2. [MINOR] kraken-ink (7,5)-(13,1): the `P` quill on a tan background has low contrast at 1x. Fix: put a `k` outline on the lower edge of the quill (already partly present) and a `c` shade.

## mermaid-scale: FAIL
Round-1 issues: (1) cabbage and muddy i/I, partly fixed (teardrop with the point down). (2) `l` column along the outline, fixed (3 px crescent).
1. [MAJOR] mermaid-scale (6,11)-(9,14): the bottom is a 2 px wide stem 4 rows long, so the silhouette reads as a cone, funnel or spinning top, not a fan scale. Fix: shorten the taper to a short point (rows 11-13: 6, 4, 2 wide) and make the shape wider overall.
2. [MAJOR] mermaid-scale (4,3)-(11,12): the ridge arcs are broken into disconnected `i` dots, at (4,3),(11,3),(5,6),(10,6),(6,9),(9,9) plus short bars at rows 4, 7, 10. They do not form 3 clean concentric arcs and the result reads as speckle. Fix: draw 3 continuous 1 px `i` arcs, each the same shape as the outline and 2 px apart, starting at the top edge and ending 1 px short of the outline.

## ghost-lantern: FAIL
Round-1 issues: (1) pillow flame, not fixed. (2) wide handle, fixed (6 px arch).
1. [MAJOR] ghost-lantern (5,8)-(10,12): the flame is a 4 px wide capsule with a flat `i` ring around an `I` core, pointed equally at top and bottom. It is still pillow shading and does not read as a flame. Fix: draw a teardrop: pointed top at (7,8)-(8,8), widening to 3 px, then a rounded base at row 12, in `I` with `i` on the right edge only.
2. [MAJOR] ghost-lantern (2,7)-(13,14): the body is a plain 12 x 8 box with `N`/`M` outline columns (banding) and a cap that is 2 px narrower than the glass, so it reads as a briefcase or TV. Fix: taper the glass body (10 px at the top, 12 px at the bottom) and make the cap 12 px, with a 2 px lip at the base.

## siren-conch: FAIL
Round-1 issues: (1) garlic bulb, not fixed (whorl lines added, silhouette unchanged). (2) spikes at col 0 and 15, fixed.
1. [MAJOR] siren-conch (1,1)-(14,15): the silhouette is still a round bulb with a short spire, so it reads as a garlic clove, onion or bag. A conch is an elongated spiral cone with a flared lip. Fix: rotate the shell diagonally (spire at the upper left, flared aperture at the lower right), 14 px long and 8 px wide, with 3 spire whorl steps along the left edge.
2. [MAJOR] siren-conch (6,7)-(13,13): the aperture is a ragged `k` box with an `E` fill and no flared lip. Fix: draw an elongated oval aperture along the shell axis with an `F` lip around it and the pink only inside.

## treasure-map: PASS
Round-1 issue 1 (squiggle X): fixed. It is a clean 5 x 5 `R` X centred at (9,7) with 1 px legs, with the `D` path separate at (5,10),(3,11). Minor 2 (X shading, corners) not done. Minor 3 (centring): fixed, the map spans cols 1-14.
1. [MINOR] treasure-map (1,2)-(14,13): `p` is nearly white, so it reads as a paper card, not an old map. Fix: use `x` for the map body with `X` shading along the right and bottom, and cut both top corners.
2. [MINOR] treasure-map (3,10),(5,11): the dotted path is only two pixels. Fix: add one more `D` pixel to make a short trail ending at the X.

## bottle-message: PASS
Round-1 issue 1 (white smudge): fixed. There is now a 5 x 3 roll with a `C` end and an `R` tie at (5,9)-(9,11). Issue 2 (1 px cork stick): fixed with a 2 row cork, a lip and a glass neck.
1. [MINOR] bottle-message (7,9)-(7,11): the `R` tie runs the full height of the roll, so at 1x the roll reads like a labelled potion. Fix: limit the tie to rows 9-10 and add a `C` end cap at (5,10) as well as (9,10).
2. [MINOR] bottle-message (4,7)-(11,14): `h` on the left and `g` on the right follow the outline for 6 rows (banding). Fix: limit the `h` to the top left shoulder.

## Set notes
Outline and lighting are consistent across the reviewed families. Detail is better balanced than in round 1. The remaining weak families are the shell-based pieces (pearl, black-pearl, siren-conch) and the figurative ones (golden-idol, mermaid-scale, ghost-lantern, ancient-coin, emerald), where silhouettes still do not name the object.
