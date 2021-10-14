import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDto } from 'src/app/model/CreateUserDto';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  constructor(private http:HttpClient) {}

  UserCreate(name:string, email:string, password:string) :Observable<any>{
    return this.http.post<CreateUserDto>("/api/User",{name, email, password});
  }
}
