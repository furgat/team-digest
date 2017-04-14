/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

import { NavBarComponent } from './common/ui';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <div class="no-margin no-padding container col-xs-12" [ngStyle]="{'border-top': activeBorder}" >

      <div class="nav-container no-margin no-padding col-xs-1 col-s-2">
        <img src="{{logo}}" alt="name" />
        <nav-bar (selected)="changeColor(onNavClick($event))">
        </nav-bar>
      </div>

      <main class="col-xs-11 col-s-10">
        <router-outlet></router-outlet>
      </main>

    </div>

    <footer>
      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public logo = 'assets/img/team-digest-logo.png';
  public name = 'Team Digest';
  public url = 'https://github.com/furgat/team-digest';
  public borderColors: string[] = ['#CC2EFA', '#ACFA58', '#FF4000'];
  public activeBorder: string = '4px solid #CC2EFA';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  public onNavClick(value: string) {
    switch (value) {
      case 'pc':
        return this.borderColors[1];
      case 'datadex':
        return this.borderColors[2];
      default:
        return this.borderColors[0];
    }
  }

  public changeColor(value: string, prepend: string = '4px solid ') {
    this.activeBorder = prepend + value;
  }
}
