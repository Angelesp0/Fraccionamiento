import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';
import { Order } from '../../../models/orders';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  ranks: any = [
    {rank: 2, name: 'Angel Salas',   job: 'Electrico', status: 'Online', img: 'team-1-800x800.jpg'},
    {rank: 4, name: 'Eduardo Perez', job: 'Pintor', status: 'Online', img: 'team-2-800x800.jpg'},
    {rank: 1, name: 'Alba Ogaz',     job: 'Limpieza', status: 'Online', img: 'team-3-800x800.jpg'},
    {rank: 5, name: 'Juan Lopez',    job: 'Electrico', status: 'Offline', img: 'team-4-800x800.jpg'},
    {rank: 3, name: 'Miranda F',     job: 'Jardinero', status: 'Offline', img: 'team-1-800x800.jpg'}
  ];
  data: any = [];

  employees;
  selectedValue: any = 4;
  array;
  services;
  categories;
  category;
  areas;
  area;
  activities;
  activity;
  specifics;
  specific;
  form: boolean = false;
  order: any;
  today = new Date();
  day;
  hour;

  constructor(
    public userService: UserService
    ) {
      this.order = new Order();

     }
  ngOnInit() {
    this.today = new Date();
    let dd = String(this.today.getDate()).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.today.getFullYear();

    this.day = dd + '/' + mm + '/' + yyyy;
    let n = this.today.getHours();
    let m = this.today.getMinutes();
    let s = this.today.getSeconds();
    this.hour = (n + ':' + m + ':' + s);

    this.userService.getNeed('1').subscribe(response => {
      this.categories = response;
    });
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
  }

  getCategory(category) {
    this.form = true;
    this.userService.getCategory(category).subscribe(response => {
      this.areas = response;
    });
    this.order.services = this.category;
    this.order.date = this.day;
    this.order.hour = this.hour;
  }
  getArea(area) {
    this.order.services = this.area;
    this.userService.getArea(area).subscribe(response => {
      this.activities = response;
    });
  }

  getActivity(activity) {
    this.order.services = this.activity;
    this.userService.getActivity(activity).subscribe(response => {
      this.specifics = response;
    });
  }

  getSpecific(specific) {
    this.order.services = this.specific;
  }

  onSubmit() {
    console.log(this.order);

  }

}
