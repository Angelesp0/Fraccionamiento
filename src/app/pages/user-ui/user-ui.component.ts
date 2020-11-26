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
  error: any;
  votaciones: any;



  constructor(
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id_user = this.currentUser['user'].id_users;
    this.userService.usersStatus(this.id_user).subscribe(response => {
      console.log(response['status']);
      if (response['status'] === 'disabled') {
          this.error = true;
    }

    });

    const division_id = this.currentUser['user'].division_id_division;
    this.userService.getEventsbyDivision(division_id).subscribe(response => {
      console.log(response);
      this.events = response;
    });
    this.userService.getLastPaymentByDivision(this.id_user).subscribe(response => {
      this.lastPayment = response;
      this.date = response['update_time'];
    });
    this.userService.getVoting(division_id).subscribe(response => {
      console.log(response);
      this.votaciones = response;
    });
  }

  pagar() {
    this.router.navigate(['/pay/']);
  }

  aceptar(id_voting) {
    this.userService.postVote(id_voting, this.id_user, '1').subscribe(response => {
      console.log('enviado');
    });
  }

  rechazar(id_voting) {
    this.userService.postVote(id_voting, this.id_user, '0').subscribe(response => {
      console.log('enviado');
    });
  }

}
