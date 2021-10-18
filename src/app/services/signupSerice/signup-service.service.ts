import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDto } from 'src/app/model/CreateUserDto';
import { Response } from 'src/app/model/Response';


import * as dev from 'src/dev';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  Url=`${dev.apiurl}/api/User`;

  constructor(private http:HttpClient) {}

  UserCreate(name:string, email:string, password:string){
    console.log(name);
    var user = new CreateUserDto();
    user.name=name; user.email=email; user.password=password;
    return this.http.post<Response<String>>(this.Url,user); 
  }
}
