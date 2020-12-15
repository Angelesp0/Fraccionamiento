import { Component, OnInit } from '@angular/core';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { User } from './../../models/user';
import { UserService } from './../../_services/user/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerForm: any;
  name: any;
  user: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
  ) {
    this.user = new User();

  }

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
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      division_id_division: ['', Validators.required],
      house_number: ['', Validators.required],
      street: ['', Validators.required]
    });
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  open(content, id) {
    this.userService.getUser(id).subscribe(response => {
      console.log(response);
      this.user  = response;
    });
    this.modalService.open(content, { size: 'md' });
  }

  newVoting() {
    const division_id = this.currentUser['user'].division_id_division;
    /*this.userService.postVoting(division_id, this.data.name, this.data.description, this.data.budget ).subscribe(response => {
      console.log('Votacion registrada');
    });*/
  }

}
