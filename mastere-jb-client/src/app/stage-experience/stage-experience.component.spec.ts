import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageExperienceComponent } from './stage-experience.component';

describe('StageExperienceComponent', () => {
  let component: StageExperienceComponent;
  let fixture: ComponentFixture<StageExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
