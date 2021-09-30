import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { RecommendationCarouselComponent } from '../components/recommendation-carousel/recommendation-carousel.component';
import { DailyArticleComponent } from '../components/daily-article/daily-article.component';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "../services/auth-guard/auth-guard.service";
import { ConferenceComponent } from '../components/conference/conference.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";



@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    RecommendationCarouselComponent,
    DailyArticleComponent,
    LoginComponent,
    HomeComponent,
    ConferenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('825232623676-2o0704viavc7tja1r47f01ggpe1k2niv.apps.googleusercontent.com') // your client id
        }
      ]
    }
  },
    SocialAuthService, HttpClient, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

