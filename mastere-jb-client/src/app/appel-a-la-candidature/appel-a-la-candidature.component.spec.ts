import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelALaCandidatureComponent } from './appel-a-la-candidature.component';

describe('AppelALaCandidatureComponent', () => {
  let component: AppelALaCandidatureComponent;
  let fixture: ComponentFixture<AppelALaCandidatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppelALaCandidatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelALaCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
