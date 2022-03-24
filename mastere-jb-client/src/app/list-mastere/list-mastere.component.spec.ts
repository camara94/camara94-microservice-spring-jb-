import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMastereComponent } from './list-mastere.component';

describe('ListMastereComponent', () => {
  let component: ListMastereComponent;
  let fixture: ComponentFixture<ListMastereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMastereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMastereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
