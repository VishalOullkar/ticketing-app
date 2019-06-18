import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod,Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../Models/users'
/*import { map } from 'rxjs/operators'*/;
import { Observable } from 'rxjs';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
 
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  URL: string = "http://localhost:59090/";
  userList: Users[];
  selecteduser: Users;

  getusersList(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.URL+'api/Users/GetUsers');
  }

  postUser(userModel: Users) {
    var body = JSON.stringify(userModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post(this.URL + 'api/Users/PostUsers', body, requestOptions);
  }
  putUser(id: string, userModel: Users) {

    var body = JSON.stringify(userModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: hearderOptions });
    return this.http.put(this.URL+'api/Users/PutUsers/' + id, body, requestOptions);
  }

  deleteuser(id: number, users: Users) {
    //return this.http.delete(this.URL + 'api/Users/' + Id);

    var body = JSON.stringify(users);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: hearderOptions });
    return this.http.put(this.URL + 'api/Users/UpdateUserDetils/' + id, body, requestOptions);

  }



}
