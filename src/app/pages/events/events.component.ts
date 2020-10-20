import { Component, OnInit } from '@angular/core';
import { UserService } from './../../_services/user/user.service';
import { Router } from '@angular/router';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from './../../models/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  users: any;
  data: Events;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  registerForm: FormGroup;
  submitted = false;
  currentUser: any;
  id_role: any;
  name: any;
  selected: any;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) {
      this.data = new Events();
     }

  ngOnInit() {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getEvents().pipe(map(this.extractData)).subscribe(response => {
      this.dtTrigger.next();
      console.log(response);
      this.users  = response;
    });
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      division_id_division: ['', Validators.required],
      end: ['', Validators.required],
      start: ['', Validators.required],

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
    this.userService.postEvents(this.data.title, this.data.description, this.data.start, this.data.end, this.data.division_id_division).subscribe(response => {
      console.log(response);
      this.modal.close('Ok click');
    });
  }

  open(content, data) {
    this.selected = data;
    this.userService.getDivision().subscribe(response => {
      console.log(response);
      this.name  = response;
    });
    this.modalService.open(content, { size: 'md' });
  }

}
