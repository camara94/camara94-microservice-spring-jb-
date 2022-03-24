import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDomaineComponent } from './add-domaine.component';

describe('AddDomaineComponent', () => {
  let component: AddDomaineComponent;
  let fixture: ComponentFixture<AddDomaineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDomaineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
