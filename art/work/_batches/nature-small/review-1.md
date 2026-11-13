# nature-small review, round 1

Set notes: outline weight, top-left light and foliage/stone ramps are consistent across the batch and match the approved pilot (tree, bush, boulder family read together on green and sand). Two families fail on pixel craft. Sizes are all within 1 px of spec (skull-rock drawn 31 x 20 vs 30 x 20, flexible and justified by the centre column, accepted).

## bush: PASS
1. [MINOR] bush (12,4): single `H` highlight sitting alone in the `h` mid-field reads as a stray speck. Fix: change (12,4) to `h` (or add a matching `H` at (13,3) so it joins the right lobe highlight).
2. [MINOR] berry-bush: berries are fine (three 2 x 2 clusters, e/R/r only, foliage chars untouched). Same (12,4) note applies via the shared body.

## reeds: FAIL
1. [MAJOR] reeds (1,8)-(13,13): the base is a scatter of disconnected 1 px blade fragments in three greens (e.g. `H` at (1,12), `G` pair at (6,8)-(6,9), `h` at (2,8), `h` at (8,9)) that do not form readable blades. Violates "no noise / clean lines". Fix: redraw rows 8-13 as two clean tufts of 2-3 continuous diagonal blades each, one tone per blade (`h` lit side, `G` only on the right/bottom edge), no isolated pixels. Example rows 8-13: `....h.....h...` / `...hh.G..hh.G.` / `..hHh.G.hHh.G.` / `.hH.hG.hH.hG..` / `hH..hG.hH..hG.` / `....hGG...hGG.` (keep stems at columns 4 and 10).
2. [MINOR] reeds stems (4,5)-(4,11) and (10,7)-(10,11): 1 px `h` stems have almost no contrast on grass-green ground and look like floating heads at 1x. Fix: make the stems `G` (darker) from (4,5) to (4,10) and (10,8) to (10,10).
3. [MINOR] reeds head 2 (9,3)-(11,6): head is 4 tall but its tip `v` at (10,3) is a lone pixel above `vvJ`; acceptable as the cattail spike, but first head tip (4,0) sits one row higher than its own `vvJ` block width, making the heads read slightly different in profile. Fix: optional, leave.

## boulder: PASS
1. [MINOR] boulder (14,4)-(12,8): crack ends abruptly mid-face at (12,8). Fix: optional, extend one pixel to (11,9) or leave.

## rock: PASS

## skull-rock: FAIL
1. [MAJOR] skull-rock (9,0)-(21,0): the top row of the cranium is filled with `U`/`u` and has no `k` outline above it; only (6,0)-(8,0) and (22,0)-(24,0) are outlined. The dome's top edge dissolves into the ground/sky, breaking the 1 px outline rule and the set. Fix: replace row 0 cols 9-21 (`UUUUUUUuuuuuu`) with thirteen `k`, so row 0 reads `......kkkkkkkkkkkkkkkkkkk......` (cols 6-24 `k`). The outline then steps 2-1-1-1-1 down each side cleanly. The sprite stays 31 x 20.
2. [MINOR] skull-rock (11,15)-(22,17): teeth are `T` (dark) on three of four, only the left tooth is `u`; the jaw reads as one shaded slab. Fix: optional, set (12,16),(16,16) etc. top row of each tooth to `u` so teeth separate from the shadow.
3. [MINOR] skull-rock (15,12): nose is one `k` pixel over a 3 px `kkk`; reads, but is tiny against 6 px eyes. Fix: optional, make row 12 `kkk` at cols 14-16 and row 13 `kkkkk` at cols 13-17.

## ice-shard: PASS
1. [MINOR] ice-shard (6,3)-(6,5), (7,1), (1,8)-(1,9), (11,7)-(11,8): `P` glint line has gaps (missing at (6,2) and rows 6) and its position jumps between columns. Fix: run `P` continuously down the lit edge of the centre shard, (6,2)-(6,6).
2. [MINOR] ice-shard (4,6),(5,6) and (10,4),(11,4): two `k` pixels side by side where shards overlap give a double-thick outline for a row or two. Fix: optional, drop one `k` of each pair.
3. [MINOR] ice-shard row 14: base switches `LLll` to `lll` plus a lone `B` per shard. Fix: optional, keep `L` at cols 1, 6, 11 on row 14.

## grass-tuft: PASS
1. [MINOR] grass-tuft (0,0),(4,0),(7,0): tips spaced 4 then 3 apart. Fix: optional, move tip (7,0) to (6,0)... leave if low contrast is the goal.

## flowers: PASS
1. [MINOR] flowers (1,5): lone `H` highlight in the leaf tuft base. Fix: optional, change to `h`.

## mushrooms: PASS
1. [MINOR] mushrooms small cap (7,2)-(9,3): cap is a flat 3 x 2 block, corners not rounded. Fix: optional, none needed at this size.

## shell: PASS

## lava-tile: PASS
1. [MINOR] lava-tile (11,6): a single `q` pixel fully enclosed by `K` on four sides at a crack junction reads as a stray dot. Fix: change (11,6) to `K` (keep the tile seam-free; checked wrap of all four edges: cracks and `Q` spots continue correctly across left/right and top/bottom).
