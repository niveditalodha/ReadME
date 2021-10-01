import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { ActivatedRoute, Router } from "@angular/router";
import { DailyArticleService } from "../../services/daily-article/daily-article.service";
import { DailyArticleModel } from "../../models/daily-article.model";
import { CommonService } from 'src/services/common-service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get userName(): string | null {
    return this._userName;
  }

  set userName(value: string | null) {
    this._userName = value;
  }
  get returningUser(): string | null {
    return this._returningUser;
  }

  set returningUser(value: string | null) {
    this._returningUser = value;
  }
  get userDailyArticles(): DailyArticleModel[] {
    return this._userDailyArticles;
  }

  set userDailyArticles(value: DailyArticleModel[]) {
    this._userDailyArticles = value;
  }
  get userProfile() {
    return this._userProfile;
  }

  set userProfile(value) {
    this._userProfile = value;
  }
  private _userProfile;
  private _userName!: string | null;
  private _returningUser!: string | null;
  private _userDailyArticles!: DailyArticleModel[];
  constructor(private router: Router, private socialAuthService: SocialAuthService, private dailyArticleService: DailyArticleService,
    private activatedRoute: ActivatedRoute, private commonService: CommonService) {
    this._userProfile = socialAuthService;
    this.returningUser = this.activatedRoute.snapshot.queryParamMap.get('returning_user');
    this.userName = this.activatedRoute.snapshot.queryParamMap.get('username');
    console.log('returning user :: ', this.returningUser, this.userName);
    console.log('user profile', this._userProfile)
  }


  getArticles() {
    this.dailyArticleService.getDailyArticles(this._userName).subscribe(res => {
      console.log('res', res);
      this._userDailyArticles = res;
    });
  }

  ngOnInit(): void {
    this.getArticles();
    this.commonService.setUserName(this._userName)
    this.commonService.getAllPreferences();
  }


}
