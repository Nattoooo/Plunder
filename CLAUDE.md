# Plunder

## Wiki

The game has a plain-HTML wiki published as a claude.ai artifact titled "Plunder Wiki" (find it with the Artifact tool's `list` action).
It is generated from the game's own data by `wiki/build.ts`. Guide text lives in `wiki/pages/*.html`, where `{{tokens}}` pull numbers and tables from the game.

Whenever a change adds, removes or meaningfully changes game content (items, ship parts, keels, crew, buildings, enemy ships, creatures, mechanics, controls or art), update the guide pages if the wording is affected, then regenerate and republish to the same artifact URL:

```bash
npx tsx wiki/build.ts <out-dir>
```

Publish `<out-dir>/index.html` as the page, with every other generated `.html` file as `files` (root = `<out-dir>`), passing the existing artifact URL so the link stays the same.
