/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let component: FilterPipe;
  let fixture: ComponentFixture<FilterPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
