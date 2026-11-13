FAIL

Grid reviewed (14x6): rows `kk....kkkkkk..` / `kBkkkklllllBk.` / `kBBBBBlllBBBBk` / `kBkkkkBbbbbbk.` / `kk....kkBBkk..` / `........kkk...`. Palette legal (k, B, b, l), transparent background, straight down facing right, light top left. 14x6 is a flexible-size change and the notes justify it.

## Round 1 issues
1. Flukes (MAJOR): NOT FIXED. The notch at (0,2) is `k`, so in a filled-black silhouette cols 0-1 are a solid 2x5 bar, exactly as before. Only (1,1), (1,2), (1,3) carry fill, so in colour it reads as a bracket "[" on the stern, not two lobes. My round 1 fix (`k` notch) was self-defeating; the notch must be transparent.
2. Body ends (MAJOR): fixed. Corners (5,0), (5,4), (12,0), (12,4) are cut with `k` rounding. Reads as a rounded back and head. See minor 4.
3. Flipper (MAJOR): fixed in principle. `B` (8,4)-(9,4) with `k` (8,5)-(10,5) now gives a side feature and a 14x6 sprite. See minor 3.
4. Shading (MINOR): fixed. `b` along (7,3)-(11,3), highlight a tapering `l` strip (6,1)-(10,1) and (6,2)-(8,2).
5. Wall at col 5 (MINOR): fixed by the rounding.

## New / remaining issues
1. [MAJOR] whale (0,0)-(1,4): flukes still silhouette as a solid bar, and they are mostly outline (4 `k` of 10 px, only 3 `B`). Filled black, the stern reads as a T-bar on a stick, not a tail. Fix: make (0,2) `.` (transparent) and (1,2) `k`, so the stock `B` at (2,2) butts into a `k` wall and the silhouette shows a real notch between two lobes. Optionally make the tips sweep back: (0,1) `.` is NOT wanted; keep (0,0),(0,1),(0,3),(0,4) `k` and (1,1),(1,3) `B`.
2. [MINOR] whale (7,0) vs (7,4): the upper side of the body is a clean outline but the lower side carries a flipper with nothing mirrored on top; from straight above a whale shows both pectorals. Fix: add a matching 2 px flipper at the top only if the sprite is grown to 7 rows (`B` (8,0)-(9,0) with `k` above at (8,-1)); otherwise accept as is and state it in notes.
3. [MINOR] whale (8,4)-(9,4): the flipper `B` is lighter than the `b` belly shadow directly above it at (8,3)-(9,3), so a lit tone sits on the shadow side. Fix: make (9,4) `b` (keep (8,4) `B`) so the flipper shades toward the lower right.
4. [MINOR] whale (5,0)-(5,4): the stern steps from a 3 px tall stock (rows 1-3 in silhouette) straight to the 5 px tall body at col 6, a hard step rather than a taper. Fix: not required if the flukes are fixed; if desired, `k` at (5,0) and (5,4) would taper it, but the current corner is acceptable.

Readability at 1x: on green and sand the whale reads as a blue torpedo/fish with a small tail bracket and a stub fin. The flukes are the one thing keeping it from reading as a whale; fix issue 1 and it ships.
