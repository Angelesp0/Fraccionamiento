import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../_services/user/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    //{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Usuarios',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/division', title: 'Fraccionamientos',  icon:'ni-building text-blue', class: '' },
    { path: '/advertisements', title: 'Anuncios',  icon:'ni-notification-70 text-blue', class: '' },
    { path: '/rules', title: 'Reglas',  icon:'ni-collection text-blue', class: '' },
    { path: '/events', title: 'Eventos',  icon:'ni-tag text-blue', class: '' },
    { path: '/complaints', title: 'Quejas',  icon:'ni-support-16 text-blue', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

export const ROUTES_gerente: RouteInfo[] = [
  { path: '/tables', title: 'Usuarios',  icon: 'ni-circle-08 text-blue', class: '' },
  { path: '/rules', title: 'Reglas',  icon: 'ni-collection text-blue', class: '' },
  { path: '/events', title: 'Eventos',  icon: 'ni-tag text-blue', class: '' },
  { path: '/complaints', title: 'Quejas',  icon: 'ni-support-16 text-blue', class: '' },
  { path: '/login', title: 'Login',  icon: 'ni-key-25 text-info', class: '' },
  { path: '/voting', title: 'Votaciones',  icon: 'ni-support-16 text-blue', class: '' },
  { path: '/payments', title: 'Lista de pagos',  icon: 'ni-support-16 text-blue', class: '' },
];

export const ROUTES_cliente: RouteInfo[] = [
  { path: '/ui', title: 'Principal',  icon: 'ni-collection text-blue', class: '' },
  { path: '/services', title: 'Servicios',  icon: 'ni-collection text-blue', class: '' },


  //{ path: '/rules', title: 'Reglas',  icon:'ni-collection text-blue', class: '' },
  //{ path: '/events', title: 'Eventos',  icon:'ni-tag text-blue', class: '' },
  //{ path: '/complaints', title: 'Quejas',  icon:'ni-support-16 text-blue', class: '' },
  { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUser: any;

  public menuItems: any[];
  menusGerente: any[];
  menusCliente: any[];
  public isCollapsed = true;

  constructor(private authenticationService: UserService, private router: Router) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menusGerente = ROUTES_gerente.filter(menuEjecutivo => menuEjecutivo);
    this.menusCliente = ROUTES_cliente.filter(menusCliente => menusCliente);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  get isAdmin() {
    return this.currentUser['user'].role_id_role === 1;
  }
  get isGerente() {
    return this.currentUser['user'].role_id_role === 2;
  }
  get isClient() {
    return this.currentUser['user'].role_id_role === 3;
  }
}
