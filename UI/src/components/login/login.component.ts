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

  private _returningUser!: boolean;

  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private returningUserService: ReturningUserService) {
  }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userdata) => {
      this.returningUserService.checkReturningUser(userdata.name,userdata.email).subscribe(response => {
        // console.log('returning user response', response, response == 'existing');
        if(response == 'existing'){
          this._returningUser = true;
        } else {
          this._returningUser = false;
        }
        this.router.navigate(['/home'], {queryParams: {returning_user : this._returningUser , username :userdata.email.split('@')[0]}})
      });
    });
  }


}
