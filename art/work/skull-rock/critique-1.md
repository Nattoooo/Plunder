PASS

Reviewed against STYLE.md, specs.json (15x10, flexible), notes.md, src/skull-rock.txt, preview.png, and the approved rock preview. No blockers, no majors.

Checks: silhouette reads as a skull; size 15x10 as spec; bottom row 9 is k at x=3..11, centred; background transparent; palette is k, U, u, T only (3 stone tones, no bone colours, no swap chars); eye pits are 3x2 at x=3..5 and x=9..11, rows 4-5, symmetric about column 7; nose is 1 px at (7,5)-(7,6); teeth are 2/3/2 wide (x=3-4, 6-8, 10-11) split by k gaps at x=5 and x=9, under a narrower jaw (width 11 vs 13 above); outline is symmetric apart from lighting; light from the top left with the shadow on the right and bottom-right; reads clearly at 1x on green and sand.

1. [MINOR] skull-rock (11,7): u breaks the right-side T shadow run. The T steps 13,13,13,12 through rows 3-6, vanishes at row 7, then reappears at (11,8). Fix: change (11,7) from `u` to `T` so the shadow steps 13,13,13,12,11,11 evenly.
2. [MINOR] skull-rock (11,3)-(12,3): the u band is 2 px wide in row 3 but 1 px in rows 4-5, and the u+T pair runs parallel to the outline, which is close to banding. Acceptable at this size. Optional fix: leave as is, or change (11,3) from `u` to `U` for a cleaner single-px u band down x=12.
