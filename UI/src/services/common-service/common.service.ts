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
    this.preference = [
      {"concept_id": 1, "checked": true, "concept_name": "Artificial Intelligence"},
      {"concept_id": 2, "checked": true, "concept_name": "Graph Mining"},
      {"concept_id": 3, "checked": true, "concept_name": "Algorithms"},
      {"concept_id": 4, "checked": false, "concept_name": "Object Oriented Programming"},
      {"concept_id": 5, "checked": true, "concept_name": "Data Structures"},
      {"concept_id": 11, "checked": false, "concept_name": "Artificial Intelligence"},
      {"concept_id": 12, "checked": false, "concept_name": "Graph Mining"},
      {"concept_id": 13, "checked": false, "concept_name": "Algorithms"},
      {"concept_id": 14, "checked": false, "concept_name": "Object Oriented Programming"},
      {"concept_id": 15, "checked": false, "concept_name": "Data Structures"},
      {"concept_id": 21, "checked": false, "concept_name": "Artificial Intelligence"},
      {"concept_id": 22, "checked": false, "concept_name": "Graph Mining"},
      {"concept_id": 23, "checked": false, "concept_name": "Algorithms"},
      {"concept_id": 24, "checked": false, "concept_name": "Object Oriented Programming"},
      {"concept_id": 25, "checked": false, "concept_name": "Data Structures"},
      {"concept_id": 31, "checked": false, "concept_name": "Artificial Intelligence"},
      {"concept_id": 32, "checked": false, "concept_name": "Graph Mining"},
      {"concept_id": 33, "checked": false, "concept_name": "Algorithms"},
      {"concept_id": 34, "checked": false, "concept_name": "Object Oriented Programming"},
      {"concept_id": 35, "checked": false, "concept_name": "Data Structures"}
    ]
    this.preferenceList = this.preference.filter((x: any) => x.checked == true)
    this.sentArticles = [
      {
        'concept_name': ['concept1', 'concept3'],
        'concept_id': [1, 3],
        'title': 'test2',
        'abstract': 'test abstract 2',
        'url': 'https://xyz.com',
        'domain': 'xyz',
        'doi': '10.3'
      },
      {
        'concept_name': ['concept1', 'concept2'],
        'concept_id': [1, 2],
        'title': 'Test1',
        'abstract': 'test abstract 1',
        'url': 'https://abc.com',
        'domain': 'abc',
        'doi': '10.2'
      }
    ]
    this.badge = [
      {
        "user_id": "abc",
        "concept_id": 1,
        "user_badge": "Beginner"
      },
      {
        "user_id": "abc",
        "concept_id": 2,
        "user_badge": "Intermediate"
      },
      {
        "user_id": "abc",
        "concept_id": 3,
        "user_badge": "Beginner"
      },
      {
        "user_id": "abc",
        "concept_id": 4,
        "user_badge": "Expert"
      }
    ]
    this.interestData = this.generateInterestData();
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
    this.userName = 'uma';
  }
  getUserName() {
    return this.userName
  }
  
  getAllPreferences() {
    this.userPreferenceService.getPreferenceList(this.userName).subscribe((response: any) => {
      this.preference = JSON.parse(JSON.stringify(response))
    })
  }
}

export class PreferenceInterest {
  concept_id: any;
  concept_name: any;
  badge: any;
  articleList: any;
}
