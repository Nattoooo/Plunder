# boulder (12x8, flexible, size unchanged)

- Silhouette: a low rounded dome with a flat base on the bottom row, centred; roughly 1.3 captains wide, nearly captain height, so it reads as a large blocking rock.
- Outline: 1 px `k` around the whole shape; corners cut by 1-2 px for a smooth curve (run lengths 4-2-1-1 on top, mirrored at the bottom).
- Lighting (top left): `U` highlight on the upper-left shoulder, `u` base on the lit face, `T` shade on the right and lower face, `t` darkest stone at the bottom-right edge. Stone ramp only, 4 tones with each region a single clean mass, no texture pixels.
- No ground shadow or crack: nothing extra that is not a real feature.

## Round 1
- MAJOR 1 (4 tones): fixed. All `t` pixels replaced with `T`; the sprite now uses only U/u/T.
- MAJOR 2 (symmetric lozenge, no flat base): fixed. Rows 6-7 widened: row 6 is full 12 px wide, row 7 is a 10 px flat base of `k`. Top rows unchanged so the dome stays rounded.
- MINOR 3 (rim-light highlight): fixed. Row 3 is now `kUUuuuuTTTTk`, making the highlight a 2 px thick lit shoulder.
- MINOR 4 (flat u/T step on bottom row): fixed. Row 6 is `kuuTTTTTTTTk`, so the shade boundary follows the diagonal.
- Size unchanged (12x8). The earlier note about corner cuts mirrored at the bottom no longer applies: the base is flat.
