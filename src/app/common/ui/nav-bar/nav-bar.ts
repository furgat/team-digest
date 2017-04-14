import { Component, Output, EventEmitter } from '@angular/core';

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
      border-top: 1px solid #444;
      border-bottom: 1px solid #444;
      color: #CDCDCD;
      background-color: #555;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      margin: 0;
    }

    .linkContainer:hover {
      cursor: pointer;
      background-color: #444;
    }

    .linkContainer > span { margin: 0; padding: 0; }

    .activeLink { background-color: #444; }
    .builder:hover > span { color: #CC2EFA; }
    .pc:hover > span { color: #ACFA58; }
    .datadex:hover > span { color: #FF4000; }
  `],
  template: `
    <nav>
      <a
        class="linkContainer container col-xs-12 builder"
        [routerLink]="['builder']"
        routerLinkActive="activeLink"
        (click)="onClick('builder')"
      >
        <span class="col-xs-12 fa fa-tachometer fa-2x"></span>
        <span class="col-xs-12">Builder</span>
      </a>
      <a
        class="linkContainer container col-xs-12 pc"
        [routerLink]="['pc']"
        routerLinkActive="activeLink"
        (click)="onClick('pc')"
      >
        <span class="col-xs-12 fa fa-laptop fa-3x"></span>
        <span class="col-xs-12">PC</span>
      </a>
      <a
        class="linkContainer container col-xs-12 datadex"
        [routerLink]="['datadex']"
        routerLinkActive="activeLink"
        (click)="onClick('datadex')"
      >
        <span class="col-xs-12 fa fa-mobile fa-3x"></span>
        <span class="col-xs-12">DataDEX</span>
      </a>
    </nav>
  `
})
export class NavBarComponent {
  @Output() public selected = new EventEmitter();

  public onClick(val: string) {
    this.selected.next(val);
  }
};
