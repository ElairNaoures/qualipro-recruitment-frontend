import { TestBed } from '@angular/core/testing';

import { ProfileJobService } from './profile-job.service';

describe('ProfileJobService', () => {
  let service: ProfileJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
