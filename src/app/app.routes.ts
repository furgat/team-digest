import { Routes } from '@angular/router';

// components
import { BuilderComponent } from './builder';
import { PCComponent } from './pc';
import { DataDexComponent } from './datadex';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: BuilderComponent },
  { path: 'builder',  component: BuilderComponent },
  { path: 'pc', component: PCComponent },
  { path: 'datadex', component: DataDexComponent },
  { path: '**',    component: NoContentComponent },
];
