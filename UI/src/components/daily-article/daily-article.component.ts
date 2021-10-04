import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() articleRead: EventEmitter<any> = new EventEmitter<any>()

  constructor() {

  }



  ngOnInit() {
    // console.log('article', this.articleData);
    // console.log('article abstract', this.articleData.abstract);
  }

  goToLink(url: any) {
    window.open(url, "_blank");
    if(this.articleData.send_article_id)
    {
      this.articleRead.emit(this.articleData.send_article_id)
    }
    console.log("ArticleSentId :: ", this.articleData)
  }
}
