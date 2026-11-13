# Batch props-small, review round 2

Only the families that failed in round 1 are reviewed. barrel, dig-spot, x-mark, waypoint and dock-planks passed in round 1 and are not listed again.

## chests: PASS
Round 1 issues: locked-chest padlock fixed (rows are now `kMnMnMk` / `kvNkNWk` / `kvMMMWk`: two separate steel shackle legs on the band row, dark `M` between them, keyhole at (3,3) clear of the outline, iron base below). It reads as a padlock hanging from the band at 1x. chest clasp and gold-chest were MINOR and are unchanged, as directed. Fresh look: outline, top-left light and the wood/iron/gold ramps match the approved set. No new problems.

## crate: FAIL
Round 1 issues: crate seam is fixed (now `W`, no longer merges with the outline). lost-cargo flag is NOT fixed. The size is now 6x9 and the full crate body is back, but the flag still does not read as a flag on a pole.
1. [MAJOR] lost-cargo (0,0)-(5,3): the flag is still a red block sitting on the crate lid, not a flag rising from it. The pole is only 2 px tall (`W` at (1,1) and (1,2)) and is walled in by outline: a full-width cap `.kkkk.` on row 0, `k` at x=0, `k` at x=4 and a full outline row `kkkkkk` on row 3 directly above the crate. The flag `RR/Rr` is therefore enclosed in a box, with no transparent gap to its right (x=5 on rows 1-2 is empty, but the outline at x=4 closes the shape). The top 4 rows read as a second small crate stacked on the first, with a red label; the silhouette is a stepped box, not a pole and a pennant. At 1x on sand and on water the sheet shows a red-fronted double box. The round 1 requirement (pole visibly rising above the crate, flag hanging free to its right as on waypoint) is not met. The notes claim the pole "stands three px above the crate", but only 2 px of `W` are above the crate outline, and the flag fills that height. Fix: make the sprite 6x12 (spec 6x7, flexible) and put the pole and flag above the unchanged 6x6 crate. Rows 0-5 (pole at x=1, flag hangs to its right, column 5 transparent on every flag row, the pole at least 3 px of `W` visible below the flag's outline):
   `.kk...`
   `kWkkk.`
   `kWRRk.`
   `kWRrk.`
   `kWkkk.`
   `kWk...`
   Rows 6-11: the crate exactly as in `crate` (`kkkkkk` / `kVVVVk` / `kvvvWk` / `kWWWWk` / `kvvvWk` / `kkkkkk`), with the pole's base at (1,5) sitting on the crate's top outline. If 12 rows is judged too tall, drop the lowest pole row (`kWk...`) for 6x11, but not more. The requirements are: flag outlined only on its own sides, a transparent column to the flag's right, the flag narrower than the crate, and the pole visibly rising from the crate.
2. [MINOR] lost-cargo notes: the crate/flag text says three rows above the crate for the pole; correct it to the real height once redrawn.

## bottle: PASS
Round 1 issues: silhouette fixed (1 px tan cork `D` inside a 1 px neck, shoulders step out to a 3-wide glass body, 5x7), cork is tan, not leather. Reads as a corked bottle with a scroll at 1x on sand and water. Fresh look: `h` glint on the lit left and `x` paper are deliberate details; outline is consistent. No new problems.

## quest-mark: PASS
Round 1 issue fixed: 4x7 with a `k` outline, 2 px stroke (`y` lit, `O` shaded) and a 2 px dot with a shared gap row. It now pops on sand and on water. Fresh look: top-left light correct, no orphan pixels, symmetric in outline.
