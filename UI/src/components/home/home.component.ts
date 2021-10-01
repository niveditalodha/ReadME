import { Component, OnInit } from '@angular/core';
import {SocialAuthService} from "angularx-social-login";
import {Router} from "@angular/router";
import {DailyArticleService} from "../../services/daily-article/daily-article.service";
import {DailyArticleModel} from "../../models/daily-article.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  private _userDailyArticles!: DailyArticleModel[];
  constructor(private router: Router,private socialAuthService: SocialAuthService, private dailyArticleService: DailyArticleService) {
    this._userProfile = socialAuthService

  }


  getArticles(){
    this.dailyArticleService.getDailyArticles().subscribe(res => {
      console.log('res', res);
      this._userDailyArticles = res;
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }


}
