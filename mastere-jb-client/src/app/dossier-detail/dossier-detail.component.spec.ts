import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDetailComponent } from './dossier-detail.component';

describe('DossierDetailComponent', () => {
  let component: DossierDetailComponent;
  let fixture: ComponentFixture<DossierDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
