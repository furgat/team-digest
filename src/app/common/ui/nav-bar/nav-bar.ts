import { Component, Output, EventEmitter } from '@angular/core';
import { TERMS } from '../../constants';

@Component({
  selector: 'nav-bar',
  styles: [`
    nav {
      margin: 0;
      padding: 0;
      text-align: center;
    }

    .linkContainer {
      display: block;
      border-top: 1px solid #555;
      border-bottom: 1px solid #333;
      color: #CDCDCD;
      background-color: #444;
      padding: 0.5em 0;
      margin: 0;
      border-radius: 0px;
      text-align: center;
    }

    .linkContainer:hover {
      cursor: pointer;
      background-color: #555;
      border-top: 1px solid #666;
      text-decoration: none;
    }

    .linkContainer > span { margin: 0; padding: 0; text-transform: capitalize; }

    .activeLink { border-top: 1px solid #666; background-color: #555; }
    .builder:hover > span { color: #CC2EFA; }
    .pc:hover > span { color: #ACFA58; }
    .datadex:hover > span { color: #FF4000; }

  `],
  template: `
    <nav class="container">
      <a
        class="linkContainer builder col-xs-12"
        [routerLink]="[builder]"
        routerLinkActive="activeLink"
        (click)="onClick(builder)"
      >
        <span class="fa fa-bar-chart fa-3x col-xs-12"></span>
        <span class="col-xs-12">{{ builder }}</span>
      </a>
      <a
        class="linkContainer pc col-xs-12"
        [routerLink]="[storage]"
        routerLinkActive="activeLink"
        (click)="onClick(storage)"
      >
        <span class="fa fa-laptop fa-3x col-xs-12"></span>
        <span class="col-xs-12">{{ storage }}</span>
      </a>
      <a
        class="linkContainer datadex col-xs-12"
        [routerLink]="[datadex]"
        routerLinkActive="activeLink"
        (click)="onClick(datadex)"
      >
        <span class="fa fa-mobile fa-3x col-xs-12"></span>
        <span class="col-xs-12">{{ datadex }}</span>
      </a>
    </nav>
  `
})
export class NavBarComponent {
  @Output() public selected = new EventEmitter();
  public builder: string = TERMS.BUILDER[0];
  public storage: string = TERMS.STORAGE[0];
  public datadex: string = TERMS.DATADEX[0];

  public onClick(val: string) {
    this.selected.next(val);
  }
};
