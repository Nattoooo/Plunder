FAIL

Grid reviewed (14x5): rows `kk...kkkkkkkk.` / `kBkkkllllllBBk` / `kBBBBlllBBBBBk` / `kBkkkBBBBBbbbk` / `kk...kkkkkkkk.`. Palette is legal (k, B, b, l only), size is unchanged, background is transparent, view is straight down facing right, light is top left. The problems are silhouette and readability.

1. [MAJOR] whale (0,0)-(1,4): The tail flukes are a solid 2x5 rectangle (`kk` / `kB` / `kB` / `kB` / `kk`). Filled black it is a bar, not a tail. Flukes from above are two lobes sweeping out from the stock with a centre notch. The single `B` column at (1,1)-(1,3) reads as a stripe. Fix: reshape cols 0-3 so the lobes are widest at the outer tips and pinch toward the stock: make (0,0) and (0,4) the lobe tips, make (1,0) and (1,4) `.`, put `k` at (0,2) as a centre notch with `B` at (1,2), and join the stock at (2,2)-(4,2). Keep `k` outline along all lobe edges.

2. [MAJOR] whale (5,0)-(13,4): The body is a near-rectangle 9 wide x 5 tall with only (13,0) and (13,4) cut. The left end is a flat wall at col 5 (rows 0-4 all body or outline) with no taper, and the head is almost as blunt as the back. It reads as a bottle or torpedo. Fix: round both ends. Make (5,0) and (5,4) `.` with `k` at (6,0) and (6,4). Make (12,0) and (12,4) `.` with `k` at (11,0) and (11,4) and `k` at (12,1) and (12,3), so the head is rounded. Taper the tail stock into the body instead of meeting a wall.

3. [MAJOR] whale (whole sprite): No pectoral flippers. With no fins, eye or blowhole nothing besides the flukes says "whale" rather than fish or bottle. At 1x on the green and sand backgrounds it reads as a blue capsule. I accept the notes' argument that an eye is noise, but a flipper is a silhouette feature. Fix: add one flipper on the lower side, e.g. `B` at (8,4)-(9,4) with `k` at (8,5)-(10,5) and (10,4), growing the sprite to 14x6 (flexible; state it in the notes), or a 2 px flipper on the upper side at (8,0)-(9,0).

4. [MINOR] whale (10,3)-(12,3): The `b` shadow is a hard 3 px patch against `B` at (9,3), the darkest tone abutting the base. The `l` highlight also steps oddly: `l` (5,1)-(10,1) over `l` (5,2)-(7,2), then `B` (11,1)-(12,1) cuts it short. Fix: run `b` along the whole belly edge (7,3)-(12,3), and make the highlight a single tapering strip, e.g. (6,1)-(10,1) plus (6,2)-(8,2).

5. [MINOR] whale (5,1) and (5,3): `l` at (5,1) and `B` at (5,3) sit directly against `k` at (4,1) and (4,3), so the body looks pressed against a wall. Resolved by the rounding in issue 2.

Comparison: the captain, cottage, tree and rum pilots use tapered outlines and one clear identifying feature per object. The whale has neither; it needs a silhouette redraw, not pixel polish.
