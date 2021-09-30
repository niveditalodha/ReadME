import { Component, OnInit } from '@angular/core';
import {SocialAuthService} from "angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get userProfile() {
    return this._userProfile;
  }

  set userProfile(value) {
    this._userProfile = value;
  }
  private _userProfile;
  constructor(private router: Router,private socialAuthService: SocialAuthService) {
    this._userProfile = socialAuthService
  }

  ngOnInit(): void {
  }


}
