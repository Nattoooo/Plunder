# sail-patched (9 px wide, fixed sizes 9x5, 9x3, 9x2)

- Yard (`w`, dark wood): the bottom row in every sprite. It is the spar the cloth hangs from, and `w` contrasts with both the deck and the water. It is wood, not cloth, so it is not recoloured.
- Cloth (`p` light, `C` base, `c` shade): the only cloth colours, so the game can recolour the sail. Light comes from the top left, so `p` runs down the left edge and `c` down the right edge and along the lower right.
- Belly: the top edge is a dome (5, 7, 9 wide rows) to show the wind pushing the cloth forward.
- Patch (full only): a 2x2 block of `c` left of centre, the one detail that makes it a patched sail. In the half and furled sprites the cloth is rolled onto the yard, so the patch is out of sight.
- Half-reefed and furled: the cloth is rolled up onto the yard, so the bottom of the sail becomes one roll row (`pCCCCCCCc`) above the yard.
- No outline: sail cloth and ground-level items are exempt in STYLE.md.

## Current batch revision
Checked against approved sail-square/main: p/C/c cloth only, w yard on the bottom row, the dome bellies upward and a single2x2 c patch is a real cloth repair. The patch rolls out of sight in half/furled states; all yards stay identical9px wide.
