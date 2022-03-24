import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMentionComponent } from './list-mention.component';

describe('ListMentionComponent', () => {
  let component: ListMentionComponent;
  let fixture: ComponentFixture<ListMentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
