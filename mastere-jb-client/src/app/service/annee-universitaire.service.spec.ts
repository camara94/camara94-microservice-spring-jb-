import { TestBed } from '@angular/core/testing';

import { AnneeUniversitaireService } from './annee-universitaire.service';

describe('AnneeUniversitaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnneeUniversitaireService = TestBed.get(AnneeUniversitaireService);
    expect(service).toBeTruthy();
  });
});
