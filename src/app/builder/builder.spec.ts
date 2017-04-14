import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BuilderComponent } from './builder';

describe('builder.BuilderComponent :: ', () => {
  let comp: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuilderComponent]
    });

    fixture = TestBed.createComponent(BuilderComponent);
    comp = fixture.componentInstance;
  });
});
