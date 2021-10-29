import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/CreateUserDto';
import { Response } from 'src/app/model/Response';
import { userServices } from 'src/app/services/UserServices/userServices';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;focus1;focus2;
    public isChecked:boolean=true;
    public noRequiredName:boolean=true;
    public noRequiredPassword:boolean=true;
    public noRequiredEmail:boolean=true;
    public MinLenght:boolean=true;
    public validEmail:boolean=true;
    public subbmited:boolean=false
    public Success:boolean;
    
    userForm = new FormGroup({
        name: new FormControl('',Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,Validators.minLength(8)])
    });
    
    constructor(private signupService:userServices,private router:Router) {
    }

    ngOnInit() {
        this.isChecked=false;
        const token = sessionStorage.getItem('token');
        if(token!=null){
          this.router.navigate(['/home']);
        }
    }

    crearUsuario(name:string, email:string, password:string){
        this.noRequiredName=true;
        this.noRequiredEmail=true;
        this.noRequiredPassword=true;
        this.MinLenght=true;
        this.validEmail=true;
        this.subbmited=false;
        if(this.isChecked && this.userForm.valid){
            var user = new CreateUserDto(); user.name=name; user.email=email; user.password=password;
            this.signupService.UserCreate(user).subscribe(data =>{
                if(data["success"]){
                    this.Success=true;
                }else{
                    this.Success=false;
                }
                this.subbmited=true;
            });
            this.router.navigate(['/login']);
        }else{
            if(this.userForm.get('name').errors!=null){
                this.noRequiredName=false;
            }
            if(this.userForm.get('email').errors!=null && this.userForm.get('email').errors.email){
                this.validEmail=false;
            }else if(this.userForm.get('email').errors!=null && this.userForm.get('email').errors.required){
                this.noRequiredEmail=false;
            }
            if(this.userForm.get('password').errors!=null && this.userForm.get('password').errors.required){
                this.noRequiredPassword=false;
            }else if(password.length<8){
                this.MinLenght=false;
            }
        }
    }
}
