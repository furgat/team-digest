import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { DEX_KEY } from '../common/constants';

@Component({
  selector: 'data-dex',
  styles: [],
  template: `
    <div class="container">
      <ngb-tabset>
        <ngb-tab *ngFor="let category of dexData">
          <template ngbTabTitle>
            {{ category.name }}
          </template>
          <template ngbTabContent>
            <ngb-accordion [closeOthers]="true">
              <ngb-panel
                *ngFor="let member of category.data"
              >
              </ngb-panel>
            </ngb-accordion>
          </template>
        </ngb-tab>
      </ngb-tabset>
      <pre class="app-state">this.dexData = {{ this.dexData | json}}</pre>
    </div>
  `
})
export class DataDexComponent implements OnInit {
  public dexData = [];
  private _appState: AppState;

  constructor(appState: AppState) {
    this._appState = appState;
  }

  private _getAppState(state: AppState = this._appState) {
    const data: any = state.get('datadex');
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.dexData.push({name: key, data: data[key]});
      }
    }
  }

  private ngOnInit() {
    this._getAppState();
  }
};
