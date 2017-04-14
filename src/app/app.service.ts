import { Injectable, OnInit } from '@angular/core';
import { TDStorageProvider } from './common/provider';

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
export class AppState implements OnInit {

  // initial state is empty
  public _state: InternalStateType;

  private DEFAULT_STATE = {
    teams: [],
    pc: [],
    datadex: {
      pokemon: [],
      moves: [],
      abilities: []
    }
  };

  private _tdStorage: TDStorageProvider;

  constructor(tdStorage: TDStorageProvider) {
    this._state = this.DEFAULT_STATE;
    this._tdStorage = tdStorage;
  }

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

  public set(
    prop: string,
    value: any,
    save: boolean = true,
    storage: TDStorageProvider = this._tdStorage
  ) {
    if (save) {
      this._save(this.state());
    }
    // internally mutate our state
    return this._state[prop] = value;
  }

  // save prop to storage
  // public store(prop: string) {}

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  private _save(
    object: InternalStateType,
    key: string = 'state',
    storage: TDStorageProvider = this._tdStorage
  ) {
    if (storage && storage.hasPermission()) {
      storage.set(key, JSON.stringify(object)); // save a copy
    }
  }

  private _load(
    key: string = 'state',
    storage: TDStorageProvider = this._tdStorage
  ): InternalStateType {

    if (storage && storage.hasPermission()) {
      let data = storage.get(key);
      if (data !== '{}') {
        return JSON.parse(data);
      } else {
        return this.DEFAULT_STATE;
      }
    }
    return this.DEFAULT_STATE;
  }

  private ngOnInit() {
    // load data if it exists
    const loadedData = this._load();
    for (let key in loadedData) {
      if (loadedData.hasOwnProperty(key)) {
        this.set(key, loadedData[key], false);
      }
    }
  }
};
