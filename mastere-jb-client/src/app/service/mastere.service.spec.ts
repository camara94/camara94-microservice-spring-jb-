import { TestBed } from '@angular/core/testing';

import { MastereService } from './mastere.service';

describe('MastereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastereService = TestBed.get(MastereService);
    expect(service).toBeTruthy();
  });
});
