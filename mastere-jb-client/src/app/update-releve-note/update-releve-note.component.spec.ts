import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReleveNoteComponent } from './update-releve-note.component';

describe('UpdateReleveNoteComponent', () => {
  let component: UpdateReleveNoteComponent;
  let fixture: ComponentFixture<UpdateReleveNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReleveNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReleveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
