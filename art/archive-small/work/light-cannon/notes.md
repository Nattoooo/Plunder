# light-cannon

## light-cannon (5 x 7, fixed)

- **Barrel, rows 0-1 (`k N k`):** a 1 px iron core with its outline. The muzzle end is the flat `k` row on top. Thin at the muzzle, as a real light cannon is.
- **Breech, rows 2-3 (`N n M` in both rows):** the barrel swells to 3 px where the powder chamber is, the thickest part of the gun. The highlight sits on the left (top-left light), the shadow on the right.
- **Carriage bed, row 4 (`.kvk.`):** a single 1 px wooden bed under the breech, narrower than the wheels, so the wheels read as their own row. It is the first wood on the sprite, so the gun reads as sitting on a carriage.
- **Wheels and axle, row 5 (`kWvWk`):** one wheel on each side, seen edge-on from above as a short dark wood strip. The `v` between them is the axle.
- **Trail, row 6:** the outline closes the stern end of the carriage.

## Current batch revision
Overhead light gun pointing up: narrow muzzle, wider N/n/M breech, v wooden carriage and paired dark wheels on an axle. Exact5x7, closed k edge. The bottom5x5 occupies one deck cell.

## Batch round 1
- MAJOR carriage (rows 4-5): the bed was full width and the wheels merged into it. Now the wheels are 2 px tall at x1 and x3, outlined on the outside, with a lit `v` bed between them as the axle. The bed is narrower than the wheels, so the wheels stand out. Row 4 is `kWvWk` and row 5 is `kWvWk`.
- MINOR breech (row 2): changed `N N M` to `N n M`, so the highlight runs down the left edge like row 3. Rows 2 and 3 now match.

## Batch round 2
- MAJOR carriage (rows 4-5, review-2 item 1): row 4 is now `.kvk.`, the bed only, narrower than the wheels. Row 5 stays `kWvWk`, with the wheels at x1 and x3 and the `v` axle between them. Row 6 stays `.kkk.`. The wheels no longer merge into the bed, so the carriage reads as its own row.
- MINOR barrel core (review-2 item 2): left as it is, as the reviewer suggested. Row 1 `.kNk.` is the thin muzzle and rows 2-3 are the 3 px breech. The slim muzzle that swells at the breech is the intended shape.
