# Large props — current review round 1

Independent review by root, who has drawn no source sprites. Read STYLE.md, CRITIC.md, the current wreck-only brief, source, notes, both archived batch reviews and the approved reference. Opened all of sheet-1.png and checked the zoomed hull and sand/water contexts. All ten criteria checked. The two already approved families present in archived reviews are excluded from this batch and untouched.

## wreck: FAIL

Earlier rib/mast fusion is fixed: the two-column mast stub at x8–9 has K separating it from both cross ribs. The broken lower cut has physical notches rather than loose splinters, lower wood is shaded, and the redraw correctly points the bow up. Exact 17x9, three V/v/W wood tones and dark flooded interior are appropriate. One binding outline defect remains.

1. [MAJOR] wreck (7,1), (9,1), (5,2), (11,2), (3,3), (13,3): exposed bow-rim colour has transparency immediately above it, so the upper sloping silhouette lacks its required k perimeter. Fix the six transparent outer pixels to k: (7,0), (9,0), (5,1), (11,1), (3,2), (13,2). The top three rows become `.......kkk.......` / `.....kkVVVkk.....` / `...kkVVVVVVVkk...`. Keep the coloured rim, mast, ribs and broken stern unchanged. This closes the bow without changing canvas size or adding surface detail; inspect the resulting bow-up fragment at 1x.
