# Review round 1: ship-small

Set notes: no outlines on any family (all allowed: sail cloth, 2 px items, effects, 3 px figures). Palette characters are all legal and swap colours are respected (sails p C c, pennant R, crew shirt R r). All sizes match the brief exactly. Light is top left everywhere except the oar grip (see below). Set is consistent in detail level, one real exception: the fire view.

## sail-patched: PASS
1. [MINOR] sail-patched-full (3,2)-(4,3): the 2x2 patch is `c`, the same tone as the right-edge shade, so rows 2 and 3 read `ppp cc CC cc` and look more like stripes than a patch at 1x. Fix (optional): none possible with the swap palette; accept.
2. [MINOR] sail-patched-furled (0,0) and (8,0): the roll is full width with square ends, while the approved furled sails taper the roll one pixel at each end (`.ppCC...cc.`). Fix (optional): none required at 9 px; accept.
3. [MINOR] Yard is all `W` where the approved sails use `W` ends with `v` middle. Documented in notes (v vanishes on deck); accepted.

## oar: PASS
1. [MINOR] oar (0,0): grip top-left pixel is `w` (darkest) while (0,1) is `W`; the top-left should be the lit pixel. Optional: swap to `W` at (0,0) and `w` at (0,1).
2. [MINOR] oar blade is 3x2 with no taper; acceptable at 7x2.

## flags: PASS
1. [MINOR] pirate-flag-1/-2: `K`/`k` flag on dark sea is low contrast, but it reads on the sheet and is true to a black flag. Accept.

## fire: FAIL
1. [MAJOR] fire-2 (2,1): the frame is 8 of 9 pixels filled with only (1,0) and (2,0) empty, so the silhouette is a solid square with a notch and reads as an orange blob, not a flickering flame; the "leaning tongue" is lost. Fix: change fire-2 to `Q..` / `qQ.` / `qqq` (remove the `q` at (2,1)), so the flame is a left-leaning triangle that differs clearly from fire-1.
2. [MINOR] fire-1/fire-2: side-profile flame rather than the straight-down view STYLE.md requires on deck. Documented judgment call (readability, avoids confusion with muzzle flash); accepted for this round.

## deck-people: PASS
1. [MINOR] crew (0,1)/(2,2): stride reads a little muddled at 1x (hand left at shoulder row, no left shoulder), but silhouette is a clear figure with hair, shirt and hands. Accept.
2. [MINOR] captain-deck: no hands or head visible; hat plus two coat rows is distinct from crew by the `k` hat. Accept.
