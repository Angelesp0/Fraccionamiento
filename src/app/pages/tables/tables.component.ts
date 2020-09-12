import { Component, OnInit, Type, Input  } from '@angular/core';
import { UserService } from './../../_services/user/user.service';
import { Router } from '@angular/router';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser'

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Editar Usuario
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
              <tr *ngFor="let use of pay">
                  <td>{{use.type}}</td>
                  <td>{{use.amount }}</td>
                  <td>{{use.date }}</td>
              </tr>
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
      console.log(this.fromParent);
      this.userService.getPaid(this.fromParent).subscribe(response => {
        this.pay = response;
        console.log(this.pay);
      });
    }
}

const MODALS: {[name: string]: Type<any>} = {
  editar: ModalEditar
};

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

  constructor(
    private _modalService: NgbModal,
    private userService: UserService,
  ) { }

  ngOnInit() {
    console.log('hola');
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.userService.getUsers().pipe(map(this.extractData)).subscribe(response => {
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
