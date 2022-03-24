import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStageExperienceComponent } from './add-stage-experience.component';

describe('AddStageExperienceComponent', () => {
  let component: AddStageExperienceComponent;
  let fixture: ComponentFixture<AddStageExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStageExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStageExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
