# Review round 3: icons-treasure

Only the 8 families named for this round are reviewed. All grids are 16 x 16 with legal palette characters. Coordinates are 0-based from the top-left of the sprite.

## pearl: FAIL
Round-2 issue 1 (shell reads as a plate, not an oyster): not fixed. Issue 2 (boxy pearl clipped by the lip): partly fixed (the pearl is no longer clipped, but it is not a clean round disc and it merges with the shell).
1. [MAJOR] pearl (0,1)-(15,15): the shell is still a 16 px round dish. The outline is a circle, the "hinge" is just a 2 px `c` at (7,14)-(8,14), and the ridges are scattered `c` pixels at (2,11),(6,11),(7,11),(11,11),(6,12),(7,12) that read as speckle, not fanned ridges. The lip row 10 `kCkCCkCCCCkCCkCk` is a noisy dotted line of single `k` pixels at (2,10),(5,10),(10,10),(13,10), not a scalloped lip. Fix: keep a wider-than-tall clam silhouette (about 16 x 12, rows 2-13), make the lip a continuous `k` scallop (3 humps of 4 px) across row 10, and draw 3 continuous 1 px `c` ridge lines fanning from the hinge (7,13)-(8,13) up to the lip, with nothing else on the front shell.
2. [MAJOR] pearl (5,4)-(10,8): the pearl is lopsided and has no edge. Row widths are 4,5,5,4,3 and the lower right is cut by `C` pixels at (10,5),(10,6),(9,7),(10,7),(8,8),(9,8),(10,8). `C` is the shell rim colour, so the pearl's right and bottom edge dissolve into the shell, and near-white `p` on `C`/`c` has almost no contrast. Fix: draw a round 6 x 6 disc (row widths 4-6-6-6-6-4, rows 4-9, cols 5-10) with a `c` edge pixel ring on the lower right (not `C`), `P` glint at (6,5), `p` base, and keep a 1 px `c` gap between it and the `C` rim.
3. [MINOR] pearl (1,3)-(14,9): the back shell interior is one flat `c` field with no lid ridges. Fix: add two short `C` radial lines at (4,3)-(5,5) and (11,3)-(10,5).

## black-pearl: FAIL
Round-2 issues 1 (plate shell) and 2 (boxy pearl): not fixed.
1. [MAJOR] black-pearl (0,1)-(15,15): identical shell to pearl, with the same round dish silhouette, dotted `k` lip at row 10 and speckled `c` pixels on the front shell. It does not read as an oyster. Fix: same clam redraw as pearl issue 1.
2. [MAJOR] black-pearl (5,4)-(10,9): the pearl is a 5 wide staircase block (widths 4,5,5,5,5,2 with `MKK` cutting diagonally across rows 5-9) with the `N` glint at (6,4) sitting on the top edge, so it reads as a square tile with a dark corner, not a sphere. The `K` at (9,8),(8,9)-(10,9) fuses with the `k` lip. Fix: round 6 x 6 disc (4-6-6-6-6-4), `m` base, `M` at the lower right, one `K` pixel row at the bottom edge only, `N` glint at (6,5), and leave a `c` pixel gap above the lip.

## emerald: FAIL
Round-2 issue 1 (rounded rectangle): partly fixed (corners are now 1 px steps in rows 2-4 and 11-13). Issue 2 (uneven frame, ragged table): not fixed.
1. [MAJOR] emerald (1,2)-(14,13): the silhouette is a 14 x 12 block with 1 px per row chamfers (widths 8,10,12,14 ... 14,12,10,8). It is a rounded blob and still reads as a green button or screen, not an emerald cut. Fix: cut the corners in 2 px steps (row 2 cols 5-10, row 3 cols 3-12, row 4 cols 2-13, mirrored at the bottom) so the straight sides are only rows 4-11 and the corners are clearly angled facets.
2. [MAJOR] emerald (2,3)-(13,12): the frame is 3 px thick on the left (`hhh` at cols 2-4) and 3 px `GGG` on the right (cols 11-13) but only 2 rows on top, and the table `H` is 5 x 5 at cols 5-9, so it is off centre (3 px left margin, 4 px right with the extra `h` at col 10). The result is wide bands following the outline (banding) around a small square. Fix: table 6 x 6 at cols 5-10, rows 4-9, frame 2 px everywhere: `h` on top and left, `G` on bottom and right, with a 1 px `H`/`G` diagonal across each chamfered corner.
3. [MINOR] emerald (2,3)-(13,12): this sprite uses the swappable foliage characters `H h G`. Fix: acceptable for a gem, but the game must not recolour it as foliage.

## golden-idol: PASS
Round-2 issue 1 (body wider than head, no shoulders): fixed (10 px body, shoulder step at row 8-9, neck at row 7). Issue 2 (off-centre leg gap): fixed. The legs are cols 3-6 and 9-12 with the gap at cols 7-8, exactly symmetric. The head, teeth and nose read as a grinning idol on the sheet.
1. [MINOR] golden-idol (4,8)-(11,11): the torso is a plain `y` block with only 1 px `Y` and `O` side columns, so the body reads as a small plain block under a detailed head. Fix: if touched again, add a 2 px `O` belly mark at (7,10)-(8,10).
2. [MINOR] golden-idol (3,5)-(12,5): the white `P` teeth are the only pure-white pixels in the gold ramp and pop hard. Fix: acceptable (teeth are a real detail); could use `Y` at the top row if the set feels too bright.

## ancient-coin: FAIL
Round-2 issue 1 (noisy lower edge): fixed (interior `k` pixels are gone; row 13 is one clean `o` edge row). Issue 2 (face-like mark): partly fixed (now a 4 px arch).
1. [MAJOR] ancient-coin (2,2)-(13,14): the silhouette is not a coin. Row widths are 6,8,10,12 on top, then 12 straight for rows 5-11, then 10,10,8 at the bottom. The bottom rounds differently from the top (the 10,10 pair has no 12 to 10 symmetric step) so the shape is a rounded rectangle, barrel or gold nugget, and the sheet shows it that way. Fix: make the disc round with widths 6,8,10,12,12,12,12,12,12,12,12,10,8,6 over rows 2-15 if the size allows, or 6,8,10,12,12,12,12,12,12,10,8,6 over rows 2-13 with the thickness edge as the lower right `o` rim only; remove the doubled 10 px rows at 12-13.
2. [MAJOR] ancient-coin (3,4)-(12,12): the face is one flat 10 x 7 field of `O` with nothing that says coin. The only detail is the 4 px arch at (7,5),(8,5),(6,6),(9,6), which reads as an eyebrow or a dome, not a worn emblem. Fix: add a 1 px `y` inner ring concentric with the rim, 1 px inside it (cols 4-11, rows 5-11, leaving the corners), and make the mark a 3 px `y` cross or crown centred at (7,7)-(8,8) inside it.
3. [MINOR] ancient-coin (3,12)-(12,13): the rim is `y` top left and `o` bottom right, so the light is correct, but the `o` row at 13 is wider than the `O` row above it at 12. Fix: end row 13 `o` at cols 5-10.

## mermaid-scale: PASS
Round-2 issue 1 (stem bottom): fixed. The point is now 14,12,10,8,6,4,2, an even 1 px step per side. Issue 2 (broken ridge dots): fixed. The ridges are continuous nested `i` arcs, symmetric about the centre, starting at row 4 and ending short of the outline. The scale reads as a fan scale on the sheet.
1. [MINOR] mermaid-scale (1,3)-(14,13): the top is a 4-8-12-14 jump (row 2 outline 8 wide, row 3 12 wide, then 14), so the shoulders are a little square. Fix: row 3 cols 3-12, row 4 cols 2-13 if the sprite is touched again.
2. [MINOR] mermaid-scale (2,3)-(13,13): the base `I` is the lightest ghostly teal with `i` lines, so there is no top-left light; the whole scale is flat. Fix: shade the bottom right edge with `i` pixels only.
3. [MINOR] mermaid-scale: the shield or heart silhouette is similar to the cut gems. Fix: acceptable because of the teal colour and ridge arcs.

## ghost-lantern: PASS
Round-2 issue 1 (pillow flame): fixed. The flame is a teardrop (widths 1,2,4,4,2 at rows 7-11, tip at (8,7)) with `i` on the right edge only. Issue 2 (box body, narrow cap): fixed. The handle is a 6 px arch, the cap is 12 px with a `kkkk` underline, the glass is 10 px at the top and 12 px at the bottom, and the base is a 12 px two-row lip.
1. [MINOR] ghost-lantern (3,7)-(12,11): the glass is `K`, which is almost the outline colour, so the lantern reads as a dark box with a small flame at 1x. Fix: if touched again, use `m` for the glass interior.
2. [MINOR] ghost-lantern (3,9)-(2,10): the glass widens from 10 to 12 in a single 1 px step at row 10 rather than a smooth taper. Fix: add one 11 px row at row 9 or 10.

## siren-conch: FAIL
Round-2 issue 1 (garlic bulb): fixed (the shell is now a diagonal cone with the spire at the upper left). Issue 2 (ragged aperture): partly fixed (there is an `F` lip and an `E` oval, but the shape is not a clean oval).
1. [MAJOR] siren-conch (1,2)-(15,13): both long edges are uneven. The left edge steps through cols 1,1,2,3,3,3,4,4,5,5,6,8,10 and the right edge through cols 4,5,7,8,10,11,14,14,15,15,15,14, which is a 1-2-1-2-1-3 jaggy run, with the body jumping from 9 to 12 wide between rows 7 and 8 at (12,8)-(14,8). The result is a lumpy horn or cone, not a smooth spiral shell. Fix: redraw both edges as even 1-1-1 or 2-2-2 diagonals, widening by 1 px per side per row from the spire at (1,2) to the lip at row 11.
2. [MAJOR] siren-conch (5,7)-(14,12): the pink `E`/`e` aperture fills about 40 percent of the whole sprite and is a wedge that runs into the lower right outline, so the shell body is a thin tan rim around a pink blob and no spire whorls survive. There are only 4 `D` pixels at (4,3),(3,4),(5,5),(5,6)... which read as noise. Fix: shrink the aperture to an oval about 5 x 3 at cols 8-12, rows 8-10, ring it with the `F` lip, and draw 3 `D` whorl lines across the spire as continuous diagonal bands from the left edge to the right edge at rows 4, 6 and 8.
3. [MINOR] siren-conch (10,13)-(13,14): the bottom is a flat `kkkk` row, so the lip looks sliced off. Fix: end the lip with a 2 px rounded flare.

## Set notes
Outline, top-left light and palette use are consistent across the reviewed families and with the rest of the batch. The oyster pair (pearl, black-pearl) is still the weakest part of the set because the shell has not changed in substance between rounds. The coin and conch silhouettes need to be cleaned up before they can ship.
