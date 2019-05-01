import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoosterEditorComponent } from './rooster-editor.component';

describe('RoosterEditorComponent', () => {
  let component: RoosterEditorComponent;
  let fixture: ComponentFixture<RoosterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoosterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoosterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
