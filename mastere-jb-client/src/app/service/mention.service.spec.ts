import { TestBed } from '@angular/core/testing';

import { MentionService } from './mention.service';

describe('MentionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MentionService = TestBed.get(MentionService);
    expect(service).toBeTruthy();
  });
});
