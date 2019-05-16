import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod,Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../Models/users'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  userList: Users[];
  selecteduser: Users;

  getusersList(): Observable<Users[]> {
    return this.httpClient.get<Users[]>('api/Users/GetUsers');
  }

  postUser(userModel: Users) {
    var body = JSON.stringify(userModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: hearderOptions });
    return this.http.post('api/Users/PostUsers', body, requestOptions).pipe(map(res => res.json))
  }
  putUser(id: string, userModel: Users) {

    var body = JSON.stringify(userModel);
    var hearderOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: hearderOptions });
    return this.http.put('api/Users/PutUsers/' + id, body, requestOptions).pipe(map(res => res.json));
  }

  deleteuser(Id: number) {
    return this.http.delete('api/Users/' + Id).pipe(map(res => res.json));
  }



}
