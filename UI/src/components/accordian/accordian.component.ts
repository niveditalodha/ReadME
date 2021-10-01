import {Component, Input, OnInit} from '@angular/core';
import {ConferenceModel} from "../../models/conference.model";

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent implements OnInit {

  // @ts-ignore
  @Input() conferenceDetails: ConferenceModel[];
  // @ts-ignore
  @Input() userConference: boolean;

  constructor() { }

  ngOnInit(): void {
    // console.log('conference details', this.conferenceDetails)
  }

}
