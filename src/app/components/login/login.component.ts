import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { userServices } from 'src/app/services/UserServices/userServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  public email:string;
  public password:string;
  public checked:boolean;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
});

  constructor(private http:userServices, private router:Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if(token!=null){
      this.router.navigate(['/home']);
    }
  }

  Login(email:string,password:string){
    var user = new User();
    user.email=email;
    user.password=password;

    this.http.UserLogin(user).subscribe(res =>{
      console.log(res);
      if(res["success"]){
      const token = res["obj"]["token"];
        if(token != null){
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('name', res["obj"]["name"])
          sessionStorage.setItem('userId', (res["obj"]["userId"]).toString())
          sessionStorage.setItem('email', res["obj"]["email"])
          if(res["obj"]["creatorId"] != 0){
            sessionStorage.setItem('userType', "creador");
            sessionStorage.setItem('creatorId', res["Obj"].creatorId.toString())
            this.router.navigate(['/user-profile']);

          }else if(res["obj"]["isAdmin"]){
            sessionStorage.setItem('userType', "admin")
            this.router.navigate(['/backOffice']);
          }else{
            sessionStorage.setItem('userType', "user")
            this.router.navigate(['/feed']);
          }
        }
      }
    });
  }

  getToken(){
    return sessionStorage.getItem('token');
  }
}
