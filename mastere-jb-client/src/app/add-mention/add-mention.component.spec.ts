import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentionComponent } from './add-mention.component';

describe('AddMentionComponent', () => {
  let component: AddMentionComponent;
  let fixture: ComponentFixture<AddMentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
