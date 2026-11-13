# ship-parts review, round 1

Batch notes: all 13 sizes match spec (5x5, rudder 5x7, crow's nest 6x6, ram and figurehead 5x8). Palette characters are all legal. Light is mostly top-left, but workshop and sick-bay break it. Set-level MINOR: corner treatment is mixed (helm, rudder, mast, oar-bench and crow's nest have cut corners; hatches, galley, workshop and sick-bay have square ones). That is defensible as round versus rectangular objects, so it is not failed. The powder-magazine outline exception is not acceptable (see below).

## helm: PASS
1. [MINOR] helm (0,1)-(4,3): the K corner pixels fuse with the k rim, so the wheel reads as a plus in a dark box more than a ring. Acceptable at 5x5.

## rudder: FAIL
1. [MAJOR] rudder (0,0)-(4,6): three vertical tones (V v w) between round caps is cylinder shading, so the sprite reads as a log or barrel, not a flat blade. Five identical rows add nothing. Fix: make the top row a flat attachment edge `kkkkk`, keep rows 1-4 as `kVvwk`, and taper the tail so the silhouette reads as a blade: row 5 `.kvk.`, row 6 `..k..`.
2. [MINOR] rudder: no pintle or hinge where it meets the stern. Optional: (0,1) and (0,3) = `M`.

## mast: FAIL
1. [MAJOR] mast (1,1),(3,1),(1,3),(3,3): the f rope pixels are the lightest things in the sprite and sit in the corners, so value hierarchy is inverted. The subject (the post) is darker than its stays. The "plus" post is not a round mast seen from above, and the corner stays do not read as rigging; the sprite reads as an ornament or a compass tile. Fix: make the post a round 3x3 disc and run the stays out of the sides: row 1 `kVVvk`, row 2 `fVvwf`, row 3 `kvwwk`, row 0 and row 4 unchanged.

## oar-bench: PASS
1. [MINOR] oar-bench (1,1)-(3,3): three flat horizontal tone bands follow the outline. Passable for a plank, but if revised use 2 tones.

## crew-quarters: PASS
1. [MINOR] crew-quarters (0,0)-(4,4): the shaft is only the two K pixels at (2,1) and (2,3), so at 1x it reads as a dark box with a brown H. It still reads as a ladder hatch.

## cargo-hold: PASS
1. [MINOR] cargo-hold (1,2)-(3,2): wood shows in only one row, so iron dominates the look. Reads as a strapped hatch at 1x, so it is acceptable.

## galley: PASS
No issues beyond taste.

## powder-magazine: FAIL
1. [MAJOR] powder-magazine (0,0)-(4,4): no outer outline and no transparent pixels. STYLE requires a 1 px k outline on deck parts, and the artist's own note admits a deliberate exception. At 1x it reads as a brown waffle or hash tile, not four kegs, and it merges with the wooden deck. Fix: round each keg by setting the four outer corners (0,0),(4,0),(0,4),(4,4) to `k`, which also gives the kegs separate round silhouettes. Keep the k cross. Change the keg 2x2 tops to `Vv/vw` with the lit pixel only at each keg's top-left (already so). Optionally add `M` at (1,2) and (3,2) as hoop glints.
2. [MINOR] powder-magazine: kegs use hull-swap wood (V v w). That is acceptable but tints with the hull colour.

## workshop: FAIL
1. [MAJOR] workshop (1,1),(2,1),(3,1): hammer head is `M N m`, with the highlight in the middle and the left darker than the centre. That is cylinder shading and contradicts top-left light. Fix: row 1 = `kNMmk`.
2. [MINOR] workshop (2,2),(2,3): the handle is V, the same ramp as the bench wood, so it separates only by value. Optional: handle `F`-free, keep V, but make bench pixels (1,2),(1,3) `w` and (3,2),(3,3) `w` for contrast.

## sick-bay: FAIL
1. [MAJOR] sick-bay (1,1),(3,1),(1,3),(3,3): the blanket corner tones form a checkerboard (C c / c C). Bottom-right (3,3) is the lit `C`, and top-right (3,1) and bottom-left (1,3) are shadow. That breaks top-left light and reads as dithering. It also contradicts the artist's own note. Fix: keep (1,1)=`C`, set (3,1)=`c`, (1,3)=`c`, (3,3)=`c`. Row 1 `kCRck`, row 3 `kcRck`.
2. [MINOR] sick-bay: no cot frame or pillow. The cross reads clearly, so this is acceptable.

## crows-nest: PASS
1. [MINOR] crows-nest (2,2)-(3,3): K floor is a 2x2 black block, so it reads as a hole. It is fine over sails.

## ram: PASS
1. [MINOR] ram (0,2)-(4,2): the silhouette jumps 1, 3, 5, so it reads slightly bullet-like. Optional: row 2 `.kNk.`-width 3, then widen at row 3. The size is fixed, so leave it unless revising.

## figurehead: FAIL
1. [MAJOR] figurehead (0,1)-(4,6): the silhouette is a 5 px wide uniform rectangle with a cut top. Filled black it is a bar or ingot, not a bust. There is no neck or shoulder step, despite the notes claiming head and shoulders. Fix: narrow the neck and widen the shoulders. Rows: 0 `.kkk.`, 1 `kyyOk`, 2 `kyOok`, 3 `.kOk.`, 4 `kyOOk`, 5 `kOOok`, 6 `koook`, 7 `kkkkk`.
2. [MINOR] figurehead: the diagonal y/O/o gradient is the only form cue. Once the neck is added it reads better.
