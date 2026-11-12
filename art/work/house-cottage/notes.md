# house-cottage

20 x 24. The spec says 20 x 23 (flexible); I added one wall row in round 1, explained below. Front view from slightly above, light from the top left. The wall, door and windows are symmetric about the line between x9 and x10. The chimney and the lighting are not.

## Layout (rows)

- 0-1: chimney cap above the roof.
- 2-11: hip roof. Row 2 is the ridge outline, row 11 the underside of the eaves.
- 12-22: plaster front wall. Row 23 is the bottom outline, standing on the ground.

## Roof (`e R r`, swap colours only)

- Hip roof drawn as a trapezoid: the ridge is 12 px wide (x4-15) and each hip steps out 1 px every 2 rows (an even 2-2-2-2 diagonal) to the eaves at full width. The sloping sides are what makes it a hip roof rather than a gable.
- The eaves overhang the wall by 1 px on each side (x0 and x19).
- The slope is one flat `R` area. There are no tile stripes; the swap colour and the stepped outline are enough to say "tiled roof" at this size.
- Row 3 is `e` across: the ridge cap, which faces the light. The left hip (the first roof pixel of every row) is `e`, the hip tiles catching light from the left. The right hip (the last roof pixel of every row) is `r`, turned away from the light.
- Row 10, the bottom course, is `r`: the shadow under the tile edge at the eaves. With the `k` eave line in row 11 it makes one dark band that separates the roof from the wall.
- I checked it with all six in-game roof swaps and all four wall swaps.

## Chimney (stone `u T`, `k`)

- It stands at the right end of the ridge and straddles it: the body is at x12-14, with the outline at x11 and x15. It breaks the silhouette at the top right, so the house reads at 1x as "cottage with a chimney", and it sits off centre so it doesn't compete with the centred door.
- Body: 3 px of stone, `u u` on the lit side and `T` on the shaded right.
- Cap (rows 0-1): a lip 1 px wider on each side, `u u u u T`, the stone cap found on real chimneys. The body's outline under the lip also serves as the shadow beneath it.
- Its right outline (x15) runs beside the roof's right outline (x16) on rows 3-4. The pixel at (16,2) is `k`, so the right edge of the silhouette is one straight step with no notch in it.
- The stone simply stops at row 5, where the `R` roof begins. Grey against red needs no line.

## Walls (`C c`, swap colours only)

- Plaster `C`, with a 1 px `k` outline on the sides and bottom.
- Row 12 is `c`: the shadow the overhanging eaves cast on the top of the wall. That is the only shading on the flat front face, since the wall faces the viewer evenly.

## Door (`w W`, knob `y`)

- 4 x 8 px at x8-11, rows 15-22, exactly centred and standing on the ground line. With the bottom outline the opening is 9 rows, the captain's height, and its 4 px width matches the captain's body inside his outline. In the preview the captain fits it exactly.
- The door is set into the wall, so the top-left light leaves the inner jamb and lintel in shadow: the left column and top row are `w`, and the door leaf is `W`.
- One `y` pixel at (10,19) is the brass knob, on the opening side at hand height.
- No `k` frame: the dark wood already separates clearly from the plaster, and a frame would close the 1 px of wall between the door and each window.

## Windows (`k` frame, glass `l B`, sill `V`)

- 4 x 4 px at x3-6 and x13-16, rows 15-18. Their tops line up with the top of the door. The two windows are identical copies, not mirror images, so both are lit from the same side.
- The `k` frame is the dark window frame. Inside it is a 2 x 2 pane in two tones: `l l` on top (the sky reflected from above) and `B B` below.
- Row 19 is a light-wood sill `V`, 4 px, under each window.

## Palette

`k`, roof `e R r`, wall `C c`, stone `u T`, wood `w W V`, brass `y`, glass `l B`. The swap characters `e R r C c` appear nowhere outside the roof and wall.

## Round 1

1. [MAJOR] Roof banding: fixed. Rows 4, 6, 8 and 9 are now `R` across, keeping the `e` left hip and the `r` right hip. Row 10 is the only full `r` row, the shadow under the eaves. I added no tile joint pixels, so the standard for buildings is a flat roof.
2. [MINOR] `r` sliver at (15,3) and (15,4): fixed. The chimney was widened, so its outline now sits at x15 and the roof outline follows at x16. I also set (16,2) to `k` to close a 1 px notch between the cap and the roof edge.
3. [MINOR] Chimney too thin: fixed as directed. The body is `u u T` at x12-14 with `k` at x11 and x15. Row 1 is `k u u u u T k` (x10-16) and row 0 is `k` at x10-16. Row 5 is left as roof.
4. [MINOR] Windows too dark, with 3 tones in 4 px: fixed with the two-tone pane, `l l` over `B B`, as you preferred.
5. [MINOR] Sill no wider than the frame: kept at frame width on purpose. Extending it to x2-7 and x12-17 would make the sill touch the wall outline at x1 and x18 and the door at x8 and x11. It would merge into them and remove the plaster gaps that separate the three openings. At 4 px the sill still reads as a ledge under each window.
6. [MINOR] Squashed wall: fixed. I added one plaster row under the eave shadow, so the sprite is now 20 x 24 (flexible, +1 row). There are now 3 rows of wall above the door and windows (row 12 eave shadow, rows 13-14 plaster). The roof is 10 of 24 rows (42% of the height, down from 43%), and with the taller wall the front no longer looks pressed under the roof. The door stays 8 px and the captain still fits it exactly.
7. [MINOR] Notes inaccurate: fixed. The windows are now described as identical copies, not mirrors, and the chimney as straddling the right end of the ridge.
