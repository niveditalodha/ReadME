import { TestBed } from '@angular/core/testing';

import { RandomArticleService } from './random-article.service';

describe('RandomArticleService', () => {
  let service: RandomArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
