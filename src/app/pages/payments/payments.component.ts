import { Component, OnInit } from '@angular/core';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { UserService } from './../../_services/user/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  currentUser: any;
  users: any;

  constructor(
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    console.log( this.currentUser);
    this.userService.getPayments(this.currentUser.user.division_id_division).pipe(map(this.extractData)).subscribe(response => {
      this.dtTrigger.next();
      console.log(response);
      this.users  = response;
    });
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

}
