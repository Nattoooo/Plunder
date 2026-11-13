# Review round 1: batch `sails`

Set notes: all 21 sprites match spec sizes exactly (verified from src grids). Palette use is clean (cloth only p/C/c, yards W/w, no stray chars), no outlines on sails/flags/fire/people as STYLE allows, light is top left throughout. Level of detail is consistent. One family fails (fire).

## sail-square: PASS
Minor notes only:
1. [MINOR] sail-square-full (6,5)-(6,7): p/C boundary jumps from col 7 (row 4, p1-7) to col 6 (rows 5-7, p0-6) while the outer edge steps 1 px per row; barely visible. Optional fix: row 4 p1-6, C7-18 (shifts C one left) for an even diagonal.
2. [MINOR] sail-square-furled (1,0)-(24,0): roll is one flat row of cloth with no highlight on top; fine at 1x.

## sail-main: PASS
1. [MINOR] sail-main-furled (5,1)-(28,1): topsail yard is a single W row while full/half use W+w (height budget of 5 px forces it); acceptable, keep.
2. [MINOR] sail-main-full (6,7): the mainsail cloth starts at the same 22 px width as the topsail's last row, so the topsail reads as sitting directly on the mainsail; acceptable and consistent across the three states.

## sail-lateen: PASS
1. [MINOR] sail-lateen-full: outer edge run lengths 3-3-3-4-3-3-4-2 (rows 1-25) are slightly uneven; optional fix: make rows 10-12 c4 and row 13 c5... only if it keeps the 8 px final width. Not required.
2. [MINOR] sail-lateen-full (1,1)-(1,25) and the 1 px c edge: p and c stripes hug the cloth edges (mild banding). At 1-8 px width this is the only way to show the lit/shaded sides; keep.
3. [MINOR] sail-lateen-furled (0,0),(0,25): roll end caps are "WCC." (no p/c), good; spar has no w shade, matches the other lateen states.

## sail-patched: PASS
1. [MINOR] sail-patched-half and -furled: the 3x3 c patch (full: (5,3)-(7,5)) is missing, so the raft sail loses its identity when reefed. Cannot fit a 3x3 patch in 3 cloth rows; optional: half row 2 (the row above the yard) add c at (5,2)-(7,2) as a peeking patch edge.

## oar: PASS
1. [MINOR] oar (0,0)-(1,2): grip knob is W/W/w, same ramp as the shaft so it barely reads as a knob; optional fix: make (0,0),(1,0) V for a lit knob. Blade (9,0)-(11,2) is clear and tapers to a tip at (12,1).

## flags: PASS
1. [MINOR] flag-1 (1,0)-(7,2): rows run 6/7/4, so the pennant tip sits at the middle row rather than tapering evenly; reads as a rippling pennant, accepted. flag-2 mirrors the tip lower, a clear ripple.
2. [MINOR] pirate-flag-1/2: plain K field with k bottom row, reads black on both deck and sea.

## fire: FAIL
1. [MAJOR] fire-1 (0,3)-(5,5) and fire-2 (0,3)-(5,5): the base is a solid 6x3 block with concentric rings q / Q / Y (rows 3-4: q q Q Y Q q), i.e. pillow shading, and it reads as a rounded orange blob or bonfire pad, not flames. Fix: break the base silhouette with tongues: row 5 `qq..qq`->`qqQQqq` stays only in the middle; make row 3 `.qQYQq` (remove the left q at (0,3)) and row 4 `qQYYQq` -> `qQYYQ.` in one frame and mirrored in the other, so the outer edge is a ragged flame outline instead of a vertical wall.
2. [MAJOR] fire-2 differs from fire-1 only at (1,0)/(2,0): the tip moves one pixel. At 1x the two frames are indistinguishable, so the flicker is lost. Fix: also move the side tongue (4,1) to (3,1)... e.g. fire-2 row 1 `.qQq..`, row 2 `.qQQq.`, and shift the tip to (1,0) as now; the changed pixels should total at least 4.
3. [MINOR] fire-1 (2,0): a lone Q tip pixel over q Q below; fine once the silhouette is fixed.

## deck-people: PASS
1. [MINOR] captain-deck (0,3)-(5,5): coat uses R/r, the same characters the game swaps for crew shirts. Fine if the swap is applied to `crew` only; confirm in the build that captain-deck is not recoloured.
2. [MINOR] crew (0,2) s and (5,3) S: hands staggered for a walking stride, reads well; head is hair only, correct from above.
