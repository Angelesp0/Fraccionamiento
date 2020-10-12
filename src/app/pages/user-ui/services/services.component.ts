import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';




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
  employees;
  selectedValue: any = 4;
  array;
  constructor( public userService: UserService) { }
  ngOnInit() {
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
  /*countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }*/
}
