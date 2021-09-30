import { Component, OnInit } from '@angular/core';
import {ConferenceService} from "../../services/conference/conference.service";
import {ConferenceModel} from "../../models/conference.model";

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
  get userConferences(): ConferenceModel[] {
    return this._userConferences;
  }

  set userConferences(value: ConferenceModel[]) {
    this._userConferences = value;
  }

  private _userConferences!: ConferenceModel[];

  constructor(private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    this.getUserConf();
  }

  getUserConf(){
    this.conferenceService.getUserConferences().subscribe(response => {
      this._userConferences = response;
    })
  }

}
