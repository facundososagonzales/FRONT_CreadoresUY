import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if(token==null || userType!=="admin"){
      this.router.navigate(['/home']);
    }
  }

}
