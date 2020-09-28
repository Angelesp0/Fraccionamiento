import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';


const headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line: variable-name
  base_path = 'http://192.168.137.1:3000/users';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET',
      'Access-Control-Allow-Headers':'application/json',
      'Content-Type': 'application/json; charset=utf-8',

    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getUsers() {
      return this.http.get('http://192.168.100.35:3000/users', this.httpOptions);
  }

  getManager() {
    return this.http.get('http://192.168.100.35:3000/users/manager', this.httpOptions);
  }

  getUsersByDivision(id) {
    return this.http.get('http://192.168.100.35:3000/division/' + id + '/users', this.httpOptions);
  }

  postUsers(item) {
    console.log(item);
      return this.http.post('http://192.168.100.35:3000/users', item, this.httpOptions);
  }

  postFraccionamientos(item) {
    console.log(item);
    const params  = new HttpParams()
      .set('name', item.name)
      .set('street', item.street )
      .set('id_users', item.id_users);
    return this.http.post('http://192.168.100.35:3000/divisions', item, {params});
  }

  getDivision() {
      return this.http.get('http://192.168.100.35:3000/division', this.httpOptions);
  }
  getAdvertisements() {
      return this.http.get('http://192.168.100.35:3000/advertisements', this.httpOptions);
  }
  getRules() {
      return this.http.get('http://192.168.100.35:3000/rules', this.httpOptions);
  }
  getEvents() {
      return this.http.get('http://192.168.100.35:3000/events', this.httpOptions);
  }
  getComplaints() {
      return this.http.get('http://192.168.100.35:3000/complaints', this.httpOptions);
  }

  getExecutive() {
    return this.http.get('http://192.168.137.1:3000/executive', this.httpOptions);
}

  getUser(id) {
    return this.http.get('http://192.168.137.1:3000/users/' + id, this.httpOptions);
  }

  getPaid(id) {
    return this.http.get('http://192.168.100.35:3000/payments/' + id, this.httpOptions);
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://192.168.100.35:3000/auth', { username, password })
        .pipe(
          map(
            user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

            }

            return user;
        }),
        catchError(this.handleError)
        );
  }

  getEventsbyDivision(id) {
    return this.http.get('http://192.168.100.35:3000/events/' + id, this.httpOptions);
  }
  getLastPaymentByDivision(id) {
    return this.http.get('http://192.168.100.35:3000/lastPayments/' + id, this.httpOptions);
  }


}
