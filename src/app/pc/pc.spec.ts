import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { PCComponent } from './pc';

describe('pc.PCComponent :: ', () => {
  let comp: PCComponent;
  let fixture: ComponentFixture<PCComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PCComponent]
    });

    fixture = TestBed.createComponent(PCComponent);
    comp = fixture.componentInstance;
  });
});
