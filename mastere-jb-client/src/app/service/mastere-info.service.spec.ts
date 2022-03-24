import { TestBed } from '@angular/core/testing';

import { MastereInfoService } from './mastere-info.service';

describe('MastereInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastereInfoService = TestBed.get(MastereInfoService);
    expect(service).toBeTruthy();
  });
});
