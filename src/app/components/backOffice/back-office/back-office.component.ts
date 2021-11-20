import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserComplet } from 'src/app/model/UserComplete';
import { BackOfficeService } from '../service/back-office.service';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {

  listusers: any;
  public page: number;
  filterpost= '';
  users:any[] = [];

  constructor(private router:Router , private http:BackOfficeService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if(token==null || userType!=="admin"){
      this.router.navigate(['/home']);
    }
    this.http.getUser().subscribe(res=>{
      this.users=res['obj'];
    });
  }

}
