FAIL
Reviewed: STYLE.md, spec (crab-1/crab-2, 6x4 flexible), notes.md, src/crab.txt, preview.png, family.png, against captain/pilot previews. Palette is clean (k e R r only; no swap colours misused). Size 8x5 is justified in the notes and accepted. Frames differ only in the leg row, as required.

1. [MAJOR] crab-1 and crab-2 (2,1),(3,1),(4,1),(5,1): the shell's top outline is a flat 4 px `k` bar that fuses with the claw outlines at (1,0)-(2,1) and (5,1)-(7,1). Claws and shell merge into one black band. The shell is a 3x2 rectangle of red under that bar, not a "domed" shell, and at 1x the sprite reads as a black blob with red dots. Fix: round the shell top. Row1 `kekkkkek` becomes `kek..kek` (cols 3,4 transparent). Row2 becomes `.kkeeRk.` -> use `.keeeRk.` only after the shell gets a 1 px `k` cap: row1 `.kkkkkk.` for cols 1-6 with the claws lifted one row higher. Simplest option: keep the claws at rows 0-1 with outline at (0,0),(1,0),(0,1),(2,1) and make row1 `kek.kkek` is not acceptable. Instead redraw rows 0-2 so each claw is a visible red V/C shape (2 red px per claw: `e` at (1,1) and `E`-free `e` at (1,2) or (0,1)). The shell must be separated from the claws by at least one transparent or `k` gap pixel on its upper-left and upper-right corners.

2. [MAJOR] crab-1 and crab-2 (3,4),(4,4): the shell has no bottom outline. Row3 `RRRr` sits directly on transparent pixels in crab-1 at (3,4),(4,4), and in crab-2 (1,4),(3,4),(4,4),(6,4) are leg pixels while (2,4) and (5,4) are transparent under `R`/`r`. STYLE.md requires a closed 1 px `k` outline around the outer silhouette. Fix: make row4 of crab-1 `kkkkkkkk`-style closure under the body, e.g. `k.kkkk.k` (outer legs at 0 and 7, body underline cols 2-5), and crab-2 `.kkkkkk.` with legs as notches. Alternatively move the legs to the sides (row3 `kkRRRrkk`) and close the bottom with `k` at cols 2-5.

3. [MAJOR] crab-1 and crab-2, claws (0,0),(1,0),(0,1),(1,1),(2,1) and mirror (6,0),(7,0),(5,1),(6,1),(7,1): each claw is a 2x2 outline block with a single `e` pixel. The claw is about 80 percent black, so the colour that makes it a crab claw is one pixel. "Open pincers" is not readable; they look like ears or horns. Fix: give each claw 2-3 red px (`e` top-left, `R` below or beside) and draw the pincer gap with a transparent pixel at the top centre of the claw, keeping the outline only on the outer edge.

4. [MINOR] crab-1 and crab-2 (5,2): a lone `R` ends a row of `e`, and row3 is solid `R` with `r` at (5,3). Light and shadow run as flat horizontal bands (row2 light, row3 dark) rather than from the top left. Fix: use `e` at (2,2),(3,2), `R` at (4,2),(5,2), `R` at (2,3),(3,3), `r` at (4,3),(5,3).

5. [MINOR] crab-1 and crab-2 (6,1): the right claw `e` is as bright as the left one at (1,1). With light from the top left the right claw should be one step darker. Fix: make (6,1) `R`.

6. [MINOR] crab-1 vs crab-2 legs: only one leg per side moves, and the change is one pixel at 1x. The walk cycle is barely visible in the context strips. Fix: after fixing issue 2, make the two leg poses clearly different (alternate legs 0,2,5,7 versus 1,3,4,6 is acceptable, but keep every leg attached to the shell outline).

7. [MINOR] Scale: the crab is 8 px wide, wider than the captain (6 wide). The spec asked for 6x4. This is accepted for readability, but if issue 1 leaves room, consider 7 wide so the crab is not bulkier than the captain.

Verdict: no blockers, three majors. Do not ship until the outline is closed, the shell is separated from the claws and the claws read as claws.
