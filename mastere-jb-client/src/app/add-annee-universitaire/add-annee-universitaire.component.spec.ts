import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnneeUniversitaireComponent } from './add-annee-universitaire.component';

describe('AddAnneeUniversitaireComponent', () => {
  let component: AddAnneeUniversitaireComponent;
  let fixture: ComponentFixture<AddAnneeUniversitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnneeUniversitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnneeUniversitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
