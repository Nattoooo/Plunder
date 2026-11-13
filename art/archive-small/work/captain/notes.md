# captain — notes

## Size: 7 x 9 (spec 6 x 9, flexible) — superseded in Round 1: now 9 x 9, body still 7 wide

Height kept at 9 so the scale reference (door ~8 px plus hat, tree ~2x, crate to the waist) is unchanged.
Width grew by one pixel. With 6 px and a 1 px outline the face has only 4 interior pixels, so the eyes
either touch each other or touch the outline and vanish. 7 px gives a centre column: the face reads
`skin eye skin eye skin`, the tricorn's front point and the open-coat shirt line both sit on that centre,
and the figure is exactly symmetric about it.

## Shared parts (every frame)

- Rows 0-2, hat. Black felt in `K` with the `k` outline as its edge. Gold trim `y` (lit, left) / `O` (shaded, right).
  From the front the trim runs from the two upturned side corners (row 1) down to the front point (row 2, centre),
  which is what makes it a tricorn rather than a cap. From behind the visible edge is the straight back brim
  between the two rear corners, so the trim is one flat row and the crown fills row 1. In profile the upturned
  rear corner is the single gold pixel at the back (row 1, left) and the brim slopes down to the front.
- Rows 3-4, head. Front: eyes are single `k` pixels directly under the brim with skin between and either side;
  right cheek and right of the chin in `S` (light from top left). The chin row is narrower than the eye row, so
  the head tapers into the shoulders. Back: hair `J`, shaded `j` on the right, tied in a queue (`j`, centre)
  that hangs one pixel onto the coat collar. Side: hair at the back of the head, one eye, the nose as the skin
  pixel in front of the eye; chin shaded `S` underneath.
- Rows 5-6, red coat `R` with the right side in shadow `r`. Front: the coat hangs open over a white shirt `p`
  down the centre line. Side: the shirt shows at the chest front only (row 5). No belt or buttons: they turned
  the 5 px torso into noise in tests.
- Row 7, front/back: hands `s`/`S` at the coat hem on each side (arms hang the length of the coat), navy
  trousers `B` (lit leg) and `b` (shaded leg) separated by a `k` crotch line.
- Row 8, boots: the bottom-row `k` pixels are the black boots (no room for a separate boot tone plus outline).

## Frames

- captain-down-1: standing, both boots on the ground, both hands at the hem.
- captain-down-2 (left foot forward): the character's left leg (screen right) is planted; the right leg (screen
  left) is lifted, so its boot moves up to row 7 and its trouser pixel is hidden under the coat. Opposite arm
  swing: the right hand (screen left) swings forward and rises to row 6; the left hand swings back behind the
  body, revealing the coat tail `r` at the hem.
- captain-down-3: exact mirror of down-2 with lighting re-applied (left side lit, right side shaded).
- captain-up-1: back view standing. Same body and legs as down-1; no shirt, hair and queue instead of face.
- captain-up-2 (left foot forward, walking away): the right leg (screen right) is the one lifting, and the right
  arm swings forward away from the camera, so it uses the down-3 lower body; queue unchanged.
- captain-up-3: mirror case, uses the down-2 lower body.
- captain-side-1: facing right. Body is 3 px deep. Coat tail flares one pixel behind the hips (row 7, left),
  hand hangs at the hip, legs `B` (near) and `b` (far) side by side, boot row extends one pixel past the front
  leg as the toe.
- captain-side-2: mid-stride. Head, hat, coat tail unchanged. The hand swings forward to the coat front (row 6),
  legs split with a `k` gap, rear boot under the back leg and front boot reaching two pixels forward so the step
  reads at 1x.

## Round 1

Size is now **9 x 9**. Height unchanged (9), so the scale against the approved cottage door and tree is the same.
The body, head and feet are still exactly 7 px wide (cols 1-7) and the feet occupy the same cells, so the ground
footprint is unchanged. Only the tricorn's two raised wings use cols 0 and 8. See issue 1 for why.

1. [MAJOR] Tricorn reads as a box: **fixed, by widening the hat to 9 px.** I tried the suggested 7 px rows first.
   `kyk.kOk` leaves gold and the `K` crown with no outline above them (outline rule), and every 7 px peak
   version I tried (corners 2 px wide, 3 px dip) read as horns or a crown, because the wings were no wider than
   the face. The critique allowed 9 px if a wider brim was the only fix, and it was. Rows 0-1 are now 9 wide:
   upturned wings at each side (`kk` peaks, gold `y`/`O` at the corner), a notch, then the crown dome
   (`K`, outlined on top) between them. Row 2 is the 7 px front brim with the trim running from each wing
   corner diagonally down onto it. Black silhouette, rows 0-2: `##.###.##`, `#########`, `.#######.`, so the
   wings peak above the crown on both sides and the hat narrows down to the head. Back view uses the same
   wings and crown. Side view raises the rear wing (`kk.` at the back, cols 0-1) and pushes the front of the
   brim one pixel past the nose (`O`,`k` at cols 7-8, row 2).
2. [MAJOR] Hands at ankle height: **fixed.** Standing hands are on the cuff row 6 (`ksRpRSk` front,
   `ksRRRSk` back) and the skin no longer touches any boot pixel. Side-1 hand is at (4,6), mid-body at the
   hip, and the cell that was skin at the hem is now coat. Walk frames: the forward-swinging hand rises to
   row 5 at the shoulder side and the back-swinging hand disappears into the coat, as asked. Everything
   else in each frame is identical to its standing frame. Side-2 keeps the hand at the coat front (5,6),
   so the stride still swings it forward compared with side-1.
3. [MAJOR] Trousers and boots don't read: **fixed for the trousers; boots are outline-only.** The coat now
   ends at row 6, which leaves room for each leg to be 2 px wide (`kbbkbbk`), and both legs are flat navy `b`,
   so the lit leg no longer looks like jeans. Boots: there is no row below the feet for an outline, so a `K`
   boot on row 8 would leave its bottom edge open. The boots are therefore the `k` pixels of the bottom
   row, aligned exactly under each trouser leg. They read as black boots against the navy, not as part of
   the outline.
4. [MINOR] Orphan cheeks: **fixed.** The chin row is now `kssssSk`, so the cheek pixels (2,3)/(6,3) join
   the skin below and the eyes are the only dark pixels inside the face. Checked at 1x: the two eyes read.
5. [MINOR] Walk frames, base and lifted leg: **fixed.** The lifted leg keeps one trouser pixel (inner column)
   and a 1 px boot under it, instead of disappearing into a black bar. The planted leg is the full 2 px leg
   and boot. The base now changes by one pixel between frames instead of jumping sideways. Up-2/3 use the same
   lower bodies mirrored.
6. [MINOR] Side boots a flat slab: **fixed.** Side-1 row 8 runs from one heel pixel behind the legs (under
   the coat tail, where it also closes the outline) to a toe reaching two pixels past the front leg. Side-2's
   front boot has the same two-pixel toe, and the rear boot sits under the back leg.
7. [MINOR] Back trim reads as a headband: **fixed.** From behind, the gold is only at the two raised rear
   corners. The back brim edge (row 2) is black, with the crown between the corners.
8. [MINOR] Dark `r` column merges with the outline: **fixed.** The coat body is all `R`. Its right edge stays
   red against the outline, and the shading on the right comes from the `S` hand and cheek. With the coat
   now ending at row 6 there is no hem row, so `r` is no longer used.
9. [MINOR] Width: **noted.** I may not edit specs.json, so this note states it instead: the captain sprite is
   9 x 9, with a 7 px wide body and feet. Measure doors, crates and tree widths against the 7 px body. Measure
   against the 9 px width only where the hat brim matters, such as clearing a door frame.

## Round 2

Size unchanged: 9 x 9, body and feet 7 wide (cols 1-7), as instructed to keep the footprint.

1. [MAJOR] Hat reads as ears/horns: **fixed as suggested.** Rows 0-2 are now `k..kkk..k`, `kykKKKkOk`, and a 9 px brim
   (`kyyyyyyOk` front, `kykkkkkOk` back). The corner gold connects orthogonally to the brim, which now sweeps wider
   than the head. Side: rear wing `k..kkkk..`, black rear brim, gold only along the front brim (`kykkyyyOk`).
2. [MAJOR] Swinging hand merges with face: **fixed.** Down-2/3 row 5 is plain coat; the near hand stays at the cuff
   (6), the other is hidden. Up frames unchanged.
3. [MAJOR] Width vs door: **not fixable inside my family.** I may not edit specs or the cottage. The body cannot
   be 6 wide while keeping a centre column for the eyes, and I was told to keep the footprint. Decision for the
   coordinator: widen the door to 7 px, or measure doors against the 7 px body.
4. [MINOR] Front chin taper: **not done.** With eyes at cols 3/5, cheeks at 2/6 need skin below them; a tapered chin
   orphans them (the Round 1 issue 4 regression). The back view's taper is hair, not face.
5. [MINOR] Lifted leg: **kept.** Raising the boot to row 7 merges it into a black bar with the outline (Round 1
   issue 5); the 1x/3x context shows the step.
6. [MINOR] Side-2 coat tail: **fixed.** Row 7 is `.kRRbkbk.`, two coat pixels as in side-1; rear leg moved to col 4.
7. [MINOR] Side boots: **fixed.** Side-1 row 8 `..kkkkk..` (toe stops at the outline column); side-2 `...kk.kk.`.
8. [MINOR] Flat coat: **accepted.** Any `r` pixel touches the outline and reads black at 1x (Round 1 issue 8); the
   light direction is shown on the hat, hair and skin.

## Round 3
Still 9 x 9, 7 px body (door/scale decision belongs to the coordinator). Row 0 is now `kk.kkk.kk` (side `kk.kkkk..`) closing the wing outline; front trim centre is `O`; back head row 4 widened to match the front jaw; side face has a nose pixel at (7,3) with `k` at (8,3); side-2 row 8 `..kkk.kk.` closes the coat tail.


## Current batch redraw
The 9 px-wide draft violated the current one-pixel size tolerance. Redrawn at **7 x 9**, with a **5 px outlined torso and 3 px inner body**, instead of modifying any approved door or specification. The tricorn is a broad black felt brim with two raised corners, a black crown and only three gold trim pixels; the centre trim is the downward front point. The rear brim is black rather than a gold headband. The side brim projects beyond the face.
The small face is a flat three-pixel skin cluster and one-pixel neck: deliberately no eye dots competing with the hat at this scale. Hair and queue replace skin from behind. The white shirt is confined to the front opening. Hands sit at row 6 under a red sleeve, never beside the face or ankles. Navy trousers end in separate black boots. Walk frames raise one foot and hide the opposite hand; all hat/head/shoulder pixels stay identical within each view. Profile stride moves only the hand and legs. Skin, hair and gold carry top-left lighting; the red coat stays flat to avoid a dark unreadable right edge.
Earlier oversized suggested pixel edits were superseded by this proportional redraw. Hat/door scale, cuff-height hands, navy trousers, separate boots and profile coat outline are retained as requirements.

## Batch round 1
Redrawn 7 x 9 (hat, head, body all 7 px, no overhanging wings) to answer the scale and ear-like-wing points; gold is only the two brim corners; hand moved to row 6 in back views; side-1 feet split.

## Batch round 1
- Door scale (issue 1): the captain stays 7 x 9; widening the building doors is outside this batch and is left to the houses families.
- Hat: raised side corners with gold on them, gold front point (front), gold at rear corners only (back); side hat uses the same logic (rear corner gold, front point gold).
- Face: brim now has its own row, forehead row 3, eyes on row 4 with skin around them, collar p is the chin.
- Hair: speckle removed, only right column j and the queue remain.
- Walk: lifted-leg frames kept as accepted. Side-1: single heel plus toe pair so only one boot sits under the coat tail.

## Batch round 2
- Door scale (issue 1): the review states the captain sprites need no change and must not shrink; the fix is widening the doors in the house families, which are outside this batch, so the captain grids are untouched (still 7 x 9).
- Side hat gap (issue 2) and lifted-leg trouser (issue 3): kept as the review advises.
