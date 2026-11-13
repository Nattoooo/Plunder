# island-2 review, round 1

Set notes: outline (1 px k), top-left light, plaster/roof swap use and detail level are consistent between warehouse and tavern and match the approved house/warehouse/tavern in `_ref/approved.png`. All sizes are within spec (warehouse 68x42, private-dock 40x15 vs 14 flexible, watchtower 28x41, tavern 50x63, dock-planks 8x8 fixed). Palette use is clean: swap roof (e R r) and plaster (C c) are used only for those parts.

## warehouse: PASS
Minor notes (do not block):
1. [MINOR] warehouse (2,25)-(2,40) and (65,25)-(65,40): a 1 px sliver of plaster C sits between the wall outline and the crate outline. Fix (optional): shift both crate stacks 1 px outward is not possible, so leave or fill (2,25..40) and (65,25..40) with k to merge the outlines.
2. [MINOR] notes.md says the stacks are on opposite corners; in the grid both stacks have the single crate on the left (right stack is a translation, not a mirror). Reads fine; fix the note.

## private-dock: PASS
Minor notes (do not block):
1. [MINOR] private-dock (3,13)-(36,14): pile legs are only 2 rows (1 visible leg row), so the jetty reads slightly like a bench. Acceptable at 15 px, size drift is within 1 px of the flexible spec.
2. [MINOR] private-dock: deck seams are every 5 px while dock-planks repeats every 4; harmonise if the tile is ever revisited.

## watchtower: FAIL
1. [MAJOR] watchtower (2,8)-(25,14): the lookout cabin is only 5 K rows high inside (6 with floor), about a third of the captain's 18 px height, and is a flat 16x5 slab of K that reads as a black slot rather than an open lookout. Proportion and readability fail against the captain's scale. Fix: make the cabin about 12 interior rows (insert 7 more K rows between rows 13 and 14, continuing the VWW and WWw posts), growing the sprite to 28x48 (size is flexible); optionally add a 1 px v rail pixel row at the platform edge.
2. [MINOR] watchtower leg outer edges: the left leg steps out at rows 19, 21, 28, 33, 37 (col 4,3,2,1,0), run lengths 2-7-5-4-3, uneven (the right leg mirrors it). Fix: even steps, 1 px every 5 rows, e.g. col 4 for rows 19-23 and then every 5 rows (adjust the taller sprite so all runs are equal).
3. [MINOR] watchtower (4,21): a W pixel sits left of the V lit column ("WVW"), breaking the lit-left edge at the brace start. Fix: make (4,21) k with the leg shifted, or V, so the lit column stays on the left.
4. [MINOR] watchtower (1,4)-(3,4): the eave outline jumps 3 px in one row (col 4 on row 3 to cols 1-3 on row 4 to col 0 on row 5), a 1-1-1-3-1 jag. Fix: step the roof outline 1 px per row down to the eave, and make row 4 a normal diagonal pixel.

## tavern: FAIL
1. [MAJOR] tavern (6,52)-(19,61): the hanging sign's bottom outline (row 61) sits directly on the foundation line (row 62), so the sign hangs to the ground, which is physically wrong and merges with the base outline. Fix: shorten the board to 8 rows and raise it: keep bracket arm rows 46-49, chains on rows 50-51 (cols 8 and 17), board top outline row 52, interior rows 53-58 (drop the two extra y rows, keep foam row 55 and a 3-row mug), bottom O row 59, bottom k row 60, leaving rows 61 as plaster C with 2 or more clear rows above the base line (fill 61 with C between k at col 1 and the door).
2. [MINOR] tavern (33,0)-(39,7): the chimney's right wall (col 39) lines up with the roof slope and its base overhangs the ridge end (cols 38-39 on rows 6-7), so it looks tacked on the roof corner. Fix: move the chimney left 3 px (cols 30-36, bottom on the ridge row 6) so it stands on the roof.
3. [MINOR] tavern (32,45)-(43,61): the door is 16 interior rows under the lintel, slightly shorter than the captain (18 px). Fix (optional): raise the lintel to row 44 so the opening is 17-18 rows.

## dock-planks: PASS
Minor notes (do not block):
1. [MINOR] dock-planks (0,0)-(7,7): flat tile without the V lit top edge used in deck-planks, so the light cue is missing. Fix (optional): make rows 0 and 4 of the board 'V' instead of 'v' (stay within 3 tones). Tiles seamlessly on x and y at 8x8 and stays in spec.
