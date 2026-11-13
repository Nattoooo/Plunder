# Review round 1: batch houses

Checked against STYLE.md, CRITIC.md (all 10 points), brief.md, _ref/approved.png, sheet-1.png and the grids in art/src. Programmatic checks on the grids: every row is the exact width, sizes match the spec (40x45, 40x41, 60x45, 40x62), only palette characters are used, `e R r` appear only on roofs and `C c` only on plaster walls, the silhouette is exactly mirror-symmetric on every row, and the only left/right differences are the lit-side tones (L/l, V/w, e/r) and the knob. Every building stands on the bottom row with a full `k` outline and a transparent background. Light is from the top left throughout. The four share outline, roof stepping, plaster shade row, door, window and chimney construction, and all sit with the approved house-cottage.

Set-wide note (MINOR, no action required to pass): the door is 10 x 16 including frame (8 x 15 clear) against a 12 x 18 captain, and the brief says "about 8 px tall". It is identical to the approved cottage door, so it stays consistent. If the captain ever has to walk through visibly, raise the door as one change across all houses rather than in this batch.

## house-cottage: PASS
1. [MINOR] house-cottage (24,0)-(31,2): chimney is a flat 2-tone block (u x4, T x2) with no cap or joint, 3 rows tall. Acceptable at this scale; leave it.

## house-shutters: PASS
1. [MINOR] house-shutters (4,31)-(11,31): sill `V` is 8 px wide but the window plus shutters block is 10 px wide (x3 to x12). Fix: widen the sill row to x3..12 so it sits under the shutters too (the right window likewise, x27..36).
2. [MINOR] house-shutters (13,24)-(14,39): gap between shutter edge (x12) and door frame (x15) is only 2 px, against 3 px in the cottage, and the shutter's left edge leaves just 1 px of plaster to the wall outline (x2). Reads slightly crowded. Fix: optional, shave the shutters to 1 px wide `B` each side, or accept.
3. [MINOR] house-shutters (3,24) and (3,30): the `k` bars cap the top and bottom of the shutters, but there is no `k` on their outer vertical edges, so the outline is open at the sides. Fix: leave (B on C does not merge), or add `k` at x2 and x13 for rows 25 to 29 to close the box. Not worth a re-spin.

## house-long: PASS
1. [MINOR] house-long: gaps between windows and door are an even 2 px. They hold the rhythm but are tight; no change needed.

## house-townhouse: PASS
1. [MINOR] house-townhouse (4,44) vs (15,45): ground-floor window top outline is at row 44 while the door top outline is at row 45, a 1 px misalignment that the cottage, shutters and long house do not have (window and door tops share a row there). Fix: either drop the windows 1 row (window block rows 45..51 plus sill row 52) or accept as is.
2. [MINOR] house-townhouse (24,0)-(31,4): chimney is 5 rows tall against 3 in the other houses. Fine for the taller roof; leave.
