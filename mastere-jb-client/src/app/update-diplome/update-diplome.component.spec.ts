import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiplomeComponent } from './update-diplome.component';

describe('UpdateDiplomeComponent', () => {
  let component: UpdateDiplomeComponent;
  let fixture: ComponentFixture<UpdateDiplomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDiplomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
