# Plunder

A top-down pixel-art pirate sandbox that runs in the browser. Start on a raft with nothing but a patched sail, then build a warship, hire a crew, hunt treasure, buy islands and carve out a name across a 1,000 × 1,000 mile ocean.

The game currently runs fully offline (single player, saved in the browser). The world, time of day, wind and weather are deterministic, so every player will share the same ocean when online play arrives.

## Play

```bash
npm install
```

```bash
npm run dev
```

Open the printed URL. To produce a static build in `dist/`:

```bash
npm run build
```

## Controls

| Key | Action |
| --- | --- |
| W / S | Draw (raise) or furl the sail: Furled → Half → Full |
| A / D | Turn the sail to steer. The ship holds its heading until you turn again |
| Hold left mouse | Fire every cannon that bears on the cursor |
| R | Swap ammunition (round, chain, grape, heated shot) |
| Right-click | Set a waypoint |
| Q | Toggle rowing (needs manned oar benches) |
| X | Drop / raise anchor |
| E | Interact: dock, go ashore, salvage, open chests, dig, claim islands |
| F | Board a crippled, slow or surrendered ship |
| 1 – 5 | Crew orders: Sail, Battle, Repair, Board, Rest |
| Mouse wheel | Zoom (a Spyglass lets you zoom further) |
| M / Tab | World map |
| I / C / J | Hold, Crew, Journal |
| Esc | Menu |
| F3 | Performance overlay |

On foot: WASD to walk, left-click to attack, E to interact.

## What's in it

- **World**: 1,000 × 1,000 miles generated from one fixed seed. Five seas (Emerald Shallows, Coral Expanse, Frostreach, Ashen Reach, Mistveil), danger rising toward the edges, ten island types (tropical, jungle, atoll, crag, sandbar, volcanic, glacier, swamp, skull isles, sea stacks), coral reefs that scrape your hull, ice floes, thousands of ports with towns, docks and forts.
- **Sailing**: wind direction and strength change over time. Square sails love a following wind, lateen rigs cope better upwind, oars ignore the wind entirely. Day/night cycle, rain, storms with lightning, and fog.
- **Ship building**: a grid shipwright with 25 components (4 hull materials, 4 sail rigs, oars, rudder, helm, 5 weapons, quarters, holds, galley, powder magazine, workshop, sick bay, crow's nest, ram, figurehead) and 6 keel sizes from Raft to Man-o'-War. Speed, turning, cargo and crew space all come from what you build.
- **Crew**: 15 roles (Deckhand, Helmsman, Gunner, Master Gunner, Powder Monkey, Carpenter, Surgeon, Cook, Navigator, Lookout, Boatswain, Quartermaster, Marine, Diver, Shantyman) with levels, skills, 12 traits, equipment, wages, food, water and morale. Assign stations by hand or use the five orders.
- **Combat**: broadsides with arcs, reloads and four ammo types, mortars, ramming, fire, flooding, component damage, surrender and boarding actions, coastal forts, and on-foot fights against crabs, skeletons and wraiths.
- **Factions**: Crown Navy, Merchant Guild, pirate Brethren, ghost ships and bounty hunters. Notoriety changes who attacks you and which ports let you dock.
- **Loot**: 80 items across trade goods, supplies, ammo, materials, tools, equipment, treasure, relics and maps. Flotsam, bottles, wrecks, chests (some locked or guarded), buried treasure, treasure maps and shrines.
- **Economy and land**: per-port markets with local goods and demand that react to your trades, bounty boards, deliveries and salvage contracts, and purchasable islands with 10 building types that keep producing while you're away.

## Tech

TypeScript + Vite, no game framework. The world is rendered with Canvas 2D at a low internal resolution and scaled up with nearest-neighbour filtering. Terrain chunks and map tiles are generated in Web Workers. All sound effects and music are synthesised at runtime with the Web Audio API, with positional falloff for in-world sounds.

```
src/
  core/    rng + noise, math, input
  world/   deterministic world generation, terrain, chunk streaming, worker
  data/    items, crew roles, ship components, structures, enemy fleets, icons
  game/    simulation: ships, crew, AI, combat, loot, economy, quests, saves
  render/  renderer, ship sprites, pixel font, sprites
  ui/      HUD, maps, shipwright and all panels
  audio/   synthesised sound effects and music
```

## Going online

The world seed, day/night clock, wind and weather all derive from the shared world seed and wall-clock time, so they will match between players. Player state lives in `Profile` and is saved locally today. That is the boundary where a server will take over.
