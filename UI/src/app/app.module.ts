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
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserPreferenceComponent } from '../components/user-preference/user-preference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/pipes/search.pipe';
import { MyProfileComponent } from '../components/my-profile/my-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    RecommendationCarouselComponent,
    DailyArticleComponent,
    LoginComponent,
    HomeComponent,
    ConferenceComponent,
    UserPreferenceComponent,
    SearchPipe,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'profile', component: MyProfileComponent},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
  SocialAuthService,
  HttpClient
],
  bootstrap: [AppComponent]
})
export class AppModule { }
