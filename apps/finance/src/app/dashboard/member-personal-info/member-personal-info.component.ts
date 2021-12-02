import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'finance-dashboard-member-personal-info',
  templateUrl: './member-personal-info.component.html',
  styleUrls: ['./member-personal-info.component.scss']
})
export class MemberPersonalInfoComponent implements OnInit {
  @Input() userInfo:any;
  constructor() { }

  ngOnInit(): void {
    console.log('@input', this.userInfo);
  }

}
