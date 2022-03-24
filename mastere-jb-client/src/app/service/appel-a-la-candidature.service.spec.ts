import { TestBed } from '@angular/core/testing';

import { AppelALaCandidatureService } from './appel-a-la-candidature.service';

describe('AppelALaCandidatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppelALaCandidatureService = TestBed.get(AppelALaCandidatureService);
    expect(service).toBeTruthy();
  });
});
