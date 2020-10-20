import { Component, OnInit } from '@angular/core';
import { UserService } from './../../_services/user/user.service';
import { Router } from '@angular/router';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Complaints } from './../../models/complaints';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  users: any;
  data: Complaints;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  registerForm: FormGroup;
  submitted = false;
  currentUser: any;
  id_role: any;
  name: any;
  selected: any;

  constructor(
    private userService: UserService,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.data = new Complaints();
   }

  ngOnInit() {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getComplaints().pipe(map(this.extractData)).subscribe(response => {
      this.dtTrigger.next();
      console.log(response);
      this.users  = response;
    });
    this.registerForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      division_id_division: ['', Validators.required]
    });
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.currentUser);
    // this.data.division_id_division = '2';
    if (this.currentUser['user'].role_id_role === 2 ) {
      console.log('gerente');
      this.id_role = 3;
      this.data.division_id_division = this.currentUser['user'].division_id_division;
    }
    if (this.currentUser['user'].role_id_role === 1 ) {
      console.log('Admin');
      this.id_role = 2;
    }

    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      console.log('invalid');
        return;
    } else {
      this.create();
    }
  }

  create() {
    console.log('create');
    console.log(this.data);
    this.userService.postComplaints(this.data.subject, this.data.message, this.data.division_id_division).subscribe(response => {
      console.log(response);
      this.modal.close('Ok click');
    });
  }

  open(content) {
    this.userService.getDivision().subscribe(response => {
      console.log(response);
      this.name  = response;
    });
    this.modalService.open(content, { size: 'md' });
  }

}
