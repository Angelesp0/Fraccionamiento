import { Component, OnInit, Type, Input  } from '@angular/core';
import { UserService } from './../../_services/user/user.service';
import { Router } from '@angular/router';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../models/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Editar Usuario
/*
@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <div class="row mt-5">
    <div class="col">
      <div class="card shadow">
        <div class="card-header bg-transparent border-0">
          <h3 class="mb-0">Pagos</h3>
        </div>
        <div class="table-responsive">
          <table class="table align-items-center table-flush">
            <thead class="thead-light">
              <tr>
                <th scope="col">Tipo de pago</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <ng-template *ngFor="let use of data">
              <div> holas</div>
                  <td>{{use}}</td>
                  <td>{{use.amount }}</td>
                  <td>{{use.date }}</td>
              </ng-template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p><strong>Estas por editar el usuario <span class="text-primary">Verifica</span> la informacion</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger">Ok</button>
  </div>
  `
})
export class ModalEditar {
  @Input() fromParent;
  data: any;
  pay: any;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    public router: Router) {

    }
    ngOnInit() {
      this.userService.getPaid(this.fromParent).subscribe(response => {
        this.pay = response;
        console.log(this.pay);
        // console.log(this.pay[0].amount);
      });
    }
}
*/

// Agregar Usuario
@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Agregar Usuario Nuevo</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="col-md-12" class="form-group">
          <label>Nombre(s) <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="first_name" name="first_name" inputmode="text" class="form-control" placeholder="Nombre" [(ngModel)]="this.data.first_name"  >

        </div>
        <div class="col-md-12" class="form-group">
          <label>Apellido(s) <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="last_name" name="last_name" inputmode="text" class="form-control" placeholder="Apellido" [(ngModel)]="this.data.last_name" >
        </div>

        <div class="col-md-12" class="form-group">
          <label>Email <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="email" name="email" inputmode="text" class="form-control" placeholder="email" [(ngModel)]="this.data.email">
        </div>

        <div class="col-md-12" class="form-group">
          <label>Contraseña <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="password" name="password" inputmode="text" class="form-control" placeholder="Contraseña" [(ngModel)]="this.data.password">
        </div>

      <p><strong>Estas por agregar un nuevo usuario <span class="text-primary">Verifica</span> la informacion</strong></p>
      <div class="form-group">

        <button type="submit" class="btn btn-danger">Ok</button>
        <button class="btn" data-dismiss="modal">Cancel</button>
        </div>
    </form>
  </div>
  `
})
export class NgbdModalConfirmAutofocus implements OnInit {
  submitted = false;
  data: User;
  registerForm: FormGroup
  currentUser: any;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { this.data = new User();  }

    create() {
      console.log('create');
      this.userService.postUsers(this.data).subscribe(response => console.log(response));
    }

    onSubmit() {
      this.submitted = true;
      console.log(this.data);
      // this.data.division_id_division = '2';
      if (this.currentUser['user'].role_id_role === 2 ) {
        console.log('gerente');
        this.data.role_id_role = 3;
        this.data.division_id_division = this.currentUser['user'].division_id_division;
      }
      if (this.currentUser['user'].role_id_role === 1 ) {
        console.log('Admin');
        this.data.role_id_role = 2;

      }

      console.log(this.registerForm);
      if (this.registerForm.invalid) {
        console.log('invalid');
          return;
      } else {
        this.create();
      }
    }

    ngOnInit() {
      this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
      console.log(this.currentUser['user'].division_id_division);


      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }
  get f() { return this.registerForm.controls; }


}


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  users: any;
  data: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  divisions: any;
  currentUser: any;

  constructor(
    private _modalService: NgbModal,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    console.log(this.currentUser['user'].role_id_role);
    if (this.currentUser['user'].role_id_role === 2 ) {
      console.log('gerente');
      this.userService.getUsersByDivision(this.currentUser['user'].division_id_division).pipe(map(this.extractData)).subscribe(response => {
        this.dtTrigger.next();
        console.log(response);
        this.users  = response;
      });
    }
    if (this.currentUser['user'].role_id_role === 1 ) {
      console.log('Admin');
      this.userService.getManager().pipe(map(this.extractData)).subscribe(response => {
        this.dtTrigger.next();
        console.log(response);
        this.users  = response;
      });
    }

    this.userService.getDivision().subscribe(response => {
      this.divisions = response;
      console.log(this.divisions[0]['name']);
    });
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  open(names: string, id?: number) {
    const modalRef = this._modalService.open(MODALS[names]);
    modalRef.componentInstance.fromParent = id;
  }
}


const MODALS: {[name: string]: Type<any>} = {
  // editar: ModalEditar,
  autofocus: NgbdModalConfirmAutofocus

};
