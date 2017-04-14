import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { DataDexComponent } from './datadex';

describe('datadex.DataDexComponent :: ', () => {
  let comp: DataDexComponent;
  let fixture: ComponentFixture<DataDexComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataDexComponent]
    });

    fixture = TestBed.createComponent(DataDexComponent);
    comp = fixture.componentInstance;
  });
});
