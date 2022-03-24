import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgctComponent } from './mgct.component';

describe('MgctComponent', () => {
  let component: MgctComponent;
  let fixture: ComponentFixture<MgctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
