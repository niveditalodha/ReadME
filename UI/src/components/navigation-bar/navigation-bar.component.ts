import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbCarouselConfig, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {


  constructor(private router: Router, config: NgbPopoverConfig, private socialAuthService: SocialAuthService,
    private modalService: BsModalService) {
    config.placement = 'bottom';
    config.triggers = 'click';
  }

  ngOnInit(): void {
  }
  navbarOpen = false;
  modalRef?: BsModalRef;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  goToProfile() {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.socialAuthService.signOut().then(() => this.router.navigate(['login']));
  }

  openPreference(preference: TemplateRef<any>) {
    this.modalRef = this.modalService.show(preference);
  }

  routeToLink(link: string) {
    this.router.navigate(['/' + link])
  }

}
