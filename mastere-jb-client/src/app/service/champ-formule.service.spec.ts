import { TestBed } from '@angular/core/testing';

import { ChampFormuleService } from './champ-formule.service';

describe('ChampFormuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampFormuleService = TestBed.get(ChampFormuleService);
    expect(service).toBeTruthy();
  });
});
