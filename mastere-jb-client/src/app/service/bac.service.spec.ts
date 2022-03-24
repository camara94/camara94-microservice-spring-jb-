import { TestBed } from '@angular/core/testing';

import { BacService } from './bac.service';

describe('BacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BacService = TestBed.get(BacService);
    expect(service).toBeTruthy();
  });
});
