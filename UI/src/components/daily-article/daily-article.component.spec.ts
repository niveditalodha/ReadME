import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyArticleComponent } from './daily-article.component';

describe('DailyArticleComponent', () => {
  let component: DailyArticleComponent;
  let fixture: ComponentFixture<DailyArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
