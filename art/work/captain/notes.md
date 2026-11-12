# captain — notes

## Size: 7 x 9 (spec 6 x 9, flexible)

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
