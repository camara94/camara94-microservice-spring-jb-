import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReleveNoteComponent } from './add-releve-note.component';

describe('AddReleveNoteComponent', () => {
  let component: AddReleveNoteComponent;
  let fixture: ComponentFixture<AddReleveNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReleveNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReleveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
