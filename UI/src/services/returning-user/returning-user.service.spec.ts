import { TestBed } from '@angular/core/testing';

import { ReturningUserService } from './returning-user.service';

describe('ReturningUserService', () => {
  let service: ReturningUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturningUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
