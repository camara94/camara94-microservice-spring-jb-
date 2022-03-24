import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierInscritMastereComponent } from './verifier-inscrit-mastere.component';

describe('VerifierInscritMastereComponent', () => {
  let component: VerifierInscritMastereComponent;
  let fixture: ComponentFixture<VerifierInscritMastereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifierInscritMastereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierInscritMastereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
