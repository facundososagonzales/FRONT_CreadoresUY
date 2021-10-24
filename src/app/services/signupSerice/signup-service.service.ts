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

  UserCreate(user:CreateUserDto): Observable<Response<String>>{
    console.log(user.name);
    return this.http.post<Response<String>>(this.Url,{createUserDto:user}); 
  }
}
