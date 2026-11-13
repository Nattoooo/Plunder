# Review round 3: batch props

Only the wreck family failed round 2; every other family stays passed.

## wreck: PASS
Round 2 check:
1. [MAJOR] stern break a regular diagonal: fixed. The left outline now steps at cols 1,3,4,3,4,6,6,7,8,7,8,9,10 over rows 2-15, with varied runs (1,1,1,2,1,2,...) instead of a fixed 2-per-px slant. The row 2 rim plank runs out to col 0 as a 1 px v splinter outlined by k (row 1 cols 1-6, row 3 cols 1-4), a v plank-end fragment with k outline sits at (4,6), and the rib at col 13 pokes up to (13,2) and down to (13,15). It now reads as a snapped hull, not a slanted transom. The transparent notches I asked for were not all added (only (5,8) is a gap), but the result reads.
2. [MINOR] `aa` stripe right of the mast: fixed. Single `a` at (24,5) and (24,10), `aa` on rows 6-9 only.
3. [MINOR] waterline noise: improved. Rows 14-15 now use runs of 2 (BB, AA, aa), though a lone B remains at (16,14).
4. [MINOR] right rim lit VVV: fixed. (22-27,3) are all v.

Fresh review: 34 x 17 exact (every row 34 wide), palette valid, hull-wood swap chars only on wood, view straight down with bow right, light from the top left (top rim V, mast stump V/v lit upper left, W/w shadow bottom right). The silhouette reads as a broken boat, and the half-sunk water interior reads at 1x on sand and on blue.

Remaining MINOR notes:
1. [MINOR] wreck (16,14): single B pixel between A (15,14) and W (17,14) is a lone waterline glint. Fix: optional, make it A, or extend to `BB` at (16,14),(17,14) is not possible because of the rim; set it to A.
2. [MINOR] wreck (9,11)-(25,11): the A to a boundary runs as a ruler-straight horizontal line across the whole interior. Fix: optional, push `a` up one row at cols 20-25 (row 10) so the waterline is not a straight ruler edge.
3. [MINOR] wreck (26,6)-(32,9): the bow deck is a flat 7 x 4 field of v. Acceptable as deck remains; one w plank seam at row 8 would add a cue but is not required.
