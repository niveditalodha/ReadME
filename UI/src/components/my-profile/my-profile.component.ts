import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common-service/common.service';
import { DailyArticleService } from 'src/services/daily-article/daily-article.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, AfterViewInit {
  preferenceInterestList: any
  isCarousalVisible: boolean = false
  constructor(private commonService: CommonService, private articleService: DailyArticleService) { }

  ngOnInit(): void {
    this.getSentArticles();
    this.preferenceInterestList = JSON.parse(JSON.stringify(this.commonService.interestData));
  }
  ngAfterViewInit(): void {
    // this.getSentArticles();
  }
  getSentArticles() {
    this.articleService.getDailyArticles(this.commonService.userName).subscribe((response: any) => {
      this.commonService.sentArticles = JSON.parse(JSON.stringify(response));
      this.preferenceInterestList = this.commonService.generateInterestData()
      this.isCarousalVisible = this.preferenceInterestList.length > 0
    })
  }

}
