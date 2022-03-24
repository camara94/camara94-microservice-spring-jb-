import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMastereInfoComponent } from './add-mastere-info.component';

describe('AddMastereInfoComponent', () => {
  let component: AddMastereInfoComponent;
  let fixture: ComponentFixture<AddMastereInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMastereInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMastereInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
