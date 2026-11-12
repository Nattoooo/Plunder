# Drawing a sprite family

You draw one family of Plunder sprites (a sprite plus its animation frames or variants). Work from /home/user/plunder.

1. Read `art/STYLE.md` fully. It is binding.
2. Read your family's spec: `families.<family>` in `art/specs.json` (each sprite's name, description, size, and whether the size is fixed), and `notes.<folder>` there for the folder's rules.
3. The style reference is the pilot set. Open these previews with the Read tool and match their outline, lighting, shading, level of detail and proportions exactly: `art/work/captain/preview.png` (scale reference for everything on land), `art/work/house-cottage/preview.png`, `art/work/tree/preview.png`, `art/work/deck-planks/preview.png`, `art/work/rum/preview.png`. Also check `art/APPROVED.md` for anything else approved in your folder and match it too.
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

When you are asked to revise, you may be a fresh agent: read your family's `notes.md` and every `critique-*.md` in `art/work/<family>/` first. Then read it, fix every BLOCKER and MAJOR, and fix each MINOR unless you have a solid reason not to. Add a `## Round N` section to notes.md answering each point (fixed, or why not). Re-render, check the preview, then reply `READY <family>`.

Only touch files for your own family. Don't edit STYLE.md, specs.json or the tools. Don't commit.
