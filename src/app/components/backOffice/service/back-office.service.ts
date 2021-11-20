import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComplet } from 'src/app/model/UserComplete';
import { Response } from 'src/app/model/Response';
import * as dev from 'src/dev';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  Url=`${dev.apiurl}`;

  constructor(private http:HttpClient) {}

  getUser(){
    return this.http.get<Response<UserComplet>>(`${this.Url}` + "/api/UserBackOffice/GetAll", {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}})
  }
 
  getUserbyId(userId:string){
    let url = `${this.Url}` + "/api/UserBackOffice/" + userId;
    return this.http.get<Response<UserComplet>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  updateUser(user:UserComplet){ ///noanda 
    return this.http.put<Response<UserComplet>>(`${this.Url}` + "/api/UserBackOffice"​,{User:user}, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}}); 
  }
}
