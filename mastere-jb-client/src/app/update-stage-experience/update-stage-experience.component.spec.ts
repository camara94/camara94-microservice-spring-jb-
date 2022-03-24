import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStageExperienceComponent } from './update-stage-experience.component';

describe('UpdateStageExperienceComponent', () => {
  let component: UpdateStageExperienceComponent;
  let fixture: ComponentFixture<UpdateStageExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStageExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStageExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
