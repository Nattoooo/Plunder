import { art, Art, Swap } from './palette';
import { rd } from './redraw';

const SACK = art([
  '................',
  '......kkkkk.....',
  '....kkPPPPpkk...',
  '...kPPPpPPPPCk..',
  '..kFkpPPPPPCkDk.',
  '..kFfkkkkkkkfDk.',
  '...kFffffffDDk..',
  '..kFfffffffffDk.',
  '.kFffffDffffffDk',
  '.kFfffffffffffDk',
  '.kFffffffffDffDk',
  '.kFffDffffffffDk',
  '.kffffffffffDDdk',
  '..kDffffffDDDdk.',
  '...kkkkkkkkkkk..',
  '...,,,,,,,,,,,..'
]);

const TOBACCO = art([
  '.......kk.......',
  '......kVvk......',
  '.kk...kVvk...kk.',
  'kVvk.kVVvWk.kVvk',
  'kVvWkkVVvWkkVvWk',
  '.kVvWkVVvWkVvWk.',
  '.kVvvWkVvWkVvWk.',
  '..kVvWkVvWkvWk..',
  '...kVvkVvWkWk...',
  '....kVkVvWkk....',
  '.....kkVvkk.....',
  '.....kXxXxk.....',
  '......kjJk......',
  '......kjJk......',
  '.......kk.......',
  '.....,,,,,,.....'
]);

const COFFEE = art([
  '...kkk....kkk...',
  '..kJvJk..kJvJk..',
  '.kJvJjJkkJvJjJk.',
  '.kvJJjJkkvJJjJk.',
  '.kJJjJJkkJJjJJk.',
  '.kJJjJJkkJJjJJk.',
  '.kJJjJkkkJJjJjk.',
  '..kJjkJvJkJjjk..',
  '...kkJvJjJkkk...',
  '....kvJJjJk.....',
  '....kJJjJJk.....',
  '....kJJjJJk.....',
  '....kJJjJjk.....',
  '.....kJjjk......',
  '......kkk.......',
  '....,,,,,,,.....'
]);

const TEA = art([
  '................',
  '.kkkkkkkkkkkkkk.',
  '.kVVVVVVVVVVVVk.',
  '.kVWWWWWWWWWWvk.',
  '.kVWvvvvvvvvWvk.',
  '.kVWvvvkkvvvWvk.',
  '.kVWvvkHhkvvWvk.',
  '.kVWvkHHhGkvWvk.',
  '.kVWvkHhGGkvWvk.',
  '.kVWvkhGGgkvWvk.',
  '.kVWvvkGgkvvWvk.',
  '.kVWvvvkkvvvWvk.',
  '.kVWWWWWWWWWWvk.',
  '.kvvvvvvvvvvvvk.',
  '.kkkkkkkkkkkkkk.',
  '..,,,,,,,,,,,,,.'
]);

const BOLT = art([
  '................',
  '....kkkkkkkkkkk.',
  '...kEeEkEEEEEEEk',
  '...kERRkEpEEEEek',
  '...kEkRkeeeeeeek',
  '...kRRekeeeeeeek',
  '...keRekRRRRRRRk',
  '.kkkkkkkkkkkkkk.',
  'kEeEkEEEEEEEk...',
  'kERRkEpEEEEek...',
  'kEkRkeeeeeeek...',
  'kRRekeeeeeeek...',
  'keRekRRRRRRRk...',
  '.kkkkkkkkkkk....',
  '.,,,,,,,,,,,....',
  '................'
]);

const COTTON = art([
  '................',
  '.....kkk.kkk....',
  '....kPPPkPPPk...',
  '...kPPpPkPPpPk..',
  '..kkPPPpkPPPpkk.',
  '.kPPkPppkpPpkPPk',
  '.kPPPkkPPPkkPPCk',
  '.kPpPPPPpPPPPpCk',
  '..kpPPPPPPPPpCk.',
  '..kWkppPPPpCkWk.',
  '...kWWkkCCkkWWk.',
  '....kWWWkkWWWk..',
  '.....kkWWWWkk...',
  '.......kWWk.....',
  '.......kWk......',
  '.....,,,,,,.....'
]);

const SALT = art([
  '................',
  '................',
  '.......kkkk.....',
  '.....kkPPPpkk...',
  '....kPPPPpppCk..',
  '..kkkkkkkkkkkkk.',
  '..kUUUUUUUUUUuk.',
  '..kkkkkkkkkkkkk.',
  '...kUuuuuuuuTk..',
  '..kUuuuuuuuuuTk.',
  '..kUuBBBBBBBuTk.',
  '..kUuuuuuuuuTTk.',
  '..kuuuuuuuuTTtk.',
  '...kuuuuuuTTtk..',
  '....kkkkkkkkk...',
  '...,,,,,,,,,,...'
]);

const COCOA = art([
  '.......kk.......',
  '......kJJk......',
  '.....kkJJkk.....',
  '....kQQqqqqk....',
  '...kQQqRqqRqk...',
  '..kQQqqRqqRqrk..',
  '..kQqqRqqqRqrk..',
  '.kQQqqRqqqRqqrk.',
  '.kQqqqRqqqRqqrk.',
  '.kQqqqRqqqRqrrk.',
  '..kqqqRqqRqqrk..',
  '..kqqqRqqRqrrk..',
  '...kqqRqqRrrk...',
  '....kkqRqrrk....',
  '......kkkk......',
  '.....,,,,,,.....'
]);

const INDIGO = art([
  '................',
  '................',
  '................',
  '....kkkkkkkk....',
  '...kLLLLLLLLk...',
  '...kllllllllk...',
  '...kBBBbBBBBk...',
  '...kBBBBBBBbk...',
  '.kkkkkkkkkkkkkk.',
  '.kLLLLLLkLLLLLLk',
  '.kllllllkllllllk',
  '.kBBbBBBkBBBbBBk',
  '.kBBBBBbkBBBBBbk',
  '.kbbbbbbkbbbbbbk',
  '.kkkkkkkkkkkkkk.',
  '.,,,,,,,,,,,,,,.'
]);

const WINE = art([
  '.......kk.......',
  '......kVVk......',
  '......kvvk......',
  '......kkkk......',
  '......krRk......',
  '......krRk......',
  '.....krrRRk.....',
  '....krrRERrk....',
  '....krRERRrk....',
  '....kCCCCCck....',
  '....kCrRrCck....',
  '....kCCCCCck....',
  '....krRERRrk....',
  '....krRRRRrk....',
  '.....kkkkkk.....',
  '....,,,,,,,,....'
]);

const RUM = art([
  '................',
  '.......kk.......',
  '......kVVk......',
  '......kkkk......',
  '......kwWk......',
  '......kwWk......',
  '.....kwWWWk.....',
  '...kkwWOWWWkk...',
  '..kwWOyOWWWWwk..',
  '.kwWOyOWWWWWWwk.',
  '.kwWCCCCCCCCWwk.',
  '.kwWCCCCCCCCWwk.',
  '.kwWCCCCCCCCWwk.',
  '..kwwWWWWWWwwk..',
  '...kkkkkkkkkk...',
  '..,,,,,,,,,,,,..'
]);

const FURS = art([
  '......kkkk......',
  '.....kDkkDk.....',
  '.....kDfDDk.....',
  '......kDDk......',
  '.kk..kDfFDk..kk.',
  'kDDkkDfFFfDkkDdk',
  '.kDDDDfFFfDDDdk.',
  '..kDDfFFFFfDdk..',
  '..kDDfFFFFfDdk..',
  '..kDDfFFFFfDdk..',
  '.kDDDDfFFfDDDdk.',
  'kDDkkDDffDDkkDdk',
  '.kk..kDDDdk..kk.',
  '......kDdk......',
  '.......kdk......',
  '........k.......'
]);

const OIL = art([
  '................',
  '...........kk...',
  '..........knk...',
  '.........knk..k.',
  '......kkknk..kyk',
  '.....kNnnk...kOk',
  '....kNnnnnk...k.',
  '...kkkkkkkkk....',
  '...kNnnnnnMk....',
  '..kNnkkkkknMk...',
  '..kNnkyYyknMk...',
  '..kNnkyOOknMk...',
  '..kNnkkkkknMk...',
  '..knnnnnnnMMk...',
  '...kkkkkkkkk....',
  '..,,,,,,,,,,,...'
]);

const PORCELAIN = art([
  '................',
  '.....kkkkkk.....',
  '.....kPPPCk.....',
  '......kPCk......',
  '......kPCk......',
  '.....kPPPCk.....',
  '....kPBPPBCk....',
  '...kPPPBBPPCk...',
  '...kPBPPPPBCk...',
  '...kPPBBBBPCk...',
  '...kPBPPPPBCk...',
  '....kPPBBPCk....',
  '.....kPPPCk.....',
  '.....kBBBbk.....',
  '.....kkkkkk.....',
  '....,,,,,,,,....'
]);

const AMBER = art([
  '................',
  '.......kkk......',
  '.....kkYyOk.....',
  '....kYyyOOOk....',
  '...kYyOOOOOok...',
  '..kYyOOOOOOOok..',
  '..kyOOOjOjOOok..',
  '.kyOOOOOjOOOook.',
  '.kyOOOOjjjOOook.',
  '.kOOOOOOjOOOook.',
  '.kOOOOOjOjOoook.',
  '..kOOOOOOOoook..',
  '...koOOOooook...',
  '....kkooookk....',
  '......kkkk......',
  '....,,,,,,,,....'
]);

const HARDTACK = art([
  '................',
  '................',
  '.....kkkkkkkkk..',
  '....kFFFFFFFFfk.',
  '....kFdFFdFFdfk.',
  '....kFFFFFFFFfk.',
  '.kkkkkkkkkFdFfk.',
  'kFFFFFFFFfkFFfk.',
  'kFdFFdFFdfkffDk.',
  'kFFFFFFFFfkkkk..',
  'kFFFFFFFFfk.....',
  'kFdFFdFFdfk.....',
  'kFFFFFFFFfk.....',
  'kffffffffDk.....',
  '.kkkkkkkkk......',
  '.,,,,,,,,,......'
]);

const HAM = art([
  '................',
  '.......kkkkk....',
  '.....kkxEEEekk..',
  '....kxEEeeeeeRk.',
  '...kxEeeeeeeeRk.',
  '...kxeeeeeeeeRk.',
  '...kxeeeeeeeRRk.',
  '...kxReeeeeRRk..',
  '....kxRReRRRk...',
  '.....kxxRRRk....',
  '......kkpPk.....',
  '.......kpPk.....',
  '.....kkpPk......',
  '....kPpkPk......',
  '....kPPkk.......',
  '.....kk.........'
]);

const FRUIT = art([
  '................',
  '......kk........',
  '.....khHk.......',
  '...kkkJkkk......',
  '..kQQYQQqqk.....',
  '.kQYQQQQqqqk....',
  '.kQQQQQQqqqk....',
  '.kQQQQQQkkkkk...',
  '.kQQQQQkHHhhhk..',
  '.kqQQQkHHhhhhhk.',
  '..kqqqkHhhhhhGk.',
  '...kkkkhhhhhGGk.',
  '......khhhhGGGk.',
  '.......kGGGGGk..',
  '........kkkkk...',
  '....,,,,,,,,,...'
]);

const WATER = art([
  '................',
  '.....kkkkkk.....',
  '...kkVVVVVVkk...',
  '..kVlLLLLLLlVk..',
  '..kVBllllllBVk..',
  '..kkVVVVVVVVkk..',
  '..knNnnnnnnnMk..',
  '.kWVvvvvvvvvvWk.',
  '.kWVvWvvvWvvvWk.',
  '.kWVvWvvvWvvvWk.',
  '.knNnnnnnnnnnMk.',
  '.kWVvWvvvWvvvWk.',
  '..kVvvvvvvvvWk..',
  '..knNnnnnnnnMk..',
  '...kkkkkkkkkk...',
  '..,,,,,,,,,,,,..'
]);

const TANKARD = art([
  '................',
  '................',
  '...kkkkkkkk.....',
  '..kOyYyyyOok....',
  '..knNNNNNNMkkkk.',
  '..kVvvWvvvWkWWWk',
  '..kVvvWvvvWkkkWk',
  '..kVvvWvvvWk.kWk',
  '..knNNNNNNMk.kWk',
  '..kVvvWvvvWkkkWk',
  '..kVvvWvvvWkWWWk',
  '..kVvvWvvvWkkkk.',
  '..knNNNNNNMk....',
  '...kkkkkkkk.....',
  '................',
  '..,,,,,,,,,,....'
]);

const REMEDY = art([
  '................',
  '......kkkk......',
  '......kVVk......',
  '......kkkk......',
  '......kLlk......',
  '.....kLllLk.....',
  '....kLllllLk....',
  '...kLhhhhhhLk...',
  '...kLhHhhhhGk...',
  '..kLhpppppphGk..',
  '..kLhppRRpphGk..',
  '..kLhpRRRRphGk..',
  '..kLhppRRpphGk..',
  '...kGhpppphGk...',
  '....kkkkkkkk....',
  '...,,,,,,,,,,...'
]);

const FISH = art([
  '................',
  '.......kk.......',
  '......kBBk......',
  '.....kkkkk....kk',
  '...kkBBBBBkk.kBk',
  '..kBBBBBBBBBkkBk',
  '.kBPkBBBBBBBBBBk',
  'klllllllllllllk.',
  'kLLllllllllllBBk',
  '.kpppppllllBBkBk',
  '..kppppppBBkk.kk',
  '...kkkkkkkk.....',
  '................',
  '....,,,,,,,,....',
  '................',
  '................'
]);

const SHOT_STACK = art([
  '................',
  '......kkkk......',
  '.....kNnMMk.....',
  '....knnMMMmk....',
  '....knMMMMmk....',
  '....kMMMMmmk....',
  '....kMMMmmmk....',
  '..kkkkmmmmkkkk..',
  '.kNnMMkkkkNnMMk.',
  'knnMMMmkknnMMMmk',
  'knMMMMmkknMMMMmk',
  'kMMMMmmkkMMMMmmk',
  'kMMMmmmkkMMMmmmk',
  '.kmmmmk..kmmmmk.',
  '..kkkk....kkkk..',
  '.,,,,,,,,,,,,,,.'
]);

const CHAIN = art([
  '.kkkkk..........',
  'kNnMMmk.........',
  'knMMMmk.........',
  'kMMMMmk.........',
  'kMMMmmk.........',
  'kmmmmmkk........',
  '.kkkkkkUk.......',
  '......kuUk......',
  '.......kUuk.....',
  '........kUukkkk.',
  '........kkNnMMmk',
  '.........knMMMmk',
  '.........kMMMMmk',
  '.........kMMMmmk',
  '.........kmmmmmk',
  '..........kkkkk.'
]);

const GRAPE = art([
  '.......kk.......',
  '......kVvk......',
  '......kvVk......',
  '......kkkk......',
  '.....knMMk......',
  '.....kMMmk......',
  '....kkkkkkk.....',
  '...knMMknMMk....',
  '...kMMmkMMmk....',
  '...kMmmkMmmk....',
  '..kkkkkkkkkkk...',
  '.knMMknMMknMMk..',
  '.kMMmkMMmkMMmk..',
  '.kMmmkMmmkMmmk..',
  '..kkk.kkk.kkk...',
  '..,,,,,,,,,,,...'
]);

const HEATED = art([
  '................',
  '.....q...q......',
  '......q...q.....',
  '.....q...q......',
  '.....kkkkkk.....',
  '...kkyYyQQQkk...',
  '..kyYYyQQQQqqk..',
  '..kyYyQQQQQqqk..',
  '.kyyQQQQQQQqqek.',
  '.kQQQQQQQQqqqek.',
  '.kQQQQQQQqqqeek.',
  '.kqQQQQQqqqeeek.',
  '..kqqQqqqqeeRk..',
  '..keqqqqqeeRRk..',
  '...kkeeeeRRkk...',
  '.....kkkkkk.....'
]);

const BOMB = art([
  '............Y...',
  '...........QyQ..',
  '............Q...',
  '..........kk....',
  '.........kVk....',
  '.......kkkk.....',
  '.....kknNMkk....',
  '....knNkkkkMk...',
  '...knNMMMMMmmk..',
  '..knNMMMMMMMmmk.',
  '..knMMMMMMMMmmk.',
  '..kMMMMMMMMmmmk.',
  '..kMMMMMMMmmmmk.',
  '...kMMMMmmmmmk..',
  '....kkmmmmmkk...',
  '......kkkkk.....'
]);

const POUCH = art([
  '................',
  '.......kk.......',
  '......kXXk......',
  '....kkkkkkkk....',
  '...kVvkXXkvWk...',
  '....kkvvvvkk....',
  '...kVvvvvvvWk...',
  '..kVvvvvvvvvWk..',
  '..kVvvvvvvvvWk..',
  '..kVvvvvvvvvWk..',
  '..kvvvvvvvvWWk..',
  '...kkkkkkkkkkkk.',
  '.kkk.....kUuk.k.',
  'kUuTk...kUuTkUuk',
  'kuTTk...kuTTkuTk',
  '.kkk.....kkk.kk.'
]);

const PLANKS = art([
  '................',
  '................',
  '....kkkkkkkkkkkk',
  '...kDkVVVVVVVVVk',
  '...kdkvvvWvvvvvk',
  '..kkkkkkkkkkkkkk',
  '.kDkVVVVVVVVVVk.',
  '.kdkvvvvvvWvvvk.',
  'kkkkkkkkkkkkkkk.',
  'kDkVVVVVVVVVVk..',
  'kdkvvWvvvvvvvk..',
  'kkkkkkkkkkkkkk..',
  '.,,,,,,,,,,,,,..',
  '................',
  '................',
  '................'
]);

const INGOTS = art([
  '................',
  '................',
  '................',
  '................',
  '.....kkkkkk.....',
  '....kNUNNNNk....',
  '....knnnnnnk....',
  '....kMMMMMMk....',
  '.kkkkkkkkkkkkkk.',
  'kNUNNNNkkNUNNNNk',
  'knnnnnnkknnnnnnk',
  'kMMMMMMkkMMMMMMk',
  'kkkkkkkkkkkkkkkk',
  '.,,,,,,,,,,,,,,.',
  '................',
  '................'
]);

const GEAR = art([
  '......kkkk......',
  '..kk..kYyk..kk..',
  '.kYyk.kyOk.kyOk.',
  '.kyOkkkyOkkkOok.',
  '..kkyyyOOOOOokk.',
  '...kyOOkkkOOok..',
  'kkkyOOk...kOOokk',
  'kYyyOk.....kOOok',
  'kyOOOk.....kOooo',
  'kkkOOk.....kOokk',
  '...kOOk...kOook.',
  '..kkOOOkkkOookk.',
  '.kyOkOOOOOookOok',
  '.kOok.kOok.kook.',
  '..kk..kook..kk..',
  '......kkkk......'
]);

const ROPE = art([
  '................',
  '.....kkkkkk.....',
  '...kkFfFfFfkk...',
  '..kFfkkkkkkfFk..',
  '.kFfkDfFfDkkfFk.',
  '.kfkDkkkkkkDkfk.',
  'kFfkfkk..kkfkFfk',
  'kfFkFk....kFkfFk',
  'kFfkfk....kfkFfk',
  'kfFkDkk..kkDkfFk',
  '.kFkkDkkkkDkkFk.',
  '.kfFkkDfFDkkFfk.',
  '..kfFkkkkkkFfk..',
  '...kkfFfFfFkkFk.',
  '.....kkkkkk.kfk.',
  '............kk..'
]);

const SAILCLOTH = art([
  '................',
  '................',
  '................',
  '...kkkkkkXkkkk..',
  '..kpPPPPPXPPPpk.',
  '..kCpppppXppppk.',
  '..kkkkkkkXkkkkk.',
  '.kpPPPPPPXPPPPpk',
  '.kCppppppXpppppk',
  '.kkkkkkkkXkkkkkk',
  '.kpPPPPPPXPPPPpk',
  '.kCppppppXpppppk',
  '.kcCCCCCCXCCCCck',
  '.kkkkkkkkkkkkkkk',
  '.,,,,,,,,,,,,,,.',
  '................'
]);

const TAR = art([
  '................',
  '...........kk...',
  '..........kVk...',
  '.........kVk....',
  '...kkkkkkVkkk...',
  '..kVmmmkVkmmVk..',
  '..kVmTmkkmmmVk..',
  '..kkkmkkkkkkkk..',
  '..kVvmWvvvWvwk..',
  '..knNmnnnnnnMk..',
  '...kvmWvvvWwk...',
  '...kvvWvvvWwk...',
  '...knNnnnnnMk...',
  '....kkkkkkkk....',
  '................',
  '...,,,,,,,,,,...'
]);

const SHOVEL = art([
  '............kkk.',
  '...........kVVVk',
  '...........kVkVk',
  '..........kVVVk.',
  '.........kWVk...',
  '........kWVk....',
  '.......kWVk.....',
  '......kWVk......',
  '.....kWVk.......',
  '...kknkk........',
  '..kNNnnk........',
  '.kNNnnnmk.......',
  '.kNnnnmmk.......',
  '.kNnnmmk........',
  '..knmmk.........',
  '...kkk..........'
]);

const SPYGLASS = art([
  '................',
  '................',
  '................',
  '..........kkkkk.',
  '......kkkkkYyOok',
  '.kkkkkkYyOkjJJjk',
  'kYyOkkkyOOkJvJjk',
  'kyOOkJJyOOkJJJjk',
  'kOooKjjoOokJJjjk',
  '.kkkkkkooOkjjjjk',
  '......kkkkkyOook',
  '..........kkkkk.',
  '................',
  '......,,,,,,,,,.',
  '................',
  '................'
]);

const COMPASS = art([
  '................',
  '.....kkkkkk.....',
  '...kkyYYyyOkk...',
  '..kyYkkkkkkOok..',
  '.kyYkppPPpCkOok.',
  '.kYkppPkPpppkOk.',
  'kyYkpPkRkppCkOok',
  'kYkppPkRkpppCkOk',
  'kykppppkpppCCkok',
  'kykCppkUkppCCkok',
  '.kokCpkUkpCCkok.',
  '.kOokCCkCCCkook.',
  '..kOokkkkkkook..',
  '...kkOoooookk...',
  '.....kkkkkk.....',
  '....,,,,,,,,....'
]);

const SEXTANT = art([
  '.......kk.......',
  '......kYOk......',
  '......kOOk......',
  '.....kOkkOk.....',
  '....kOkLkkOk....',
  '...kOk.kk..kOk..',
  '..kOk..kk...kOk.',
  '..kOk..kk...kOk.',
  '.kOk...kk....kOk',
  '.kOk..kOk....kOk',
  'kOk...kOk.....kk',
  'kOkkkkkOkkkkkkOk',
  'kYyyyyyyyyyyyyOk',
  '.kOoOoOoOoOoOok.',
  '..kkkkkkkkkkkk..',
  '...,,,,,,,,,,...'
]);

const LOCKPICK = art([
  '.....kkkkk......',
  '....kUuuuTk.....',
  '...kUk...kTk....',
  '...kuk...kTk....',
  '...kuk...kTk....',
  '....kTk.kTk.....',
  '...kkkTkTkkkk...',
  '..kyOykkkkUkUk..',
  '..kO.OkkUkkUk...',
  '..kyOyk.kUkUk...',
  '...kyk..kUkUk...',
  '...kyk..kUkkUk..',
  '...kyk..kUk.kUk.',
  '...kyykk.kk.kkk.',
  '...kyOyk........',
  '....kkk.........'
]);

const TOOLBOX = art([
  '................',
  '................',
  '.....kkkkkk.....',
  '....kNnnnnMk....',
  '....kNk..kMk....',
  '.kkkkkkkkkkkkkk.',
  'kEeeeeeeeeeeeeRk',
  'keeeeeeeeeeeeeRk',
  'kkkkkkknnkkkkkkk',
  'keeeeeekNkeeeeRk',
  'keeeeeekkkeeeeRk',
  'keeeeeeeeeeeeeRk',
  'kRRRRRRRRRRRRRRk',
  'kkkkkkkkkkkkkkkk',
  '.,,,,,,,,,,,,,,.',
  '................'
]);

const NET = art([
  '................',
  '.kqk........kqk.',
  'kQqqkkkkkkkkQqqk',
  '.kkJkkJkkJkkJkk.',
  '..J..J..J..J..J.',
  '..JJJJJJJJJJJJJ.',
  '..J..J..J..J..J.',
  '..J..J..J..J..J.',
  '..JJJJJJJJJJJJJ.',
  '..J..J..J..J..J.',
  '..J..J..J..J..J.',
  '..JJJJJJJJJJJJJ.',
  '...J..J..J..J...',
  '....JJJJJJJJ....',
  '................',
  '................'
]);

const HELMET = art([
  '................',
  '.....kkkkkk.....',
  '...kkyYYyyOkk...',
  '..kyYyyyyyOOok..',
  '.kyYykkkkkkOOok.',
  '.kYyklLLlLbkOok.',
  'kyYyklLlllbkOook',
  'kYyykllllbbkOook',
  'kyyykllbbbbkOook',
  'kyOOkkbbbbbkOook',
  '.kOOOkkkkkkOOok.',
  '.kNnnnnnnnnnnMk.',
  'kNnknknknknknnMk',
  'knnnnnnnnnnnnMMk',
  '.kkkkkkkkkkkkkk.',
  '..,,,,,,,,,,,,..'
]);

const CUTLASS = art([
  '..............kk',
  '.............kPk',
  '............kPUk',
  '...........kPUuk',
  '..........kPUuk.',
  '.........kPUXuk.',
  '........kPUuuk..',
  '.......kPUXuk...',
  '..kk..kPUuuk....',
  '.kyOkkPUuuk.....',
  '.kykOkUuuk......',
  '..kkyOkuk.......',
  '..kJkyOk........',
  '.kJjkkyOk.......',
  'kJjk..kyk.......',
  'kkk....k........'
]);

const AXE = art([
  '.....kkkkk......',
  '...kkNNnnMk.....',
  '..kNNnnnnMk.....',
  '.kNnnnnnMMkkk...',
  '.kNnnnnMMkVvk...',
  '..kNnnMMkVvkUk..',
  '...kkkkkVvk.kk..',
  '.......kVvk.....',
  '......kVvk......',
  '.....kVvk.......',
  '....kVvk........',
  '...kVvk.........',
  '..kVvk..........',
  '.knNk...........',
  '.kMk............',
  '..k.............'
]);

const RAPIER = art([
  '...............k',
  '..............kP',
  '.............kPk',
  '............kPk.',
  '...........kPk..',
  '..........kPk...',
  '.........kPk....',
  '........kPk.....',
  '...kkk.kUk......',
  '..kyOOkUk.......',
  '.kyk.kyk........',
  '.kOk.kyOk.......',
  '..kkyOkyOk......',
  '..kJkk.kOk......',
  '.kJjk...kk......',
  '.kkk............'
]);

const FLINTLOCK = art([
  '................',
  '................',
  '...kk...........',
  '..kMkk..........',
  '..kNMk.kkkkkkkk.',
  '.kkkkkkNNNNNNNNk',
  'kWVVVVknnnnnnnnk',
  'kWVyyVkkkkkkkkk.',
  'kWVVVVVWk.......',
  '.kWVVVWWk.......',
  '..kWVWWk........',
  '..kWVWk.kk......',
  '.kWVWWk.........',
  '.kWVWk..........',
  '.kyOk...........',
  '..kk............'
]);

const BLUNDERBUSS = art([
  '..........kkkkkk',
  '.........kYyyyyk',
  '.........kymmmOk',
  '........kyOmmmOk',
  '.......kyOOkmOOk',
  '......kyOOk.kkk.',
  '.....kyOOk......',
  '....kyOOk.......',
  '...kVOOkk.......',
  '..kVVVkMk.......',
  '..kVVWkk........',
  '.kVVWkOk........',
  'kVVWk.kk........',
  'kVWWk...........',
  'kWWk............',
  '.kk.............'
]);

const MUSKET = art([
  '..............kk',
  '.............kNk',
  '............kNk.',
  '...........kNk..',
  '..........kNk...',
  '.........kVk....',
  '........kVWk....',
  '.......kVWk.....',
  '....kkkVWk......',
  '....kMkVWk......',
  '.....kVWkk......',
  '....kVVWk.......',
  '...kVVWk........',
  '..kVVWWk........',
  '.kVWWWk.........',
  '.kkkkk..........'
]);

const VEST = art([
  '................',
  '...kkk....kkk...',
  '..kVvWk..kVvWk..',
  '..kVvvWkkVvvWk..',
  '.kVvvvWkkVvvvWk.',
  '.kVvvvvWkVvvvWk.',
  '.kVvvyvWkVyvvWk.',
  '.kVvvvvWkVvvvWk.',
  '.kVvvyvWkVyvvWk.',
  '.kVvvvvWkVvvvWk.',
  '.kVvvyvWkVyvvWk.',
  '.kVvvvvWkVvvvWk.',
  '.kWWWWWWkWWWWWk.',
  '.kkkkkkkkkkkkkk.',
  '................',
  '..,,,,,,,,,,,,..'
]);

const TRICORN = art([
  '................',
  '................',
  '......kkkk......',
  '....kkMmmmkk....',
  '...kMmmmmmmmk...',
  '..kMmmmmmmmmmk..',
  'kkkMmmmmmmmmmkkk',
  'kyOkkmmmmmmkkOyk',
  '.kyOOkkmmkkOOyk.',
  '..kyOmmkkmmOyk..',
  '...kyOmmmmOyk...',
  '....kyOmmOyk....',
  '.....kyOOyk.....',
  '......kyyk......',
  '.......kk.......',
  '....,,,,,,,,....'
]);

const COAT = art([
  '....kkkkkkkk....',
  '...kRkpPPpkRk...',
  '..kRRkkpPkkRRk..',
  '.kRRRekkkkeRRRk.',
  'kRReRekRRkeReRRk',
  'kReRRekRRkeRReRk',
  'kReRRekyykeRReRk',
  'kyyRRekRRkeRRyyk',
  'kOOkRekyykeRkOOk',
  '.kk.RekRRkeR.kk.',
  '...kRekyykeRk...',
  '...kRekRRkeRk...',
  '...kReRRRReRk...',
  '...krrrkkrrrk...',
  '...kkkk..kkkk...',
  '................'
]);

const COINS = art([
  '................',
  '................',
  '.......kkkkk....',
  '......kUPPUuk...',
  '......kkkkkkk...',
  '......kUUUUuk...',
  '..kkkkkkkkkkk...',
  '.kUPPUukUUUuk...',
  '.kkkkkkkkkkkkkk.',
  '.kUUUUukUUUUPPUk',
  '.kkkkkkkkkkkkkkk',
  '.kUUUUukkUUUUUuk',
  '.kkkkkkkkkkkkkkk',
  '.kuuuuukkuuuuuuk',
  '.kkkkkkkkkkkkkk.',
  '.,,,,,,,,,,,,,,.'
]);

const DOUBLOON = art([
  '................',
  '.....kkkkkk.....',
  '...kkyYYYyykk...',
  '..kyYkkkkkkyOk..',
  '.kyYkyyyyyyOkOk.',
  '.kYkyyykkyyyOkOk',
  'kyYkyyykOkyyOkOk',
  'kYkykkkkOkkkOkOk',
  'kykyOOOkOkOOOkok',
  'kykyyyykOkyyOkok',
  '.kOkyyykOkyOOkok',
  '.kOkOyyykOOOkook',
  '..kOkOOOOOOkook.',
  '...kkOooooookk..',
  '.....kkkkkkk....',
  '....,,,,,,,,....'
]);

const ANCIENT = art([
  '................',
  '......kkkkk.....',
  '....kkfFFfDkk...',
  '...kfFkkkkkDDk..',
  '..kfFkDDDDDkDDk.',
  '..kFkDDkkkDDkDk.',
  '.kfFkDkDDDkDkDdk',
  '.kFkDDkDdDDkkDdk',
  '.kfkDDDkDDDDkDdk',
  '.kFkDDkkDDDkkDdk',
  '..kfkDDkDDkDkdk.',
  '..kDkDDkkkDDkdk.',
  '...kDkDDDDDkddk.',
  '....kkDddddkk...',
  '......kkkkk.....',
  '....,,,,,,,,....'
]);

const PEARL = art([
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '.kxxxxxxxxxxxxk.',
  '.kXxkxXkXxkxXk..',
  '..kXXXXXXXXXk...',
  '...kkkkkkkkk....',
  '.....kkkkk......',
  '....kPPPpCk.....',
  '...kPPPppCck....',
  '.kkkPppppCckkk..',
  'kxXkCpppCcckXxk.',
  'kxxXkkcccckXxxk.',
  '.kxxxXXXXXXxxk..',
  '..kkkkkkkkkkk...',
  '...,,,,,,,,,,...'
]);

const OVAL_GEM = art([
  '................',
  '................',
  '.....kkkkkk.....',
  '...kkEPEeeRkk...',
  '..kEPEeeeeeRrk..',
  '..kPERRRRRReRk..',
  '.kEPReEEeeRRerk.',
  '.kEERePEeeeRerk.',
  '.kEeReEeeeeRerk.',
  '.keeReeeeeeRrrk.',
  '..keRRRRRRRRrk..',
  '..kReeeeeeeRrk..',
  '...kkReeeeRkk...',
  '.....kkkkkk.....',
  '................',
  '.....,,,,,,.....'
]);

const STEP_GEM = art([
  '................',
  '................',
  '...kkkkkkkkkk...',
  '..kHHHHHHHHhhk..',
  '.kHkkkkkkkkkhGk.',
  '.kHkHhhhhhhkhGk.',
  '.kHkhkkkkkhkGGk.',
  '.kHkhkhhhkhkGGk.',
  '.kHkhkhhhkGkGGk.',
  '.kHkhkkkkkGkGGk.',
  '.kHkhGGGGGGkGgk.',
  '.kHkkkkkkkkkGgk.',
  '..khGGGGGGGGgk..',
  '...kkkkkkkkkk...',
  '................',
  '...,,,,,,,,,,...'
]);

const BRILLIANT = art([
  '................',
  '................',
  '....kkkkkkkk....',
  '...kPLkLLkLlk...',
  '..kPLLkLLkLllk..',
  '.kkkkkkkkkkkkkk.',
  '.kPLLlLLLlLLllk.',
  '..kLLklLLlkllk..',
  '...kLlklLklllk..',
  '....kLlkkllk....',
  '.....kLlklk.....',
  '......kLlk......',
  '.......kk.......',
  '................',
  '................',
  '.....,,,,,,.....'
]);

const RING = art([
  '................',
  '.......kk.......',
  '......kEek......',
  '.....kERRrk.....',
  '.....kRRrrk.....',
  '....kykkkkyk....',
  '...kyYyOOyyOk...',
  '..kyYkkkkkkOOk..',
  '.kyYk......kOok.',
  '.kYk........kOk.',
  '.kyk........kok.',
  '.kOk........kok.',
  '.kOok......kook.',
  '..kOOkkkkkkook..',
  '...kkooooookk...',
  '.....kkkkkk.....'
]);

const NECKLACE = art([
  'kk............kk',
  'kyk..........kOk',
  '.kyk........kOk.',
  '.kyk........kOk.',
  '..kyk......kOk..',
  '..kyk......kOk..',
  '...kyk....kOk...',
  '....kykkkkOk....',
  '.....kkyOkk.....',
  '......kOOk......',
  '.....kkkkkk.....',
  '....kHHhhGGk....',
  '....kHhhhGGk....',
  '.....khhGGk.....',
  '......kGGk......',
  '.......kk.......'
]);

const CHALICE = art([
  '................',
  '..kkkkkkkkkkkk..',
  '..kYyyyyyyyyOk..',
  '..kkkkkkkkkkkk..',
  '..kyyyyRyyyyOk..',
  '...kyyRERyyOk...',
  '...kyyyRyyyOk...',
  '....kyyyyyOk....',
  '.....kkyyOk.....',
  '......kyOk......',
  '......kyOk......',
  '.....kyBOOk.....',
  '....kkkkkkkk....',
  '...kyYyyyyyOk...',
  '...kkkkkkkkkk...',
  '...,,,,,,,,,,...'
]);

const CANDELABRA = art([
  '.......Y........',
  '..Y...kQk...Y...',
  '.kQk..kqk..kQk..',
  '.kqk..kPk..kqk..',
  '.kPk..kPk..kPk..',
  'kkPkk.kPk.kkPkk.',
  'kUUuk.kPk.kUUuk.',
  '.kUk.kUUuk.kUk..',
  '.kUkk.kUk.kkUk..',
  '..kUUkkUkkUUk...',
  '...kkUUUUUkk....',
  '......kUk.......',
  '......kUk.......',
  '....kkUUukk.....',
  '...kUUUUUuuk....',
  '...kkkkkkkkk....'
]);

const IDOL = art([
  '....kkkkkkkk....',
  '...kYyyyyyyOk...',
  '..kyYyyyyyyyOk..',
  '..kykkkyykkkOk..',
  '..kykHkyykHkOk..',
  '..kyykkyykkyOk..',
  '..kyyyyOOyyyOk..',
  '..kykkkkkkkyOk..',
  '..kykPkPkPkyOk..',
  '..kyykkkkkyyOk..',
  '...kyyyyyyyOk...',
  '..kyOkyyyykOok..',
  '..kkkyyyyyOkkk..',
  '....kyOkkyOk....',
  '...kkkkkkkkkk...',
  '...,,,,,,,,,,...'
]);

const CROWN = art([
  '................',
  '................',
  '.kk....kk....kk.',
  'kPpk..kPpk..kPpk',
  '.kk...kkkk...kk.',
  '.kyk..kyOk..kOk.',
  '.kyyk.kyOk.kOOk.',
  '.kyYykyyOOkOyOk.',
  '.kyYyyyyyyyyyOk.',
  '.kkkkkkkkkkkkkk.',
  '.kyykRkyykBkyOk.',
  '.kyykkkyykkkyOk.',
  '.kkkkkkkkkkkkkk.',
  '.kOoOoOoOoOoOok.',
  '..kkkkkkkkkkkk..',
  '..,,,,,,,,,,,,..'
]);

const FROG = art([
  '................',
  '................',
  '...kkk....kkk...',
  '..kIhkk..kkIhk..',
  '..kkkIhkkhIkkk..',
  '...kIhhhhhhhk...',
  '..kIhhhhhhhhik..',
  '..kIhkkkkkkhik..',
  '.kIhhhhhhhhhhik.',
  '.kIhkhhhhhhkhik.',
  '.kIkIhkhhkIhkik.',
  '..kkkkkkkkkkkk..',
  '...kyYyyyyyyOk..',
  '..kyYyyyyyyyyOk.',
  '..kkkkkkkkkkkkk.',
  '..,,,,,,,,,,,,,.'
]);

const HORSESHOE = art([
  '................',
  '..kkk......kkk..',
  '.kUUuk....kUuuk.',
  '.kUkuk....kUkuk.',
  '.kUuuk....kUuuk.',
  '.kUkuk....kUkuk.',
  '.kUuuk....kUuuk.',
  '.kUuuukkkkUuuuk.',
  '..kUuuhhHhuuuk..',
  '..kUuhHkkhGuuk..',
  '...kUuhGGhuuk...',
  '....kkhGGhkk....',
  '.....khGkhk.....',
  '....khGk.khk....',
  '....kkk...kk....',
  '................'
]);

const INKWELL = art([
  '..........k.....',
  '.........kZk....',
  '........kZk.....',
  '.......kZzk.....',
  '....kk.kZk......',
  '...kZzkkzk......',
  '...kzk.kkkkkk...',
  '....kk.kPPPLk...',
  '......kkkkkkkk..',
  '....kLlzzzzzlLk.',
  '...kLlzzZZzzzlk.',
  '...kLzzzzzzzzbk.',
  '...kLlzzzzzzlbk.',
  '....kLlllllbbk..',
  '.....kkkkkkkk...',
  '....,,,,,,,,,...'
]);

const SCALE = art([
  '................',
  '...kkkkkkkkkk...',
  '..kIPPIIIIIiik..',
  '.kIPIIIIIIIiiAk.',
  '.kIIIIIIIIiiiAk.',
  '.kIIIIIIIiiiAAk.',
  '.kIIIIIIiiiiAAk.',
  '.kpIIIIiiiiAAAk.',
  '..kpIIiiiiAAAk..',
  '..kIpIiiiAAAak..',
  '...kIpiiAAAak...',
  '....kIiiAAak....',
  '.....kiiAak.....',
  '......kkkk......',
  '....,,,,,,,,....',
  '................'
]);

const LANTERN = art([
  '.......kk.......',
  '......kTuk......',
  '.......kk.......',
  '....kkkkkkkk....',
  '...kTuuuuuuTk...',
  '...kkkkkkkkkk...',
  '...kTkIIIIkTk...',
  '...kTkIPPIkTk...',
  '...kTkIPPIkTk...',
  '...kTkiIIikTk...',
  '...kTkiiiikTk...',
  '...kkkkkkkkkk...',
  '...kTuuuuuuTk...',
  '....kkkkkkkk....',
  '................',
  '....,,,,,,,,....'
]);

const SKULL = art([
  '................',
  '.....kkkkkk.....',
  '...kkxpppxxkk...',
  '..kxppppppxxXk..',
  '.kxppppppppxXXk.',
  '.kxpppppppxxXXk.',
  '.kxkkkpppkkkXXk.',
  '.kxkZZkpkZZkXXk.',
  '.kxkzZkpkzZkXXk.',
  '.kxxkkxkxkkxXXk.',
  '..kxxxxkxxxXXk..',
  '...kxXkkkXXXk...',
  '...kXkXkXkXXk...',
  '...kkXkXkXkkk...',
  '....kkkkkkkk....',
  '....,,,,,,,,....'
]);

const CONCH = art([
  '................',
  '.......kk.......',
  '......kxXk......',
  '.....kkxXkk.....',
  '....kxxkXXXk....',
  '...kkkkkkkkkk...',
  '..kxkxxxXXXkXk..',
  '.kxxxxxxXXXXXXk.',
  '.kxxxkEEEEEkXXk.',
  '.kxxkEEeeeEEkXk.',
  '..kxkEeeeeeEkXk.',
  '..kxkEeeeeeEkk..',
  '...kkEeeeeEkk...',
  '....kkEeeEkk....',
  '......kEEk......',
  '.......kk.......'
]);

const TRIDENT = art([
  '..k....k....k...',
  '.kLk..kLk..kLk..',
  '.kLk..kLk..kLk..',
  '.kLlk.kLk.kLlk..',
  '.kLlk.kLk.kLlk..',
  '..kLlkkLkkLlk...',
  '..kLLllLllLLk...',
  '...kLLLLLLLk....',
  '....kkLLlkk.....',
  '......kLlk......',
  '......kLlk......',
  '.....kLlk.......',
  '......kLlk......',
  '.....kLk.k......',
  '......k.........',
  '................'
]);

const STORMGLASS = art([
  '......kkkk......',
  '......kOOk......',
  '.....kLLLLk.....',
  '....kLtTTtLk....',
  '...kLtTTTTtLk...',
  '...kLTTTTTTLk...',
  '...kLttYttlLk...',
  '...kLllYYlllk...',
  '...kLllYlllbk...',
  '...kLlYllllbk...',
  '....kLllllbk....',
  '.....kLllbk.....',
  '......kkkk......',
  '....kkyyyOkk....',
  '...kyYyyyyyOk...',
  '...kkkkkkkkkk...'
]);

const MAP = art([
  '................',
  '..kkkkkkkkkkkk..',
  '.kxFFFFFFFFFFxk.',
  '.kXkFFFFFFFFkXk.',
  '..kFFFFFFFFFFk..',
  '..kFFffffFFFFk..',
  '..kFffffffFFFk..',
  '..kFfffffffFFk..',
  '..kFFfffRFfRFk..',
  '..kFFFffFRRFFk..',
  '..kFFFFFFRRFFk..',
  '..kFFFFFRFFRFk..',
  '..kFFFFFFFFFFk..',
  '.kxkFFFFFFFFkXk.',
  '.kXxxxxxxxxxxXk.',
  '..kkkkkkkkkkkk..'
]);

const MESSAGE = art([
  '..............kk',
  '.............kVk',
  '............kkkk',
  '...........kHhk.',
  '..........kHhk..',
  '.........kHhGk..',
  '.......kkHhhGk..',
  '.....kkHhhhGk...',
  '....kHhkFFkGk...',
  '...kHhkFFkhGk...',
  '..kHhkFFkhGk....',
  '.kHhhhkkhGGk....',
  '.kHhhhhhGGk.....',
  '.kGhhhhGGk......',
  '..kGGGGkk.......',
  '...kkkk.........'
]);

const CHART = art([
  '................',
  '..kkkkkkkkkkkk..',
  '.kxCCCCCCCCCCxk.',
  '.kXkkkkkkkkkkXk.',
  '..kllllllllllk..',
  '..kllllFFllllk..',
  '..klllFFFFlllk..',
  '..kllFFhhFFllk..',
  '..kllFFhhFFllk..',
  '..klllFFFFlllk..',
  '..kllllFFllllk..',
  '..kllllllllllk..',
  '..kkkkkkkkkkkk..',
  '.kxCCCCCCCCCCxk.',
  '.kXkkkkkkkkkkXk.',
  '..kkkkkkkkkkkk..'
]);

export interface Icon {
  a: Art;
  s?: Swap;
}

const ic = (a: Art, s?: Swap): Icon => ({ a, s });

const RUST: Swap = { P: 0xb89a7a, U: 0x9a7a5a, u: 0x6a5444, X: 0x8a3a1a, y: 0x8a7a64, O: 0x5a4a3a };
const CLEAN: Swap = { X: 0xd0d0d8 };

export const ICONS: Record<string, Icon> = {
  sugar: ic(SACK),
  rum: ic(RUM),
  tobacco: ic(TOBACCO),
  coffee: ic(COFFEE),
  tea: ic(TEA),
  spices: ic(SACK, { P: 0xf08a3a, p: 0xd8601e, C: 0xa8401c }),
  silk: ic(BOLT, { E: 0xf8b0d8, e: 0xd85a9a, R: 0x9a2e66 }),
  cotton: ic(COTTON),
  salt: ic(SALT),
  cocoa: ic(COCOA),
  indigo: ic(INDIGO),
  wine: ic(WINE),
  furs: ic(FURS),
  whale_oil: ic(OIL),
  porcelain: ic(PORCELAIN),
  amber: ic(AMBER),
  rations: ic(HARDTACK),
  salted_pork: ic(HAM),
  fruit: ic(FRUIT),
  water: ic(WATER),
  grog: ic(TANKARD),
  medicine: ic(REMEDY),
  fish: ic(FISH),
  cannonball: ic(SHOT_STACK),
  chain_shot: ic(CHAIN),
  grapeshot: ic(GRAPE),
  heated_shot: ic(HEATED),
  mortar_shell: ic(BOMB),
  pistol_shot: ic(POUCH),
  planks: ic(PLANKS),
  iron_bars: ic(INGOTS),
  canvas: ic(SAILCLOTH),
  rope: ic(ROPE),
  tar: ic(TAR),
  brass: ic(GEAR),
  shovel: ic(SHOVEL),
  spyglass: ic(SPYGLASS),
  compass: ic(COMPASS),
  sextant: ic(SEXTANT),
  lockpick: ic(LOCKPICK),
  repair_kit: ic(TOOLBOX),
  fishing_net: ic(NET),
  diving_helmet: ic(HELMET),
  rusty_cutlass: ic(CUTLASS, RUST),
  cutlass: ic(CUTLASS, CLEAN),
  boarding_axe: ic(AXE),
  rapier: ic(RAPIER),
  flintlock: ic(FLINTLOCK),
  blunderbuss: ic(BLUNDERBUSS),
  musket: ic(MUSKET),
  leather_vest: ic(VEST),
  tricorn: ic(TRICORN),
  captains_coat: ic(COAT),
  silver_coins: ic(COINS),
  gold_doubloon: ic(DOUBLOON),
  pearl: ic(PEARL),
  black_pearl: ic(PEARL, { P: 0x8a8ab0, p: 0x3a3a4e, C: 0x22222e, c: 0x16161e }),
  ruby: ic(OVAL_GEM),
  sapphire: ic(OVAL_GEM, { P: 0xe0f0ff, E: 0x7aa8ff, e: 0x3a6ae0, R: 0x1a3aa0, r: 0x0e2266 }),
  emerald: ic(STEP_GEM),
  diamond: ic(BRILLIANT),
  gold_ring: ic(RING),
  necklace: ic(NECKLACE),
  chalice: ic(CHALICE),
  candelabra: ic(CANDELABRA),
  golden_idol: ic(IDOL),
  jeweled_crown: ic(CROWN),
  ancient_coin: ic(ANCIENT),
  jade_figurine: ic(FROG),
  lucky_charm: ic(HORSESHOE),
  kraken_ink: ic(INKWELL),
  mermaid_scale: ic(SCALE),
  ghost_lantern: ic(LANTERN),
  cursed_skull: ic(SKULL),
  siren_conch: ic(CONCH),
  trident_shard: ic(TRIDENT),
  storm_glass: ic(STORMGLASS),
  treasure_map: ic(MAP),
  bottle_message: ic(MESSAGE),
  sea_chart: ic(CHART)
};

for (const k in ICONS) {
  const a = rd(k.replace(/_/g, '-'), ICONS[k].a);
  if (a !== ICONS[k].a) ICONS[k] = { a };
}
