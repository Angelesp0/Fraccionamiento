import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  currentUser: any;
  id_user: any;
  payments: any;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id_user = this.currentUser['user'].id_users;
    this.userService.getPaid(this.id_user).subscribe( response => {
      console.log(response);
      this.payments = response;
    });
  }

}
