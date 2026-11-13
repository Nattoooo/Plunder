# props-large review, round 3 (wreck only)

## wreck: FAIL
Round 1 check: #1 view/proportions fixed in size (11 x 18, bow up). #2 outline gap fixed. #3 mast fixed in form but see 2. #4 rib reaches rims, fixed. #5 lit-side rim fixed. #6 K interior to waterline, fixed.
Round 2 check: #1 (snapped stern) NOT fixed in effect: the left wall still runs to row 16, the right wall stops only one row early (row 15 `kVvKKKKKwk.`), and the break is a 3-row bevel (rows 15-17). Filled black it is still a pointed-top, flat-ended capsule. On the sheet at 1x on sand and on blue it reads as a coffin or a wooden door with a cross panel, not a ship. #2 symmetry fixed (11 wide, centred on x5). #3 mast: centred, but see 2. #4 bow kept, acceptable.

Fresh look:
1. [MAJOR] wreck (0-10,12-17): the stern is still not visibly broken and the sprite still silhouettes as a coffin/tombstone. Fix: make the break start higher and be larger and uneven, across about 6 rows, with the walls stopping at different rows and K showing along a ragged line. Replace rows 12-17 with:
   row 12 `kVvKvvwKwwk`
   row 13 `kVvKKKKKwwk`
   row 14 `kVvKKKKKwk.`
   row 15 `kVvKKKKkk..`
   row 16 `kVvKkk.....`
   row 17 `.kkk.......`
   (left wall runs longest, right wall gone by row 15 and bottom edge stepped; remove the WW rib stub at row 14 or move it to the break as a snapped W/w end, since it is needed no more; every outline pixel must stay 4-connected to the next.)
2. [MAJOR] wreck (4-6,10-12): the mast stub (V at (5,10), `VVv` at row 11, `vvw` at row 12) forms a T/cross shape in a dark rectangle, which together with the capsule hull reads as a grave marker or a door panel. The mast is also 3 x 3 in a 5 px interior, so it fills the hull. Fix: shrink it to 2 x 2 off the centre line of the hull to read as a snapped stump with a ragged top: row 10 `.V.` removed; row 11 (4-5) `Vv`, row 12 (4-5) `vw`, with K left on both sides and the top row of the stump a step lower on the right (put K at (6,11)). Keep the V highlight on the left.
3. [MINOR] wreck (8-9,2-16): the shaded rim is two columns of identical `w` (e.g. `wwk`), so the 2 px right rim is a flat stripe, which is banding against the lit left rim `Vv`. Fix: make the outer right rim pixel `w` and the inner one `W`, or reduce the rim to 1 px.
4. [MINOR] wreck (3-4,14): the lower `WW` rib stub is off-centre and touches nothing, so it reads as stray pixels. Fix: delete it or extend it from the left wall to the break edge.
5. [MINOR] wreck: size is 11 x 18 against the 17 x 9 spec. The brief marks it flexible and the reasoning is documented, so this is accepted, but do not grow it further.

Readability at 1x: the dark body separates from sand and blue, but the identity is still "coffin", and the reading will only change with a clearly ragged stern and a smaller, ragged mast. Set check: outline 1 px k, top-left light, palette characters legal; the wood ramp matches approved.png.
