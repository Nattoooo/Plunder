# house-cottage

20 x 23, the spec size. Front view from slightly above, light from the top left. Symmetric about the line between x9 and x10, except the chimney and the lighting.

## Layout (rows)

- 0-1: chimney cap above the roof.
- 2-11: hip roof. Row 2 is the ridge outline, row 11 the underside of the eaves.
- 12-21: plaster front wall. Row 22 is the bottom outline, standing on the ground.

## Roof (`e R r`, swap colours only)

- Hip roof drawn as a trapezoid: the ridge is 12 px wide (x4-15) and each hip steps out 1 px every 2 rows (an even 2-2-2-2 diagonal) to the eaves at full width. The sloping sides are what makes it a hip roof rather than a gable.
- The eaves overhang the wall by 1 px on each side (x0 and x19), as real eaves do.
- Each 2-row step is one course of tiles: the upper row `R` is the face of the tiles and the lower row `r` is the shadow under their edges. Because the courses follow the steps of the hip, the stepped outline and the tile rows tell the same story, and no pixel is texture.
- Row 3 is `e` along its full width: the ridge cap, which faces the light most directly.
- The left hip (x = inset + 1 on every roof row) is `e`: the hip's ridge tiles, lit from the left. The right hip end of every course is `r`, the side turned away from the light.
- The bottom course is `r`, then the `k` eave line. That gives the dark band under the eaves that separates the roof from the wall.
- I checked it with all six in-game roof swaps (red, blue, brown, green, slate, thatch-gold) and all four wall swaps. The courses stay readable even with the close-toned swap ramps.

## Chimney (stone `u T`, `k`)

- It rises from the right half of the front slope, x11-14, so it breaks the silhouette at the top right and the house reads at 1x as "cottage with a chimney". It is off centre so it doesn't fight the centred door.
- Body: 2 px of stone, `u` on the lit left and `T` on the shaded right.
- Cap (rows 0-1): a lip 1 px wider on each side, `u u u T`, the stone cap found on real chimneys. The body's outline under the lip also serves as the shadow beneath it.
- It sits in front of the slope, and 1 px of roof shows to its right (x15) so it doesn't merge with the hip outline.
- I tried a dark `K` flue opening and dropped it, because next to the `k` outline it made a black blob.

## Walls (`C c`, swap colours only)

- Plaster `C`, with a 1 px `k` outline on the sides and bottom.
- Row 12 is `c`: the shadow the overhanging eaves cast on the top of the wall. That is the only shading on the flat front face, since the wall faces the viewer evenly.

## Door (`w W`, knob `y`)

- 4 x 8 px at x8-11, rows 14-21, exactly centred and standing on the ground line. With the bottom outline the opening is 9 rows, the captain's height, and its 4 px width matches the captain's body inside his outline.
- The door is set into the wall, so the top-left light leaves the inner jamb and lintel in shadow: the left column and top row are `w`, and the door leaf is `W`.
- One `y` pixel at (10,18) is the brass knob, on the opening side at hand height.
- I tried a rounded top. At 4 px wide it became a 2 px nub, so I used a square top.
- No `k` frame: the dark wood already separates clearly from the plaster, and a frame would close the 1 px of wall between the door and each window.

## Windows (`k` frame, glass `l B b`, sill `V`)

- 4 x 4 px at x3-6 and x13-16, rows 14-17, mirror images of each other. Their tops line up with the top of the door.
- The `k` frame is the dark window frame and glazing. Inside it is a 2 x 2 pane: `l` top left (sky reflection where the light comes from), `B` on the diagonal, and `b` bottom right.
- Row 18 is a light-wood sill `V`, 4 px, under each window.
- I tried a brown wood frame (it went muddy and blended with the door) and a frameless 4 x 4 pane (heavy blue blocks that read less clearly as windows). The `k` frame reads best at 1x.
- There is 1 px of wall between each window and both the wall edge and the door. That keeps the front tight and cottage sized.

## Palette

`k`, roof `e R r`, wall `C c`, stone `u T`, wood `w W V`, brass `y`, glass `l B b`. The swap characters `e R r C c` appear nowhere outside the roof and wall.
