import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  todayDate: Date = new Date();

  currentUser: any;
  id_user: any;
  description = 'Recibo';
  amount = 500;
  status = 'revision';
  update_time;
  type = 'Deposito';

  file: File;

  uploader = new FileUploader({
    maxFileSize: 1024 * 1024 * 1
    });

  constructor(
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.update_time = this.todayDate.getFullYear() + '-' + (this.todayDate.getMonth() + 1) + '-' + this.todayDate.getDate();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id_user = this.currentUser['user'].id_users;

    this.uploader.onAfterAddingFile = (file) => {
    }
    this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
    };
    this.uploader.onCompleteAll = () => {
    }
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
    }


  }
 pagar() {
  this.userService.postPayment(this.id_user, 'Recibo', this.amount, this.status, this.update_time, this.type, this.id_user).subscribe( response => {
    const payments_id_payments = response['id'];
    ////////////////////////////////////////////////////////////////////////////
    // this.file esta vacio errrrrrror!
    console.log(this.file);
    this.userService.postReceipt(this.id_user, this.update_time, this.file, this.amount, payments_id_payments).subscribe(response => {
    console.log(response);
    });
  });
 }

 public onFileSelected(event: EventEmitter<File[]>) {
  const file: File = event[0];
  this.file = file;
  }
}
