# cutlass-swing

- Blade on the diagonal, pointing up and right. Each row moves exactly one pixel left, so the edges step a clean 1-1-1.
- Light steel edge (N) on the top-left, mid-steel body (n) between, and a dark back (M) on the lower-right edge of the lower half only, where the blade turns away from the light.
- The blade is 1 px at the tip (row 0), 2 px in rows 1-2, and 3 px (N n M) from row 3 down, so it narrows to a point inside the canvas.
- A brass guard (O) crosses the base of the blade perpendicular to it, at (0,6), (1,7) and (2,8). A dark leather grip (j) at (0,8) continues the blade's line past the guard.
- No outline: it is an effect.

## Batch round 1
1. Shape: the blade is a tapered point with a brass guard and grip at the bottom left, the parts the approved cutlass icon has.
2. Clipping: the tip is a single pixel at (7,0), and the hilt is complete at (0,8) and (2,8). Nothing runs off the canvas.
3. Banding: N is the 1 px top-left edge and n the body. M appears only as the lower-right edge in rows 3-6, not as full-length stripes.
4. Curve: not added. The approved cutlass icon's blade is straight, and a curve would need uneven steps that break the clean 1-1-1 diagonal.
