import {AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {RandomArticleModel} from "../../models/random-article.model";

@Component({
  selector: 'app-recommendation-carousel',
  templateUrl: './recommendation-carousel.component.html',
  styleUrls: ['./recommendation-carousel.component.css']
})
export class RecommendationCarouselComponent implements AfterContentChecked {

  @Input() randomArticlesList!: RandomArticleModel[];
  @Output() articleRead: EventEmitter<any> = new EventEmitter<any>()

  constructor(config: NgbCarouselConfig) {
    config.interval = 20000000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngAfterContentChecked(): void {
    // console.log('random article list', this.randomArticlesList);
  }
  articleReadStat(articleId: any) {
    this.articleRead.emit(articleId);
  }

}
