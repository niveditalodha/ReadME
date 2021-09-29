import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-recommendation-carousel',
  templateUrl: './recommendation-carousel.component.html',
  styleUrls: ['./recommendation-carousel.component.css']
})
export class RecommendationCarouselComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    config.interval = 20000000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
  }

}
