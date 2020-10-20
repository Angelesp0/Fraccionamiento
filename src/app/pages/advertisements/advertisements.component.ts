import { Component, OnInit, Type, Input } from '@angular/core';
import { UserService } from './../../_services/user/user.service';
import { Router } from '@angular/router';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Advertisements } from './../../models/advertisements';



@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Agregar Nuevo Anuncio</h4>

  </div>
  <div class="modal-body">
  <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="col-md-12" class="form-group">
          <label>Titulo <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="title" name="title" inputmode="text" class="form-control" placeholder="Titulo del anuncio" [(ngModel)]="this.data.title"  >

        </div>
        <div class="col-md-12" class="form-group">
          <label>descripcion <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="description" name="description" inputmode="text" class="form-control" placeholder="Descripcion del anuncio" [(ngModel)]="this.data.description" >
        </div>

        <div class="col-md-12" class="form-group">
          <label>Fecha <strong><span class="text-danger">*</span></strong></label>
          <input formControlName="date" type="date" name="date" inputmode="date" class="form-control" placeholder="yyyy-MM-dd" min="2020-01-01" max="2021-12-31" required  [(ngModel)]="this.data.date">
        </div>

        <div class="col-md-12" class="form-group">
          <label>division_id_division <strong><span class="text-danger">*</span></strong></label>
          <select formControlName="division_id_division" name="division_id_division" class="form-control" inputmode="text" [(ngModel)]="this.data.division_id_division">
              <option [value]="user.id_division" *ngFor="let user of name">{{user.name}} {{user.street}}</option>
          </select>

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
export class NgbdModalAdvertisements implements OnInit {
  submitted = false;
  data: Advertisements;
  registerForm: FormGroup;
  currentUser: any;
  id_role: any;
  name: any;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { this.data = new Advertisements();
    }

    create() {
      console.log('create');
      console.log(this.data);
      this.userService.postAdvertisements(this.data.title, this.data.description, this.data.date, this.data.division_id_division).subscribe(response => {
        console.log(response);
        this.modal.close('Ok click');
      });
    }

    onSubmit() {
      this.submitted = true;
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

    ngOnInit() {
      this.userService.getDivision().subscribe(response => {
        console.log(response);
        this.name  = response;
      });


      this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
      console.log(this.currentUser['user'].division_id_division);
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        division_id_division: ['', Validators.required]
      });
  }
  get f() { return this.registerForm.controls; }


}







@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})

export class AdvertisementsComponent implements OnInit {
  users: any;
  data: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  register = [];

  constructor(
    private userService: UserService,
    private _modalService: NgbModal,

  ) { }

  ngOnInit() {
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getAdvertisements().pipe(map(this.extractData)).subscribe(response => {
      this.dtTrigger.next();
      console.log(response);
      this.users  = response;
    });
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  guardar() {
    console.log(this.register);
    // this.userService.postAdvertisements().subscribe( response => {
    // });
  }

  open(names: string, id?: number) {
    const modalRef = this._modalService.open(MODALS[names]);
    modalRef.componentInstance.fromParent = id;
  }
}

const MODALS: {[name: string]: Type<any>} = {
  // editar: ModalEditar,
  autofocus: NgbdModalAdvertisements

};
