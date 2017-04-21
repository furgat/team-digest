import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.service';
import { FilterBarComponent, DynamicFormComponent } from '../common/ui';
import { STATS, TYPES, TERMS } from '../common/constants';

import { DexModalFormComponent } from './forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// dataDex type declarations
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

export type Pokemon = {
  id: number,
  name: string,
  types: number[], // Type Reference IDs
  abilityList: number[], // Ability Reference IDs
  moveList: number[], // Move Reference IDs
  baseStats: number[]
};

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
                  buttonName="new {{ category.name }}"
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
export class DataDexComponent implements OnInit, OnDestroy {
  public dexData = [];
  private _modalRef: any;
  private _modalSub: any; // subscription
  private _stateSub: any;

  constructor(
    private appState: AppState,
    private modalService: NgbModal
  ) {}

  public ngOnInit() {
    this.appState.changes.subscribe(() => this._getAppState());
    this._getAppState();
  }

  public ngOnDestroy() {
    if (this._modalSub) {
      this._modalSub.unsubscribe();
    }

    if (this._stateSub) {
      this._stateSub.unsubscribe();
    }
  }

  public onButtonClick(
    event: string,
    modalRef = this._modalRef,
    modalService = this.modalService,
  ) {
    modalRef = modalService.open(DexModalFormComponent);
    modalRef.componentInstance.setForm(event);
    this._modalSub = modalRef.componentInstance.formData.subscribe(
      (res) => {
        let {name, data} = JSON.parse(res);


      },
      (err) => { console.log(err); }
    );
  }

  public onFilterClick() {
    console.log('onFilterClick()');
  }

  public getObjectById(
    from: string,
    needle: number,
    data = this.dexData
  ): Object {
    if (from && needle) {
      const haystack = data[from];

      for (let member of haystack) {
        if (member.id === needle) {
          return member;
        }
      }
    }

    return undefined;
  }

  public getObjectByName(
    from: string,
    needle: string,
    data = this.dexData
  ): Object {
    if (from && needle) {
      const haystack = data[from];

      for (let member of haystack) {
        if (member.name === needle) {
          return member;
        }
      }
    }

    return undefined;
  }

  private _getAppState(state: AppState = this.appState) {
    const data: any = state.get(TERMS.DATADEX);
    let clone = [];

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        clone.push({name: key, data: data[key]});
      }
    }

    this.dexData = clone;
  }
};
