import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateResponseClass } from 'src/app/model/AuthenticateResponse';
import { CreateUserDto } from 'src/app/model/CreateUserDto';
import { Response } from 'src/app/model/Response';
import { User } from 'src/app/model/user';


import * as dev from 'src/dev';

@Injectable({
  providedIn: 'root'
})
export class userServices {

  Url=`${dev.apiurl}`;

  constructor(private http:HttpClient) {}

  UserCreate(user:CreateUserDto): Observable<Response<String>>{
    console.log(user.name);
    return this.http.post<Response<String>>(`${this.Url}` + "/api/User" ,{createUserDto:user}); 
  }

  UserLogin(user:User){
    return this.http.post<Response<AuthenticateResponseClass>>(`${this.Url}` + "/api/User/Authenticate"​,{User:user}); 
  }

  /*userContent(userId:number, page:number, contentPerPage:number){
    let url = `${this.Url}` + "/api/Content/Feed"​ + userId.toString +"/"+ page.toString + "/" +contentPerPage.toString;
    return this.http.get<Response<?>(url);
  }*/

}