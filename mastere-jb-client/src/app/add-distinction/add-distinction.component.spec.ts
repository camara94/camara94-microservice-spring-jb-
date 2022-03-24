import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistinctionComponent } from './add-distinction.component';

describe('AddDistinctionComponent', () => {
  let component: AddDistinctionComponent;
  let fixture: ComponentFixture<AddDistinctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDistinctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDistinctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
