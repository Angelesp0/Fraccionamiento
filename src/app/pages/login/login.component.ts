import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../../models/user';
import { UserService} from '../../_services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  data: User;

  constructor(
    private  authService: UserService,
    public router: Router

  ) {
    this.data = new User();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  ingresar() {
    console.log('hola');
    this.authService.login(this.data.email, this.data.password).subscribe((res) => {
      console.log(res.erro);
      if (res.erro) {
        console.log('error');
      } else {
        console.log('login');
      }
      const data = res;
      console.log(data['user'].role_id_role);
      switch (data['user'].role_id_role) {
        case 1:
          this.router.navigateByUrl('/tables');

          break;
        case 2:
          this.router.navigateByUrl('/tables');

          break;
        case 3:
          this.router.navigateByUrl('/ui');
          break;

        default:
          break;
      }
    });
  }

}
