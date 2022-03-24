import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtablissementPopupComponent } from './add-etablissement-popup.component';

describe('AddEtablissementPopupComponent', () => {
  let component: AddEtablissementPopupComponent;
  let fixture: ComponentFixture<AddEtablissementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtablissementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtablissementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
