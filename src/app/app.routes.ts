import { Routes } from '@angular/router';

// components
import { BuilderComponent } from './builder';
import { PCComponent } from './pc';
import { DataDexComponent } from './datadex';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import { TERMS } from './common/constants';

export const ROUTES: Routes = [
  { path: '',      component: BuilderComponent },
  { path: TERMS.BUILDER[0],  component: BuilderComponent },
  { path: TERMS.STORAGE[0], component: PCComponent },
  { path: TERMS.DATADEX[0], component: DataDexComponent },
  { path: '**',    component: NoContentComponent },
];
