FAIL

Sprite: dead-tree, 13 x 13 (spec 13 x 11, flexible; the +2 rows are acceptable, see issue 6). Coordinates are 0-based from the top-left.

1. [MAJOR] dead-tree (6,2): the centre stub's `W` pixel has nothing above it. (6,1) is `.`, so the fill is exposed with no `k` cap. The stub's only outline is a stray `k` at (5,1), which sits over the outline pixel (5,2) and not over the wood. Fix: set (6,1) to `k` and (5,1) to `.`. The stub then reads as a 1 px wood nub, `W` at (6,2) capped by `k` at (6,1). Or delete the stub: set (6,2) to `k`, (5,1) to `.`, and let the fork read as two limbs.

2. [MAJOR] dead-tree (10,1): the right limb's top `w` pixel is open, because (10,0) is `.`. The `k` at (9,0) is a lone outline nub beside it and caps nothing. Fix: set (10,0) to `k`, and set (9,0) to `.` or keep it as the cap's left shoulder. The limb tip must be closed by `k` on top.

3. [MAJOR] dead-tree (whole sprite): the brief is "twisted, gnarled" and "forked branches". The sprite is a dead-straight 3 px tube (rows 5-9 are identical, `kvWwk` at x4-8) with two thin 1 px limbs on top. Filled black, it reads as a tuning fork or slingshot on a stump, not a dead tree, and the crown is only 4 rows tall. At 1x next to the captain it looks like a Y-shaped post. Fix:
   - Add a kink to the trunk: shift rows 5-7 one pixel left, so x3-7 for the fill, then back at row 8.
   - Give the left limb a secondary fork, e.g. a 1 px twig stepping off at (2,2)-(1,1).
   - Give the right limb a stub branch off its lower side, around (9,3)-(10,3).
   - Make the crown 6-7 rows tall, using the 2 extra rows already taken to grow upward, so the limbs have more reach than the trunk has width.

4. [MINOR] dead-tree (5..7, 3..9): the trunk is three 1 px vertical stripes (`v`, `W`, `w`) that run parallel to the outline. This is mild banding, and the living tree breaks it up better. Fix: make `W` the base tone and drop it from the centre column in rows 5-9. Use `v` for the left two columns and `w` for the right column, or add a single `w` knot at (6,6) to show a branch scar.

5. [MINOR] dead-tree (colour): the spec says "grey-brown", but the wood is the warm `vWw` ramp, identical to the living tree's trunk. A dead tree does not read as dead by colour alone. Fix: keep `v/W/w` for consistency, but use `d` (#5a3e24) for the shaded right side instead of `w`. This cools the right side slightly and separates it from the living tree.

6. [MINOR] dead-tree (size): the sprite is 13 tall against the captain's 9 and the living tree's 18, which is 1.4x the captain, and the notes only say the extra rows are for readability. If the fix for issue 3 grows the crown, the extra height is justified. Do not shrink below 13.

Checked and fine: the palette is only `k v W w` with no swap characters; light is from the top left, with `v` on the left and `w` on the right; the sprite is centred on column 6 and sits on the bottom row; the root flare is symmetric and steps evenly (1 px per row); the outline is 1 px `k` except where noted in issues 1 and 2.

Count: 0 blockers, 3 majors, 3 minors.
