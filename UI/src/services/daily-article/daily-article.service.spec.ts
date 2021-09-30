import { TestBed } from '@angular/core/testing';

import { DailyArticleService } from './daily-article.service';

describe('DailyArticleService', () => {
  let service: DailyArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
