# chests (batch props-small)

- chest 7x6: lid is a lit band (V) with a v shade on its right edge, so the light comes from the top left. The gold strap (O) on the lid seam marks the lid line; the clasp (y) is the one bright gold pixel, dead centre on the strap. Body is v with a W shade down the right side. 1 px k outline on the silhouette.
- locked-chest 7x6: same chest. The iron band (M) takes the lid seam. The padlock hangs from the band: two steel shackle legs (n) stand on the band row either side of a dark band pixel (M), the lit lock body (N) carries a dark keyhole (k) in its top row, clear of the outline, and an iron base (M) closes it.
- gold-chest 7x6 (spec 7x5, one row more): the extra row lets the heap read as overflowing. A dome of three coins (Y y O, lit top left) sits on a five-coin pile (y y y O O), then the lit rim (V) and body. Five rows left the heap one pixel high.

## Batch round 1

- [MAJOR] locked-chest padlock: fixed. The shackle legs (n) are now two separate steel pixels on the band row (`kMnMnMk`), with a dark band pixel between them, so the lock no longer merges into the band. The keyhole moved up to (3,3) and no longer touches the bottom outline; the iron base (`kvMMMWk`) sits below it.
- [MINOR] chest clasp: left as drawn. The review calls it acceptable and asks for a change only if the strap is touched; the strap is unchanged.
- [MINOR] gold-chest: unchanged, as the review asks; it ships as is.
