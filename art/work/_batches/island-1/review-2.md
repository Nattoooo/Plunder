# Review island-1, round 2

Batch-level: sizes are all flexible and now fully outlined (82x45, 69x28, 64x32, 71x37, 60x44). Outline, top-left light, ramps and level of detail are consistent, and the shared hut (window left, door 3 px in from the right wall, single `k` column, `V W..W w` door, 1 px `y` knob, `e`/`r` roof edges) is identical in plantation, fishery and distillery. All round 1 BLOCKERs and MAJORs are fixed except the fish in the fishery.

## plantation: PASS
Round 1: 1 fixed (stalk tips outlined, canvas 82x45); 2 fixed (door has plaster right, single `k`, correct ramp); 3 fixed (cane stalks with nodes, drooping leaves, five stalks in two depths); 4 fixed (stem `H h G`); 5 fixed (roof `e`/`r` edges).
Minor notes, do not block:
- [MINOR] stalks (34,19)-(52,33): leaves of the back stalks run into the front stalks and make a lattice of `k` lines; trim the leaf tips at (33,24)-(36,26) and (47,28)-(50,29) so each leaf ends 1 px short of the next stalk.
- [MINOR] stalks: all five stand on the same baseline so front and back rows have no depth; raising the two front stalk bases is not needed, accept as is.

## lumber-camp: PASS
Round 1: 1 fixed (outline closed on both ends and both posts); 2 fixed (18 px opening, lit `V` roof, `v` slope, `w` underside, 2 px overhang); 3 fixed (rounded cut log with ring end); 4 fixed (log ends are `F` with a 2x2 `D` core, no checker).

## mine: PASS
Round 1: 1-3 fixed (dome, left base and cart rim all closed with `k`); 4 fixed (cart wheels on the bottom row); 5 fixed (stray `u` dabs gone); 6 fixed (`u` and `t` bands are 2 px); 7 fixed (16 px opening, raised lintel). Gold flecks in the cart are deliberate points.

## fishery: FAIL
Round 1: 1 fixed (rack closed with `k`); 2 fixed (two crossbars, six fish, stepped feet); 3 fixed (shared hut door); 4 fixed (single `y` knob); 5 only half fixed: the `k` at row 1 of each fish (`kLNkNk`, e.g. (41,14)-ish in rack coordinates, fish 1 spans x=38-43, y=13-19; fish 2 x=50-55; fish 3 x=60-65; second row +13 in y) is still a stray dark pixel between head and body that reads as a gill slit, with no eye in the head.
1. [MAJOR] fish (each 6x7: rows `kLNk / kLNkNk / kLNNnk / kNNnnk / kNnk / kNnnNk / kkkk`): the six fish read at 1x as hanging grey bells or bottles, not fish: the top is a bulb, the bottom a flare, the only dark mark is the gill-like `k` that splits the head, and there is no eye or tail fork. Fix: in each fish, row 1 becomes `kLNNk` with the head `N` pixels intact (remove the inner `k`), put the eye as one `k` at fish column 2 of row 2 (`kLkNnk`), turn the tail row `kNnnNk` into `kNkkNk` so the tail forks, and keep `L` as the left head highlight. Apply identically to all six fish.
2. [MINOR] rack feet (30,35)-(33,36) and (67,35)-(70,36): the feet flare 2-3 px outward at the bottom but the fish rows are the only other detail; fine, no change.

## distillery: PASS
Round 1: 1 fixed (pot and lyne arm closed with `k`, 4 px condenser tube with cap); 2 fixed (pot 22 px wide, narrower than the cottage plus firebox, `o` collar band at the neck); 3 fixed (shared hut door); 4 fixed (chimney 6 px wide on the extended ridge `k` row); 5 fixed (firebox opening framed, 10 px flame).
Minor note, does not block:
- [MINOR] pot body (36,10)-(50,27): the body splits into a bright `y` left half and a dark `o` right half along one long diagonal; fine for 3 tones but keep it from growing.
