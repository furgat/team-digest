import { Component } from '@angular/core';
import { STATS, TYPES, NATURES } from '../common/constants';
import { Pokemon, Ability, Move } from '../datadex';

// pc type declarations
export type StoredPokemon = {
  id: number,
  name: string,
  template: Pokemon,
  nature: {name: string, increases: string, decreases: string},
  ability: Ability,
  moves: Move[],
  ivSpread?: number[],
  evSpread?: number[]
};

@Component({
  selector: 'pc',
  styles: [],
  template: ``
})
export class PCComponent {};
