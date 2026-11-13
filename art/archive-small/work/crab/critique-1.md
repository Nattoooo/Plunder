FAIL
Reviewed: STYLE.md, spec (crab-1/crab-2, 6x4 flexible), notes.md, src/crab.txt, preview.png, family.png, against captain (9x9 sprites), house-cottage, tree, deck-planks, rum previews. Palette is clean (k e R r only, no stray swap colours). Size 8x5 is justified in the notes and accepted. Frames differ only in the leg row, as required. Silhouette reads as a small crab body with raised arms, but the claws and the shell underside fall short.

1. [MAJOR] crab-1 / crab-2 claws (0,0),(1,0),(0,1),(1,1) and mirror (6,0),(7,0),(6,1),(7,1): each claw is three `k` pixels around a single `e`, and the shell outline (2,1)/(5,1) touches the red. The claws read as black ears with one red dot, not pincers, and fuse with the flat 4 px `k` bar (2,1)-(5,1). Fix: make each claw a visible pincer with at least 2 red px, e.g. (1,0)=`e` and (1,1)=`e` with (0,0)=`k`,(0,1)=`k`,(2,0)=`k` so the red is outlined on the outside and the notch reads as an open pincer; mirror on the right with (6,0)=`e`,(6,1)=`R`,(5,0)=`k`,(7,0)=`k`,(7,1)=`k`. Keep a `k` pixel between claw red and shell red so they do not merge.

2. [MAJOR] crab-1 (3,4),(4,4) and (0,4),(7,4): the shell has no bottom outline. Row 3 `RRRr` at (2,3)-(5,3) sits on transparent (3,4),(4,4), breaking the closed 1 px `k` outline rule. The outer legs (0,4),(7,4) touch the body only diagonally and look like floating specks. Fix for crab-1 row 4: `.kkkkkk.` is too heavy; use `k.kkkk.k` with (0,3),(7,3) set to `k` so the outer legs attach, or move the outer legs to cols 1 and 6 as in crab-2. crab-2 is fine on this point, (3,4),(4,4) are `k`.

3. [MINOR] crab-1 / crab-2 (5,2),(2..5,3): light runs as horizontal bands (row 2 light `eee`, row 3 dark `RRRr`) rather than from the top left. Fix: (2,2),(3,2)=e, (4,2),(5,2)=R, (2,3),(3,3)=R, (4,3)=R, (5,3)=r.

4. [MINOR] crab-1 / crab-2 (6,1): the right claw `e` is as bright as the left (1,1). With light from the top left the right claw should be one step darker. Fix: (6,1)=R.

5. [MINOR] crab-1 / crab-2: no eyes. A 1 px eye stalk pair on the top row, for example `k` at (3,0),(4,0), would make the shell read as a crab instead of a helmet. Fix: set (3,0) and (4,0) to `k` once the claw notch from issue 1 is in.

Verdict: no blockers, two majors, three minors. Do not ship until the claws read as pincers and crab-1's underside is closed.
