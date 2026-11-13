# mushrooms (5x3, spec 5x3, flexible, kept at spec)

- Two caps, each 2 px wide by 2 rows, with one transparent column between them. Each cap: e (lit top-left), R (top-right and bottom-left), r (bottom-right shadow).
- A pale C stem under the left pixel of each cap, on the bottom row.
- No outline: the sprite is 3 px high, which is the permitted exception. flowers (5x3) is also unoutlined.
- Only e R r C are used. Light from top left.

## Batch round 1
The round-1 critique reviewed a 9x6 draft. That size is outside the 1 px tolerance of the 5x3 spec, so the sprite is redrawn at 5x3. Points 1 (centring and shared outline) and 3 (white spot) no longer apply, since there is no outline and no room for a spot. Point 2 (shadow used two ways) is fixed: each cap has one light and one shadow pixel, with shadow only on the bottom-right.
