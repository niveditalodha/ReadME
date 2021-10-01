import {AfterContentChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {RandomArticleModel} from "../../models/random-article.model";

@Component({
  selector: 'app-recommendation-carousel',
  templateUrl: './recommendation-carousel.component.html',
  styleUrls: ['./recommendation-carousel.component.css']
})
export class RecommendationCarouselComponent implements AfterContentChecked {

  @Input() randomArticlesList!: RandomArticleModel[];

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

}
