import { TestBed } from '@angular/core/testing';

import { ProfessionalExperCondService } from './professional-exper-cond.service';

describe('ProfessionalExperCondService', () => {
  let service: ProfessionalExperCondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalExperCondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
