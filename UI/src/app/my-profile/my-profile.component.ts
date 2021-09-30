import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common-service/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  preferenceInterestList:any

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.preferenceInterestList = JSON.parse(JSON.stringify(this.commonService.interestData));
    this.commonService.testIntegration();
  }

}
