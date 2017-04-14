import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav-bar',
  styles: [`
    nav {
      height: 100%;
      display: block;
      background-color: #555;
      margin: 0;
    }

    span { margin: 0; padding: 0; color: #CDCDCD; }
    span:hover { cursor: pointer; }
  `],
  template: `
    <nav class="col-xs-2 col-s-1">
      <span class="col-xs-12" [routerLink]="['']" (click)="onClick('')">
      </span>
      <span class="col-xs-12" [routerLink]="['builder']" (click)="onClick('builder')">
        Builder
      </span>
      <span class="col-xs-12" [routerLink]="['pc']" (click)="onClick('pc')">
        PC
      </span>
      <span class="col-xs-12" [routerLink]="['datadex']" (click)="onClick('datadex')">
        dataDex
      </span>
    </nav>
  `
})
export class NavBarComponent {
  @Output() public selected = new EventEmitter();

  private onClick(val: string) {
    this.selected.next(val);
  }
};
