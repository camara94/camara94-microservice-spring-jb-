import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDistinctionComponent } from './update-distinction.component';

describe('UpdateDistinctionComponent', () => {
  let component: UpdateDistinctionComponent;
  let fixture: ComponentFixture<UpdateDistinctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDistinctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDistinctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
