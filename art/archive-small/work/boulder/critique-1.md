FAIL

Reviewed: STYLE.md, spec (nature, boulder 12x8 flexible), notes.md, src/boulder.txt, preview.png, approved tree/captain scale, rock.txt.
Size, transparency, centring, bottom-row contact, top-left light direction and outline symmetry are fine. Palette characters are legal (k U u T t only, no swap colours).

1. [MAJOR] boulder (10,5),(8,6),(9,6): uses 4 stone tones (U u T t). STYLE.md allows at most 3 tones per material. The `t` pixels form a 3 px dark stripe hugging the bottom-right outline, which is banding, and they are the only place `t` appears. Fix: replace those three `t` with `T` (row5 `kuuuuTTTTTTk`, row6 `.kTTTTTTTTk.`). Result is U/u/T only.
2. [MAJOR] boulder (whole sprite): silhouette is a symmetric lozenge/egg. The bottom corners are cut exactly like the top (widths 4,8,10,12,12,12,10,8), so there is no flat base despite notes.md claiming one, and the object reads as a smooth pebble, not a heavy boulder resting on the ground. The base row is only 8 px of a 12 px sprite. Fix: widen the lower body so it sits flat: row6 `kTTTTTTTTTTk` (12 wide, col0 and col11 `k`, cols1-10 `T`), row7 `.kkkkkkkkkk.` (cols1-10 `k`). Keep the top rows unchanged so the dome stays rounded; the bottom-right then needs row5 col11 and row6 col11 left as `k`.
3. [MINOR] boulder (1,3),(2,2),(3,2),(4,1): the `U` highlight is a 1 px diagonal strip pressed against the outline, reading as a rim light rather than a lit shoulder. Fix: after fix 2, make it a small 2 px thick mass: set (2,3) `U` and (3,3) `u` stays; i.e. row3 `kUUuuuuTTTTk`.
4. [MINOR] boulder (2..7,6): the whole bottom interior row is one horizontal band of `T` under the lit mass, so the u/T boundary jumps from a diagonal (rows 2-5) to a flat step. Fix: set (2,6) and (3,6) to `u` after fix 2 so the shade follows the diagonal: row6 `kuuTTTTTTTTk`.

Readability at 1x on green and sand is acceptable: it reads as a grey stone next to the captain, but only as a generic rock; fixes 1 and 2 would make it read as a large blocker.
