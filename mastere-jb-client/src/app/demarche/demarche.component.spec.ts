import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemarcheComponent } from './demarche.component';

describe('DemarcheComponent', () => {
  let component: DemarcheComponent;
  let fixture: ComponentFixture<DemarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
