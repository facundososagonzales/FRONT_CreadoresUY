import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    nickname= '';

    constructor(private router:Router) { }

    ngOnInit(): void {
        const token = sessionStorage.getItem('token');
         if(token==null){ 
            this.router.navigate(['/home']);
          }
          else {
            this.nickname= sessionStorage.getItem('name');
          }
      }

}
