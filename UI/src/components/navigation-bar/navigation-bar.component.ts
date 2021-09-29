import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {SocialAuthService} from "angularx-social-login";



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {


  constructor(private router:Router, config: NgbPopoverConfig, private socialAuthService: SocialAuthService) {
    config.placement = 'bottom';
    config.triggers = 'click';
  }

  ngOnInit(): void {
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  goToProfile(){
    this.router.navigate(['login']);
  }

  logout(): void {
    this.socialAuthService.signOut().then(() => this.router.navigate(['login']));
  }



}
