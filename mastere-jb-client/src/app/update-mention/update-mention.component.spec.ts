import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMentionComponent } from './update-mention.component';

describe('UpdateMentionComponent', () => {
  let component: UpdateMentionComponent;
  let fixture: ComponentFixture<UpdateMentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
