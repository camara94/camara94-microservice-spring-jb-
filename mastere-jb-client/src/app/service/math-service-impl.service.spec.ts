import { TestBed } from '@angular/core/testing';

import { MathServiceImplService } from './math-service-impl.service';

describe('MathServiceImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathServiceImplService = TestBed.get(MathServiceImplService);
    expect(service).toBeTruthy();
  });
});
