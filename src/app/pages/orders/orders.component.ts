import { Component, OnInit } from '@angular/core';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../_services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from './../../models/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  users: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  currentUser: any;
  registerForm: FormGroup;
  data: any;
  user: any;
  employees: any;
  array;
  id_order;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
  ) {
    this.data = new Order();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getOrders().pipe(map(this.extractData)).subscribe( response => {
      this.dtTrigger.next();
      this.users  = response;
      console.log(response);
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
  open(content, id) {
    this.userService.getUser(id).subscribe(response => {
      this.user  = response;
      console.log(response);
    });
    this.modalService.open(content, { size: 'md' });
  }
  trabajador(content, id_order) {
    this.id_order = id_order;
    this.userService.getEmployees().subscribe(response => {
      this.employees = response;
      for (let index = 0; index < this.employees.length; index++) {
        let rank;
        this.userService.getStars(this.employees[index]['id_employee']).subscribe(response => {
          this.array = response;
          let stars = 0;
          this.array.forEach(element => {
            stars = stars + element['score'];
          });
          rank = stars / this.array.length;
          this.employees[index].rank = rank;
        });
      }
      console.log(this.employees);
    });
    this.modalService.open(content, { size: 'md' });
  }

  changeEmployee() {
    this.userService.putEmployees(this.id_order, this.data.id_employee).subscribe(response  => {
      console.log(response);
    });
  }
  onSubmit() {
    
  }
}
