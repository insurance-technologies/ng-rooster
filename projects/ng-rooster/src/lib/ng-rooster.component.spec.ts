import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRoosterComponent } from './ng-rooster.component';

describe('NgRoosterComponent', () => {
  let component: NgRoosterComponent;
  let fixture: ComponentFixture<NgRoosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRoosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRoosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
