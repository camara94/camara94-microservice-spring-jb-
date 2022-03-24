import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppelALaCandidatureComponent } from './list-appel-a-la-candidature.component';

describe('ListAppelALaCandidatureComponent', () => {
  let component: ListAppelALaCandidatureComponent;
  let fixture: ComponentFixture<ListAppelALaCandidatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAppelALaCandidatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppelALaCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
