import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBacComponent } from './update-bac.component';

describe('UpdateBacComponent', () => {
  let component: UpdateBacComponent;
  let fixture: ComponentFixture<UpdateBacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
