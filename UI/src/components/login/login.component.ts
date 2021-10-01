import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {Router} from "@angular/router";
import {ReturningUserService} from "../../services/returning-user/returning-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private returningUserService: ReturningUserService) { }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {

      this.router.navigate(['/home'])
    });
  }


}
