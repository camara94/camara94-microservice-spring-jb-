import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyerNoticationComponent } from './envoyer-notication.component';

describe('EnvoyerNoticationComponent', () => {
  let component: EnvoyerNoticationComponent;
  let fixture: ComponentFixture<EnvoyerNoticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoyerNoticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyerNoticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
