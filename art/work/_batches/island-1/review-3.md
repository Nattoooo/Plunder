# Review island-1, round 3

Only `fishery` is under review; plantation, lumber-camp, mine and distillery passed in round 2 and are not relisted.

## fishery: FAIL
Round 2 issues: 1 fixed (the inner gill `k` is gone, the head is solid `N` with an `L` highlight, one `k` eye sits at fish column 2 of row 2, and the tail row `kNkkNk` forks, so each fish now reads as a plump fish with an eye and a forked tail rather than a bell); 2 (rack feet, minor) accepted as is.
Fresh review, rack coordinates (x,y) as in `art/src/fishery.txt` rows (hut occupies x=0-28, rack x=33-70):
1. [MAJOR] fish rows (outer fish only), fish 1 (38,13)-(43,19) and fish 3 (58,13)-(63,19), second row (38,26)-(43,32) and (58,26)-(63,32): the outer fish have no gap to the posts. Fish 1's left `k` at x=38 sits directly against the post's `k` at x=37 and fish 3's right `k` at x=63 sits against the post's `k` at x=64, so on rows 14-16 and 18 (and 27-29, 31) outline merges into a 2 px dark slab and the fish look jammed into the frame. Spacing is also uneven: 0 px to the posts but 4 px between fish (inner width 26 = 38..63). Fix: shift the three fish in each row so each fish is 6 wide with 2 px gaps everywhere (2+6+2+6+2+6+2 = 26): fish 1 x=40-45, fish 2 x=48-53, fish 3 x=56-61. Move the strings (the 1 px `k` column, rows 10-12 and 23-25) to the matching fish column 3: x=43, 51, 59. Keep the fish pixel pattern (`kLNk / kLNNNk / kLkNnk / kNNnnk / kNnk / kNkkNk / kkkk`) and the crossbars unchanged; apply identically to the top and bottom rows.
2. [MINOR] fish top row (39,13)-(42,13): the 4 px head cap puts the string over fish column 3 of an even 6 px body, so it is 0.5 px off centre; unavoidable at this width, accept.

Everything else in the family is unchanged from round 2 and still good (shared hut identical to plantation and distillery, rack closed with `k`, two crossbars, stepped feet, light from the top left). Fix item 1 and it ships.
