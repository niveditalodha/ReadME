import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SocialAuthService} from "angularx-social-login";
import {ActivatedRoute, Router} from "@angular/router";
import {DailyArticleService} from "../../services/daily-article/daily-article.service";
import {DailyArticleModel} from "../../models/daily-article.model";
import {RandomArticleService} from "../../services/random-article-service/random-article.service";
import {RandomArticleModel} from "../../models/random-article.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get articlesLength(): number {
    return this._articlesLength;
  }

  set articlesLength(value: number) {
    this._articlesLength = value;
  }
  get randomArticles(): RandomArticleModel[] {
    return this._randomArticles;
  }

  set randomArticles(value: RandomArticleModel[]) {
    this._randomArticles = value;
  }
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
  private _articlesLength!: number;
  private _userName!: string | null;
  private _returningUser!: string | null;
  private _randomArticles!: RandomArticleModel[];
  private _userDailyArticles!: DailyArticleModel[];
  constructor(private router: Router,private socialAuthService: SocialAuthService, private dailyArticleService: DailyArticleService,
              private activatedRoute: ActivatedRoute, private randomArticleService: RandomArticleService) {
    this._userProfile = socialAuthService;
    this.returningUser = this.activatedRoute.snapshot.queryParamMap.get('returning_user');
    this.userName = this.activatedRoute.snapshot.queryParamMap.get('username');
    console.log('returning user :: ', this.returningUser, this.userName);
    console.log('user profile', this._userProfile )
  }


  getArticles(){
    this.dailyArticleService.getDailyArticles(this._userName).subscribe(res => {
      console.log('res', res);
      this._userDailyArticles = res;
      this._articlesLength = this.userDailyArticles.length
    });
  }

  ngOnInit(): void {
    this.getArticles();
    this.getRandomArticles();
  }

  getRandomArticles(){
    this.randomArticleService.getRandomArticles().subscribe(response => {
      console.log('random artice', response);
      this._randomArticles = response;
    })
  }


}
