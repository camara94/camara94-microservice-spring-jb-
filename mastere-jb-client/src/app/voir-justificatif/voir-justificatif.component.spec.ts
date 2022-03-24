import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirJustificatifComponent } from './voir-justificatif.component';

describe('VoirJustificatifComponent', () => {
  let component: VoirJustificatifComponent;
  let fixture: ComponentFixture<VoirJustificatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirJustificatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirJustificatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
