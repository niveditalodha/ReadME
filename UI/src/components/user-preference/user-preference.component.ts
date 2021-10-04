import { Component, Input, OnInit,  } from '@angular/core';
import { CommonService } from 'src/services/common-service/common.service';
import { UserPreferenceService } from 'src/services/user-preference/user-preference.service';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.css']
})
export class UserPreferenceComponent implements OnInit {
  preference: any;
  preferenceInterestList:any
  searchWord: any = '';
  userName: any
  @Input() modalRef: any;

  constructor(private commonService: CommonService, private userPreferenceService: UserPreferenceService) { }

  ngOnInit(): void {
    this.userName = this.commonService.getUserName()
    // console.log("username", this.userName)
    this.preference = JSON.parse(JSON.stringify(this.commonService.preference));
    // this.preferenceInterestList = JSON.parse(JSON.stringify(this.commonService.interestData))   
  }
  updatePreference() {
    this.userPreferenceService.updatePreference(this.userName, this.preference).subscribe((resp: any) => {

    })
    this.commonService.preference = JSON.parse(JSON.stringify (this.preference))
    this.modalRef?.hide()

  }
  closeModal(){
    this.preference = JSON.parse(JSON.stringify(this.commonService.preference));
    this.modalRef?.hide()
  }
  
  

}
