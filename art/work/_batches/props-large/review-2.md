# props-large review, round 2

Only wreck and claim-stone families are re-reviewed in the sections below; shrine passed in round 1 and is not listed again.

## wreck: FAIL
Round 1 check: #1 (noise) partly fixed: interior is solid K, ribs are straight at cols 5 and 10, no scatter left. But the mast block still does not read (see 1). #2 (stern) fixed: the break is jagged with open K. #3 (waterline) fixed: rows 7-8 are dark.
1. [MAJOR] wreck (7-10,3-5): the mast stub touches the right rib. Row 4 is `K W W v W` from x6 to x10, so the 3x3 block (`kVW / WWv / kvv`) fuses with the W rib at x10 into one brown blob, and the lone `k` at (7,3) and (7,5) read as stray dark pixels. At 1x on sand and on water there is no identifiable snapped mast. Fix: stop the right rib at the mast. Set (10,3), (10,4), (10,5) to `K` so the rib shows only at rows 2 and 6, and set (7,3) and (7,5) to `K` so the stub is a plain 2-wide block: row3 x8-9 `VW`, row4 x8-9 `Wv`, row5 x8-9 `vv`, with `K` all round it.
2. [MAJOR] wreck (13,3), (13,5), (14,5): the two splinter pixels (`w` at (13,3), `v`/`w` at (13,5)-(14,5)) with `k` after them stick out of the stern like pegs or oars, not broken planks. They look like a rudder or paddles and add noise. Fix: make (13,3) `K` and (14,3) `.`; make (13,5), (14,5), (15,5) `.`, and put `k` at (13,5) so the break ends at x12 on rows 3 and 5, with row 4 ending at x13 for one jagged step. The stern then has an uneven edge but no stubs.
3. [MINOR] wreck (0-2,2-6): the bow is a flat 5 px vertical edge with only a 2-step corner, so the hull reads as a barge or box end, not a bow. Fix: optional, taper rows 2 and 6 to start at x1 and rows 3-5 to start at x0 (a 3 px flat nose), keeping the `V` rim lit.
4. [MINOR] wreck (5-8,8): the bottom edge is `K` with no `k` below it, so the outline breaks on the lowest row. Fix: make (5,8)-(8,8) `k`, or accept it as the waterline and leave it.

## claim-stone: PASS
Round 1 check: #1 pole jog fixed (row 4 is `..kkwkk..`, pole straight at x=4, stone top x2-6 is centred). #2 pole outline fixed (`k` at (3,1)-(3,3), (4,0) `k`). #3 (1,8) is `U`, fixed. Fresh look: stone is symmetric and centred, lit left column and `T` right column are consistent, the cross rune sits at the stone centre (4,7), the white flag is readable on sand and on water, and it matches the approved outline and light.
1. [MINOR] claim-stone (7,2): `p` at the flag corner is the only shade on the cloth and reads as a stray pixel at 1x. Fix: optional, make it `P` for a clean flag.

## claim-stone-owned: PASS
Round 1 check: #1 pole jog fixed, #2 pole outline fixed, #3 flag now has `M` lit column at (5,1)-(5,2) over `K`, and it reads as dark cloth separated from the `k` outline, fixed. #4 (1,8) `U`, fixed. Fresh look: identical to claim-stone except the flag, as specified. The black flag is lower contrast than the white one but clearly legible at 1x.
1. [MINOR] claim-stone-owned (6-7,1-2): `K` cloth is close to the `k` outline in value. Fix: none required; ship as is.
