import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Users } from '../Models/users';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http: Http, private httpClient: HttpClient,private router:Router) { }

  public UserList: Users[];
  public SelectedUser: Users;
  public loggedInUser: Users[];

  public isLoggedIn: boolean;
  URL: string = "http://localhost:59090/";
  testvariable: object = {val1:'123'}



  getUsersList(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.URL+'api/Users/GetUsers');
  }


  IsLogin(EmailId: string, password): boolean
  {
    return this.isLoggedIn= !!this.httpClient.get(this.URL+'api/Users/IsLoggedInUser/' + EmailId + '/' + password);
  }

  getAuthenticatedUser(EmailId: string, password):Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.URL+'api/Users/getAutheticateduser/' + EmailId + '/' + password)
      

  }

  checkusernameandpassword(uname: string, pwd: string) {
    console.warn(this.SelectedUser["EmailId"]);
    if ((uname == this.SelectedUser["EmailId"]) && (pwd == this.SelectedUser[0].Password)) {
      localStorage.setItem('username', "admin");

      return true;
    }
    else {
      return false;
    }
  }

}






