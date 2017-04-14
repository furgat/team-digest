import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { FilterBarComponent } from './filter-bar';

describe('common.ui.FilterBarComponent :: ', () => {
  let comp: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBarComponent]
    });

    fixture = TestBed.createComponent(FilterBarComponent);
    comp = fixture.componentInstance;
  });
});
