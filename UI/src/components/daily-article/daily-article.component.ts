import {Component, Input, OnInit} from '@angular/core';
import {DailyArticleModel} from "../../models/daily-article.model";

@Component({
  selector: 'app-daily-article',
  templateUrl: './daily-article.component.html',
  styleUrls: ['./daily-article.component.css']
})
export class DailyArticleComponent implements OnInit {

  @Input() dailyArticles!: DailyArticleModel;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    console.log('daily article', this.dailyArticles);
  }

}
