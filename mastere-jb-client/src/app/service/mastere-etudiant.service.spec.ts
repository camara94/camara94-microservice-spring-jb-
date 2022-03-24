import { TestBed } from '@angular/core/testing';

import { MastereEtudiantService } from './mastere-etudiant.service';

describe('MastereEtudiantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastereEtudiantService = TestBed.get(MastereEtudiantService);
    expect(service).toBeTruthy();
  });
});
