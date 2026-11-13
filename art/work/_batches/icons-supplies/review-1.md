# Review round 1: icons-supplies

Set-level notes: all 19 grids are exactly 16 x 16 and use only palette characters. Outline (`k`) and top-left light are mostly consistent. Weak spots across the set: banding (rations, planks, rope, heated-shot), three near-identical wood-and-iron-band silhouettes (water, grog, tar), and clipped or missing outlines at the canvas edge (cannonball, salted-pork, grog).

## rations: FAIL
1. [MAJOR] rations (0,2)-(15,14): the biscuits are 12-14 px wide, 2-3 px tall bars, not "square ship biscuits". The icon reads as stacked planks or drawers and is nearly the same construction as `planks`. Fix: redraw as 2 to 3 roughly square biscuits (about 8 x 7) stacked with a slight offset, top face `F`/`f`, front edge `f`/`D`, 1 px `k` outline. Keep two or three `D` dock-holes on the top biscuit only.
2. [MAJOR] rations rows 5, 7, 10, 12 (x1-14): full-width `k` lines between every band give banding and an over-outlined look (only 1 px of colour between lines at rows 6 and 11). Fix: use interior `k` only where biscuit edges overlap; let the top-face `F` rows sit directly on the front-edge `f` row.
3. [MINOR] rations (3,4),(9,4),(8,9): the `D` holes are scattered at irregular x. Fix: place them on a clear 2 x 2 grid on the top face of the top biscuit only.

## salted-pork: FAIL
1. [MAJOR] salted-pork (1,3)-(14,15): the body is a round blob with a vertical `e`/`R` split. It reads as an apple or tomato, not a ham leg. Fix: draw a tapering leg, wide haunch at upper left and narrowing to a knuckle at the lower right, with a `C` fat cap and a visible bone end.
2. [MAJOR] salted-pork (11,1)-(15,4): the bone is clipped by the right canvas edge. The `k` at (15,1), the `X` at (15,2) and the `x` at (15,3) are orphan or cut pixels, and the bone has no clean silhouette. Fix: pull the whole sprite 2 px left and down, and draw the knuckle bone as a 3 px wide `X`/`x` shape fully inside the canvas with an unbroken `k` outline.
3. [MAJOR] salted-pork (9,5)-(13,12): the `R` shade is a hard vertical band against `e` with a diagonal edge (banding). Fix: restrict `R`/`r` to the bottom and right edge, keep `e`/`E` as the main mass with `E` highlights at top left.
4. [MINOR] salted-pork (2,7)-(4,12): `C` rind pixels sit outside the outline on the left. Fix: add the `k` outline pixels to complete the silhouette.

## fruit: PASS
1. [MINOR] fruit (0,10): the orange touches the left canvas edge and the jaggy run (3,6),(2,7),(1,8),(1,9),(0,10) steps 1-1-0-1. Fix: make the diagonal step evenly 1-1-1-1, or shift the orange right by 1 px.
2. [MINOR] fruit (12,10)-(13,11): the green fruit ends in a small pointed tail (`Gk`, `kkk`), so it reads as a leaf or lump. Fix: round the bottom of the green fruit with a 3 px `g` base, as in an apple or pear.
3. [MINOR] fruit (9,0)-(12,3): the stem or leaf cluster (`k`, `D`, `G`) is heavy and the `kkkk` at row 3 caps the green fruit like a lid. Fix: remove (9,3)-(12,3) and let `H` start directly below the stem.

## water: PASS
1. [MINOR] water (2,5)-(13,5): the `kNkkkkkkkkkkMk` row is a thick black line between the blue lid and the body, and bands at rows 5, 8, 12 are unevenly spaced (gaps 3 and 4). Fix: make the bands rows 5, 8 and 11, or 4, 8 and 12.
2. [MINOR] water (1,3)-(14,13): the body is straight-sided with square lower corners, while the approved `barrel` has a rounded top and bottom. Fix: round the bottom corners to match the approved barrel (drop (1,13) and (14,13) to `.`).
3. [MINOR] water (3,3),(4,3): `l` highlights sit on the lid rim only as a 2 px run. Fix: extend `l` to (5,3) or drop it.

## grog: FAIL
1. [MAJOR] grog (13,3)-(15,11): the handle is clipped at the right canvas edge (x=15 is `M`/`k`), has only a 1 px hole at (13,5)-(13,6), and the foam overhang leaves stray `kk` at (13,3),(14,3). It does not read as a clean tankard handle. Fix: shift the body 1 px left, draw the handle as a 3 px wide D loop (outer `k`, `M` stroke, 2 px transparent hole at x=13-14, rows 5-9) fully inside the canvas, and remove the `kk` at (13,3),(14,3).
2. [MAJOR] grog (1,2)-(13,4): the foam is two flat rows of `P` with `p` pixels sprinkled at (4,3),(8,3),(12,3) (noise) and a hard `kkkk` line below it. Fix: make the foam a 2 row `P` cap with 1-2 `p` shade pixels on the right side only, and a rounded 2-3 bump top edge; remove the full `k` row at y=4 except at the rim ends.
3. [MINOR] grog (3,5)-(11,12): wood plus `N` bands is identical to `water` and `tar`. Fix: use one `N` band only, and make the tankard taper slightly wider at the top.

## medicine: FAIL
1. [MAJOR] medicine (5,8)-(11,12): the red cross is malformed and off centre. The vertical arm is at x=8-9 (rows 8-9 and 12), but the horizontal arm is 6 px wide at row 10 and 4 px wide at row 11 (x=6-9), so it is two rows thick on the left only. The bottle centre is x=7.5. Fix: make the label `C` x=4-11, rows 8-12, and draw a symmetric plus of `R`: vertical at x=7-8 rows 8-12, horizontal at x=5-10 rows 9-10 (2 px thick), leaving (7,11),(8,11),(7,8),(8,8) as the vertical arm ends.
2. [MINOR] medicine (2,7)-(13,13): bottle body is 12 px wide against a 6 px neck and a 6 px cork, so the shoulders (rows 5-7) are a steep triangle. Fix: acceptable, but smooth the shoulder steps to 1-1-2.

## fish: FAIL
1. [MAJOR] fish (13,4)-(15,10): the tail is a 1 px wide `B` bar at x=14 outlined on both sides, attached only through row 6. It reads as a stick, not a forked tail. Fix: draw a forked tail 3 px deep: `B` at x=13-14 rows 4-9 forking to two points at x=15 (rows 4 and 9), connected to the body on rows 5-8.
2. [MAJOR] fish (1,7)-(3,7): the eye is a lone `P` pixel (2,7) on `N` with a `k` at (3,7), and no dark pupil, so it is unreadable. Fix: make (3,6) `k` as the pupil with `P` at (2,6) as the glint beside it, in the blue head, and move the gill line `k` to (4,7)-(4,9).
3. [MAJOR] fish (3,3)-(11,3): no dorsal or pectoral fin. The silhouette is a plain oval, which would not read as a fish when filled black. Fix: add a 3 px triangular dorsal fin in `b`/`B` at (6,2)-(8,2) and (5,3)-(9,3) widening down into the body, and a 2 px `b` pectoral fin at (5,9)-(6,10).
4. [MINOR] fish (0,6)-(0,9): the nose touches the left canvas edge. Fix: shift the fish 1 px right and shorten the tail to match.

## cannonball: FAIL
1. [BLOCKER] cannonball (13,10)-(15,11): the right-hand ball has no outline on its right side at rows 10 and 11 (the rows end in `mmm` and `mmmm` at x=15 with no `k`), so the ball is cut off at the canvas edge. Fix: pull the right ball in 1 px so its outline `k` is on x=15 on every row of the ball.
2. [MAJOR] cannonball (0,7)-(15,14): the lower two balls change width and position between rows (the left ball spans x=1-8 at row 9 but x=0-7 at row 10, the right ball x=9-15 at row 9 and x=8+ at row 10), giving jaggies and non-circular shapes. Fix: redraw each ball as a clean 8 px circle (rows 4 and 5 are 4-6-8 wide, 8 wide for 2 rows, then 6-4), with the left ball at x=0-7 and the right ball at x=8-15, and the top ball at x=4-11.
3. [MAJOR] cannonball (3,3)-(12,8): the top ball is hidden by the lower ones and has its shading cut by `kk`/`kkk` outline clusters at (4,7),(5,7),(8,7),(10,7),(11,7). Fix: outline only the visible edge of the lower balls, and use 1 px `k` between balls, not clusters.
4. [MINOR] cannonball (4,2)-(8,5): highlight `n` is the only light accent. Fix: add a 1 px `N` glint at the top-left of each ball.

## chain-shot: FAIL
1. [BLOCKER] chain-shot (8,7)-(11,10): there is no chain. The two balls are separated by a 1 px gap and a stray `kk` at (11,9),(12,9). The icon reads as two cannonballs, not chain shot. Fix: shrink both balls to 7 px circles (top ball x=9-15 y=0-6, bottom ball x=0-6 y=9-15) and draw a 3 link chain diagonally between them with `n`/`M` links (2 x 2 `k`-outlined ovals) at about (8,7),(7,8) and (6,9), alternating `n` and `M`.
2. [MAJOR] chain-shot (7,0)-(15,9) and (0,8)-(8,15): both balls are 9 px, nearly filling the canvas with no room for the chain, and the top ball's right edge is at x=15 (touching the canvas edge). Fix: see 1, and keep one clear px margin.

## grapeshot: FAIL
1. [MAJOR] grapeshot (1,8)-(13,15): the lower half is a muddle of `k`, `n`, `M`, `m` pixels in 1-2 px clumps, with a `k` line at row 8 splitting the bag, so it reads as noise rather than shot bulging in a net. Fix: draw 6 round shot as 3 x 3 clusters (`n` highlight top-left, `M` centre, `m` bottom-right) arranged 3 + 2 + 1 below a clean cloth bag edge, separated by single `k` pixels only where the balls touch.
2. [MAJOR] grapeshot (4,2)-(11,2): the gathered neck top (`kDfDfDDk`, 8 px wide) is wider than the neck below (5 px at row 4), so it looks like a hat, not a tied knot. Fix: make the tie 5 px wide: `kDfDk` at x=5-9, with `D` knot at (7,3).
3. [MINOR] grapeshot (2,5)-(3,7): the `P`/`p` highlights at the bag's left side are in 2 px diagonal runs. Fix: use `P` on one run only, `C` for the rest.

## heated-shot: FAIL
1. [MAJOR] heated-shot (1,1)-(14,14): a plain orange sphere in `Y Q q R` with the same Q/q ramp as the orange in `fruit`, no iron anywhere, so it reads as a fruit and not a red-hot cannonball. Fix: use a red-hot ramp `e` (body), `R` shade bottom right, `Q`/`Y` core glow at upper left, and keep a thin `K` or `m` crust speckle of at most 3 px near the right edge so it still reads as iron.
2. [MAJOR] heated-shot (2,2)-(13,13): four tones (`Y`, `Q`, `q`, `R`) lay out as concentric diagonal bands following the outline (banding). Fix: limit to 3 tones with the highlight as a single 3 px blob at (3,3)-(5,4) instead of bands.
3. [MINOR] heated-shot (7,1),(8,1): `kk` cap at the top is 2 px while the bottom (7,14),(8,14) is also 2 px, giving a flat polygon top and bottom. Fix: use run lengths 4-6-8 at the top and 8-6-4 at the bottom.

## mortar-shell: PASS
1. [MINOR] mortar-shell (9,0)-(11,0): the spark touches the top canvas edge. Fix: shift the whole sprite down by 0 and drop (11,0), keeping `Q` at (9,0), `Y` at (10,0).
2. [MINOR] mortar-shell (8,2)-(10,1): the fuse is 1 px `D` with no outline and the same colour as the wood ramp. Fix: use `f`/`D` and add a `k` pixel at (9,2) so it holds against a light background.
3. [MINOR] mortar-shell (4,4)-(6,5): the highlight is only `n`. Fix: add a single `N` glint at (5,5).

## pistol-shot: FAIL
1. [MAJOR] pistol-shot (7,9)-(13,14): the lead balls are an amorphous cluster of `N`/`n`/`M` with stray `k` fragments at (11,9),(12,9),(11,11),(10,12) that cut the pouch's right wall. It does not read as small round balls. Fix: draw 3 distinct 3 px balls (`N` top-left, `n` centre, `M` bottom-right, `k` between) tumbling out at the bottom right, and restore the pouch's right outline through rows 8-11.
2. [MINOR] pistol-shot (2,7)-(2,9): `v` is wood ramp used as a leather highlight. Fix: use `J` for the highlight and `j` for shade, as the leather ramp is `j J`.
3. [MINOR] pistol-shot (4,2)-(5,3),(10,2)-(11,3): the drawstring ears are separated 5 px apart with a row of `kkkk`. Fix: draw one 4 px `f` drawstring knot centred at x=7-8, rows 2-4.

## planks: PASS
1. [MINOR] planks (0,7)-(14,10): the middle plank is 15 px wide (x=0-14) while the others are 14 (x=1-14), with unrounded corners. Fix: make all three 14 px wide, or stagger them deliberately by 2 px with rounded `k` corners.
2. [MINOR] planks rows 3-5, 8-10, 12-13: each plank is three flat `F`/`V`/`v` rows (mild banding). Fix: add one `D` grain or nail pixel to the middle plank, or merge to 2 tones.

## iron-bars: PASS
1. [MINOR] iron-bars (7,8)-(8,12): the two bottom ingots meet with a double `kk` line. Fix: overlap them by 1 px so there is a single `k`.
2. [MINOR] iron-bars (4,5)-(11,6): the top ingot uses `n` then `M` in two flat rows. Fix: only if the third tone is wanted; otherwise keep as is.

## canvas: FAIL
1. [MAJOR] canvas (1,4)-(5,10): the rolled end shows no spiral. It has only a lone `k` orphan at (3,7), no seam `k` at (5,4) (rows 5-10 have one), so the end cap merges into the top of the body. Fix: draw a 2 ring spiral on the cap: `k` ring outline x=0-5, inner `c` ring and a `k` dot at (3,7), and add `k` at (5,4).
2. [MAJOR] canvas (8,4)-(10,10): the brown `D` tie is at x=8-9 on row 4 but x=9-10 on rows 5-10 (1 px jag), and 2 px wide it looks like a stripe, not a rope tie. Fix: put the tie at x=9-10 on every row including row 4, and make it `f` with a `D` shade pixel.
3. [MINOR] canvas (14,4),(15,10): the roll's right end changes width (x=14 at row 4, x=15 at row 10). Fix: make both x=14, with the roll tilted by the top face only.

## rope: FAIL
1. [MAJOR] rope (0,2)-(15,13): the coil is five concentric tone rings (`F`, `f`, `D`, `d`) following the outline (banding), with no strand twist. It reads as a donut or lifebuoy. Fix: draw the coil as 2 rope loops with diagonal 2 px `f`/`D` strand ticks across the band, an `F` highlight on the upper left only, and a loose free end `f` at the lower right.
2. [MINOR] rope (6,6)-(9,9): the hole is a 4 x 4 rectangle with `kk` shoulders. Fix: round it with a 2-4-4-2 outline.

## tar: FAIL
1. [MAJOR] tar (2,4)-(12,14): the bucket is the same straight-sided wood body with `N` bands as `water` and `grog`, and has no taper, so the three items read as the same object. Fix: make the bucket taper (rim x=1-13, base x=3-11), use `K`/`m` stave lines and one `N` band only, and give it a bail `M` arc over the rim rather than the two `M` ears at (2,5),(12,5).
2. [MAJOR] tar (4,5)-(10,5): the tar surface is `K` (#3a2a3a) against `k` outline (#1b1220), which is almost the same tone, and the brush is only a bare `D`/`d` stick with no bristle head. The "black tar with a brush" cannot be read. Fix: make the tar surface `m` with a `M` highlight at (5,5), and draw the brush with a `D` handle ending in a `j` bristle head 2 x 3 px resting in the tar at (7,3)-(8,5).
3. [MINOR] tar (7,1)-(10,4): the handle steps 1-1-2 and does not meet the bristles. Fix: make it a clean 1-1-1 diagonal from (10,1) to (7,4).

## brass: PASS
1. [MINOR] brass (11,7)-(14,8): the right tooth is `YOYO` and `YOoo`, while the left is `YYOo` and `OoOo`, so the teeth are noisy and the right tooth has a `Y` highlight on the shadow side at (13,7). Fix: make all teeth `Y`-`O`-`o` left to right, mirrored in shape, with `Y` only on the top-left of each tooth.
2. [MINOR] brass (6,0)-(9,0) and (6,15)-(9,15): the top and bottom teeth touch the canvas edges. Fix: acceptable at full size, but trim to 14 px if other icons in the set keep a 1 px margin.
3. [MINOR] brass (6,11)-(9,11): the `YYYY` run on the inner lower arc is a bright stripe at odds with the otherwise soft ring. Fix: use `O` with a single `Y` at (6,11).
