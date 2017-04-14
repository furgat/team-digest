import {
  Injectable, OnInit
} from '@angular/core';

@Injectable()
export class TDStorageProvider implements OnInit {
  private _permission: boolean = false;
  private _storage;

  public get(key: string = undefined): string {
    if (this._storage && key) {
      return (this._storage.getItem(key) ? this._storage.getItem(key) : '{}');
    }
    return '{}';
  }

  public set(key: string = undefined, value: string = undefined) {
    if (this._storage && key && value) {
      this._storage.setItem(key, value);
    }
  }

  public givePermission() {
    this._permission = true;
  }

  public revokePermission() {
    this._permission = false;
  }

  public hasPermission(): boolean {
    return this._permission;
  }

  private ngOnInit() {
    if (typeof(Storage) !== 'undefined') {
      this._storage = window.localStorage;
    } else {
      this._storage = undefined;
    }
  }
};
