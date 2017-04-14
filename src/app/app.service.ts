import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

export type Ability = {
  id: number,
  name: string,
  description: string
};

export type Move = {
  id: number,
  name: string,
  type: number,
  description: string
};

export type PokemonTemplate = {
  id: number,
  name: string,
  types: number[],
  abilityList: Ability[],
  moveList: Move[],
  baseStats: number[]
};

export type Pokemon = {
  id: number,
  name: string,
  template: PokemonTemplate,
  nature: number,
  ability: number,
  moves: number[],
  ivSpread?: number[],
  evSpread?: number[]
};

@Injectable()
export class AppState {

  public _state: InternalStateType = { };

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  // save prop to storage
  // public store(prop: string) {}

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
};
