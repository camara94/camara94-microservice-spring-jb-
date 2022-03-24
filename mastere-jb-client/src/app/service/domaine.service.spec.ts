import { TestBed } from '@angular/core/testing';

import { DomaineService } from './domaine.service';

describe('DomaineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomaineService = TestBed.get(DomaineService);
    expect(service).toBeTruthy();
  });
});
