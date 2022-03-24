import { TestBed } from '@angular/core/testing';

import { StageExperienceService } from './stage-experience.service';

describe('StageExperienceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StageExperienceService = TestBed.get(StageExperienceService);
    expect(service).toBeTruthy();
  });
});
