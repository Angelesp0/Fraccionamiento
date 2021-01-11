import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  currentUser: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getHistory(this.currentUser.user.id_users).subscribe( response => {
      console.log(response);
      this.dtTrigger.next();
      this.users  = response;

    });
  }

}
