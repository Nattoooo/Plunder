# nature-small review, round 1

Read: STYLE.md, CRITIC.md (10 points), brief.md, sheet-1.png, approved.png, the five src grids and notes. Set check: reeds, mushrooms, shell and lava are unoutlined (allowed: tiny or tiling), ice-shard is outlined like the approved boulder and rock; light is top left throughout; palette characters are all legal; sizes are within 1 px of spec (shell 5x3 vs 4x2 is +1/+1, flexible, accepted). The batch is inconsistent in one way: ice-shard carries far more black than anything else here (23 of 64 px are `k`).

## reeds: FAIL
1. [MAJOR] reeds (0,5)-(2,6): the left blade clump is a muddy 3-tone 3x2 checker, `hHh` over `GhG`, with the lightest `H` in the centre and a lone `h` inside `G` at (1,6). That is dithering and not top-left light, and it breaks the "fewer, bigger shapes" rule. Fix: row 5 becomes `.HG.GG.` (stalk continues into a lit left blade) and row 6 becomes `hHG.GGg`.
2. [MAJOR] reeds (4,5)-(6,6): the right clump is a pure `G`/`g` checkerboard (`GgG` over `gGg`). Banding/dither noise, and it reads as speckle at 1x. Fix: use the rows given in issue 1 (right clump `GG` over `GGg`, shadow `g` only at the bottom-right corner (6,6)).
3. [MINOR] reeds (4,4): the right stalk is visible for only one row (`G` at (4,4)) while the left shows two (1,3)-(1,4); the right cattail looks stuck on the blades. Acceptable once the blades are cleaned up; optional: nothing to change.
Kept from earlier review: heads are separate 2x3 sausages (v/J/j), silhouette now reads as cattails, no outline is a stated choice matching grass-tuft.

## ice-shard: FAIL
1. [MAJOR] ice-shard (0,2)-(7,7): the silhouette is a stepped mound, not three crystals. Filled black it is rows x3 / x2-5 / x2-6 / x1-7 / x0-7 / x0-7 / x0-7 / x1-6; the side "tips" at (1,3) and (6,2) just continue the staircase of the centre, so it reads as a hill or gem. Fix: make the side shards poke clear of the mound with their own diagonals: left tip at (1,2) with (0,3) `k`, (0,4) `k` start, and right tip at (6,1) with (7,2) `k`, so each outer shard rises above the centre's shoulder.
2. [MAJOR] ice-shard (0,4)-(7,6): vertical banding. Every row is `k L k L B k B k`: eight columns alternating black line and 1 px colour strip, like an organ pipe or barcode, with a double `k` at (5,2)/(6,2). The side shards are 1 px wide bodies with no light/shadow split, so they read as stripes not facets. Fix: widen the sprite to 9 px (allowed: flexible) so each side shard has a 2 px body (`L`/`B` split) with one shared `k` seam, or drop the left seam at x2 below row 4 and let the left shard's `L` touch the centre `L` only where a facet edge would be; and remove the doubled `k` at (6,2).
3. [MINOR] ice-shard (7,6)/(0,7): right shard is all `B` with no lit edge, left is all `L`; once widened, give the right shard an `L` highlight on its top-left pixel.
Kept: single `P` glint at (3,1), foot row 7 with transparent corners.

## mushrooms: PASS
1. [MINOR] mushrooms (0,2),(3,2): each stem is flush under the left pixel of a 2 px cap, so the cap overhangs on one side only and reads slightly like a flag. Optional: widen each cap to 3 px if the sprite goes to 7x3.
2. [MINOR] mushrooms (0,2),(3,2): stem is `C` (khaki, a cloth tone); `p` would read as a fresher mushroom stem. Optional.
Reads clearly as two red-capped mushrooms at 1x on green and sand; all earlier round-1 points (size, outline, shadow used one way) are resolved.

## shell: PASS
1. [MINOR] shell (0,0)-(4,2): the shape is a plain 5x3 lozenge with no scallop hint, so at 1x it reads as a pink pebble. Optional: `e` -> `E` at (2,2) is not a fix; a hinge pixel `r` at (2,2) would help but is not required at this size.
2. [MINOR] shell: the shadow tone `e` is the red ramp mid-tone, so "pink" is on the salmon/red side; acceptable on sand.
Size 5x3 is +1/+1 from 4x2 and flexible; no outline is the permitted tiny-sprite exception; clean, no orphans.

## lava-tile: PASS
Fixed 8x8, no outline. Verified: row 0 equals row 7 (`qqKqQQqq`) and column 0 equals column 7, so it wraps with no break. The crack chain (3,5) to (2,6) to (2,7)/(2,0) to (2,1) to (1,2) to (0,3) is continuous across the seams, hot spots are grouped in a few blobs, no dithering, palette `q Q K` only.
1. [MINOR] lava-tile row 3 / row 6: because edges are duplicated, the cracks form 4 px runs at the seam (`KKK`+`K`) and the pattern repeats every 7 px. Acceptable for a lava tile.
