import { art, Art, Swap } from './palette';
import { rd } from './redraw';
import { Canvas, crop, hcat, mirror } from './compose';

const TREE_0 = art([
  '............gggggg............',
  '.........gggHHHHhhggg.........',
  '.......ggHHHHHHHhhhhhgg.......',
  '......gHHHHHHHHhhhhhhhhg......',
  '....ggHHHHHHHHhhhhhhhhhhgg....',
  '...gHHGHHHHHHhhhhhhhhhhhhhg...',
  '..gHHHHGHHHHhhhhhhhhhhhGhhhg..',
  '.gHHHHHhGHhhhhhhhhhhhhGhhhhhg.',
  '.gHHHHhhhGhhhhhhhhhhhGhhHHhhg.',
  'gHHHHhhhhhGhhhhhhhhhGhhHHHHhhg',
  'gHHHhhhhhhhGhhhhhhGGhhHHHHhhhg',
  'gHHhhhhhhhhhGGGGGGhhhhhHHhhhhg',
  'gHhhhhhhhhhhhhhhhhhhhhhhhhhhGg',
  'ghhhhhhhhhhhhhhhhhhhhhhhhhhGGg',
  'ghhhhhGGhhhhhhhhhhhhhhhhhGGGGg',
  'gGhhGGHHHGhhhhhhhhGGhhhhGGGGGg',
  '.gGGhHHHHhGhhhhhGGhHHhGGGGGGg.',
  '.gGhhHHHhhhGGGGGhhHHHhhGGGGGg.',
  '..gGhhhhhhhhhhhhhhhhhhhhGGGg..',
  '..gGGhhhhhhhhhhhhhhhhhGGGGGg..',
  '...gGGGhhhhhhhhhhhhGGGGGGGg...',
  '....ggGGGGGhhhhhGGGGGGGGgg....',
  '......ggGGGGGGGGGGGGGGgg......',
  '........gggGGjJJGGGggg........',
  '...........gjJJJjg............',
  '............jJDJjj............',
  '............jJDJjj............',
  '............jJDJjj............',
  '............jJDJjj............',
  '............jJDJJj............',
  '...........jJJDJJjj...........',
  '..........jJJjJJJjjj..........',
  '........,,jjj,jjj,jjj,,.......',
  '.......,,,,,,,,,,,,,,,,,,,....',
  '.........,,,,,,,,,,,,,,,......'
]);

const JUNGLE_TREE_0 = art([
  '...........gggggggg...gggggggg.........',
  '........gggHHHHHHhhggggHHHHhhhggg......',
  '......ggHHHHHHHHhhhhhhHHHHhhhhhhhgg....',
  '....ggHHHHHHHHhhhhhhhhhhhhhhhhhhhhhgg..',
  '...gHHHHHHHHhhhhhhhhhhhhhhhhhhhhhhhhhg.',
  '..gHHHHHhhhhhhhhhhhhhhhhhhhhhhhhhhhhGg.',
  '.gHHHHhhhhhhhGGGhhhhhhhhhhhGGGhhhhGGGg.',
  'gHHHhhhhhhhhGHHHGhhhhhhhhhGHHHGhhGGGGg.',
  'ghhhhhhhhhhGHHhhhGhhhhhhhGHHhhhGGGGGGg.',
  'gGhhhhhhhhhGhhhhhhGhhhhhhGhhhhhhGGGGGg.',
  'gGGhhhhhhhGhhhhhhhhGGGGGGhhhhhhhhGGGg..',
  '.gGGGGhhGGhhhhhhhhhhhhhhhhhhhhhhGGGg...',
  '..ggGGGGGGhhhhhhhhhhhhhhhhhhhhGGGGg....',
  '....gggGGGGGGhhhhhhhhhhhhhhGGGGGgg.....',
  '.......gGgggGGGGGGGGGGGGGGGGGgg........',
  '.......gG...gggGGGGjJJjGGGggg..........',
  '.......gG.......gggjJJJjggGg...........',
  '.......gg..........jJDJj.gGg...........',
  '...................jJDJj..gG...........',
  '...................jJDJj..gg...........',
  '...................jJDJj...............',
  '...................jJDJj...............',
  '...................jJDJj...............',
  '...................jJDJj...............',
  '..................jjJDJjj..............',
  '.................jJjJDJjJj.............',
  '................jJjjJDJjjJj............',
  '..............,,jjj,jjjj,jjj,,.........',
  '.............,,,,,,,,,,,,,,,,,,,.......',
  '...............,,,,,,,,,,,,,,..........'
]);

const PALM_0 = art([
  '.............gggg....................',
  '.........ggggHHHHgg..gggg............',
  '.......ggHHHHhhhhhhggHHHHgggg........',
  '.....ggHHhhhhhhGGGGhhhhhhHHHHgg......',
  '...ggHHhhhGGGGgg..ghhhhhhhhhhhHgg....',
  '..gHHhhGGgg......gHhhGGGGGGhhhhhHg...',
  '.gHhhGgg........gHhGgg....ggGGhhhHg..',
  '.ghhGg.....ggggghhGg.........ggGhhhg.',
  'gHhGg....ggHHHHhhhgjj..........gGhhg.',
  'ghGg...ggHHhhhhhhhGjJjgggg......gGhg.',
  'gGg...gHHhhGGGGGhhhgjJHHHHgg.....gGg.',
  'gg...gHhhGGg....gGhgjjhhhhhHgg....gg.',
  'g...gHhGg........ggjJjgGGGhhhHg......',
  '...gHhGg..........jJjj...ggGhhhg.....',
  '...ghGg...........jJj......gGhhg.....',
  '...gGg............jJj.......gGhg.....',
  '...gg..............jJj.......gGg.....',
  '...................jJj........gg.....',
  '...................jJDj..............',
  '....................jJj..............',
  '....................jJDj.............',
  '....................jJJj.............',
  '.....................jJj.............',
  '.....................jJDj............',
  '.....................jJJj............',
  '.....................jJDj............',
  '.....................jJJj............',
  '.....................jJDj............',
  '....................jjJJj............',
  '....................jJJDj............',
  '....................jJJJj............',
  '....................jJJDj............',
  '...................jjJJJj............',
  '...................jJJJDj............',
  '...................jJJJJjj...........',
  '..................jjJJJDJj...........',
  '.................,jjjjjjjj,..........',
  '................,,,,,,,,,,,,,........',
  '..................,,,,,,,,...........'
]);

const PINE_0 = art([
  '..........gg..........',
  '.........gHhg.........',
  '.........gHhg.........',
  '........gHHhGg........',
  '........gHhhGg........',
  '.......gHHhhGGg.......',
  '......gHHhhhhGGg......',
  '.....ggGGhhhGGGgg.....',
  '.......gHHhhhGg.......',
  '......gHHhhhhhGg......',
  '.....gHHhhhhhhGGg.....',
  '.....gHhhhhhhhGGg.....',
  '....gHHhhhhhhhhGGg....',
  '...gHHhhhhhhhhhGGGg...',
  '..ggGGGhhhhhhGGGGGgg..',
  '.....gHHhhhhhhGGg.....',
  '....gHHhhhhhhhhGGg....',
  '...gHHhhhhhhhhhhGGg...',
  '...gHhhhhhhhhhhhGGg...',
  '..gHHhhhhhhhhhhhhGGg..',
  '.gHHhhhhhhhhhhhhhGGGg.',
  'gggGGGGhhhhhhhGGGGGggg',
  '....gHHhhhhhhhhhGGg...',
  '...gHHhhhhhhhhhhhGGg..',
  '..gHHhhhhhhhhhhhhhGGg.',
  '..gHhhhhhhhhhhhhhhGGg.',
  '.gHHhhhhhhhhhhhhhhhGGg',
  'gHHhhhhhhhhhhhhhhhGGGg',
  'gGGGGGhhhhhhhhhGGGGGGg',
  '.ggggGGGGGGGGGGGGGgggg',
  '.....ggggjJJjgggg.....',
  '.........jJDj.........',
  '.........jJDj.........',
  '.........jJDj.........',
  '.......,,jJJj,,.......',
  '......,,,,,,,,,,,.....',
  '........,,,,,,,.......'
]);

const SNOW_PINE_0 = art([
  '..........PP..........',
  '.........PPpL.........',
  '.........PPpL.........',
  '........PPPppL........',
  '........gPPpLg........',
  '.......gHPPpLGg.......',
  '......gHHhPpGGGg......',
  '.....ggGGhhhGGGgg.....',
  '.......LPPPPpL........',
  '......gPPPPppLg.......',
  '.....gHPPhhpPLGg......',
  '.....gHhhhhhhhGGg.....',
  '....gHHhhhhhhhhGGg....',
  '...gHHhhhhhhhhhGGGg...',
  '..ggGGGhhhhhhGGGGGgg..',
  '.....LPPPPPpppL.......',
  '....gPPPPPPppppLg.....',
  '...gHPPhhhPPhhhPLGg...',
  '...gHhhhhhhhhhhhGGg...',
  '..gHHhhhhhhhhhhhhGGg..',
  '.gHHhhhhhhhhhhhhhGGGg.',
  'gggGGGGhhhhhhhGGGGGggg',
  '....LPPPPPPppppL......',
  '...gPPPPPPPpppppLg....',
  '..gHPPhhhPPPhhhhPLGg..',
  '..gHhhhhhhhhhhhhhhGGg.',
  '.gHHhhhhhhhhhhhhhhhGGg',
  'gHHhhhhhhhhhhhhhhhGGGg',
  'gGGGGGhhhhhhhhhGGGGGGg',
  '.ggggGGGGGGGGGGGGGgggg',
  '.....ggggjJJjgggg.....',
  '.........jJDj.........',
  '.........jJDj.........',
  '.........jJDj.........',
  '.......,,jJJj,,.......',
  '......,,,,,,,,,,,.....',
  '........,,,,,,,.......'
]);

const DEAD_TREE_0 = art([
  '.....j..............j.....',
  '.....jj............jj.....',
  '......jj....j.....jj......',
  '..j....jj...j....jj....j..',
  '..jj....jJ..jj..jJ....jj..',
  '...jj...jJ...j.jJ....jj...',
  '....jjj..jJ..jjJj..jjj....',
  '......jjjjJ..jJj.jjj......',
  '........jjJJjJJjjj........',
  '..........jJJJjj..........',
  '...........jJDj...........',
  '...........jJDj...........',
  '...........jJDj...........',
  '...........jJDjj..........',
  '...........jJDJj..........',
  '..........jJJDJj..........',
  '..........jJJDJj..........',
  '.........jJjJDJjj.........',
  '........jJj.jJjjJj........',
  '.......,jj,,jjj,,jj,......',
  '......,,,,,,,,,,,,,,,,....',
  '........,,,,,,,,,,,.......'
]);

const BUSH_0 = art([
  '.......gggggg.......',
  '....gggHHHHhhggg....',
  '...gHHHHHHhhhhhhg...',
  '..gHHHHHhhhhhhhhhg..',
  '.gHHHHhhhhhhhhhhhGg.',
  '.gHHhhhhhhhhhhhhGGg.',
  'gHhhhhhhhhGhhhhGGGGg',
  'ghhhhhhhhGGhhhGGGGGg',
  'gGhhhhhGGGhhhGGGGGGg',
  '.gGGGGGGGGGGGGGGGGg.',
  '..gggggggggggggggg..',
  '...,,,,,,,,,,,,,,...'
]);

const BERRY_BUSH_0 = art([
  '.......gggggg.......',
  '....gggHHHHhhggg....',
  '...gHHHeeHhhhhhhg...',
  '..gHHHHeRhhhhhhhhg..',
  '.gHHHHhhhhhhheehhGg.',
  '.gHHhhhhhhhhheRhGGg.',
  'gHhhheehhhGhhhhGGGGg',
  'ghhhheRhhGGhhhGGGGGg',
  'gGhhhhhGGGhhhGeeGGGg',
  '.gGGGGGGGGGGGGeRGGg.',
  '..gggggggggggggggg..',
  '...,,,,,,,,,,,,,,...'
]);

const REEDS_0 = art([
  '..jj..........',
  '.jJJj....jj...',
  '.jJJj...jJJj..',
  '.jJJj...jJJj..',
  '.jJJj.h.jJJj..',
  '..hj..h..jh...',
  '..h..hG..hh.h.',
  '.hh..hG..hG.h.',
  '.hG.hhG.hhG.G.',
  '.hG.hG..hG.hG.',
  'hhG.hGhhhGhhG.',
  'hGGhGGhGGGhGGh',
  'GGGGGGGGGGGGGG',
  '.,,,,,,,,,,,,.'
]);

const BOULDER_0 = art([
  '........mmmmmm..........',
  '.....mmmUUUUUummm.......',
  '...mmUUUUUUuuuuuumm.....',
  '..mUUUUUUuuuuuuuuuumm...',
  '.mUUUUUuuuuuuuuuuuuuum..',
  '.mUUUuuuuuuuuuuuuuuuuTm.',
  'muuuuuuuuuuuuuuuuuuuTTm.',
  'mTuuuuuuuuuuuuuuuuuTTTTm',
  'mTTuuuuuuuuuuuuuTTTTTTTm',
  'mTTTTuuuuuuuuTTTTTTTTTtm',
  '.mTTTTTTTTTTTTTTTTTTTttm',
  '.mtTTTTTTTTTTTTTTTTtttm.',
  '..mmtttttttttttttttmmm..',
  '....mmmmmmmmmmmmmmmm....',
  '...,,,,,,,,,,,,,,,,,,...'
]);

const ROCK_0 = art([
  '...mmmm...',
  '.mmUUuumm.',
  'mUUuuuuTm.',
  'muuuuuTTTm',
  'mTTuTTTTtm',
  '.mmmmmmmm.',
  '.,,,,,,,,.'
]);

const SKULL_ROCK_0 = art([
  '..........mmmmmmmmmm..........',
  '.......mmmxxxxxxxxxxmmm.......',
  '.....mmxxxxxxxxxxxxxxxxmm.....',
  '....mxxxxxxxxxxxxxxxxxxxXm....',
  '...mxxxxxxxxxxxxxxxxxxxxXXm...',
  '..mxxxxxxxxxxxxxxxxxxxxxxXXm..',
  '..mxxxxxxxxxxxxxxxxxxxxxxXXm..',
  '.mxxxxmmmmxxxxxxxxxmmmmxxxXXm.',
  '.mxxxmkkkkmxxxxxxxmkkkkmxxXXm.',
  '.mxxmkkkkkkmxxxxxmkkkkkkmxXXm.',
  '.mxxmkkkkkkmxxxxxmkkkkkkmxXXm.',
  '.mxxxmkkkkmxxxmxxxmkkkkmxxXXm.',
  '.mXxxxmmmmxxxmkmxxxmmmmxxXXXm.',
  '..mXxxxxxxxxmkkkmxxxxxxxXXXm..',
  '..mXXxxxxxxxmmmmmxxxxxxXXXXm..',
  '...mXXxxxxxxxxxxxxxxxxXXXXm...',
  '....mXXmxmxmxmxmxmxmXXXXXm....',
  '....mXXmxmxmxmxmxmxmXXXXm.....',
  '.....mmmmmmmmmmmmmmmmmmmm.....',
  '...,,,,,,,,,,,,,,,,,,,,,,,,...'
]);

const ICE_SHARD_0 = art([
  '.......b........',
  '......bPb.......',
  '......bPLb......',
  '.....bPPLb......',
  '.....bPLlb...b..',
  '..b..bPLlb..bPb.',
  '.bPb.bPLlb..bPLb',
  '.bPLbbPLllb.bPLb',
  '.bPLlbPLllbbPLlb',
  'bPPLlbPLlllbPLlb',
  'bPLLlbPLlllbPLlb',
  'bPLllbPLlllbPLlb',
  'bPLllbPLllllbllb',
  'bPLllbPLllllbllb',
  '.bbbbbbbbbbbbbbb',
  '.,,,,,,,,,,,,,,,'
]);

const TUFT_0 = art([
  '..h.....',
  '.hG..h..',
  '.Gh.hG..',
  'hGGhGGh.'
]);

const FLOWERS_0 = art([
  '..e....y..',
  '.eEe..yYy.',
  '..e....y..',
  '..h.e..h..',
  '..heEe.h..',
  '.hGhehGhh.'
]);

const MUSHROOMS_0 = art([
  '..RRRR....',
  '.ReeRRR...',
  'RRRRRRRR..',
  '..ppp.RRR.',
  '..ppp.pp..',
  '..ppp.pp..'
]);

const SHELL_0 = art([
  '...p...',
  '.ppEpp.',
  'pEpEpEp',
  '.ccccc.'
]);

const ROOF_L = art([
  '......kk',
  '......kr',
  '.....kee',
  '.....krr',
  '.....kee',
  '....kRRR',
  '....kRRR',
  '....krrr',
  '...keeee',
  '...kRRRR',
  '...kRRRR',
  '..krrrrr',
  '..keeeee',
  '..kRRRRR',
  '.kRRRRRR',
  '.krrrrrr',
  '.keeeeee',
  'kRRRRRRR',
  'krrrrrrr',
  'kkkkkkkk'
]);

const ROOF_M = art([
  'kkkkkk',
  'rrrrrr',
  'eeeeee',
  'rrrrrr',
  'eeeeee',
  'RRRRRR',
  'RRRRRR',
  'rrrrrr',
  'eeeeee',
  'RRRRRR',
  'RRRRRR',
  'rrrrrr',
  'eeeeee',
  'RRRRRR',
  'RRRRRR',
  'rrrrrr',
  'eeeeee',
  'RRRRRR',
  'rrrrrr',
  'kkkkkk'
]);

const WALL_EDGE = art([
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k',
  'k'
]);

const WALL_POST = art([
  'ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'Ww',
  'ww',
  'uT',
  'TT',
  'TT',
  'kk'
]);

const SEG_PLAIN = art([
  'wwwwwwwwww',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'cccccccccc',
  'cccccccccc',
  'wwwwwwwwww',
  'uuuuuuuuuu',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  'kkkkkkkkkk'
]);

const SEG_WINDOW = art([
  'wwwwwwwwww',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CjjjjjjjjC',
  'CjlbbWbbjC',
  'CjbbbWbbjC',
  'CjWWWWWWjC',
  'CjbbbWbbjC',
  'CjbbbWbljC',
  'CjjjjjjjjC',
  'CwDDDDDDwC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'cccccccccc',
  'cccccccccc',
  'wwwwwwwwww',
  'uuuuuuuuuu',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  'kkkkkkkkkk'
]);

const SEG_DOOR = art([
  'wwwwwwwwww',
  'CCCCCCCCCC',
  'CjjjjjjjjC',
  'CjwwwwwwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'CjwwwwwwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'CjWWwWWwjC',
  'cjwwwwwwjc',
  'cjWWwWWwjc',
  'wjWWwWWwjw',
  'ujjjjjjjju',
  'TuuuuuuuuT',
  'TTTTTTTTTT',
  'kkkkkkkkkk'
]);

const SEG_SHUTTER = art([
  'wwwwwwwwww',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'jjjjjjjjjj',
  'BjlbbWbbjB',
  'BjbbbWbbjB',
  'BjWWWWWWjB',
  'BjbbbWbbjB',
  'BjbbbWbljB',
  'jjjjjjjjjj',
  'CwDDDDDDwC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
  'cccccccccc',
  'cccccccccc',
  'wwwwwwwwww',
  'uuuuuuuuuu',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  'kkkkkkkkkk'
]);

const CHIMNEY = art([
  '.kkkkkk.',
  'kmMMMMmk',
  'kmmmmmmk',
  'kTuuuuTk',
  'kTTTTTTk',
  'kuuTuuuk',
  'kTTTTTTk',
  'kuuuuTuk',
  'kTTTTTTk',
  'kuTuuuuk'
]);

const SIGN = art([
  '.jj.........',
  '.jJjjjjjjj..',
  '..j......j..',
  '.kkkkkkkkkk.',
  '.kffffffffk.',
  '.kfyYyyyYfk.',
  '.kfyyyyyyfk.',
  '.kffffffffk.',
  '.kkkkkkkkkk.'
]);

const TOWER_0 = art([
  'kkkkkk..kkkkkk..kkkkkk..kkkk',
  'kUUUUk..kUUUUk..kUUUUk..kUUk',
  'kuuuuk..kuuuuk..kuuuuk..kuuk',
  'kuuuukkkkuuuukkkkuuuukkkkuuk',
  'kuTTTTTTTTTTTTTTTTTTTTTTTTuk',
  'kuTnnnnnnnnnnnnnnnnnnnnnnTuk',
  'kuTnNNNNNNNNNNNNNNNNNNNNnTuk',
  'kuTnNNNNNNNNNNNNNNNNNNNNnTuk',
  'kuTnNNNNNNNNNNNNNNNNNNNNnTuk',
  'kuTnNNNNNNNNNNNNNNNNNNNNnTuk',
  'kuTnnnnnnnnnnnnnnnnnnnnnnTuk',
  'kuTTTTTTTTTTTTTTTTTTTTTTTTuk',
  'kuuuuuuuuuuuuuuuuuuuuuuuuuuk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'kUUUUUUuUUUUUUuUUUUUUuUUUUUk',
  'kuuuuuuTuuuuuuTuuuuuuTuuuuuk',
  'kuuuuuuTuuuuuuTuuuuuuTuuuuuk',
  'kTTTTTTTTTTTTTTTTTTTTTTTTTTk',
  'kUUUuUUUUUUuUUUUUUuUUUUUUUuk',
  'kuuuTuuuuuuTuuuuuuTuuuuuuuTk',
  'kuuuTuuuuuuTkkkuuuTuuuuuuuTk',
  'kTTTTTTTTTTkmmkTTTTTTTTTTTTk',
  'kUUUUUUuUUUkmmkUUUuUUUUUUUuk',
  'kuuuuuuTuuukmmkuuuTuuuuuuuTk',
  'kuuuuuuTuuukkkkuuuTuuuuuuuTk',
  'kTTTTTTTTTTTTTTTTTTTTTTTTTTk',
  'kUUUuUUUUUUuUUUUUUuUUUUUUUuk',
  'kuuuTuuuuuuTuuuuuuTuuuuuuuTk',
  'kuuuTuuuuuuTuuuuuuTuuuuuuuTk',
  'kTTTTTTTTTTTTTTTTTTTTTTTTTTk',
  'kUUUUUUuUUUUUUuUUUUUUuUUUUUk',
  'kuuuuuuTuuuuuuTuuuuuuTuuuuuk',
  'kuuuuuuTuuuuuuTuuuuuuTuuuuuk',
  'kTTTTTTTTTTTTTTTTTTTTTTTTTTk',
  'kttttttttttttttttttttttttttk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkk'
]);

const FWALL_0 = art([
  'kkkk....',
  'kUUk....',
  'kuuk....',
  'kuukkkkk',
  'kuuuuuuu',
  'kkkkkkkk',
  'UUUuUUUU',
  'uuuTuuuu',
  'uuuTuuuu',
  'TTTTTTTT',
  'UuUUUUuU',
  'uTuuuuTu',
  'uTuuuuTu',
  'TTTTTTTT',
  'UUUuUUUU',
  'uuuTuuuu',
  'uuuTuuuu',
  'TTTTTTTT',
  'UuUUUUuU',
  'uTuuuuTu',
  'uTuuuuTu',
  'TTTTTTTT',
  'tttttttt',
  'kkkkkkkk'
]);

const GATE_0 = art([
  'kkkk....kkkk....kkkk....kkkk',
  'kUUk....kUUk....kUUk....kUUk',
  'kuukkkkkkuukkkkkkuukkkkkkuuk',
  'kuuuuuuuuuuuuuuuuuuuuuuuuuuk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'UUUuUUUUUkkkkkkkkkkUUUUuUUUU',
  'uuuTuuuukkuUuUuUuUkkuuuTuuuu',
  'uuuTuuukkUjjjjjjjjUkkuuTuuuu',
  'TTTTTTkkujWWWwWWWwjukkTTTTTT',
  'UuUUUUkUjWWWwWWWwWWjUkUUUuUU',
  'uTuuukUjWWWwWWWwWWWwjUkuuuTu',
  'uTuuukujWWWwWWWwWWWwjukuuuTu',
  'TTTTTkujWWWwWWWwWWWwjukTTTTT',
  'UUUuUkUjWWWwWWWwWWWwjUkUUUUU',
  'uuuTukujWWWwWWWwWWWwjukuuTuu',
  'uuuTukujWWWwWWWwWWWwjukuuTuu',
  'TTTTTkujWWWwWWWwWWWwjukTTTTT',
  'UuUUUkUjWWWwWWWwWWWwjUkUUuUU',
  'uTuuukujWWWwWWWwWWWwjukuuuTu',
  'uTuuukujWWWwWWWwWWWwjukuuuTu',
  'TTTTTkujWWWwWWWwWWWwjukTTTTT',
  'ttttTkujjjjjjjjjjjjjjukTtttt',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkk'
]);

const SWALL_0 = art([
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk',
  'kuTnNNNNnTuk'
]);

const BWALL_0 = art([
  'kkkk....',
  'kUUk....',
  'kuuk....',
  'kuukkkkk',
  'kuuuuuuu',
  'kkkkkkkk',
  'UUUuUUUU',
  'uuuTuuuu',
  'uuuTuuuu',
  'TTTTTTTT',
  'UuUUUUuU',
  'uTuuuuTu',
  'tttttttt',
  'kkkkkkkk'
]);

const FLAGPOLE_0 = art([
  '.k..........',
  'kNkkkkkkkkk.',
  'kNkBBBBBBBBk',
  'kNkBBBBBBBBk',
  'kNkBBBByBBBk',
  'kNkBBByYyBBk',
  'kNkBBBByBBBk',
  'kNkBBBBBBBBk',
  'kNkkkkkkkkk.',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kNk.........',
  'kmk.........',
  'kkkk........'
]);

const CANNON = art([
  '....kkkk....',
  '...kmMMmk...',
  '...kmMMmk...',
  '...kmMMmk...',
  '..kkmMMmkk..',
  '.kwkmMMmkwk.',
  '.kWkmmmmkWk.',
  '.kWkkkkkkWk.',
  '.kwwwwwwwwk.',
  '.kjkkkkkkjk.',
  '..k......k..'
]);

const CRATES_0 = art([
  '.kkkkkkkk.......',
  '.kVVVVVVk.......',
  '.kVvvvvVk.......',
  '.kVvVVvVkkkkkkk.',
  '.kVvvvvVkVVVVVk.',
  '.kVVVVVVkVvvvVk.',
  '.kkkkkkkkVvVvVk.',
  'kkkkkkkk.VvvvVk.',
  'kVVVVVVk.VVVVVk.',
  'kVvvvvVk.kkkkkk.',
  'kVvVVvVk........',
  'kVvvvvVk........',
  'kVVVVVVk........',
  'kkkkkkkk........'
]);

const SEG_BARNDOOR = art([
  'wwwwwwwwwwwwwwwwwwww',
  'CCCCCCCCCCCCCCCCCCCC',
  'CjjjjjjjjjjjjjjjjjjC',
  'CjWWwWWwWjjWWwWWwWjC',
  'CjWWwWWwWjjWWwWWwWjC',
  'CjWjwWWwjjjjWwWWjWjC',
  'CjWWjWWjWjjWjWWjWWjC',
  'CjWWwjjwWjjWwjjwWWjC',
  'CjWWwjjwWjjWwjjwWWjC',
  'CjWWjWWjWjjWjWWjWWjC',
  'CjWjwWWwjjjjWwWWjWjC',
  'CjWWwWWwWjjWWwWWwWjC',
  'CjWWwWWwWjjWWwWWwWjC',
  'CjjjjjjjjjjjjjjjjjjC',
  'cjWWwWWwWjjWWwWWwWjc',
  'cjWWwWWwWjjWWwWWwWjc',
  'wjWWwWWwWjjWWwWWwWjw',
  'ujjjjjjjjjjjjjjjjjju',
  'TuuuuuuuuuuuuuuuuuuT',
  'TTTTTTTTTTTTTTTTTTTT',
  'kkkkkkkkkkkkkkkkkkkk'
]);

const CROPS = art([
  '..H.....',
  '.hHh..H.',
  '.hGh.hHh',
  '..Gh.hGh',
  '.hGhh.Gh',
  '.hG.hhG.',
  '..G.hGG.',
  '.hGh.G..',
  '.hGh.Gh.',
  '..G..G..',
  ',,,,,,,,'
]);

const LOGS = art([
  '..........kkkkkk..........',
  '.........kfFFFfDk.........',
  '....kkkkkfFDDfFDkkkkk.....',
  '...kfFFFfDfFFFfDkfFFFfk...',
  '...kFfDDfDkfffDkfFDDfDk...',
  '...kfFDDfDkkkkkkfFDDfDk...',
  '...kfFFFfDkfFFFfDkfFFfk...',
  '...kkfffDkfFDDfFDkfffkk...',
  '..kfFFFfDkfFDDfFDkfFFFfk..',
  '..kFfDDfDkfFFFfDkkFfDDfDk.',
  '..kfFDDfDkkfffDkkkfFDDfDk.',
  '..kfFFFfDk.kkkkk..kfFFFfk.',
  '..kkfffDkk.........kfffkk.',
  '...kkkkkk...........kkkk..',
  '..,,,,,,,,,,,,,,,,,,,,,,,,'
]);

const SHED = art([
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'krrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrk',
  'keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek',
  'kRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRk',
  'krrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrk',
  'keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek',
  'kRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRk',
  'krrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrk',
  'keeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek',
  'kRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  '.kWwk..kkkkkkkkkkkkkkkkkkkkk..kWwk..',
  '.kWwk..kKKKKKKKKKKKKKKKKKKKk..kWwk..',
  '.kWwk..kKKKKKKKKKKKKKKKKKKKk..kWwk..',
  '.kWwk..kKKKKKKKKKKKKKKKKKKKk..kWwk..',
  '.kWwk..kNNNNNNNNNNNNNNNNNNNk..kWwk..',
  '.kWwk..kmmmmmmmmmmmmmmmmmmmk..kWwk..',
  '.kWwk..kkkkkkkkkkkkkkkkkkkkk..kWwk..',
  '.kWwk..kVVVVVVVVVVVVVVVVVVVk..kWwk..',
  '.kWwk..kwkk.............kkwk..kWwk..',
  '.kWwk..kwk...............kwk..kWwk..',
  '.kkkk..kkk...............kkk..kkkk..',
  '.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
]);

const MINE = art([
  '..............mmmmmmmmm...................',
  '..........mmmmuUUUUuuuummmm...............',
  '.......mmmuUUUUuuuuuuuuuuuummm............',
  '.....mmuUUUUuuuuuuuuuuuuuuuuuumm..........',
  '....muUUUuuuuuuuuuuuuuuuuuuuuuuumm........',
  '...muUUuuuuuuuuuuuuuuuuuuuuuuuuuuTm.......',
  '..muUuuuuuuuuuTTTTTTTTTTTuuuuuuuuTTm......',
  '..mUuuuuuuuuTTTTTTTTTTTTTTTuuuuuTTTTm.....',
  '.muuuuuuuuTTTkkkkkkkkkkkkkTTTuuuTTTTm.....',
  '.muuuuuuuTTkkWWWWWWWWWWWWWkkTTuuTTTTTm....',
  'muuuuuuuTTkWwwwwwwwwwwwwwwWkTTTTTTTTTm....',
  'muuuuuuTTTkWwkkkkkkkkkkkkwWkTTTTTTTTTTm...',
  'mTuuuuuTTTkWwkkkkkkkkkkkkwWkTTTTTTTTTTm...',
  'mTTuuuTTTTkWwkkkkkkkkkkkkwWkTTTTTTTTTtm...',
  'mTTTTTTTTTkWwkkkkkkkkkkkkwWkTTTTTTTTtttm..',
  'mTTTTTTTTTkWwkkkkkkkkkkkkwWkTTTTTTTttttm..',
  'mtTTTTTTTTkWwkkkkkkkkkkkkwWkTTTTTTtttttm..',
  'mttTTTTTTTkWwkknnkkkknnkkwWkTTTTtttttttm..',
  'mtttTTTTTTkWwknnkkkkkknnkwWkTTTttttttttm..',
  '.mtttttTTTkWwnnkkkkkkkknnwWkTtttttttttm...',
  '.mmtttttttkWwnkkkkkkkkkknwWkttttttttttm...',
  '...mmmmmmmmmmnmmmmmmmmmmnmmmmmmmmmmmmm....',
  '............n..........n..................',
  '...........n............n.................',
  '..........n..............n................',
  '..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..'
]);

const CART = art([
  '..kkkkkkkkkkkk..',
  '.kmMMMMMMMMMMmk.',
  '.kMuuTuuuTuuuMk.',
  '.kMTtTTtTTtTTMk.',
  '.kmMMMMMMMMMMmk.',
  '.kmmmmmmmmmmmmk.',
  '..kkkkkkkkkkkk..',
  '..kmmk....kmmk..',
  '..kMmk....kMmk..',
  '...kk......kk...'
]);

const RACK = art([
  '.kk.....................kk.',
  '.kWk...................kWk.',
  '.kWkkkkkkkkkkkkkkkkkkkkkWk.',
  '.kWwwwwwwwwwwwwwwwwwwwwwWk.',
  '.kWk.k...k.k...k.k...k.kWk.',
  '.kWk.kn.nk.kn.nk.kn.nk.kWk.',
  '.kWk..knk...knk...knk..kWk.',
  '.kWk..kNk...kNk...kNk..kWk.',
  '.kWk.knNnk.knNnk.knNnk.kWk.',
  '.kWk.knNnk.knNnk.knNnk.kWk.',
  '.kWk.knNnk.knNnk.knNnk.kWk.',
  '.kWk..knk...knk...knk..kWk.',
  '.kWk...k.....k.....k...kWk.',
  '.kWk...................kWk.',
  '.kWk...................kWk.',
  '.kkk...................kkk.',
  '.,,,,,,,,,,,,,,,,,,,,,,,,,.'
]);

const STILL = art([
  '.....kk.........',
  '....kOOk........',
  '....kyOk........',
  '...kkOOkk.......',
  '..koyyyOOk......',
  '.koyYyyyOOkkkkk.',
  '.kOyyyyyOOoNNNk.',
  '.kOyyyyyOOkkkNk.',
  '.koOOOOOOok.kNk.',
  '..koooooook.kNk.',
  '..kkkkkkkkk.kNk.',
  '..kmMmMmMmk.kNk.',
  '..kmQqQqQmk.kkk.',
  '..kkkkkkkkk.....',
  '.,,,,,,,,,,,,,,.'
]);

const PIER = art([
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
  'kVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVk..',
  'kvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvk..',
  'kwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwk..',
  'kVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVk..',
  'kvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvk..',
  'kwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwk..',
  'kVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVk..',
  'kvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvk..',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
  '.kWk.......kWk.......kWk........kWk.....',
  '.kWk.......kWk.......kWk........kWk.....',
  '.kwk.......kwk.......kwk........kwk.....',
  '.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..'
]);

const WATCHTOWER = art([
  '......kkkkkkkkkkkkkkkk......',
  '....kkrrrrrrrrrrrrrrrrkk....',
  '...keeeeeeeeeeeeeeeeeeeek...',
  '..kRRRRRRRRRRRRRRRRRRRRRRk..',
  '.krrrrrrrrrrrrrrrrrrrrrrrrk.',
  '.kkkkkkkkkkkkkkkkkkkkkkkkkk.',
  '...kWk...............kWk....',
  '...kWk...............kWk....',
  '...kWk...............kWk....',
  '..kkkkkkkkkkkkkkkkkkkkkkkk..',
  '..kVWVVWVVWVVWVVWVVWVVWVk...',
  '..kVWVVWVVWVVWVVWVVWVVWVk...',
  '..kkkkkkkkkkkkkkkkkkkkkkkk..',
  '..kwwwwwwwwwwwwwwwwwwwwwwk..',
  '..kkkkkkkkkkkkkkkkkkkkkkkk..',
  '...kWk..kk.......kk..kWk....',
  '...kWk...kk.....kk...kWk....',
  '...kWk....kk...kk....kWk....',
  '...kWk.....kk.kk.....kWk....',
  '...kWk......kkk......kWk....',
  '...kWk.....kk.kk.....kWk....',
  '...kWk....kk...kk....kWk....',
  '...kWk...kk.....kk...kWk....',
  '...kWk..kk.......kk..kWk....',
  '...kWkkkkkkkkkkkkkkkkkWk....',
  '...kWwwwwwwwwwwwwwwwwwWk....',
  '...kWkkkkkkkkkkkkkkkkkWk....',
  '...kWk..kk.......kk..kWk....',
  '...kWk...kk.....kk...kWk....',
  '...kWk....kk...kk....kWk....',
  '...kWk.....kk.kk.....kWk....',
  '...kWk......kkk......kWk....',
  '...kWk.....kk.kk.....kWk....',
  '...kWk....kk...kk....kWk....',
  '...kWk...kk.....kk...kWk....',
  '...kWk..kk.......kk..kWk....',
  '...kWk.kk.........kk.kWk....',
  '...kWkkk...........kkkWk....',
  '...kWk...............kWk....',
  '..kkWkk.............kkWkk...',
  '..,,,,,,,,,,,,,,,,,,,,,,,,..'
]);

const SHRINE_0 = art([
  '...............kkkk...............',
  '..............kIPIIk..............',
  '.............kIIPIIIk.............',
  '.............kIIiIIIk.............',
  '..............kIiIIk..............',
  '...............kiik...............',
  '..mmmmm........kkkk........mmmmm..',
  '..mUUUm.....mmmmmmmmmm.....mUUUm..',
  '..muuum....mUUUUUUUUUUm....muuum..',
  '..mmmmm...mUuuuuuuuuuuTm...mmmmm..',
  '...muTm...mmmmmmmmmmmmmm....muTm..',
  '...muTm....muuuuuuuuuTm.....muTm..',
  '...muTm....muTTTTTTTTTm.....muTm..',
  '...muTm....muTiiIIiiTTm.....muTm..',
  '...muTm....muTiIiiIiTTm.....muTm..',
  '...muTm....muTTiiiiTTTm.....muTm..',
  '...muTm....muTTTTTTTTTm.....muTm..',
  '...muTm....muuuuuuuuuTm.....muTm..',
  '...muTm...mmmmmmmmmmmmmm....muTm..',
  '...muTm...mUUUUUUUUUUUUTm...muTm..',
  '..mmmmmm..muuuuuuuuuuuuTm..mmmmmm.',
  '..mTTTTm..mmmmmmmmmmmmmmm..mTTTTm.',
  '..mmmmmm...................mmmmmm.',
  '.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
]);

const CLAIM_STONE_0 = art([
  '.k...............',
  '.kkk.............',
  '.kppkk...........',
  '.kpppPkk.........',
  '.kppPpppkk.......',
  '.kpppPppk........',
  '.kpppkk..........',
  '.kkk.............',
  '.k....mmmmmm.....',
  '.k...mUUUUUTm....',
  '.k..mUuuuuuTTm...',
  '.k..mUuyyyuTTm...',
  '.k..muyYYyuTTm...',
  '.k..muuyyuuTTm...',
  '.k..muuuuuuTTm...',
  '.k..mTuuuuTTtm...',
  '.k..mTTTTTTttm...',
  '.k..mTTTTTttttm..',
  '.kk.mmmmmmmmmmm..',
  '.,,,,,,,,,,,,,,,.'
]);


const ROOF_R = mirror(ROOF_L);
const POST_R = mirror(WALL_POST);
const SEGS: Record<string, Art> = { W: SEG_WINDOW, D: SEG_DOOR, S: SEG_SHUTTER, P: SEG_PLAIN, B: SEG_BARNDOOR };

function wall(segs: string): Art {
  return hcat(WALL_EDGE, WALL_POST, ...segs.split('').map((c) => SEGS[c]), POST_R, WALL_EDGE);
}

function roof(w: number): Art {
  return new Canvas(w, ROOF_M.h).tileX(ROOF_M, 8, w - 8, 0).put(ROOF_L, 0, 0).put(ROOF_R, w - 8, 0).art();
}

export interface Building {
  art: Art;
  foot: number;
}

function building(lower: string, upper = '', chimney = -1): Building {
  const lw = wall(lower);
  const full = upper ? wall(upper) : null;
  const uw = full ? crop(full, 0, 0, full.w, 17) : null;
  const ww = Math.max(lw.w, uw?.w ?? 0);
  const rw = ww + 4;
  const top = chimney >= 0 ? 4 : 0;
  const h = top + ROOF_M.h + (uw ? uw.h : 0) + lw.h + 1;
  const c = new Canvas(rw + 2, h);
  if (chimney >= 0) c.put(CHIMNEY, chimney, 0);
  c.put(roof(rw), 0, top);
  let y = top + ROOF_M.h;
  if (uw) {
    c.put(uw, 2, y);
    y += uw.h;
  }
  c.put(lw, 2, y);
  c.fill(',', 4, h - 1, rw + 2, h);
  return { art: c.art(), foot: h - lw.h - 8 };
}

export const HOUSES: Building[] = [
  building('WDW', '', 26),
  building('SDS'),
  building('WSDSW', '', 12),
  building('WDW', 'SWS', 27)
];

export const ROOFS: Swap[] = [
  { e: 0xc8584a, R: 0xa8443a, r: 0x86342e },
  { e: 0x5a7eb0, R: 0x46689a, r: 0x37547e },
  { e: 0xae7a52, R: 0x926240, r: 0x764e34 },
  { e: 0x749e5c, R: 0x5e864a, r: 0x4b6c3c },
  { e: 0x6a5a50, R: 0x56483f, r: 0x433831 },
  { e: 0xd4a450, R: 0xb88a3c, r: 0x987030 }
];

export const WALLS: Swap[] = [
  {},
  { C: 0xe8d8a8, c: 0xbca878 },
  { C: 0xc8d8dc, c: 0x98aab0 },
  { C: 0xe0b8a0, c: 0xb48c78 }
];

const TOWER = rd('fort-tower', TOWER_0);
const FWALL = rd('fort-wall-front', FWALL_0);
const GATE = rd('fort-gate', GATE_0);
const SWALL = rd('fort-wall-side', SWALL_0);
const BWALL = rd('fort-wall-back', BWALL_0);
const FLAGPOLE = rd('fort-flagpole', FLAGPOLE_0);
const CRATES = rd('fort-crates', CRATES_0);

function fort(tiles: number, depth: number, barracks: boolean): Art {
  const TW = TOWER.w;
  const W = TW * 2 + tiles * 8;
  const H = TOWER.h + depth + FWALL.h;
  const c = new Canvas(W + 2, H + 1);
  const cy0 = TOWER.h;
  const cy1 = H - FWALL.h;
  c.fill('f', 20, cy0 - 2, W - 20, cy1 + 5);
  c.fill('D', 20, cy0 - 2, W - 20, cy0 + 2);
  c.put(TOWER, 0, 0).put(TOWER, W - TW, 0);
  c.tileX(BWALL, TW, W - TW, TOWER.h - BWALL.h);
  c.tileY(SWALL, 8, cy0, H - TOWER.h);
  c.tileY(SWALL, W - 20, cy0, H - TOWER.h);
  c.put(FLAGPOLE, 30, cy1 - FLAGPOLE.h - 2);
  if (barracks) {
    const b = building('WDW').art;
    const bx = Math.round(W / 2 - b.w / 2 + 6);
    const by = cy0 + Math.round(depth * 0.62) - b.h;
    c.put(b, bx, by);
    c.put(CRATES, bx + b.w - 2, by + b.h - CRATES.h - 1);
  } else c.put(CRATES, W - 46, cy1 - CRATES.h - 2);
  c.put(TOWER, 0, H - TOWER.h).put(TOWER, W - TW, H - TOWER.h);
  c.tileX(FWALL, TW, W - TW, H - FWALL.h);
  c.put(GATE, Math.round((W - GATE.w) / 2), H - GATE.h);
  c.fill(',', 3, H, W + 2, H + 1);
  return c.art();
}

export const FORTS: Art[] = [fort(6, 40, false), fort(9, 52, true), fort(12, 62, true)];
export const FORT_FLAG: Swap[] = [{ B: 0x2a4a9a }, { B: 0x3a8a4a }, { B: 0x1a1a1a }];

function group(w: number, h: number, parts: [Art, number, number][]): Art {
  const c = new Canvas(w, h);
  for (const [a, x, y] of parts) c.put(a, x, y);
  return c.art();
}

const HUT = building('DP').art;
const FISH_HUT = building('DS').art;
const STILL_HOUSE = building('WD', '', 6).art;
const BARN = building('WBW').art;
const TAVERN = building('WDW', 'SWS', 27).art;

export const STRUCTURES: Record<string, Art> = {
  plantation: group(42 + HUT.w, 44, [[CROPS, 0, 12], [CROPS, 8, 12], [CROPS, 16, 12], [CROPS, 24, 12], [CROPS, 32, 12], [CROPS, 0, 22], [CROPS, 8, 22], [CROPS, 16, 22], [CROPS, 24, 22], [CROPS, 32, 22], [CROPS, 0, 32], [CROPS, 8, 32], [CROPS, 16, 32], [CROPS, 24, 32], [CROPS, 32, 32], [HUT, 42, 0]]),
  lumber_camp: group(64, 23, [[SHED, 0, 0], [LOGS, 38, 8]]),
  mine: group(60, 26, [[MINE, 0, 0], [CART, 44, 15]]),
  fishery: group(62, FISH_HUT.h, [[FISH_HUT, 0, 0], [RACK, 34, FISH_HUT.h - RACK.h]]),
  distillery: group(52, STILL_HOUSE.h, [[STILL_HOUSE, 0, 0], [STILL, 35, STILL_HOUSE.h - STILL.h]]),
  warehouse: group(BARN.w + 16, BARN.h, [[BARN, 0, 0], [CRATES, BARN.w, BARN.h - CRATES.h - 1]]),
  dock: PIER,
  watchtower: WATCHTOWER,
  fort: fort(4, 30, false),
  tavern: group(TAVERN.w + 8, TAVERN.h, [[TAVERN, 8, 0], [SIGN, 0, 30]])
};

const CLAIM_OWNED_0: Art = { ...CLAIM_STONE_0, rows: CLAIM_STONE_0.rows.map((r) => r.replace(/[pP]/g, 'K')) };

export const TREE = rd('tree', TREE_0);
export const JUNGLE_TREE = rd('jungle-tree', JUNGLE_TREE_0);
export const PALM = rd('palm', PALM_0);
export const PINE = rd('pine', PINE_0);
export const SNOW_PINE = rd('snow-pine', SNOW_PINE_0);
export const DEAD_TREE = rd('dead-tree', DEAD_TREE_0);
export const BUSH = rd('bush', BUSH_0);
export const BERRY_BUSH = rd('berry-bush', BERRY_BUSH_0);
export const REEDS = rd('reeds', REEDS_0);
export const BOULDER = rd('boulder', BOULDER_0);
export const ROCK = rd('rock', ROCK_0);
export const SKULL_ROCK = rd('skull-rock', SKULL_ROCK_0);
export const ICE_SHARD = rd('ice-shard', ICE_SHARD_0);
export const TUFT = rd('grass-tuft', TUFT_0);
export const FLOWERS = rd('flowers', FLOWERS_0);
export const MUSHROOMS = rd('mushrooms', MUSHROOMS_0);
export const SHELL = rd('shell', SHELL_0);
export const SHRINE = rd('shrine', SHRINE_0);
export const CLAIM_STONE = rd('claim-stone', CLAIM_STONE_0);
export const CLAIM_OWNED: Art = rd('claim-stone-owned', CLAIM_OWNED_0);

const HOUSE_NAMES = ['house-cottage', 'house-shutters', 'house-long', 'house-townhouse'];
HOUSES.forEach((h, i) => {
  const a = rd(HOUSE_NAMES[i], h.art);
  if (a === h.art) return;
  const wall = a.rows.findIndex((r) => /[Cc]/.test(r));
  HOUSES[i] = { art: a, foot: Math.max(0, wall - 8) };
});

const STRUCTURE_NAMES: Record<string, string> = { lumber_camp: 'lumber-camp', dock: 'private-dock' };
for (const k in STRUCTURES) if (k !== 'fort') STRUCTURES[k] = rd(STRUCTURE_NAMES[k] ?? k, STRUCTURES[k]);
