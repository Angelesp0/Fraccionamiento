import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { UserService } from './../../_services/user/user.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  currentUser: any;
  users: any;
  votaciones: any;
  votos: any;
  final: any;

  aceptacion: any;
  rechazo: any;


  constructor(
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.votaciones = [];
    this.votos = [];
    this.final = [];


    this.currentUser = JSON.parse( localStorage.getItem('currentUser'));
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    console.log( this.currentUser);
    this.userService.getVoting(this.currentUser.user.division_id_division).pipe(map(this.extractData)).subscribe(response => {
      this.votaciones = response;
      for (let i = 0; i < this.votaciones.length; i++) {
        const element = this.votaciones[i].id_voting;
        this.userService.getVote(element).subscribe(response => {
          this.aceptacion = 0;
          this.rechazo = 0;
          this.votos = response;
          this.votos.forEach(day => {
             const resultado = day['choice'].includes(1);
              if (resultado === true) {
                this.aceptacion = this.aceptacion + 1;
              }
              if (resultado === false) {
                this.rechazo = this.rechazo + 1;
              }
          });
          const array = {
            data: this.votaciones[i],
            aceptacion: this.aceptacion,
            rechazo: this.rechazo
           };
           this.final.push(array);
        });
      }
      this.dtTrigger.next();

      this.users = this.final;
      console.log(this.final);

      /*this.users  = {
        response,
        aceptacion: this.aceptacion,
        rechazo: this.rechazo
      };*/
    });
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

}
