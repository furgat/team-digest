import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FilterBarComponent } from '../common/ui';

@Component({
  selector: 'data-dex',
  styles: [`
    .container {
      padding-top: 1em;
    }

    filter-bar {
      display: block;
      padding-bottom: 1em;
      border-bottom: 1px solid #CCC;
    }

    .capitalize { text-transform: capitalize; }

    .nothing {
      padding-top: 1em; padding-bottom: 1em;
      font-size: 2em; color: #555; text-align: center;
    }
  `],
  template: `
    <div class="container">
      <ngb-tabset class="col-xs-12">
        <ngb-tab *ngFor="let category of dexData">
          <template ngbTabTitle>
            {{ category.name }}
          </template>
          <template ngbTabContent>
            <div class="container col-xs-12">
              <span class="col-xs-10 col-xs-offset-1">
                <filter-bar
                  buttonName="add new {{ category.name }}"
                  (buttonClick)="onButtonClick(category.name)"
                  (filterClick)="onFilterClick($event)"
                >
                </filter-bar>
              </span>
              <span class="nothing col-xs-12" *ngIf="category.data.length <= 0">
                You haven't added any {{category.name}} yet.
              </span>
              <ngb-accordion [closeOthers]="true">
                <ngb-panel
                  *ngFor="let member of category.data"
                >
                  <template ngbPanelTitle>
                    {{ member.name }}
                  </template>
                  <template ngbPanelContent>
                    {{ member | json }}
                  </template>
                </ngb-panel>
              </ngb-accordion>
            </div>
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

  public ngOnInit() {
    this._getAppState();
  }

  public onButtonClick() {
    console.log('onButtonClick()');
  }

  public onFilterClick() {
    console.log('onFilterClick()');
  }

  private _getAppState(state: AppState = this._appState) {
    const data: any = state.get('datadex');
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.dexData.push({name: key, data: data[key]});
      }
    }
  }
};
