# Review round 1: icons-treasure

Batch notes: the brief's folder rule says 8 x 8 but every family line says 16 x 16 fixed; all 27 sprites are 16 x 16, so size matches the family specs. Palette characters are all legal. Outline (k) is consistent across the set. Detail level is not: the coins, gems and idol are flat slabs, while the pearls, conch, mermaid scale and lantern are noisy.

## silver-coins: FAIL
1. [MAJOR] silver-coins (2,3)-(13,12): reads as a grey rock or loaf, not a stack of coins. Single flat top with no coin ellipse, and the stack edge is only banded rows. Fix: draw a visible top coin as a 10 x 3 oval (k outline, N/n face, 1 px M rim on the right), then below it 3 coin edges of 2 rows each, with a k line between coins and a 1 px offset of every second coin left or right.
2. [MINOR] silver-coins (11,4)-(12,6): n/M mix on the right face is muddy. Fix: use N on the face and M only on the right 1 px rim.

## gold-doubloon: FAIL
1. [MAJOR] gold-doubloon (2,3)-(13,12): same silhouette problem as silver-coins; reads as a gold bar or brick, not coins. Fix: same construction as silver-coins with Y/y/O, and offset the coins so the stack is clearly separate discs.
2. [MAJOR] gold-doubloon: silver and gold are identical shapes, so the set repeats one sprite. Fix: make the doubloons a taller stack of 4 edges with the top coin tilted showing a 2 px O emblem mark.

## pearl: FAIL
1. [MAJOR] pearl (0,1)-(15,13): reads as a ring, plate or donut, not an oyster shell. No hinge, no ridges, no shell lip; the pearl is a small k-outlined disc with a heavy black ring inside. Fix: draw a clam from slightly above: a bottom shell (C/c with 2 radiating ridge lines in c) and an open top shell behind it, with a 6 px round P/p pearl in the middle, 1 px k outline only on the outer silhouette.
2. [MAJOR] pearl (4,4)-(11,10): pearl has a full black outline plus a second inner black ring (row 4 kkkk, row 10 kkkk); this reads as an eye. Fix: drop the inner ring; a pearl is P with p shade at bottom right and a 1 px P glint at top left.
3. [MINOR] pearl (3,3)-(12,3): p band mimics the swap-colour sail cloth ramp for shell interior. Fix: use C/c/p only for the shell, keep to 3 tones.

## black-pearl: FAIL
1. [MAJOR] black-pearl (5,5)-(10,9): the pearl uses N/M greys, so it reads as a silver or stone ball, not a dark pearl. Fix: m base, M shade, K bottom, with one N glint at (6,6) and a faint n sheen at (7,7).
2. [MAJOR] black-pearl: same shell and ring problems as pearl (1, 2 there). Fix: same shell redraw.

## ruby: FAIL
1. [MAJOR] ruby (1,2)-(14,11): no facet structure. A flat lozenge split into vertical e / R / r bands that follow the left and right outline (banding). Reads as a pennant or heart. Fix: draw a flat table across the top 4 rows (e/E highlight), a crown with a diagonal split, and a pavilion triangle below with a darker r facet on the right; leave 1 px k lines only between crown and pavilion at row 5.
2. [MINOR] ruby (0,5) and (15,5): single k pixels stick out as spikes of the widest row. Fix: widen the shape by rounding rows 4-6 symmetrically, or remove the nubs.

## sapphire: FAIL
1. [MAJOR] sapphire (1,2)-(14,11): same flat banded lozenge as ruby. Fix: same facet redraw with L/l highlight, B base, b shade.

## emerald: FAIL
1. [MAJOR] emerald (1,2)-(14,11): same flat banded lozenge. An emerald cut should differ from the round gems. Fix: draw an octagonal step cut: stepped corners, a rectangular H/G table in the middle, and a lighter h frame around it, so the three gems have different silhouettes.

## diamond: FAIL
1. [MAJOR] diamond (2,3)-(13,10): body is P and p, which are almost the same near-white, so the inside reads as an empty outline; nothing sparkles. Fix: base L/l blue-white facets on the right and bottom, P highlight on the upper left facets, and a 3 px cross-shaped glint (P with y at the centre) at (3,3).
2. [MAJOR] diamond: same flat banded lozenge as ruby. Fix: same facet redraw.

## gold-ring: PASS
1. [MINOR] gold-ring (5,2)-(10,3): the stone is only 4 x 2 and sits as a floating pillow above the band. Fix: make it 4 x 3 and seat it on the band with prong pixels in Y.

## necklace: PASS
1. [MINOR] necklace (4,9)-(11,13): the pendant has no gold setting; it hangs below a flat k bar. Fix: add a y bezel at (5,9) and (10,9).

## chalice: PASS
1. [MINOR] chalice (2,1)-(13,2): the cup shows no opening, so it is slightly flat for the front-from-above view. Fix: make row 2 a 10 px O/o rim ellipse.

## candelabra: PASS
1. [MINOR] candelabra (0,3)-(14,15): the sprite uses columns 0-14 and is 1 px left of centre. Fix: shift everything right 1 px if the left outer candle can keep col 1.

## golden-idol: FAIL
1. [MAJOR] golden-idol (2,1)-(13,14): the only shade tone O appears on 2 pixels (6,6),(7,6), (7,13),(8,13); the right side and underside of the head use y, so the head is a flat yellow slab with no light. Fix: add O on the right column (cols 11-12 rows 3-9), under the brow (row 5) and on the right of the body.
2. [MAJOR] golden-idol (4,10)-(11,13): body is a 4 row stub under an 8 row head, so it reads as a mask on a pedestal, not a statue. Fix: reduce the head to 6 rows (rows 1-6), and give the body 6 rows with shoulders, a belly and two stubby legs or a seated base.
3. [MINOR] golden-idol (4,8)-(11,8): teeth alternate P and k and read noisy. Fix: use 3 wider teeth, 2 px each, P.

## jeweled-crown: PASS
1. [MINOR] jeweled-crown (0,2)-(15,5): the three spikes are identical flat-topped pillars, so the crown looks crenellated. Fix: make the centre spike 1 row taller and give the spikes 1 px y tips with a pearl pixel (P) on top.

## ancient-coin: FAIL
1. [MAJOR] ancient-coin (0,2)-(15,12): reads as a bread roll or a football with a plus sign, not a coin. It is a flat oval with no rim thickness, and the cross in J reads as scoring on bread. Fix: draw a round 12 x 12 disc with a visible 1 px rim, a lower edge showing thickness, and an off-centre worn mark such as a 3 px crown or an arc instead of a centred cross.
2. [MAJOR] ancient-coin: bronze is drawn with the wood ramp (V v J), which breaks the rule that the same materials use the same ramps. Fix: use the brass ramp o/O with y for the rim highlight, plus K for deep wear.

## jade-figurine: PASS
1. [MINOR] jade-figurine (1,7)-(14,7): the full-width k row splits the frog into two pieces and touches both outer edges. Fix: shorten the mouth line to cols 3-12 so it stays inside the head.
2. [MINOR] jade-figurine (3,10),(12,10): G leg marks mirror each other so the light direction is lost. Fix: keep the left one as h/H and shade only the right one.

## lucky-charm: FAIL
1. [MAJOR] lucky-charm (1,2)-(14,12): reads as a horseshoe magnet: parallel straight arms, a 2 px gap, and a tight U. A horseshoe is a rounded arch with a wider gap. Fix: open the gap to 4 px (cols 6-9), bow the outer sides outward by 1 px at rows 6-9, and make the base a round curve.
2. [MINOR] lucky-charm (3,4),(3,6),(12,4),(12,6): only 2 nail holes per arm and they sit in the shadow column. Fix: put 3 holes on each arm in the base-tone column.

## kraken-ink: FAIL
1. [MAJOR] kraken-ink (4,7)-(11,15): the pot reads as a flat dish or plate, with no neck or mouth, 16 x 8. Fix: draw a jar 10 wide x 8 tall, a 6 px neck with a rim, body in C/c.
2. [MAJOR] kraken-ink (7,6): the quill ends at (7,6) above the rim and does not enter the pot; the purple window (5,9)-(10,10) is an inset box on the front, not the ink in the opening. Fix: show the ink as a Z/z ellipse in the opening at the top of the jar and put the quill tip into it.

## mermaid-scale: FAIL
1. [MAJOR] mermaid-scale (1,2)-(14,12): reads as a spiral shell or a cabbage, not a scale. It is a round disc with concentric arcs and mixed i/I pixels (muddy clusters, e.g. (3,5),(3,6),(4,7)). Fix: draw a fan or teardrop scale with the point down, 3 clean concentric ridge arcs (1 px i on I base), and one l iridescent edge on the lower right.
2. [MAJOR] mermaid-scale (14,5)-(14,10): the l column runs along the outline (banding). Fix: limit the blue sheen to a 3 px crescent at the bottom right.

## ghost-lantern: FAIL
1. [MAJOR] ghost-lantern (6,6)-(9,11): the flame is a diamond with a K corner ring and i/I gradient, which is pillow shading and does not read as a flame. Fix: draw a 3-wide teardrop flame (pointed top) in I with an i edge, centred in the glass, on a plain K background.
2. [MAJOR] ghost-lantern (3,2)-(12,3): the handle is a wide 10 px rectangle as wide as the body, so it looks like a bucket or briefcase. Fix: make the handle a 6 px arch (cols 5-10) rising 2 rows over the cap.

## cursed-skull: PASS
1. [MINOR] cursed-skull (13,11): the jaw bulges 1 px on the right (k at col 13 while rows 10 and 12 end at col 12). Fix: move the X at (11,11),(12,11) in by one and the k to col 12.

## siren-conch: FAIL
1. [MAJOR] siren-conch (0,0)-(15,14): reads as a garlic bulb or onion. No spiral whorl lines on the shell, and the pink opening is a big rectangle-like blob with a ragged k outline (rows 8-11, cols 3-5 and 11-13). Fix: draw 2 diagonal whorl ridge lines in D across the body, an elongated oval aperture with a flared lip in F, and the pink E/e inside only.
2. [MINOR] siren-conch (0,8),(15,8): the shell hits the outer columns 0 and 15 at row 8 and forms spikes. Fix: reduce the width of rows 8-9 by 1 px per side.

## trident-shard: PASS
1. [MINOR] trident-shard (1,3),(2,3),(13,3),(14,3): outer prong tips are flat 2 px. Fix: 1 px tips at (1,3),(14,3) with the highlight below.
2. [MINOR] trident-shard (5,14)-(10,14): the cut base is straight, so it does not read as broken. Fix: stagger the bottom row with a 1 px k notch at (7,13).

## storm-glass: PASS
1. [MINOR] storm-glass (7,6)-(10,10): the bolt tail is wobbly: (8,9),(8,10) vertical after a 2 px step. Fix: make the bolt a clean zigzag, 2 px per row down-left, ending in a point at (7,10).

## treasure-map: FAIL
1. [MAJOR] treasure-map (7,5)-(14,9): the red mark is a lopsided squiggle: 7-8 / 11-12 at the top, 9-10 in the middle, then 9-12 and 13-14 at the bottom. It does not read as an X. Fix: draw a clean 5 x 5 X in R centred at (9,7), legs 1 px wide with 1 px thick centre, and keep the dotted path D separate.
2. [MINOR] treasure-map (14,8),(14,9): right-edge X shade stops after row 7 and the red touches col 14; the top-left corner is cut but the top-right is not. Fix: continue X shading to row 12 and make both top corners cut.
3. [MINOR] treasure-map (1,2)-(15,12): spans columns 1-15, so it sits half a pixel right of centre. Fix: shift left 1 px.

## bottle-message: FAIL
1. [MAJOR] bottle-message (6,6)-(9,11): the message is a white p/C diagonal smudge and does not read as a rolled scroll. Fix: draw a 3 x 5 horizontal-ish roll with k-free p face, a C end cap and a 1 px R tie at the middle.
2. [MINOR] bottle-message (7,1)-(7,4): the neck is only a 1 px cork stick; there is no glass neck and no lip. Fix: cork 2 rows (D/F), glass neck 2 rows in g/G with 1 px h highlight, then shoulder.

## sea-chart: PASS
1. [MINOR] sea-chart (4,4)-(11,10): the water is an almost flat 6 x 5 B area. Fix: add 2 l wave pixels at (5,9) and (9,5).
2. [MINOR] sea-chart (0,2)-(15,13): the two end rolls are much taller than the map, so it reads as a picture between pillars. Fix: make the map 1 row taller on each side or reduce the rolls by 1 row.
