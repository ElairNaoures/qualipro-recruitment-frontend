import { TestBed } from '@angular/core/testing';

import { AuthCondidatService } from './auth-condidat.service';

describe('AuthCondidatService', () => {
  let service: AuthCondidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCondidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
