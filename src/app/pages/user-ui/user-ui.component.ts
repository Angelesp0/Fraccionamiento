import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user/user.service';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.css']
})
export class UserUiComponent implements OnInit {
  events: any;
  currentUser: any;
  lastPayment: any;
  id_user: any;
  date: Date = new Date();
  date1;

  constructor(
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id_user = this.currentUser['user'].id_users;
    const division_id = this.currentUser['user'].division_id_division;
    this.userService.getEventsbyDivision(division_id).subscribe(response => {
      this.events = response;
    });
    this.userService.getLastPaymentByDivision(this.id_user).subscribe(response => {
      this.lastPayment = response;
      this.date = response['update_time'];
    });
  }

  pagar() {
    this.router.navigate(['/pay/']);
  }

}
