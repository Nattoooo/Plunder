export type ItemCat = 'trade' | 'supply' | 'ammo' | 'material' | 'tool' | 'equip' | 'treasure' | 'relic' | 'map';

export interface ItemDef {
  id: string;
  name: string;
  cat: ItemCat;
  price: number;
  weight: number;
  rarity: number;
  icon: string;
  cols: number[];
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
  I({ id: 'sugar', name: 'Sugar', cat: 'trade', price: 12, weight: 2, rarity: 0, icon: 'sack', cols: [0xf2ece0, 0xc8bea8, 0xffffff, 0x8a6a4a], desc: 'Sacks of cane sugar. Cheap in the tropics, prized up north.', biomes: [0, 1] }),
  I({ id: 'rum', name: 'Rum', cat: 'trade', price: 22, weight: 2, rarity: 0, icon: 'barrel', cols: [0x9a6234, 0x6e4220, 0xc88a50, 0x4a4a4a], desc: 'A cask of dark rum. Every port has a thirst.', biomes: [0, 1, 4], morale: 0 }),
  I({ id: 'tobacco', name: 'Tobacco', cat: 'trade', price: 26, weight: 1, rarity: 0, icon: 'sack', cols: [0x8a6a3a, 0x6a4e2a, 0xb08e52, 0x4a3420], desc: 'Cured leaf, bundled tight.', biomes: [0, 4] }),
  I({ id: 'coffee', name: 'Coffee', cat: 'trade', price: 30, weight: 1, rarity: 0, icon: 'sack', cols: [0x5a3a24, 0x3e2616, 0x7a5236, 0x2a1a10], desc: 'Roasted beans that keep sailors awake on the night watch.', biomes: [1, 3] }),
  I({ id: 'tea', name: 'Tea', cat: 'trade', price: 34, weight: 1, rarity: 1, icon: 'crate', cols: [0x6a8a4a, 0x4e6a34, 0x8aae64, 0x3a2a1a], desc: 'Chests of fragrant leaf from distant gardens.', biomes: [2, 4] }),
  I({ id: 'spices', name: 'Spices', cat: 'trade', price: 48, weight: 1, rarity: 1, icon: 'sack', cols: [0xc8642a, 0x9a4618, 0xe88a44, 0x6a3a1a], desc: 'Pepper, clove and nutmeg. Worth its weight in silver.', biomes: [1] }),
  I({ id: 'silk', name: 'Silk', cat: 'trade', price: 70, weight: 1, rarity: 2, icon: 'roll', cols: [0xc84a8a, 0x9a2e66, 0xf08ab8, 0x6a4a3a], desc: 'Shimmering bolts of silk.', biomes: [2] }),
  I({ id: 'cotton', name: 'Cotton', cat: 'trade', price: 14, weight: 2, rarity: 0, icon: 'sack', cols: [0xe6e2d8, 0xb8b2a4, 0xffffff, 0x7a6a5a], desc: 'Raw cotton bales.', biomes: [0] }),
  I({ id: 'salt', name: 'Salt', cat: 'trade', price: 8, weight: 2, rarity: 0, icon: 'barrel', cols: [0xd8d4cc, 0xa8a49c, 0xffffff, 0x5a5a5a], desc: 'Preserves meat and fish. Every galley needs it.', biomes: [2, 3] }),
  I({ id: 'cocoa', name: 'Cocoa', cat: 'trade', price: 28, weight: 1, rarity: 0, icon: 'sack', cols: [0x6e3e26, 0x4e2a18, 0x925a3a, 0x3a2414], desc: 'Bitter beans for rich drinking chocolate.', biomes: [0, 1] }),
  I({ id: 'indigo', name: 'Indigo', cat: 'trade', price: 40, weight: 1, rarity: 1, icon: 'crate', cols: [0x3a3a9a, 0x262670, 0x5a5ac8, 0x3a2a1a], desc: 'Deep blue dye cakes.', biomes: [4] }),
  I({ id: 'wine', name: 'Wine', cat: 'trade', price: 36, weight: 2, rarity: 1, icon: 'bottle', cols: [0x7a1e3a, 0x5a1228, 0xa83a5a, 0x3a2a1a], desc: 'Crates of fine wine from the old country.', biomes: [2] }),
  I({ id: 'furs', name: 'Furs', cat: 'trade', price: 55, weight: 2, rarity: 1, icon: 'sack', cols: [0x8a6a4e, 0x6a4e36, 0xaa8a6a, 0x4a3424], desc: 'Thick pelts from the Frostreach.', biomes: [2] }),
  I({ id: 'whale_oil', name: 'Whale Oil', cat: 'trade', price: 42, weight: 3, rarity: 1, icon: 'barrel', cols: [0x7a7a5a, 0x5a5a3e, 0xa0a07a, 0x3a3a3a], desc: 'Lamp oil rendered from blubber.', biomes: [2] }),
  I({ id: 'porcelain', name: 'Porcelain', cat: 'trade', price: 85, weight: 2, rarity: 2, icon: 'chalice', cols: [0xe8ecf4, 0xb8c0d0, 0xffffff, 0x3a5aa8], desc: 'Delicate blue-and-white china. Handle with care.', biomes: [3] }),
  I({ id: 'amber', name: 'Amber', cat: 'trade', price: 95, weight: 1, rarity: 2, icon: 'gem', cols: [0xe89a2a, 0xb86a14, 0xffc860, 0x6a3a1a], desc: 'Fossil resin with tiny creatures trapped inside.', biomes: [3, 2] }),

  I({ id: 'rations', name: 'Hardtack Rations', cat: 'supply', price: 4, weight: 1, rarity: 0, icon: 'crate', cols: [0xc8a46a, 0xa07e4a, 0xe8c88a, 0x5a3a22], desc: 'Rock-hard biscuits. Feeds one sailor for a day.', food: 1 }),
  I({ id: 'salted_pork', name: 'Salted Pork', cat: 'supply', price: 7, weight: 1, rarity: 0, icon: 'meat', cols: [0xc85a4a, 0x9a3a2e, 0xe88a7a, 0xf0e8d8], desc: 'Hearty meat. Feeds a sailor and lifts spirits.', food: 1.5, morale: 1 }),
  I({ id: 'fruit', name: 'Fresh Fruit', cat: 'supply', price: 5, weight: 1, rarity: 0, icon: 'fruit', cols: [0xe8a030, 0xb87418, 0xffd060, 0x3a8a2a], desc: 'Limes and oranges. Keeps scurvy away.', food: 0.6, heal: 4 }),
  I({ id: 'water', name: 'Fresh Water', cat: 'supply', price: 2, weight: 1, rarity: 0, icon: 'barrel', cols: [0x5a8ab8, 0x3a6a94, 0x8ab8e0, 0x4a4a4a], desc: 'A cask of drinking water. One sailor, one day.', water: 1 }),
  I({ id: 'grog', name: 'Grog', cat: 'supply', price: 9, weight: 1, rarity: 0, icon: 'bottle', cols: [0xb88a3a, 0x8a6020, 0xe0b060, 0x5a3a22], desc: 'Watered rum. Counts as water and raises morale.', water: 0.6, morale: 2 }),
  I({ id: 'medicine', name: 'Herbal Remedy', cat: 'supply', price: 30, weight: 1, rarity: 1, icon: 'medkit', cols: [0xe8e4d8, 0xb8b4a8, 0xffffff, 0xc83a3a], desc: 'Use to heal all crew by 40 health.', heal: 40, usable: true }),
  I({ id: 'fish', name: 'Fish', cat: 'supply', price: 3, weight: 1, rarity: 0, icon: 'fish', cols: [0x7a9ab8, 0x5a7a96, 0xb0d0e8, 0x3a3a3a], desc: 'Fresh catch. Feeds a sailor for most of a day.', food: 0.8 }),

  I({ id: 'cannonball', name: 'Cannonballs', cat: 'ammo', price: 2, weight: 0.5, rarity: 0, icon: 'orb', cols: [0x4a4a52, 0x2e2e34, 0x7a7a86], desc: 'Round shot. Smashes hulls.', ammo: 'round' }),
  I({ id: 'chain_shot', name: 'Chain Shot', cat: 'ammo', price: 5, weight: 0.5, rarity: 0, icon: 'dumbbell', cols: [0x5a5a62, 0x3a3a40, 0x8a8a96, 0x8a7a5a], desc: 'Shreds sails and masts. Weak against hulls.', ammo: 'chain' }),
  I({ id: 'grapeshot', name: 'Grapeshot', cat: 'ammo', price: 4, weight: 0.5, rarity: 0, icon: 'cluster', cols: [0x6a6a72, 0x4a4a52, 0x9a9aa6], desc: 'A spray of musket balls. Cuts down enemy crew.', ammo: 'grape' }),
  I({ id: 'heated_shot', name: 'Heated Shot', cat: 'ammo', price: 8, weight: 0.5, rarity: 1, icon: 'orb', cols: [0xe8642a, 0xb83a14, 0xffc04a], desc: 'Red-hot iron. Sets enemy decks ablaze.', ammo: 'heated' }),
  I({ id: 'mortar_shell', name: 'Mortar Shells', cat: 'ammo', price: 18, weight: 1, rarity: 1, icon: 'bomb', cols: [0x3a3a40, 0x26262a, 0x6a6a74, 0xe8a030], desc: 'Explosive shells for mortars. Lobbed over long distances.', ammo: 'mortar' }),
  I({ id: 'pistol_shot', name: 'Pistol Shot', cat: 'ammo', price: 1, weight: 0.1, rarity: 0, icon: 'cluster', cols: [0x9a9aa6, 0x6a6a72, 0xd0d0dc], desc: 'Lead balls and powder for pistols and muskets.', ammo: 'pistol' }),

  I({ id: 'planks', name: 'Planks', cat: 'material', price: 6, weight: 2, rarity: 0, icon: 'plank', cols: [0xb07a44, 0x8a5a2e, 0xd09a5e], desc: 'Sawn timber. Used for hulls, decks and repairs.' }),
  I({ id: 'iron_bars', name: 'Iron Bars', cat: 'material', price: 18, weight: 3, rarity: 0, icon: 'ingot', cols: [0x7a7e86, 0x5a5e66, 0xb0b4bc], desc: 'Smelted iron for cannons and plating.' }),
  I({ id: 'canvas', name: 'Canvas', cat: 'material', price: 12, weight: 1, rarity: 0, icon: 'roll', cols: [0xe8dcc0, 0xbcae90, 0xfff4dc, 0x6a4a2a], desc: 'Heavy sailcloth.' }),
  I({ id: 'rope', name: 'Rope', cat: 'material', price: 8, weight: 1, rarity: 0, icon: 'coil', cols: [0xc8a46a, 0x9a7a44, 0xe8c88a], desc: 'Hemp rope for rigging.' }),
  I({ id: 'tar', name: 'Pine Tar', cat: 'material', price: 10, weight: 2, rarity: 0, icon: 'barrel', cols: [0x3a2a1e, 0x2a1e14, 0x5a4230, 0x6a6a6a], desc: 'Seals hull seams against leaks.' }),
  I({ id: 'brass', name: 'Brass Fittings', cat: 'material', price: 40, weight: 1, rarity: 1, icon: 'ingot', cols: [0xd8b04a, 0xa8822a, 0xffe08a], desc: 'Fine metalwork for instruments and ornaments.' }),

  I({ id: 'shovel', name: 'Shovel', cat: 'tool', price: 40, weight: 2, rarity: 0, icon: 'shovel', cols: [0x9aa0aa, 0x6a707a, 0xd0d6e0, 0x8a5a2e], desc: 'Dig up buried treasure. Use at an X or suspicious sand.' }),
  I({ id: 'spyglass', name: 'Spyglass', cat: 'tool', price: 220, weight: 1, rarity: 1, icon: 'spyglass', cols: [0xd8b04a, 0xa8822a, 0xffe08a, 0x5a3a22], desc: 'Lets you zoom out further and see farther.', passive: { vision: 0.2 } }),
  I({ id: 'compass', name: 'Compass', cat: 'tool', price: 120, weight: 0.5, rarity: 0, icon: 'compass', cols: [0xb08a4a, 0x8a6a34, 0xf0e8d8, 0xc83a3a], desc: 'Shows a guide arrow to your waypoint and slightly speeds navigation.', passive: { speed: 0.03 } }),
  I({ id: 'sextant', name: 'Sextant', cat: 'tool', price: 400, weight: 1, rarity: 1, icon: 'compass', cols: [0xd8b04a, 0xa8822a, 0xe8f0f8, 0x3a5aa8], desc: 'Reveals exact coordinates and the distance to treasure.' }),
  I({ id: 'lockpick', name: 'Lockpick Set', cat: 'tool', price: 90, weight: 0.2, rarity: 0, icon: 'key', cols: [0xa0a6b0, 0x70767e, 0xe0e6f0], desc: 'Opens locked chests. Breaks sometimes.' }),
  I({ id: 'repair_kit', name: 'Repair Kit', cat: 'tool', price: 75, weight: 2, rarity: 0, icon: 'toolbox', cols: [0xb83a2a, 0x8a2a1e, 0xe85a4a, 0xd0d0d0], desc: 'Use to instantly patch 30% of hull damage.', usable: true }),
  I({ id: 'fishing_net', name: 'Fishing Net', cat: 'tool', price: 110, weight: 2, rarity: 0, icon: 'net', cols: [0xc8a46a, 0x9a7a44, 0xe8c88a], desc: 'Catches fish while sailing at slow speeds.' }),
  I({ id: 'diving_helmet', name: 'Diving Helmet', cat: 'tool', price: 650, weight: 3, rarity: 2, icon: 'helmet', cols: [0xc8964a, 0x9a6e2e, 0xf0c070, 0x8ac8e8], desc: 'Salvage wrecks for far richer loot.' }),

  I({ id: 'rusty_cutlass', name: 'Rusty Cutlass', cat: 'equip', price: 30, weight: 2, rarity: 0, icon: 'sword', cols: [0x9a7a5a, 0x6a5a4a, 0xb89a7a, 0x5a3a22], desc: 'Better than bare fists.', slot: 'weapon', combat: 2 }),
  I({ id: 'cutlass', name: 'Cutlass', cat: 'equip', price: 120, weight: 2, rarity: 0, icon: 'sword', cols: [0xc0c6d0, 0x8a909a, 0xffffff, 0xd8b04a], desc: 'A sailor\'s blade.', slot: 'weapon', combat: 4 }),
  I({ id: 'boarding_axe', name: 'Boarding Axe', cat: 'equip', price: 160, weight: 3, rarity: 0, icon: 'axe', cols: [0xa0a6b0, 0x70767e, 0xe0e6f0, 0x8a5a2e], desc: 'Hacks through netting and skulls alike.', slot: 'weapon', combat: 5 }),
  I({ id: 'rapier', name: 'Rapier', cat: 'equip', price: 380, weight: 1, rarity: 1, icon: 'sword', cols: [0xe0e6f0, 0xa0a6b0, 0xffffff, 0xd8b04a], desc: 'Elegant and deadly in skilled hands.', slot: 'weapon', combat: 7 }),
  I({ id: 'flintlock', name: 'Flintlock Pistol', cat: 'equip', price: 260, weight: 1, rarity: 1, icon: 'pistol', cols: [0x6a4a2e, 0x4a3420, 0xd8b04a, 0x3a2a1a], desc: 'One shot, well placed. Uses pistol shot on foot.', slot: 'weapon', combat: 6 }),
  I({ id: 'blunderbuss', name: 'Blunderbuss', cat: 'equip', price: 450, weight: 3, rarity: 1, icon: 'musket', cols: [0x7a5a3a, 0x5a3e26, 0xd8b04a, 0x3a2a1a], desc: 'Devastating at close quarters.', slot: 'weapon', combat: 9 }),
  I({ id: 'musket', name: 'Musket', cat: 'equip', price: 520, weight: 4, rarity: 1, icon: 'musket', cols: [0x8a6a4a, 0x6a4e34, 0xb0b4bc, 0x4a3420], desc: 'Long-range firearm. Marines love it.', slot: 'weapon', combat: 8 }),
  I({ id: 'leather_vest', name: 'Leather Vest', cat: 'equip', price: 140, weight: 2, rarity: 0, icon: 'vest', cols: [0x8a5a34, 0x6a4024, 0xaa7a50, 0x3a2a1a], desc: 'Turns aside the odd blade.', slot: 'armor', defense: 3 }),
  I({ id: 'tricorn', name: 'Tricorn Hat', cat: 'equip', price: 90, weight: 0.5, rarity: 0, icon: 'hat', cols: [0x2a2a34, 0x1a1a22, 0x4a4a5a, 0xd8b04a], desc: 'Looks the part. A little morale boost.', slot: 'hat', defense: 1, passive: { morale: 2 } }),
  I({ id: 'captains_coat', name: 'Captain\'s Coat', cat: 'equip', price: 900, weight: 2, rarity: 2, icon: 'vest', cols: [0x9a2a2a, 0x6a1a1a, 0xc84a4a, 0xd8b04a], desc: 'Commands respect. Strong armor and morale.', slot: 'armor', defense: 6, passive: { morale: 4 } }),

  I({ id: 'silver_coins', name: 'Silver Coins', cat: 'treasure', price: 25, weight: 0.2, rarity: 0, icon: 'coins', cols: [0xc8ccd4, 0x9a9ea6, 0xffffff], desc: 'A handful of tarnished silver.' }),
  I({ id: 'gold_doubloon', name: 'Gold Doubloons', cat: 'treasure', price: 60, weight: 0.2, rarity: 0, icon: 'doubloon', cols: [0xe8c040, 0xb8901e, 0xfff08a, 0xa87818], desc: 'Spanish gold. Never goes out of style.' }),
  I({ id: 'pearl', name: 'Pearl', cat: 'treasure', price: 70, weight: 0.1, rarity: 1, icon: 'orb', cols: [0xf0ece8, 0xc8c0bc, 0xffffff], desc: 'A lustrous pearl.' }),
  I({ id: 'black_pearl', name: 'Black Pearl', cat: 'treasure', price: 260, weight: 0.1, rarity: 2, icon: 'orb', cols: [0x3a3a4e, 0x22222e, 0x8a8ab0], desc: 'Rare and ominous.' }),
  I({ id: 'ruby', name: 'Ruby', cat: 'treasure', price: 180, weight: 0.1, rarity: 1, icon: 'gem', cols: [0xd82a3a, 0xa01a28, 0xff7a8a], desc: 'Blood-red gemstone.' }),
  I({ id: 'sapphire', name: 'Sapphire', cat: 'treasure', price: 200, weight: 0.1, rarity: 1, icon: 'gem', cols: [0x2a5ad8, 0x1a3aa0, 0x7aa8ff], desc: 'Blue as the deep sea.' }),
  I({ id: 'emerald', name: 'Emerald', cat: 'treasure', price: 240, weight: 0.1, rarity: 2, icon: 'gem', cols: [0x2aa85a, 0x1a7a3e, 0x7ae8a0], desc: 'Green fire in stone.' }),
  I({ id: 'diamond', name: 'Diamond', cat: 'treasure', price: 450, weight: 0.1, rarity: 2, icon: 'gem', cols: [0xd8f0ff, 0xa0c8e0, 0xffffff], desc: 'Flawless. A king\'s ransom in your palm.' }),
  I({ id: 'gold_ring', name: 'Gold Ring', cat: 'treasure', price: 120, weight: 0.1, rarity: 1, icon: 'ring', cols: [0xe8c040, 0xb8901e, 0xfff08a, 0xd82a3a], desc: 'Engraved with a forgotten crest.' }),
  I({ id: 'necklace', name: 'Jeweled Necklace', cat: 'treasure', price: 300, weight: 0.2, rarity: 2, icon: 'necklace', cols: [0xe8c040, 0xb8901e, 0x7ae8a0, 0x2aa85a], desc: 'Gold chain set with emeralds.' }),
  I({ id: 'chalice', name: 'Golden Chalice', cat: 'treasure', price: 380, weight: 1, rarity: 2, icon: 'chalice', cols: [0xe8c040, 0xb8901e, 0xfff08a], desc: 'Drink from it at your own peril.' }),
  I({ id: 'candelabra', name: 'Silver Candelabra', cat: 'treasure', price: 220, weight: 2, rarity: 1, icon: 'candelabra', cols: [0xc8ccd4, 0x9a9ea6, 0xffffff, 0xffc040], desc: 'Looted from a governor\'s dining hall.' }),
  I({ id: 'golden_idol', name: 'Golden Idol', cat: 'treasure', price: 900, weight: 2, rarity: 3, icon: 'idol', cols: [0xe8c040, 0xb8901e, 0xfff08a, 0x2aa85a], desc: 'An ancient idol. Some say it watches you.' }),
  I({ id: 'jeweled_crown', name: 'Jeweled Crown', cat: 'treasure', price: 2200, weight: 2, rarity: 4, icon: 'crown', cols: [0xe8c040, 0xb8901e, 0xfff08a, 0xd82a3a], desc: 'The lost crown of a drowned kingdom.' }),
  I({ id: 'ancient_coin', name: 'Ancient Coin', cat: 'treasure', price: 150, weight: 0.1, rarity: 1, icon: 'doubloon', cols: [0xb8945a, 0x8a6a3a, 0xe0c08a, 0x6a5a3a], desc: 'Minted before any living empire.' }),
  I({ id: 'jade_figurine', name: 'Jade Figurine', cat: 'treasure', price: 520, weight: 1, rarity: 2, icon: 'idol', cols: [0x4ab87a, 0x2a8a56, 0x8ae8b0, 0xd8b04a], desc: 'Carved by masters of a far eastern court.' }),

  I({ id: 'lucky_charm', name: 'Lucky Charm', cat: 'relic', price: 600, weight: 0.2, rarity: 2, icon: 'horseshoe', cols: [0xc8ccd4, 0x9a9ea6, 0xffffff, 0x2aa85a], desc: 'Kept in the hold: +10% loot from every source.', passive: { luck: 0.1 } }),
  I({ id: 'kraken_ink', name: 'Kraken Ink', cat: 'relic', price: 800, weight: 1, rarity: 2, icon: 'bottle', cols: [0x2a1a3a, 0x1a1026, 0x6a4a8a, 0x8a5a2e], desc: 'Kept in the hold: enemies lose sight of you sooner.', passive: { vision: -0.05 } }),
  I({ id: 'mermaid_scale', name: 'Mermaid Scale', cat: 'relic', price: 1200, weight: 0.1, rarity: 3, icon: 'shell', cols: [0x4ac8c8, 0x2a9a9a, 0xa0ffff], desc: 'Kept in the hold: +6% sailing speed.', passive: { speed: 0.06 } }),
  I({ id: 'ghost_lantern', name: 'Ghost Lantern', cat: 'relic', price: 1500, weight: 1, rarity: 3, icon: 'lantern', cols: [0x3a4a3a, 0x2a342a, 0x8affb0, 0x5a6a5a], desc: 'Kept in the hold: see clearly at night and through mist.', passive: { nightVision: 1 } }),
  I({ id: 'cursed_skull', name: 'Cursed Skull', cat: 'relic', price: 666, weight: 1, rarity: 2, icon: 'skull', cols: [0xd8d0b8, 0xa8a088, 0xf0ead8], desc: 'Kept in the hold: +25% gold from kills, but crew morale suffers.', passive: { goldFind: 0.25, morale: -3 } }),
  I({ id: 'siren_conch', name: 'Siren Conch', cat: 'relic', price: 1100, weight: 1, rarity: 3, icon: 'shell', cols: [0xe8a0b8, 0xb87090, 0xffd8e8], desc: 'Kept in the hold: crew morale stays high.', passive: { morale: 6 } }),
  I({ id: 'trident_shard', name: 'Trident Shard', cat: 'relic', price: 2500, weight: 1, rarity: 4, icon: 'shard', cols: [0x4ae8e8, 0x2ab0b0, 0xc0ffff], desc: 'Kept in the hold: cannons reload 10% faster and storms barely touch you.', passive: { reload: 0.1, storm: 0.6 } }),
  I({ id: 'storm_glass', name: 'Storm Glass', cat: 'relic', price: 900, weight: 1, rarity: 2, icon: 'hourglass', cols: [0x8ab8d8, 0x5a88a8, 0xd8f0ff], desc: 'Kept in the hold: storms do half damage.', passive: { storm: 0.5 } }),

  I({ id: 'treasure_map', name: 'Treasure Map', cat: 'map', price: 150, weight: 0.1, rarity: 1, icon: 'scroll', cols: [0xe8d4a0, 0xc8b07a, 0xf8ecc8, 0xc83a2a], desc: 'X marks the spot. Shown on your world map.' }),
  I({ id: 'bottle_message', name: 'Message in a Bottle', cat: 'map', price: 20, weight: 0.2, rarity: 0, icon: 'bottle', cols: [0x8ac8a0, 0x5a9a74, 0xc8ffe0, 0xe8d4a0], desc: 'Use to uncork it. Who knows what\'s inside?', usable: true }),
  I({ id: 'sea_chart', name: 'Sea Chart', cat: 'map', price: 300, weight: 0.1, rarity: 1, icon: 'scroll', cols: [0xa8c8e0, 0x7aa0c0, 0xd8ecf8, 0x2a5a8a], desc: 'Use to chart the waters around you (large map reveal).', usable: true })
];

export const ITEM: Record<string, ItemDef> = {};
for (const it of ITEMS) ITEM[it.id] = it;

export const RARITY_COLORS = ['#d8d0c0', '#7ad8ff', '#c08aff', '#ffb040', '#ff5a5a'];
export const RARITY_NAMES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
