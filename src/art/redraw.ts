import { art, Art } from './palette';

const SCALE = 2;

const ROWS: Record<string, string[]> = {
  'barrel': ['.kkk.', 'kVVvk', 'kMMMk', 'kvvWk', 'kMMMk', '.kkk.'],
  'berry-bush': ['.kkk..kkk.', 'kHHhkkhhhk', 'kHhhhhRRhk', 'khhRRhhhGk', 'khhhhGGGGk', '.kkkkkkkk.'],
  'boulder': ['....kkkk....', '..kkUuuukk..', '.kUUuuuuTTk.', 'kUUuuuuTTTTk', 'kuuuuuTTTTTk', 'kuuuuTTTTTTk', 'kuuTTTTTTTTk', '.kkkkkkkkkk.'],
  'bow-large': ['......kkk......', '....kkVvwkk....', '..kkVvvvvwwkk..', '.kVvvvvvvvwwwk.', 'kVvvvvvvvvvwwwk'],
  'bow-medium': ['....kk....', '..kkVwkk..', 'kkVvvvwwkk'],
  'bow-small': ['..k..', '.kVk.', 'kVvwk'],
  'bush': ['.kkk..kkk.', 'kHHhkkhhhk', 'kHhhhhhhhk', 'khhhhhhhGk', 'khhhhGGGGk', '.kkkkkkkk.'],
  'captain-deck': ['kKk', 'RRR', 'rrr'],
  'cargo-hold': ['kkkkk', 'kMMMk', 'kVvwk', 'kMMMk', 'kkkkk'],
  'carronade': ['.kkk.', 'kNnMk', 'kNnMk', 'kNnMk', 'kKKKk', 'kvvvk', '.kkk.'],
  'claim-stone': ['....kkkkk', '...kwPPPk', '...kwPPpk', '...kwkkkk', '..kkwkk..', '.kUuuuTk.', '.kUuKuTk.', 'kUuKKKuTk', 'kUuuKuuTk', 'kkkkkkkkk'],
  'claim-stone-owned': ['....kkkkk', '...kwMKKk', '...kwMKKk', '...kwkkkk', '..kkwkk..', '.kUuuuTk.', '.kUuKuTk.', 'kUuKKKuTk', 'kUuuKuuTk', 'kkkkkkkkk'],
  'crab-1': ['ke.kk.ek', 'kekeRkRk', '.keeRRk.', 'kkRRRrkk', 'k.k..k.k'],
  'crab-2': ['ke.kk.ek', 'kekeRkRk', '.keeRRk.', '.kRRRrk.', '.k.kk.k.'],
  'crew': ['.J.', 'sRr', '.RS'],
  'crew-quarters': ['kkkkk', 'kVKwk', 'kVvwk', 'kVKwk', 'kkkkk'],
  'crows-nest': ['.kkkk.', 'kVVVvk', 'kVKKwk', 'kVKKwk', 'kvwwwk', '.kkkk.'],
  'cutlass-swing': ['....N', '...Nn', '..Nn.', '.Nn..', 'Nn...'],
  'damage-crack': ['wV...', '.ww..', '..wV.', '...ww', '....w'],
  'damage-hole': ['.www.', 'waaaw', 'waaaw', 'waaaw', '.www.'],
  'dead-tree': ['...k.....k...', '.kkvk...kdkk.', 'kvkvk...kdkdk', 'kvkvk...kddk.', '.kvvk..kddk..', '..kvvkkkdk...', '...kvvWddk...', '...kvWdkk....', '....kvWdk....', '....kvvdk....', '...kvvWdk....', '..kvvWddk....', '...kkkkk.....'],
  'deck-logs': ['WVvWW', 'WVvWW', 'DfffD', 'WVvWW', 'WVvWW'],
  'deck-planks': ['vvvvW', 'vvvvW', 'vvvvW', 'vvvvW', 'vvvvW'],
  'dig-spot': ['..FF..', '.FDDd.', 'FDDDdd', 'DDDddd'],
  'dock-planks': ['vvvv', 'vvvv', 'vvvv', 'WWWW'],
  'fire-1': ['.Q.', 'qQq', 'qqq'],
  'fire-2': ['Q..', 'qQ.', 'qqq'],
  'flag-1': ['wRRR', 'wRR.'],
  'flag-2': ['wRR.', 'wRRR'],
  'flowers': ['e.y.e', 'GhGGG', '.GGG.'],
  'fort-crates': ['..kkkk..', '..kVWk..', '..kwwk..', 'kkkkkkkk', 'kVWkVVWk', 'kwwkwwwk', 'kkkkkkkk'],
  'fort-flagpole': ['kkkkkk', 'kVBBBk', 'kVBBBk', 'kVBBBk', 'kVkkkk', 'kVk...', 'kVk...', 'kVk...', 'kVk...', 'kVk...', 'kVk...', 'kkk...'],
  'fort-gate': ['.kkk.kkkk.kkk.', '.kuk.kuuk.kuk.', '.kTk.kuTk.kTk.', 'kkkkkkkkkkkkkk', 'uuuuukkkkuuuuu', 'TTTTkWwwWkTTTT', 'TTTkWWwwWWkTTT', 'tttkMMMMMMkttt', 'uuukWWwwWWkuuu', 'TTTkWWwwWWkTTT', 'TTTkWWwwWWkTTT', 'kkkkkkkkkkkkkk'],
  'fort-tower': ['kkkk.kkkk.kkkk', 'kuuk.kuuk.kuuk', 'kuTk.kuTk.kuTk', 'kkkkkkkkkkkkkk', 'kTtTTTtTTTtTTk', 'kttttttttttttk', 'kuuutukkuuutuk', 'kTTTtTkkTTTtTk', 'kTTTtTkkTTTtTk', 'ktttttkktttttk', 'kutuuutuuutuuk', 'kTtTTTtTTTtTTk', 'kTtTTTtTTTtTTk', 'kttttttttttttk', 'kuuutuuutuuuuk', 'kTTTtTTTtTTTTk', 'kTTTtTTTtTTTTk', 'kkkkkkkkkkkkkk'],
  'fort-wall-back': ['kkk.', 'kTk.', 'kkkk', 'uuut', 'TTTt', 'TTTt', 'kkkk'],
  'fort-wall-front': ['kkk.', 'kuk.', 'kTk.', 'kkkk', 'uuut', 'TTTt', 'TTTt', 'tttt', 'utuu', 'TtTT', 'TtTT', 'kkkk'],
  'fort-wall-side': ['kuTTtk', 'kuTTtk', 'kuTTtk', 'kttttk'],
  'galley': ['kkkkk', 'kNKMk', 'kqQqk', 'kmMmk', 'kkkkk'],
  'glint-1': ['P'],
  'glint-2': ['PP'],
  'glint-3': ['PP', 'PP'],
  'glint-4': ['lL'],
  'grass-tuft': ['h..h', 'GhhG'],
  'gull-1': ['..y..', '.uPu.', '.PPU.'],
  'gull-2': ['..y..', 'uPPPu', '.PPU.'],
  'helm': ['.kkk.', 'kKVKk', 'kVOvk', 'kKvKk', '.kkk.'],
  'house-cottage': ['..........kkkkkkk...', '..........kuuuuTk...', '....kkkkkkkkuuTkk...', '...keeeeeeekuuTkk...', '...keRRRRRRkuuTkk...', '..keRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRrk.', 'keRRRRRRRRRRRRRRRRrk', 'kerrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCwwwwCkkkkCk.', '.kCkllkCwWWWCkllkCk.', '.kCkBBkCwWWWCkBBkCk.', '.kCkkkkCwWWWCkkkkCk.', '.kCVVVVCwWyWCVVVVCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kkkkkkkkkkkkkkkkkk.'],
  'house-long': ['...................kkkkkkk....', '...................kuuuuTk....', '....kkkkkkkkkkkkkkkkuuuuTk....', '...keeeeeeeeeeeeeeekuuuuTkk...', '...keRRRRRRRRRRRRRRkuuuuTkk...', '..keRRRRRRRRRRRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRRRRRRRRRRRrk.', 'keRRRRRRRRRRRRRRRRRRRRRRRRRRrk', 'krrrrrrrrrrrrrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccccccccccccck.', '.kCCCCCCCCCCCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCwwwwCCCCCCCCCCCk.', '.kCkkkkCkkkkCwWWWCkkkkCkkkkCk.', '.kCkllkCkllkCwWWWCkllkCkllkCk.', '.kCkBBkCkBBkCwWWWCkBBkCkBBkCk.', '.kCkkkkCkkkkCwWyWCkkkkCkkkkCk.', '.kCVVVVCVVVVCwWWWCVVVVCVVVVCk.', '.kCCCCCCCCCCCwWWWCCCCCCCCCCCk.', '.kCCCCCCCCCCCwWWWCCCCCCCCCCCk.', '.kkkkkkkkkkkkkkkkkkkkkkkkkkkk.'],
  'house-shutters': ['....kkkkkkkkkkkk....', '...keeeeeeeeeeeek...', '...keRRRRRRRRRRrk...', '..keRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRrk.', 'keRRRRRRRRRRRRRRRRrk', 'kerrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCwwwwCkkkkCk.', '.kCBllBCwWWWCBllBCk.', '.kCBllBCwWWWCBllBCk.', '.kCVVVVCwWyWCVVVVCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kkkkkkkkkkkkkkkkkk.'],
  'house-townhouse': ['...........kkkkkk...', '...........kuuuTk...', '...........kuuuTk...', '....kkkkkkkkuuuTk...', '...keeeeeeekuuuTk...', '..keRRRRRRRRRRRRrk..', '..keRRRRRRRRRRRRrk..', '.keRRRRRRRRRRRRRRrk.', '.keRRRRRRRRRRRRRRrk.', 'kerrrrrrrrrrrrrrrrrk', 'kkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCkkkkCkkkkCk.', '.kCkllkCkllkCkllkCk.', '.kCkBBkCkBBkCkBBkCk.', '.kCkkkkCkkkkCkkkkCk.', '.kCVVVVCVVVVCVVVVCk.', '.kCCCCCCCCCCCCCCCCk.', '.kcccccccccccccccck.', '.kCCCCCCCCCCCCCCCCk.', '.kCCCCCCCCCCCCCCCCk.', '.kCkkkkCwwwwCkkkkCk.', '.kCkllkCwWWWCkllkCk.', '.kCkBBkCwWWWCkBBkCk.', '.kCkkkkCwWWWCkkkkCk.', '.kCVVVVCwWyWCVVVVCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kCCCCCCwWWWCCCCCCk.', '.kkkkkkkkkkkkkkkkkk.'],
  'iron-bands': ['.....', 'nnnnn', 'MMMMM', '.....', '.....'],
  'jungle-tree': ['.....kkkkkkkkkk.....', '.kkkkHHHHhhhhhhkkkk.', 'kkHHHHHhhhhhhhhhhhkk', 'kHHHhhhhhhhhhhhhhhhk', 'khhhhhhhGGhhhhhhhhhk', 'khhhhhhhhhhhhhhhGGGk', 'kGGhhhhhhGGGGGGGGGGk', '.kkGGGGGGGGGGGGGGkk.', '...kkkkkGGGGkkkkk...', '........kvwk........', '........kvwk........', '........kvwk........', '........kvwk........', '.......kvvwwk.......', '.......kkkkkk.......'],
  'long-gun': ['.kkk.', '.kNk.', '.kNk.', '.kNk.', '.kNk.', 'kNnMk', 'kvvvk', '.kkk.'],
  'mortar': ['.kkk.', 'kNnMk', 'kNKKk', 'kMKKk', '.kkk.'],
  'muzzle-flash': ['y.y', '.Y.', 'y.y'],
  'oar': ['wWWWVVV', 'WW..WWw'],
  'oar-bench': ['.kkk.', 'kVVVk', 'kvvvk', 'kwwwk', '.kkk.'],
  'palm': ['...kk...kkk...kk...', '..kHHkkkHHhkkkhhk..', '.kHHHhhkHhhkhhhGGk.', 'kHhhhGkhhhhhkGhhhhk', '.khhGk.kJJJk.kGhhk.', '..kkk..kJkJk..kkk..', '........kkk........', '.......kvwk........', '......kvwk.........', '......kvwk.........', '.....kvwk..........', '.....kvwk..........', '.....kvwk..........', '.....kvwk..........', '......kvwk.........', '......kvwk.........', '......kvvwk........', '.....kvvvwk........', '....kvvvvwwk.......', '....kkkkkkkk.......'],
  'pine': ['.....k.....', '....khk....', '...kHhhk...', '..kHhhGGk..', '..kGGGGGk..', '...kHhhk...', '..kHhhhhk..', '.kHhhhhhhk.', '.khhhhhGGk.', '.kGGGGGGGk.', '..kHhhhhk..', '.kHHhhhhhk.', 'kHHhhhhhhhk', 'khhhhhhhGGk', 'kGGGGGGGGGk', '.kkkkkkkkk.', '...kvvwk...', '...kvvwk...', '...kkkkk...'],
  'pirate-flag-1': ['wKKK', 'wkk.'],
  'pirate-flag-2': ['wKK.', 'wkkk'],
  'ram': ['..k..', '.kNk.', 'kNMmk', 'kNMmk', 'kNMmk', 'kNMmk', 'kNMmk', 'kkkkk'],
  'rock': ['.kkk.', 'kuTTk', 'kTTtk', '.kkk.'],
  'rum': ['..kk....', '.kJjkk..', '.kfDkDk.', 'kffDDkDk', 'kDDDdkdk', 'kDDDdkk.', 'kDDddk..', '.kkkk...'],
  'sail-lateen-full': ['v....', 'vp...', 'vpC..', 'vpC..', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCc.', 'vpCCc', 'vpCCc', 'vpCCc'],
  'sail-lateen-furled': ['v.', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC', 'vC'],
  'sail-lateen-half': ['v..', 'v..', 'v..', 'v..', 'vp.', 'vp.', 'vpc', 'vpc', 'vpc', 'vpc', 'vpc', 'vpc', 'vpc'],
  'sail-main-full': ['......pCCcc......', '.....pCCCCCc.....', '....ppCCCCCcc....', '...WvvvvvvvvvW...', '...pppCCCCCccc...', '.pppppCCCCCCcccc.', 'pppppCCCCCCCCcccc', 'pppppCCCCCCCCcccc', 'WvvvvvvvvvvvvvvvW'],
  'sail-main-furled': ['...WCCCCCCCCCW...', '.ppCCCCCCCCCCCcc.', 'WvvvvvvvvvvvvvvvW'],
  'sail-main-half': ['....ppCCCCCcc....', '...WvvvvvvvvvW...', '..pppppCCCCCccc..', 'pppppCCCCCCCCcccc', 'WvvvvvvvvvvvvvvvW'],
  'sail-patched-full': ['..ppCCc..', '.pppCCcc.', 'pppccCCcc', 'pppccCCcc', 'WWWWWWWWW'],
  'sail-patched-furled': ['ppCCCCCcc', 'WWWWWWWWW'],
  'sail-patched-half': ['.pppCCcc.', 'pppCCCccc', 'WWWWWWWWW'],
  'sail-square-full': ['..ppppCCCcc..', '.ppppCCCCCcc.', 'ppppppCCCCCcc', 'ppppppCCCCCcc', 'WvvvvvvvvvvvW'],
  'sail-square-furled': ['.ppCCCCCCCcc.', 'WvvvvvvvvvvvW'],
  'sail-square-half': ['..pppppCCCc..', 'pppppCCCCCCcc', 'WvvvvvvvvvvvW'],
  'serpent-body-1': ['.kkkk.', 'kIIiik', 'kIqqik', 'kiiiik', 'kiiiik', '.kkkk.'],
  'serpent-body-2': ['.kkk.', 'kIiik', 'kiqik', 'kiiik', '.kkk.'],
  'serpent-body-3': ['.kk.', 'kIik', 'kiik', '.kk.'],
  'serpent-head': ['.kkkkk..', 'kiyiiik.', 'kIiikkk.', 'kiiiRRR.', 'kiiikkk.', 'kiyiiik.', '.kkkkk..'],
  'serpent-tail': ['kkk..', 'kIik.', '..kqk', 'kiik.', 'kkk..'],
  'shrine': ['kkkkk.......kkkkk', 'kUUTk.......kUUTk', 'kTTTk...k...kTTTk', 'kUuTk..kHk..kUuTk', 'kUuTk.kHhGk.kUuTk', 'kUuTk..kGk..kUuTk', 'kUuTk...k...kUuTk', 'kUuTkUUUUuTTkUuTk', 'kUuTkkkkkkkkkUuTk', 'kUuTkuuuuuTTkUuTk', 'kUUTkuuuuuTTkUUTk', 'kkkkkkkkkkkkkkkkk'],
  'skeleton-1': ['.kkkkk.', '.kRRrk.', '.kKxKk.', '.kxxXk.', 'kxxxxXk', 'kxKKKXk', 'kxxxxXk', '.kxkxk.', 'kkk.kk.'],
  'skeleton-2': ['.kkkkk.', '.kRRrk.', '.kKxKk.', '.kxxXk.', 'kxxxxXk', 'kxKKKXk', 'kxxxxXk', '.kxkxk.', '.kk.kkk'],
  'skull-rock': ['....kkkkkkk....', '..kkUUUUUUUkk..', '.kUUUUUUUUUUuk.', 'kUUUUUUUUUUuuTk', 'kUUkkkUUUkkkuTk', 'kUUkkkUkUkkkuTk', '.kUUUUUkUUUuTk.', '..kUUkUUUkUuk..', '..kUUkUUUkUTk..', '...kkkkkkkkk...'],
  'snow-pine': ['.....k.....', '....kPk....', '...kPPPk...', '..kPPPLGk..', '..kGGGGGk..', '...kPPPk...', '..kPPPPhk..', '.kPPPLhhhk.', '.khhhhhGGk.', '.kGGGGGGGk.', '..kPPPPhk..', '.kPPPPhhhk.', 'kPPPPLhhhhk', 'khhhhhhhGGk', 'kGGGGGGGGGk', '.kkkkkkkkk.', '...kvvwk...', '...kvvwk...', '...kkkkk...'],
  'sparkle-1': ['.y.', 'yYy', '.y.'],
  'sparkle-2': ['...', '.Y.', '...'],
  'stern-lantern': ['yyO', 'yYO', 'OOo'],
  'swivel-gun': ['.kkk.', '.kNk.', '.kNk.', '.kMk.', 'kNnMk', '.kVk.', '.kkk.'],
  'tavern': ['...............kkkk......', '...............kuTk......', '........kkkkkkkkuTk......', '.......keeeeeeekuTk......', '......kRRRRRRRRkuTk......', '.....kRRRRRRRRRkuTkk.....', '....kRRRRRRRRRRRRRRRk....', '...kRRRRRRRRRRRRRRRRRk...', '..kRRRRRRRRRRRRRRRRRRRk..', '.kRRRRRRRRRRRRRRRRRRRRRk.', 'kkkkkkkkkkkkkkkkkkkkkkkkk', '.kccccccccccccccccccccck.', '.kCCCCCCCCCCCCCCCCCCCCck.', '.kCCCCCCCCCCCCCCCCCCCCck.', '.kCkkkkkCCkkkkkCCkkkkkck.', '.kCkllBkCCkllBkCCkllBkck.', '.kCkBBBkCCkBBBkCCkBBBkck.', '.kCkBBBkCCkBBBkCCkBBBkck.', '.kCkVVVkCCkVVVkCCkVVVkck.', '.kCCCCCCCCCCCCCCCCCCCCck.', '.kVVVVVVVVVVVVVVVVVVVVVk.', '.kwwwwwwwwwwwwwwwwwwwwwk.', '.kCCCCCCCCCCCCkkkkkkCCck.', '.kCCkkkkkkkCCCkVWWwkCCck.', '.kCCCkCCCkCCCCkVWWwkCCck.', '.kCCkkkkkkkCCCkVWWwkCCck.', '.kCCkyyyyOkCCCkVWWwkCCck.', '.kCCkyyyyOkCCCkVWywkCCck.', '.kCCkOOOOOkCCCkVWWwkCCck.', '.kCCkkkkkkkCCCkVWWwkCCck.', '.kCCCCCCCCCCCCkVWWwkCCck.', '.kkkkkkkkkkkkkkkkkkkkkkk.'],
  'tree': ['.....kkkkk.....', '...kkHHHhhkk...', '..kHHHhhhhhhk..', '..khhhhhhhhhk..', '..kHhGGGGhhhk..', '.kHHhhhhhHHhhk.', 'khhhhhhhhhhhhhk', 'khhhhhhGGGhhhhk', 'khhhhHHhhhGhhhk', 'khhGGhhhhhGGGGk', '.kGGGhhhhGGGGk.', '..kkkGGGGGkkk..', '.....kwwwk.....', '.....kvvwk.....', '.....kvvwk.....', '.....kvvwk.....', '....kvvvwwk....', '....kkkkkkk....'],
  'warehouse': ['........kkkkkkkkkkkkkkkkkk........', '.......keeeeeeeeeeeeeeeeeek.......', '......kRRRRRRRRRRRRRRRRRRRRk......', '.....kRRRRRRRRRRRRRRRRRRRRRRk.....', '....kRRRRRRRRRRRRRRRRRRRRRRRRk....', '...kRRRRRRRRRRRRRRRRRRRRRRRRRRk...', '..kRRRRRRRRRRRRRRRRRRRRRRRRRRRRk..', '.krrrrrrrrrrrrrrrrrrrrrrrrrrrrrrk.', 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', '.kcccccccccccccccccccccccccccccck.', '.kCCCCCCCCCCCCCCCCCCCCCCCCCCCCCck.', '.kCCCCCCCCCCCCCCCCCCCCCCCCCCCCCck.', '.kCCCCCCCCCkkkkkkkkkkkkCCkkkkkCck.', '.kCCCCCCCCCkVWWwKKVWWwkCCkVVVkCck.', '.kCCCCCCCCCkVWWwKKVWWwkCCkvvwkCck.', '.kCCCCCCCCCkMMMMKKMMMMkCCkkkkkCck.', '.kCkkkkkkkCkVWWwKKVWWwkCkkkkkkkck.', '.kCkVVVVVkCkVWWwKKVWWwkCkVVVVVkck.', '.kCkwwwwwkCkMMMMKKMMMMkCkwwwwwkck.', '.kCkvvvvwkCkVWWwKKVWWwkCkvvvvwkck.', '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.'],
  'waypoint': ['.kkkk', 'kWRRk', 'kWRRk', 'kWRrk', 'kWkkk', 'kWk..', 'kkk..'],
  'whale': ['kk....kk........', 'kBk..kBBkkkkkk..', 'kBBkkkBBlllBBBk.', '.kBBBBBBBllBBBBk', 'kBBkkkBBBBbbbbk.', 'kBk..kBbkkkkkk..', 'kk....kk........'],
  'wraith-1': ['...kkk...', '..kiiik..', '.kiKKKik.', '.kiIKIik.', '.kiKKKik.', '.kiiiiik.', 'kiiiiiiik', 'kiiiiiiik', 'kiikiikik', '.kk.kk.k.'],
  'wraith-2': ['...kkk...', '..kiiik..', '.kiKKKik.', '.kiIKIik.', '.kiKKKik.', '.kiiiiik.', 'kiiiiiiik', 'kiiiiiiik', 'kikiikiik', '.k.kk.kk.'],
  'x-mark': ['RR..RR', '.RRRR.', '..RR..', '..RR..', '.RRRR.', 'RR..RR']
};

const cache = new Map<string, Art>();

function grow(rows: string[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const wide = r.split('').map((c) => c.repeat(SCALE)).join('');
    for (let i = 0; i < SCALE; i++) out.push(wide);
  }
  return out;
}

function shadowed(rows: string[]): string[] {
  const w = rows[0].length;
  const base = rows[rows.length - 1];
  let x0 = base.search(/[^.]/);
  let x1 = w - 1 - base.split('').reverse().join('').search(/[^.]/);
  if (x0 < 0) return rows;
  const line = (a: number, b: number) => {
    let s = '';
    for (let x = 0; x < w + 3; x++) s += x >= a && x <= b ? ',' : '.';
    return s;
  };
  return [...rows.map((r) => r + '...'), line(x0 + 1, x1 + 3), line(x0 + 3, x1 + 1)];
}

export function rd(name: string, fallback: Art): Art {
  const r = ROWS[name];
  if (!r) return fallback;
  const key = name + (fallback.rows.some((row) => row.includes(',')) ? '+s' : '');
  let a = cache.get(key);
  if (!a) {
    const g = grow(r);
    a = art(key.endsWith('+s') ? shadowed(g) : g);
    cache.set(key, a);
  }
  return a;
}

export function rdList(names: string[], fallback: Art[]): Art[] {
  return fallback.map((a, i) => rd(names[Math.min(i, names.length - 1)], a));
}
