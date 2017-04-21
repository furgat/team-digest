import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { TDStorageProvider } from './common/provider';

import { TERMS } from './common/constants';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState implements OnInit {

  // initial state is empty
  public _state: InternalStateType;
  @Output() public changes = new EventEmitter();
  private _tdStorage: TDStorageProvider;

  constructor(tdStorage: TDStorageProvider) {
    this._state = this._getDefaultState();
    this._tdStorage = tdStorage;
  }

  public ngOnInit() {
    // load data if it exists
    const loadedData = this._load();
    for (let key in loadedData) {
      if (loadedData.hasOwnProperty(key)) {
        this.set(key, loadedData[key], false);
      }
    }
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
    save: boolean = true
  ) {
    this._state[prop] = value;
    this._saveAndEmit(save, 'changed');
  }

  private _saveAndEmit(save: boolean, emit: string) {
    if (save) {
      this._save(this.state());
    }

    this.changes.next(emit);
  }

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
        return this._getDefaultState();
      }
    }
    return this._getDefaultState();
  }

  // factory to generate initial state with constant terms
  private _getDefaultState() {
    let state: InternalStateType = {};

    state[TERMS.BUILDER[0]] = [];
    state[TERMS.STORAGE[0]] = [];
    state[TERMS.DATADEX[0]] = {};
    state[TERMS.DATADEX[0]][TERMS.POKEMON[1]] = [];
    state[TERMS.DATADEX[0]][TERMS.MOVE[1]] = [];
    state[TERMS.DATADEX[0]][TERMS.ABILITY[1]] = [];

    return state;
  }
};
