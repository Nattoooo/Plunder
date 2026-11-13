FAIL
Round 1 review of palm (19x20, flexible). Palette is clean (k H h G J v w only, swap foliage chars used only in the crown, 3 foliage tones, 2 wood tones), background transparent, light from top left, trunk touches the bottom row, size matches the spec. Reads as a palm at 1x on green and sand. The crown silhouette is the problem.

1. [MAJOR] palm (0-18,0-6): Crown silhouette is a smooth dome with a flat underside, so filled black it reads as a mushroom cap or umbrella rather than drooping fronds. The top edge (rows 0-2) is a clean arc, the underside is a straight horizontal line from (4,5) to (14,5), and the only "droop" is the two end tips at (0-3,4-6) and (15-18,4-6). The frond gap lines (7,4),(8,4),(13,4),(14,4) are inside the mass and do not break the outline. Fix: break the outline into 4-5 distinct fronds. Cut notches in the underside so fronds droop to different depths: for example make (9,5),(10,5) transparent by moving the k outline up to row 4 there, and let one mid-left frond tip hang to (5,6) and one mid-right frond tip to (13,6) with k beneath. Add 1 px frond points on the top edge, such as (6,0) and (13,0) as k with h under them. Keep the swap chars H h G only.

2. [MINOR] palm (7-11,5-7): Coconuts are one flat J mass of 9 px with no separation, reading as a dark knot. It is also lopsided: widest on row 6 at x=8-11, so it sits right of the crown axis x=9. Fix: make it a symmetric cluster of 2-3 nuts, e.g. row 5 J at (8,5),(9,5); row 6 J at (7,6),(8,6) and (10,6),(11,6) with k between at (9,6)... or simply keep J but make (11,6) k so the cluster is x=8-10 under the trunk axis.

3. [MINOR] palm (9,3),(10,3): The pair of G pixels sits in the top centre of the crown, not under a frond or in a gap. It is a stray shadow spot, noise by the style rules. Fix: change both to h, and put the G shading under the frond edges at row 4 instead (for example (5,4) and (12,4) as G).

4. [MINOR] palm (13-14,4-5): A solid 2x2 block of k, muddy next to the 1 px lines elsewhere. The left gap (7-8,4) is a 2 px line over J, so the two sides are treated differently. Fix: shorten the right gap to (13,4) only, or turn (14,4) into h.

5. [MINOR] palm (13-17,1-2): Crown is one pixel wider on the right than on the left. Row 1 outline is k at x=4-6 and x=13-15 (mirror of 4 is 14); row 2 is k at x=2-3 and x=15-17 (mirror of 2-3 is 15-16). Fix: row 1 right k to x=12-14 with h at (11,1) only; row 2 right k to x=15-16 and (17,2) transparent, adjusting row 3 as needed, unless the extra width is a deliberate lean. If it is, say so in the notes.

6. [MINOR] palm (3-11,19): Trunk base is centred at x=7, two px left of the sprite centre x=9, and the nature notes say trees stand with the base at bottom centre. Fix: accept the offset only if the game anchors palms by sprite centre and the lean is intended; otherwise shift the lower trunk right one px and shorten the lean. Also (7,8),(8,8) k then v at (9,8),(10,8) puts the trunk's neck one px right of row 9 (x=8-10), a small kink under the coconuts. Fix: make row 8 v at x=8-9 with w at (10,8) so the trunk edge steps cleanly.

Totals: 0 blockers, 1 major, 5 minors.
