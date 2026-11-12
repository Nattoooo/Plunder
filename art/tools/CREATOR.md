# Drawing a sprite family

You draw one family of Plunder sprites (a sprite plus its animation frames or variants). Work from /home/user/plunder.

1. Read `art/STYLE.md` fully. It is binding.
2. Read your family's spec: `families.<family>` in `art/specs.json` (each sprite's name, description, size, and whether the size is fixed), and `notes.<folder>` there for the folder's rules.
3. Read `art/APPROVED.md`. For approved families in your folder (and the captain, for scale), open `art/work/<family>/preview.png` with the Read tool and match their style.
4. Draw every sprite in your family in `art/src/<family>.txt`:
   ```
   == sprite-name
   ..kk..
   .kRRk.
   ```
   One block per sprite, one character per pixel, palette characters from STYLE.md only, `.` for transparent. Lines starting with `#` are comments.
5. Render: `python3 art/tools/px.py <family>`. It checks sizes and palette, writes the PNGs and `art/work/<family>/preview.png` (zoomed with a pixel grid, plus in context at 1x and 3x next to the captain when one exists). Families with several sprites also get `family.png` showing them side by side.
6. Open the preview with the Read tool and judge it as harshly as a lead artist would. Iterate until you can defend every single pixel.
7. Write `art/work/<family>/notes.md`: per sprite, what each detail represents and why it sits where it does; any size change and why.
8. Reply with exactly one line: `READY <family>`.

When you are sent a critique file: read it, fix every BLOCKER and MAJOR, and fix each MINOR unless you have a solid reason not to. Add a `## Round N` section to notes.md answering each point (fixed, or why not). Re-render, check the preview, then reply `READY <family>`.

Only touch files for your own family. Don't edit STYLE.md, specs.json or the tools. Don't commit.
