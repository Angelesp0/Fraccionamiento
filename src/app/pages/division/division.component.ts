import { UserService } from './../../_services/user/user.service';
import { map  } from 'rxjs/operators';
import { Subject  } from 'rxjs';
//
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, Type, Input, OnDestroy  } from '@angular/core';
import { User } from '../../models/user';



// Agregar Usuario
@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Agregar Nuevo Fraccionamiento</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <form (ngSubmit)="onSubmit()">
        <div class="col-md-12" class="form-group">
          <label>Nombre(s) <strong><span class="text-danger">*</span></strong></label>
          <input name="name" inputmode="text" class="form-control" placeholder="Nombre" [(ngModel)]="this.data.name" >

        </div>
        <div class="col-md-12" class="form-group">
          <label>Calle <strong><span class="text-danger">*</span></strong></label>
          <input name="street" inputmode="text" class="form-control" placeholder="Calle" [(ngModel)]="this.data.street" >
        </div>

        <div class="col-md">
          <label>Usuario gerentes<strong><span class="text-danger">*</span></strong></label>
          <select name="id_users" class="form-control" inputmode="text" [(ngModel)]="this.data.id_users">
              <option [value]="user.id_users" *ngFor="let user of name">{{user.first_name}} {{user.last_name}}</option>
          </select>
        </div>

      <p><strong>Estas por agregar un nuevo usuario <span class="text-primary">Verifica</span> la informacion</strong></p>
      <div class="form-group">
        <button type="submit" ngbAutofocus class="btn btn-danger">Ok</button>
      </div>
    </form>
  </div>
  `
})
export class NgbdModalDivision implements OnInit {
  submitted = false;
  data: any = [];
  name: any;
  users: any;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    public router: Router) {
      this.users = new User();
    }
    create() {
      console.log(this.data);
      this.userService.postFraccionamientos(this.data).subscribe(response => console.log(response));
    }
    onSubmit() {
      this.submitted = true;
      this.create();
    }
    ngOnInit() {
      this.userService.getManager().subscribe((response) => {
        this.name = response;
        console.log(response);
      });
  }

}


@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  users: any;
  data: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private userService: UserService,
    private _modalService: NgbModal,
    public router: Router


  ) { }

  ngOnInit(): void {
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getDivision().pipe(map(this.extractData)).subscribe(response => {
      this.dtTrigger.next();
      console.log(response);
      this.users  = response;
    });
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  open(name: string, id?: number) {
  const modalRef = this._modalService.open(MODALS[name]);
  modalRef.componentInstance.fromParent = id;
}

}

const MODALS: {[name: string]: Type<any>} = {
  autofocus: NgbdModalDivision,
};
