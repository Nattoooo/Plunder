# crab
Size 8x5 instead of 6x4 (flexible): a 6x4 crab leaves no room for claws, body and legs inside an outline.
- crab-1/crab-2: claws are the 2x2 outline blocks with a red e pixel inside at each top corner (raised, pincers open in the middle gap). Body is a domed shell: e highlight top-left, R base, r shadow bottom-right (light from top left). Bottom row is legs: frame 1 outer and inner legs set at cols 0,2,5,7; frame 2 shifts to cols 1,3,4,6. Everything else is identical.

## Batch round
Claws are now 2 px red pincers outlined in k with an open notch; eye stalks at (3,0),(4,0); crab-1 underside closed (outer legs attach at row 3); light runs top-left (right claw `R`); frames differ only in the leg rows.


## Current batch redraw
Both frames are **7 x 5** (one extra width/height pixel, not the former 8 px width). Raised outlined red claws occupy the two top corners; the dark space between claw and shell separates pincers from shell. The central shell has an e upper-left highlight, R body and r underside; three tones only. Leg pairs spread outward in frame 1 and tuck inward in frame 2. Only these moving leg pixels change. The centre underside remains k-closed in both frames, unlike the earlier open underside. The tiny stalk/face gap is kept dark instead of adding bright eye dots. The one-pixel claw interiors deliberately prioritize compact scale over the oversized earlier claw prescription.

## Batch round 1
Eyes now sit on red bases (row 1 kekeRkRk); crab-1 legs separated at cols 0,2,5,7 like crab-2.
