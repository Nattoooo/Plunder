# ship-tiles review, round 2

Round-1 passes (deck-planks, deck-logs, iron-bands, stern-lantern) stay passed and are not repeated. Re-reviewed deck-damage and bows against review-1.md and the regenerated sheet-1.png.

## deck-damage: PASS
Round-1 issues:
1. damage-crack straight stripe: fixed. The split now jogs at rows 3-4, has side branches at (6,3) and (3,5), and V splinters sit on both sides of the line.
2. damage-crack row 3 bulge: fixed. The kink is now a deliberate jog (rows 3-5), not a one-off bulge.
3. damage-hole glint: fixed. The glint is gone, the fill is pure `a`, and the rim is roughed (`v` at (1,0),(2,0),(0,2), uneven bottom-right).

Fresh look:
- [MINOR] damage-crack (0,0)-(8,7): at 1x on the sea and wood backgrounds it still reads a little like a twig with a pale edge, because it is a uniform 2 px dark line. Acceptable as an overlay. Optional: taper the tail so (7,7)-(8,7) becomes a single `w`.
- [MINOR] damage-crack (0,0): the crack starts clipped at the tile corner, so it will visibly end on a cell edge. Fine for an overlay placed per cell.
- [MINOR] damage-hole (7,0)-(9,1) and (0,8)-(1,9): the outline is slightly lopsided (top-right is cut deeper than bottom-left). It reads as a ragged break, which suits it.

## bows: PASS
Round-1 issues:
1. bow-medium dome: fixed. Outline is a 2-2-2 diagonal from a 2 px `kk` tip at x9-10 (rows x9-10, 7-12, 5-14, 3-16, 1-18, 0-19), matching the spec exactly.
2. bow-large dome: fixed. Rows start at x14, 12, 10, 8, 6, 4, 2, 0, with `kk` tip at x14-15 and row 8 full width.
3. Shape language: fixed. All three are straight-edged points. Small (1-1-1) is steeper than medium and large (2-2-2); this was explicitly kept in round 1.
4. bow-large banding: fixed. `V` and `w` runs are 2 px with flat `v` between them.

Fresh look: sizes are exact (10x5, 20x6, 30x9), `k` outline, light from the left, only hull-swap characters (V v W w) plus `k`, bottom row open as specified. Reads as a prow at 1x.
- [MINOR] bow-small (3,1)-(6,1): the interior is only `Vv`, so the tip has no `w` shadow on its right. Too small to matter.
