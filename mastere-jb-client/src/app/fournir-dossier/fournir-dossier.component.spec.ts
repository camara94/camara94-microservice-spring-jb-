import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournirDossierComponent } from './fournir-dossier.component';

describe('FournirDossierComponent', () => {
  let component: FournirDossierComponent;
  let fixture: ComponentFixture<FournirDossierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournirDossierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournirDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
