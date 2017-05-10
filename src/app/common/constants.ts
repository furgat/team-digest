// storage keys
export const TEAM_KEY = 'td-team-storage';
export const PC_KEY = 'td-pc-storage';
export const DEX_KEY = 'td-dex-storage';

// interface terms exposed here
// TERM[0] is the singular form
// TERM[1] is the plural/alternate form if any
export const TERMS = {
  // navigation elements
  BUILDER: ['builder'],
  STORAGE: ['storage'],
  DATADEX: ['datadex'],

  // pokemon related terms
  ABILITY: ['ability', 'abilities'],
  NATURE: ['nature', 'natures'],
  TYPE: ['type', 'types'],
  MOVE: ['move', 'moves'],
  POKEMON: ['pokemon', 'pokemon'],

  // form field names
  NAME: ['name', 'names'],
  DESCRIPTION: ['description', 'descriptions'],

  // mathcup rankings
  EASYPREY: ['easy prey'],
  ADVANTAGE: ['advantage'],
  NEUTRAL: ['neutral'],
  DISADVANTAGE: ['disadvantage'],
  ABORT: ['abort mission']
};

// pokemon data enums
export const STATS = {
  HP: 'HP',
  ATTACK: 'ATTACK',
  DEFENSE: 'DEFENSEENSE',
  SPATK: 'SP.ATTACK',
  SPDEF: 'SP.DEFENSE',
  SPEED: 'SPEED'
};

export const TYPES = [
  'NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND',
  'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY'
];

export const NATURES = [
  {name: 'Adamant', increases: STATS.ATTACK, decreases: STATS.SPATK },
  {name: 'Bashful', increases: STATS.SPATK, decreases: STATS.SPATK },
  {name: 'Bold', increases: STATS.DEFENSE, decreases: STATS.ATTACK },
  {name: 'Brave', increases: STATS.ATTACK, decreases: STATS.SPEED },
  {name: 'Calm', increases: STATS.SPDEF, decreases: STATS.ATTACK },
  {name: 'Careful', increases: STATS.SPDEF, decreases: STATS.SPATK },
  {name: 'Docile', increases: STATS.DEFENSE, decreases: STATS.DEFENSE },
  {name: 'Gentle', increases: STATS.SPDEF, decreases: STATS.DEFENSE },
  {name: 'Hardy', increases: STATS.ATTACK, decreases: STATS.ATTACK },
  {name: 'Hasty', increases: STATS.SPEED, decreases: STATS.DEFENSE },
  {name: 'Impish', increases: STATS.DEFENSE, decreases: STATS.SPATK },
  {name: 'Jolly', increases: STATS.SPEED, decreases: STATS.SPATK },
  {name: 'Lax', increases: STATS.DEFENSE, decreases: STATS.SPDEF },
  {name: 'Lonely', increases: STATS.ATTACK, decreases: STATS.DEFENSE },
  {name: 'Mild', increases: STATS.SPATK, decreases: STATS.DEFENSE },
  {name: 'Modest', increases: STATS.SPATK, decreases: STATS.ATTACK },
  {name: 'Naive', increases: STATS.SPEED, decreases: STATS.SPDEF },
  {name: 'Naughty', increases: STATS.ATTACK, decreases: STATS.SPDEF },
  {name: 'Quiet', increases: STATS.SPATK, decreases: STATS.SPEED },
  {name: 'Quirky', increases: STATS.SPDEF, decreases: STATS.SPDEF },
  {name: 'Rash', increases: STATS.SPATK, decreases: STATS.SPDEF },
  {name: 'Relaxed', increases: STATS.DEFENSE, decreases: STATS.SPEED },
  {name: 'Sassy', increases: STATS.SPDEF, decreases: STATS.SPEED },
  {name: 'Serious', increases: STATS.SPEED, decreases: STATS.SPEED },
  {name: 'Timid', increases: STATS.SPEED, decreases: STATS.ATTACK }
];

// algorithm constants
export const S: number = 200; // STRONG
export const N: number = 100; // NEUTRAL
export const R: number =  50; // RESIST
export const Z: number =   0; // ZERO

// Offense Left to Right
// DEFENSEense Top to Bottom
export const MATCHUP_GRID = [
  // nrm, fir, wtr, elc, grs, ice, fgt, psn, grn, fly, psy, bug, rck, gho, dra, drk, stl, fai
  [N, N, N, N, N, N, N, N, N, N, N, N, R, Z, N, N, R, N], // normal
  [N, R, R, N, S, S, N, N, N, N, N, S, R, N, R, N, S, N], // fire
  [N, S, R, N, R, N, N, N, S, N, N, N, S, N, R, N, N, N], // water
  [N, N, S, R, R, N, N, N, Z, S, N, N, N, N, R, N, N, N], // electric
  [N, R, S, N, R, N, N, R, S, R, N, R, S, N, R, N, R, N], // grass
  [N, R, R, N, S, R, N, N, S, S, N, N, N, N, S, N, R, N], // ice
  [S, N, N, N, N, S, N, R, N, R, R, R, S, Z, N, S, S, R], // fighting
  [N, N, N, N, S, N, N, R, R, N, N, N, R, R, N, N, Z, S], // poison
  [N, S, N, S, R, N, N, S, N, Z, N, R, S, N, N, N, S, N], // ground
  [N, N, N, R, S, N, S, N, N, N, N, S, R, N, N, N, R, N], // flying
  [N, N, N, N, N, N, S, S, N, N, R, N, N, N, N, Z, R, N], // psychic
  [N, R, N, N, S, N, R, R, N, R, S, N, N, R, N, S, R, R], // bug
  [N, S, N, N, N, S, R, N, R, S, N, S, N, N, N, N, R, N], // rock
  [Z, N, N, N, N, N, N, N, N, N, S, N, N, S, N, R, N, N], // ghost
  [N, N, N, N, N, N, N, N, N, N, N, N, N, N, S, N, R, Z], // dragon
  [N, N, N, N, N, N, R, N, N, N, S, N, N, S, N, R, N, R], // dark
  [N, R, R, R, N, S, N, N, N, N, N, N, S, N, N, N, R, S], // steel
  [N, R, N, N, N, N, S, R, N, N, N, N, N, N, S, S, R, N]  // fairy
];

export const SAVE = false;
