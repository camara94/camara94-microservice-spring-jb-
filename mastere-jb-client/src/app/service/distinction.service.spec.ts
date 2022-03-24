import { TestBed } from '@angular/core/testing';

import { DistinctionService } from './distinction.service';

describe('DistinctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistinctionService = TestBed.get(DistinctionService);
    expect(service).toBeTruthy();
  });
});
