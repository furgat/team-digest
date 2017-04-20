/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit, OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TERMS } from './common/constants';
import { NavBarComponent } from './common/ui';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

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
    <div
      class="top-container container-fluid"
      [ngStyle]="{'border-top': activeBorder}"
    >
      <div class="row">

        <div class="col-sm-1 no-padding">
          <img src="{{ logo }}" alt="{{ name }}" />
          <nav-bar (selected)="changeColor(onNavClick($event))">
          </nav-bar>
        </div>

        <main class="main col-sm-11 no-padding">
          <router-outlet></router-outlet>
        </main>

      </div>
    </div>

    <footer>
      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
    </footer>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  public logo = 'assets/img/team-digest-logo.png';
  public name = 'Team Digest';
  public url = 'https://github.com/furgat/team-digest';
  public borderColors: string[] = ['#CC2EFA', '#ACFA58', '#FF4000'];
  public activeBorder: string = '4px solid #CC2EFA';
  private _subscription;

  constructor(
    public appState: AppState,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    // console.log('Initial App State', this.appState.state);
    this._subscription = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        this.changeColor(
          this.onNavClick(event.url.substring(1, event.url.length))
        );
      });
  }

  public ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public onNavClick(value: string) {
    switch (value) {
      case TERMS.STORAGE[0]:
        return this.borderColors[1];
      case TERMS.DATADEX[1]:
        return this.borderColors[2];
      default:
        return this.borderColors[0];
    }
  }

  public changeColor(value: string, prepend: string = '4px solid ') {
    this.activeBorder = prepend + value;
  }
}
