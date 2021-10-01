import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common-service/common.service';
import { DailyArticleService } from 'src/services/daily-article/daily-article.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  preferenceInterestList: any
  preferenceLength!: number;
  user_name!: string | null;
  constructor(private commonService: CommonService, private articleService: DailyArticleService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user_name = this.activatedRoute.snapshot.queryParamMap.get('username');
    this.getSentArticles();
  }

  getSentArticles() {
    this.articleService.getDailyArticles(this.user_name).subscribe((response: any) => {
      let resp = JSON.parse(JSON.stringify(response));
      this.commonService.sentArticles = resp
      this.preferenceInterestList = this.commonService.generateInterestData();
      this.preferenceLength = resp.length;
    });
  }

}
