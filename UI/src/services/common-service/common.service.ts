import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPreferenceService } from '../user-preference/user-preference.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  preference: any
  preferenceList: any
  sentArticles: any
  badge: any
  interestData: any
  userName!: string | null;

  constructor(private http: HttpClient, private userPreferenceService: UserPreferenceService) {
  }

  generateInterestData() {
    let data: any = [];
    this.preferenceList.forEach((element: any) => {
      let preference = new PreferenceInterest();
      preference.concept_id = element.concept_id;
      preference.concept_name = element.concept_name;
      let badge = this.badge.filter((b: any) => {
        return b.concept_id == preference.concept_id
      });
      preference.badge = badge.length > 0 ? badge[0].user_badge : "Beginner";
      let articles = this.sentArticles.filter((a: any) => {
        return a.concept_id.includes(preference.concept_id);
      })
      articles.length > 0 && (preference.articleList = articles)
      data.push(preference)
    });
    return data;
  }
  setUserName(userName: string | null) {
    this.userName = userName;
  }
  getUserName() {
    let userName = sessionStorage.getItem('userName');
    return userName != "" ? userName : null
  }

  getAllPreferences(userName: string | null) {
    this.userPreferenceService.getPreferenceList(userName).subscribe((response: any) => {
      this.preference = JSON.parse(JSON.stringify(response))
      this.preferenceList = this.preference.filter((x: any) => x.checked == true)
    })
  }
}

export class PreferenceInterest {
  concept_id: any;
  concept_name: any;
  badge: any;
  articleList: any;
}
