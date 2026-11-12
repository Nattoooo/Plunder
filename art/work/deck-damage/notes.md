# deck-damage

## damage-crack (5 x 5, fixed)

- **Split (`w`, dark wood, a 1-2 px diagonal):** a crack running from top-left to bottom-right through the plank, stepping one column per row so the diagonal is even. It is drawn as a diagonal rather than a vertical, so it does not line up with the plank seams and reads as damage, not as a seam.
- **Splinters (`V`, lightest wood, two pixels):** the raw, broken fibres of the wood showing on the upper-right edge of the crack. The light reads as fresh wood. There are two, so the edge looks splintered rather than cut.
- **Transparent elsewhere:** nothing is drawn on the planks around the crack, so the deck shows through.
- **No outline:** it is an effect laid over the deck, as STYLE.md requires for effects.

## damage-hole (5 x 5, fixed)

- **Water (`a`, deep water, 3 x 3 centre):** the hole shows dark water. One tone only, so it reads as depth and not as a surface with glints.
- **Rim (`w`, dark wood, a 1 px ring):** the broken edge of the deck. It is the darkest wood, so the water sits inside a clear frame.
- **Corners transparent:** the rim is rounded by leaving the four corners out, so the hole reads as a round-ish pit, not a square cut-out, and the planks show around it.
- **No outline:** as above, an effect.
