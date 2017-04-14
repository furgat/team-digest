import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { NavBarComponent } from './nav-bar';

describe('common.ui.NavBarComponent :: ', () => {
  let comp: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent]
    });

    fixture = TestBed.createComponent(NavBarComponent);
    comp = fixture.componentInstance;
  });
});
