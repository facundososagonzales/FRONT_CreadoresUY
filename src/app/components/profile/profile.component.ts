import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatorProfile } from 'src/app/model/CreatorProfile';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  nickname:string;
  creatorName:string
  video:string;
  biografia:string;
  descripcion:string;
  cantSubs:number;
  cantFollowers:number;

  urls = new Array<string>();
  
  constructor(private router:Router, private route:ActivatedRoute, private http:CreatorServiceService) { }

  ngOnInit(){
    const token = sessionStorage.getItem('token');
    if(token==null){ 
      this.router.navigate(['/home']);
    }
    this.nickname = this.route.snapshot.paramMap.get('nickname'); 
    console.log(this.nickname);
    this.profileLoader();
  }

  profileLoader(){
    this.http.creatorProfileLoader(this.nickname).subscribe(res =>{
      console.log(res);
      if(res['success']){
        this.creatorName=res['obj']['creatorName'];
        this.video=res['obj']['youtubeLink'];
        this.biografia=res['obj']['biography'];
        this.descripcion=res['obj']['contentDescription'];
        this.cantSubs=res['obj']['cantSubscriptores'];
        this.cantFollowers=res['obj']['cantSeguidores'];
      }else{
        this.router.navigate(['/home']);
      }
    });
  }
}