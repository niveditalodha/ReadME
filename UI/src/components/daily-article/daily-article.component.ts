import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {DailyArticleModel} from "../../models/daily-article.model";
import {RandomArticleModel} from "../../models/random-article.model";

@Component({
  selector: 'app-daily-article',
  templateUrl: './daily-article.component.html',
  styleUrls: ['./daily-article.component.css']
})
export class DailyArticleComponent implements OnInit {

  @Input() dailyArticles!: DailyArticleModel[];
  @Input() articleData!: RandomArticleModel;

  constructor() {

  }



  ngOnInit() {
    // console.log('article', this.articleData);
    console.log('article abstract', this.articleData.abstract);
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
