import { Component, Input, OnInit,  } from '@angular/core';
import { CommonService } from 'src/services/common-service/common.service';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.css']
})
export class UserPreferenceComponent implements OnInit {
  preference: any;
  preferenceInterestList:any
  searchWord: any = '';
  // @Input() modalRef: any;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.preference = JSON.parse(JSON.stringify(this.commonService.preference));
    this.preferenceInterestList = JSON.parse(JSON.stringify(this.commonService.interestData))   
  }
  updatePreference() {
    // this.modalRef?.hide()

  }
  closeModal(){
    this.preference = JSON.parse(JSON.stringify(this.commonService.preference));
    // this.modalRef?.hide()
  }
  

}
