import { Component, OnInit } from '@angular/core';
import { CreateUserDto } from 'src/app/model/CreateUserDto';
import { Response } from 'src/app/model/Response';
import { SignupServiceService } from 'src/app/services/signupSerice/signup-service.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    public isChecked:boolean;
    public mj:string;

    constructor(private signupService:SignupServiceService) { }

    crearUsuario(name:string, email:string, password:string){
        if(this.isChecked){
            this.signupService.UserCreate(name,email,password).subscribe(data =>{console.log(data)});
        }
    }

    ngOnInit() {
        this.isChecked=false;
    }
}
