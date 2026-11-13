# Supplies — current review round 1

Independent review by root, who has drawn no source sprites. Read STYLE.md, BATCH-REVIEW.md, CRITIC.md, brief.md, all nineteen sources and notes, and the approved reference. Opened the entire sheet-1.png and checked every icon enlarged and in both slot contexts. All ten critic criteria checked for every family. All canvases are exactly 8x8, all palette characters are legal, and no earlier current-session reviews exist.

## rations: PASS

The stepped square biscuits, top perforation and broad layered faces identify hardtack without texture noise. F/f/D gives three coherent tan tones. Closed outline and upper-left light match rum's chunky scale.

## salted-pork: PASS

The diagonal ham has a broad meat lobe and exposed bone at the narrow end. E/e/R stays within three meat tones; the white bone is attached and enclosed. Clear silhouette and consistent light.

## fruit: PASS

The overlapping orange and green fruit retain distinct round forms. Their left/top highlights and lower shadows use two orange and three green tones. The outline separates the objects cleanly at 1x.

## water: PASS

The curved barrel silhouette, visible lid and two iron hoops read as a small water barrel. Three wood tones and two metal tones are restrained and consistent; outline closes on every edge.

## grog: PASS

The tankard's pale drink surface and open right handle distinguish it from a barrel. The handle opening stays transparent, wood is lit from the left, and the compact silhouette reads unchanged at 1x.

## medicine: FAIL

1. [MAJOR] medicine (1,4) G and (6,4) h, repeated through the neck/shoulders/body: the bottle's left side is darker than its right side, reversing the binding top-left light. Fix: swap every G and h in this sprite (G -> h, h -> G), leaving the cork, label, red cross and outline unchanged. This creates a connected light left edge and dark right glass. Update the notes' incorrect dark-left rationale.

## fish: PASS

The silver-blue oval body, attached forked tail and dark eye read as one fish. The lit upper back and blue lower flank are coherent. Transparent padding suits the horizontal object; it is not a standing prop.

## cannonball: FAIL

1. [MAJOR] cannonball (3,4) k and (4,4) M through row 6: the lower balls have unequal geometry (two interior columns on the left, three on the right), and the continuous row-7 base fuses their lower arcs. This violates symmetry apart from lighting and makes the right ball a broad block. Fix with equal four-pixel lower balls and independent rounded bottom edges: rows 0–7 `...kk...` / `..knMk..` / `..kMMk..` / `.kkkkkk.` / `knMkknMk` / `kMMkkMMk` / `kmmkkmmk` / `.kk..kk.`. Keep the top ball centred; inspect the resulting three-ball pyramid at 1x.

## chain-shot: PASS

Two separated round iron weights are joined by a continuous diagonal chain. The chain pixels have physical purpose and the small upper-left reflections stay attached to their balls. Three iron tones, closed outer edges and clear diagonal silhouette.

## grapeshot: PASS

The gathered canvas ammunition bag has a distinct tied neck and broad pale pouch. Three cloth tones model its left light and right shadow without stippling. The closed bag need not expose individual pellets at this scale.

## heated-shot: PASS

The red-hot ball is a compact round silhouette with e/R/r light and cooling shadow. No halo or arbitrary sparkle; its material is immediately distinct from ordinary ammunition.

## mortar-shell: PASS

The black bomb has a visible short fuse and one deliberate flame point. Three iron tones and a closed round outline remain readable on both slot backgrounds. The flame is a physical tip, not stray texture.

## pistol-shot: PASS

The small leather pouch has a grey opening containing shot, a gathered upper neck and restrained J/j leather shading. It remains distinct from the pale grapeshot sack without noisy individual pellets.

## planks: PASS

Broad offset timber layers and cut ends show stacked planks. V/v/W is three tones, the long straight planes are coherent physical surfaces, and the closed outline reads at 1x.

## iron-bars: PASS

The stepped ingot stack matches the resource set's scale while N/n/M clearly separates metal from wood. Three tones, clean layer edges and top-left lighting.

## canvas: PASS

The broad pale roll and enclosed right curl show one canvas bolt. p/C/c is three tones, the curl is physical, and no unnecessary interior outline divides the cloth face.

## rope: PASS

The compact coil has a clear dark centre and a connected light upper-left arc. f/D/d forms three coherent tones without alternating texture or speckled highlights.

## tar: FAIL

1. [MAJOR] tar (1,4) N: the same iron pail uses N, n, M and m, exceeding three tones per material. Fix: (1,4) N -> n. The connected n rim still carries the upper-left light; keep M on the right and m on the pail body. K tar and tan brush remain unchanged.

## brass: PASS

The brass fitting has a clear central bore and stepped outer corners. y/O/o is three tones with a connected upper-left light; the outline encloses all physical metal edges. Reads as a fitting at 1x.
