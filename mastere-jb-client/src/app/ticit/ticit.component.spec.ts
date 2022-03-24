import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicitComponent } from './ticit.component';

describe('TicitComponent', () => {
  let component: TicitComponent;
  let fixture: ComponentFixture<TicitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
