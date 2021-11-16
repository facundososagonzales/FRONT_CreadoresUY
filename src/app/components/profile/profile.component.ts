import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { userServices } from 'src/app/services/UserServices/userServices';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { ContentViwer } from 'src/app/model/ContentViwer';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  nickname= '';
  urls = new Array<string>();
  
  constructor(private router:Router, private http:userServices) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if(token==null){ 
      this.router.navigate(['/home']);
    }
    else {
      this.nickname= sessionStorage.getItem('name');
    }
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

}