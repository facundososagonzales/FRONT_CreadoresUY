import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComplet } from 'src/app/model/UserComplete';
import { BackOfficeService } from '../service/back-office.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public idUser:string;
  public user:UserComplet = new UserComplet();

  constructor(private router:Router, private route:ActivatedRoute, private http:BackOfficeService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if(token==null){ 
      this.router.navigate(['/home']);
    }
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.user.lasLogin = new Date();
    this.UserLoader();
  }

  UserLoader(){
    this.http.getUserbyId(this.idUser).subscribe(res =>{
      this.user = res['obj'];
    })
  }

  verDatos(input:string){
    console.log(input);
  }

  enviarDatos(name:string,email:string,description:string,created:string,lasLogin:string){
    var user = new UserComplet();
    user.id = this.user.id; user.deleted = this.user.deleted; user.name = name;
    user.email = email; user.password = this.user.password; user.description = description;
    user.created = new Date(created); user.creatorId = this.user.creatorId;
    if(lasLogin!=''){
      user.lasLogin = new Date(lasLogin);
    }else{
      user.lasLogin = this.user.lasLogin;
    }
    console.log(this.user);
    this.http.updateUser(user);
  }
}
