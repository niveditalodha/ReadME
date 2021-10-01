import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ConferenceService} from "../../services/conference/conference.service";
import {ConferenceModel} from "../../models/conference.model";

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements AfterViewInit {
  get upcomingUserConferences(): ConferenceModel[] {
    return this._upcomingUserConferences;
  }

  set upcomingUserConferences(value: ConferenceModel[]) {
    this._upcomingUserConferences = value;
  }
  get userConferences(): ConferenceModel[] {
    return this._userConferences;
  }

  set userConferences(value: ConferenceModel[]) {
    this._userConferences = value;
  }

  private _userConferences!: ConferenceModel[];
  private _upcomingUserConferences!: ConferenceModel[];

  constructor(private conferenceService: ConferenceService) { }

  ngAfterViewInit(): void {
    this.getUserConf();
    this.getUpcomingUserConf();
  }

  getUserConf(){
    this.conferenceService.getUserConferences().subscribe(response => {
      this._userConferences = response;
      // console.log('conf', this._userConferences)
    })
  }

  getUpcomingUserConf(){
    this.conferenceService.getUpcomingUserConferences().subscribe(response => {
      this._upcomingUserConferences = response;
      // console.log('conf', this._upcomingUserConferences)
    })
  }

}
