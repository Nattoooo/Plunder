# light-cannon

## light-cannon (5 x 7, fixed)

- **Barrel, rows 0-1 (`k N k`):** a 1 px iron core with its outline. The muzzle end is the flat `k` row on top. Thin at the muzzle, as a real light cannon is.
- **Breech, rows 2-3 (`N N M` / `N n M`):** the barrel swells to 3 px where the powder chamber is, the thickest part of the gun. The highlight sits on the left (top-left light), the shadow on the right.
- **Carriage bed, row 4 (`v v v`):** the wooden bed under the breech, in the wood ramp. It is the first wood on the sprite, so the gun reads as sitting on a carriage.
- **Wheels and axle, row 5 (`W K W`):** one wheel on each side, seen edge-on from above as a short dark wood strip. The `K` between them is the axle in shadow.
- **Trail, row 6:** the outline closes the stern end of the carriage.

## Current batch revision
Overhead light gun pointing up: narrow muzzle, wider N/n/M breech, v wooden carriage and paired dark wheels on an axle. Exact5x7, closed k edge. The bottom5x5 occupies one deck cell.

## Batch round 1
- MAJOR carriage (rows 4-5): the bed was full width and the wheels merged into it. Now the wheels are 2 px tall at x1 and x3, outlined on the outside, with a lit `v` bed between them as the axle. The bed is narrower than the wheels, so the wheels stand out. Row 4 is `kWvWk` and row 5 is `kWvWk`.
- MINOR breech (row 2): changed `N N M` to `N n M`, so the highlight runs down the left edge like row 3. Rows 2 and 3 now match.
