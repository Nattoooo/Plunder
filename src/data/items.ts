export type ItemCat = 'trade' | 'supply' | 'ammo' | 'material' | 'tool' | 'equip' | 'treasure' | 'relic' | 'map';

export interface ItemDef {
  id: string;
  name: string;
  cat: ItemCat;
  price: number;
  weight: number;
  rarity: number;
  desc: string;
  food?: number;
  water?: number;
  morale?: number;
  heal?: number;
  ammo?: 'round' | 'chain' | 'grape' | 'heated' | 'mortar' | 'pistol';
  slot?: 'weapon' | 'armor' | 'hat';
  combat?: number;
  defense?: number;
  usable?: boolean;
  passive?: Partial<Record<'luck' | 'speed' | 'vision' | 'nightVision' | 'storm' | 'morale' | 'goldFind' | 'reload' | 'repair', number>>;
  biomes?: number[];
}

const I = (d: ItemDef) => d;

export const ITEMS: ItemDef[] = [
  I({ id: 'sugar', name: 'Sugar', cat: 'trade', price: 12, weight: 2, rarity: 0, desc: 'Sacks of cane sugar. Cheap in the tropics, prized up north.', biomes: [0, 1] }),
  I({ id: 'rum', name: 'Rum', cat: 'trade', price: 22, weight: 2, rarity: 0, desc: 'A cask of dark rum. Every port has a thirst.', biomes: [0, 1, 4], morale: 0 }),
  I({ id: 'tobacco', name: 'Tobacco', cat: 'trade', price: 26, weight: 1, rarity: 0, desc: 'Cured leaf, bundled tight.', biomes: [0, 4] }),
  I({ id: 'coffee', name: 'Coffee', cat: 'trade', price: 30, weight: 1, rarity: 0, desc: 'Roasted beans that keep sailors awake on the night watch.', biomes: [1, 3] }),
  I({ id: 'tea', name: 'Tea', cat: 'trade', price: 34, weight: 1, rarity: 1, desc: 'Chests of fragrant leaf from distant gardens.', biomes: [2, 4] }),
  I({ id: 'spices', name: 'Spices', cat: 'trade', price: 48, weight: 1, rarity: 1, desc: 'Pepper, clove and nutmeg. Worth its weight in silver.', biomes: [1] }),
  I({ id: 'silk', name: 'Silk', cat: 'trade', price: 70, weight: 1, rarity: 2, desc: 'Shimmering bolts of silk.', biomes: [2] }),
  I({ id: 'cotton', name: 'Cotton', cat: 'trade', price: 14, weight: 2, rarity: 0, desc: 'Raw cotton bales.', biomes: [0] }),
  I({ id: 'salt', name: 'Salt', cat: 'trade', price: 8, weight: 2, rarity: 0, desc: 'Preserves meat and fish. Every galley needs it.', biomes: [2, 3] }),
  I({ id: 'cocoa', name: 'Cocoa', cat: 'trade', price: 28, weight: 1, rarity: 0, desc: 'Bitter beans for rich drinking chocolate.', biomes: [0, 1] }),
  I({ id: 'indigo', name: 'Indigo', cat: 'trade', price: 40, weight: 1, rarity: 1, desc: 'Deep blue dye cakes.', biomes: [4] }),
  I({ id: 'wine', name: 'Wine', cat: 'trade', price: 36, weight: 2, rarity: 1, desc: 'Crates of fine wine from the old country.', biomes: [2] }),
  I({ id: 'furs', name: 'Furs', cat: 'trade', price: 55, weight: 2, rarity: 1, desc: 'Thick pelts from the Frostreach.', biomes: [2] }),
  I({ id: 'whale_oil', name: 'Whale Oil', cat: 'trade', price: 42, weight: 3, rarity: 1, desc: 'Lamp oil rendered from blubber.', biomes: [2] }),
  I({ id: 'porcelain', name: 'Porcelain', cat: 'trade', price: 85, weight: 2, rarity: 2, desc: 'Delicate blue-and-white china. Handle with care.', biomes: [3] }),
  I({ id: 'amber', name: 'Amber', cat: 'trade', price: 95, weight: 1, rarity: 2, desc: 'Fossil resin with tiny creatures trapped inside.', biomes: [3, 2] }),

  I({ id: 'rations', name: 'Hardtack Rations', cat: 'supply', price: 4, weight: 1, rarity: 0, desc: 'Rock-hard biscuits. Feeds one sailor for a day.', food: 1 }),
  I({ id: 'salted_pork', name: 'Salted Pork', cat: 'supply', price: 7, weight: 1, rarity: 0, desc: 'Hearty meat. Feeds a sailor and lifts spirits.', food: 1.5, morale: 1 }),
  I({ id: 'fruit', name: 'Fresh Fruit', cat: 'supply', price: 5, weight: 1, rarity: 0, desc: 'Limes and oranges. Keeps scurvy away.', food: 0.6, heal: 4 }),
  I({ id: 'water', name: 'Fresh Water', cat: 'supply', price: 2, weight: 1, rarity: 0, desc: 'A cask of drinking water. One sailor, one day.', water: 1 }),
  I({ id: 'grog', name: 'Grog', cat: 'supply', price: 9, weight: 1, rarity: 0, desc: 'Watered rum. Counts as water and raises morale.', water: 0.6, morale: 2 }),
  I({ id: 'medicine', name: 'Herbal Remedy', cat: 'supply', price: 30, weight: 1, rarity: 1, desc: 'Use to heal all crew by 40 health.', heal: 40, usable: true }),
  I({ id: 'fish', name: 'Fish', cat: 'supply', price: 3, weight: 1, rarity: 0, desc: 'Fresh catch. Feeds a sailor for most of a day.', food: 0.8 }),

  I({ id: 'cannonball', name: 'Cannonballs', cat: 'ammo', price: 2, weight: 0.5, rarity: 0, desc: 'Round shot. Smashes hulls.', ammo: 'round' }),
  I({ id: 'chain_shot', name: 'Chain Shot', cat: 'ammo', price: 5, weight: 0.5, rarity: 0, desc: 'Shreds sails and masts. Weak against hulls.', ammo: 'chain' }),
  I({ id: 'grapeshot', name: 'Grapeshot', cat: 'ammo', price: 4, weight: 0.5, rarity: 0, desc: 'A spray of musket balls. Cuts down enemy crew.', ammo: 'grape' }),
  I({ id: 'heated_shot', name: 'Heated Shot', cat: 'ammo', price: 8, weight: 0.5, rarity: 1, desc: 'Red-hot iron. Sets enemy decks ablaze.', ammo: 'heated' }),
  I({ id: 'mortar_shell', name: 'Mortar Shells', cat: 'ammo', price: 18, weight: 1, rarity: 1, desc: 'Explosive shells for mortars. Lobbed over long distances.', ammo: 'mortar' }),
  I({ id: 'pistol_shot', name: 'Pistol Shot', cat: 'ammo', price: 1, weight: 0.1, rarity: 0, desc: 'Lead balls and powder for pistols and muskets.', ammo: 'pistol' }),

  I({ id: 'planks', name: 'Planks', cat: 'material', price: 6, weight: 2, rarity: 0, desc: 'Sawn timber. Used for hulls, decks and repairs.' }),
  I({ id: 'iron_bars', name: 'Iron Bars', cat: 'material', price: 18, weight: 3, rarity: 0, desc: 'Smelted iron for cannons and plating.' }),
  I({ id: 'canvas', name: 'Canvas', cat: 'material', price: 12, weight: 1, rarity: 0, desc: 'Heavy sailcloth.' }),
  I({ id: 'rope', name: 'Rope', cat: 'material', price: 8, weight: 1, rarity: 0, desc: 'Hemp rope for rigging.' }),
  I({ id: 'tar', name: 'Pine Tar', cat: 'material', price: 10, weight: 2, rarity: 0, desc: 'Seals hull seams against leaks.' }),
  I({ id: 'brass', name: 'Brass Fittings', cat: 'material', price: 40, weight: 1, rarity: 1, desc: 'Fine metalwork for instruments and ornaments.' }),

  I({ id: 'shovel', name: 'Shovel', cat: 'tool', price: 40, weight: 2, rarity: 0, desc: 'Dig up buried treasure. Use at an X or suspicious sand.' }),
  I({ id: 'spyglass', name: 'Spyglass', cat: 'tool', price: 220, weight: 1, rarity: 1, desc: 'Lets you zoom out further and see farther.', passive: { vision: 0.2 } }),
  I({ id: 'compass', name: 'Compass', cat: 'tool', price: 120, weight: 0.5, rarity: 0, desc: 'Shows a guide arrow to your waypoint and slightly speeds navigation.', passive: { speed: 0.03 } }),
  I({ id: 'sextant', name: 'Sextant', cat: 'tool', price: 400, weight: 1, rarity: 1, desc: 'Reveals exact coordinates and the distance to treasure.' }),
  I({ id: 'lockpick', name: 'Lockpick Set', cat: 'tool', price: 90, weight: 0.2, rarity: 0, desc: 'Opens locked chests. Breaks sometimes.' }),
  I({ id: 'repair_kit', name: 'Repair Kit', cat: 'tool', price: 75, weight: 2, rarity: 0, desc: 'Use to instantly patch 30% of hull damage.', usable: true }),
  I({ id: 'fishing_net', name: 'Fishing Net', cat: 'tool', price: 110, weight: 2, rarity: 0, desc: 'Catches fish while sailing at slow speeds.' }),
  I({ id: 'diving_helmet', name: 'Diving Helmet', cat: 'tool', price: 650, weight: 3, rarity: 2, desc: 'Salvage wrecks for far richer loot.' }),

  I({ id: 'rusty_cutlass', name: 'Rusty Cutlass', cat: 'equip', price: 30, weight: 2, rarity: 0, desc: 'Better than bare fists.', slot: 'weapon', combat: 2 }),
  I({ id: 'cutlass', name: 'Cutlass', cat: 'equip', price: 120, weight: 2, rarity: 0, desc: 'A sailor\'s blade.', slot: 'weapon', combat: 4 }),
  I({ id: 'boarding_axe', name: 'Boarding Axe', cat: 'equip', price: 160, weight: 3, rarity: 0, desc: 'Hacks through netting and skulls alike.', slot: 'weapon', combat: 5 }),
  I({ id: 'rapier', name: 'Rapier', cat: 'equip', price: 380, weight: 1, rarity: 1, desc: 'Elegant and deadly in skilled hands.', slot: 'weapon', combat: 7 }),
  I({ id: 'flintlock', name: 'Flintlock Pistol', cat: 'equip', price: 260, weight: 1, rarity: 1, desc: 'One shot, well placed. Uses pistol shot on foot.', slot: 'weapon', combat: 6 }),
  I({ id: 'blunderbuss', name: 'Blunderbuss', cat: 'equip', price: 450, weight: 3, rarity: 1, desc: 'Devastating at close quarters.', slot: 'weapon', combat: 9 }),
  I({ id: 'musket', name: 'Musket', cat: 'equip', price: 520, weight: 4, rarity: 1, desc: 'Long-range firearm. Marines love it.', slot: 'weapon', combat: 8 }),
  I({ id: 'leather_vest', name: 'Leather Vest', cat: 'equip', price: 140, weight: 2, rarity: 0, desc: 'Turns aside the odd blade.', slot: 'armor', defense: 3 }),
  I({ id: 'tricorn', name: 'Tricorn Hat', cat: 'equip', price: 90, weight: 0.5, rarity: 0, desc: 'Looks the part. A little morale boost.', slot: 'hat', defense: 1, passive: { morale: 2 } }),
  I({ id: 'captains_coat', name: 'Captain\'s Coat', cat: 'equip', price: 900, weight: 2, rarity: 2, desc: 'Commands respect. Strong armor and morale.', slot: 'armor', defense: 6, passive: { morale: 4 } }),

  I({ id: 'silver_coins', name: 'Silver Coins', cat: 'treasure', price: 25, weight: 0.2, rarity: 0, desc: 'A handful of tarnished silver.' }),
  I({ id: 'gold_doubloon', name: 'Gold Doubloons', cat: 'treasure', price: 60, weight: 0.2, rarity: 0, desc: 'Spanish gold. Never goes out of style.' }),
  I({ id: 'pearl', name: 'Pearl', cat: 'treasure', price: 70, weight: 0.1, rarity: 1, desc: 'A lustrous pearl.' }),
  I({ id: 'black_pearl', name: 'Black Pearl', cat: 'treasure', price: 260, weight: 0.1, rarity: 2, desc: 'Rare and ominous.' }),
  I({ id: 'ruby', name: 'Ruby', cat: 'treasure', price: 180, weight: 0.1, rarity: 1, desc: 'Blood-red gemstone.' }),
  I({ id: 'sapphire', name: 'Sapphire', cat: 'treasure', price: 200, weight: 0.1, rarity: 1, desc: 'Blue as the deep sea.' }),
  I({ id: 'emerald', name: 'Emerald', cat: 'treasure', price: 240, weight: 0.1, rarity: 2, desc: 'Green fire in stone.' }),
  I({ id: 'diamond', name: 'Diamond', cat: 'treasure', price: 450, weight: 0.1, rarity: 2, desc: 'Flawless. A king\'s ransom in your palm.' }),
  I({ id: 'gold_ring', name: 'Gold Ring', cat: 'treasure', price: 120, weight: 0.1, rarity: 1, desc: 'Engraved with a forgotten crest.' }),
  I({ id: 'necklace', name: 'Jeweled Necklace', cat: 'treasure', price: 300, weight: 0.2, rarity: 2, desc: 'Gold chain set with emeralds.' }),
  I({ id: 'chalice', name: 'Golden Chalice', cat: 'treasure', price: 380, weight: 1, rarity: 2, desc: 'Drink from it at your own peril.' }),
  I({ id: 'candelabra', name: 'Silver Candelabra', cat: 'treasure', price: 220, weight: 2, rarity: 1, desc: 'Looted from a governor\'s dining hall.' }),
  I({ id: 'golden_idol', name: 'Golden Idol', cat: 'treasure', price: 900, weight: 2, rarity: 3, desc: 'An ancient idol. Some say it watches you.' }),
  I({ id: 'jeweled_crown', name: 'Jeweled Crown', cat: 'treasure', price: 2200, weight: 2, rarity: 4, desc: 'The lost crown of a drowned kingdom.' }),
  I({ id: 'ancient_coin', name: 'Ancient Coin', cat: 'treasure', price: 150, weight: 0.1, rarity: 1, desc: 'Minted before any living empire.' }),
  I({ id: 'jade_figurine', name: 'Jade Figurine', cat: 'treasure', price: 520, weight: 1, rarity: 2, desc: 'Carved by masters of a far eastern court.' }),

  I({ id: 'lucky_charm', name: 'Lucky Charm', cat: 'relic', price: 600, weight: 0.2, rarity: 2, desc: 'Kept in the hold: +10% loot from every source.', passive: { luck: 0.1 } }),
  I({ id: 'kraken_ink', name: 'Kraken Ink', cat: 'relic', price: 800, weight: 1, rarity: 2, desc: 'Kept in the hold: enemies lose sight of you sooner.', passive: { vision: -0.05 } }),
  I({ id: 'mermaid_scale', name: 'Mermaid Scale', cat: 'relic', price: 1200, weight: 0.1, rarity: 3, desc: 'Kept in the hold: +6% sailing speed.', passive: { speed: 0.06 } }),
  I({ id: 'ghost_lantern', name: 'Ghost Lantern', cat: 'relic', price: 1500, weight: 1, rarity: 3, desc: 'Kept in the hold: see clearly at night and through mist.', passive: { nightVision: 1 } }),
  I({ id: 'cursed_skull', name: 'Cursed Skull', cat: 'relic', price: 666, weight: 1, rarity: 2, desc: 'Kept in the hold: +25% gold from kills, but crew morale suffers.', passive: { goldFind: 0.25, morale: -3 } }),
  I({ id: 'siren_conch', name: 'Siren Conch', cat: 'relic', price: 1100, weight: 1, rarity: 3, desc: 'Kept in the hold: crew morale stays high.', passive: { morale: 6 } }),
  I({ id: 'trident_shard', name: 'Trident Shard', cat: 'relic', price: 2500, weight: 1, rarity: 4, desc: 'Kept in the hold: cannons reload 10% faster and storms barely touch you.', passive: { reload: 0.1, storm: 0.6 } }),
  I({ id: 'storm_glass', name: 'Storm Glass', cat: 'relic', price: 900, weight: 1, rarity: 2, desc: 'Kept in the hold: storms do half damage.', passive: { storm: 0.5 } }),

  I({ id: 'treasure_map', name: 'Treasure Map', cat: 'map', price: 150, weight: 0.1, rarity: 1, desc: 'X marks the spot. Shown on your world map.' }),
  I({ id: 'bottle_message', name: 'Message in a Bottle', cat: 'map', price: 20, weight: 0.2, rarity: 0, desc: 'Use to uncork it. Who knows what\'s inside?', usable: true }),
  I({ id: 'sea_chart', name: 'Sea Chart', cat: 'map', price: 300, weight: 0.1, rarity: 1, desc: 'Use to chart the waters around you (large map reveal).', usable: true })
];

export const ITEM: Record<string, ItemDef> = {};
for (const it of ITEMS) ITEM[it.id] = it;

export const RARITY_COLORS = ['#d8d0c0', '#7ad8ff', '#c08aff', '#ffb040', '#ff5a5a'];
export const RARITY_NAMES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
