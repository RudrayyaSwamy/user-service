import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { Authrequest } from './model/authrequest';

@Injectable({
  providedIn: 'root'
})
export class UserServiceApiService {
  [x: string]: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.setHeadersVal();
   }
  url = "http://localhost:8080/";

  getAuthanicate(user: any): Observable<Authrequest> {
    return this.httpClient.post<Authrequest>(this.url + 'authenticate', user);
  }

  userSignUp(user: any) {
    return this.httpClient.post<User>(this.url + 'addUser', user);
  }

  editser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.url + 'user/editUser', user, this.httpOptions);
  }

  getUsers(): Observable<any> {
    
    return this.httpClient.get(this.url + 'user/findAllUsers', this.httpOptions);
  }

  deleteUser(id: number) {
    console.log('id-'+id)
    return this.httpClient.get(this.url + 'user/deleteByName/'+id, this.httpOptions);
  }

  setHeadersVal(){
    const auth_token = localStorage.getItem("tocken")
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + auth_token
    });

    this.httpOptions = {
      headers: headers_object
    };
  }
}