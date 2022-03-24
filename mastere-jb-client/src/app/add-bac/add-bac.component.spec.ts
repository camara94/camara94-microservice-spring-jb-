import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBacComponent } from './add-bac.component';

describe('AddBacComponent', () => {
  let component: AddBacComponent;
  let fixture: ComponentFixture<AddBacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
