import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentViwer } from 'src/app/model/ContentViwer';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  urls = new Array<string>();
  nickname:string;
  creatorName:string
  video:string;
  biografia:string;
  descripcion:string;
  cantSubs:number;
  cantFollowers:number;

  public genericContent = new CreatorContent("999999999","Patrones de diseño en C# Aplicados en ASP", "Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales.",9999,"",null,false,null,false,"","","./assets/img/brand/1.jpg",0,null,null);
  public contentViwer:ContentViwer[] = [];
  public genericLoaded:boolean=false;
  public page:number = 1;
  public contentByPage:number=10;
  
  constructor(private router:Router, private route:ActivatedRoute, private http:CreatorServiceService) {
    this.nickname = this.route.snapshot.paramMap.get('nickname'); 
    this.profileLoader();
    this.profileContentLoader();
   }

  ngOnInit(){
    const token = sessionStorage.getItem('token');
    if(token==null){ 
      this.router.navigate(['/home']);
    }
  }

  profileLoader(){
    this.http.creatorProfileLoader(this.nickname).subscribe(res =>{
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

  profileContentLoader(){
    this.http.creatorProfileContentLoader
    (this.nickname,this.getUserId(),this.page.toString(),this.contentByPage.toString()).subscribe(res =>{
      if(res['success']){
        if(res["obj"]["results"]>0){
          res["obj"]["contentsAndBool"].forEach(element => {
            element['content']['img']="./assets/img/brand/1.jpg"; 
            this.contentViwer.push(new ContentViwer(false,element));
          });
        }
      }else if(!this.genericLoaded){
        this.contentViwer[0]= new ContentViwer(false, this.genericContent);
        this.genericLoaded=true;
      }else if(this.genericContent){
        this.genericLoaded=false;
        this.contentViwer.forEach((element, index)=>{
          if(element.content.id==this.genericContent.id)
            delete this.contentViwer[index];
        });
      }
      console.log(res);
    });
    console.log(this.contentViwer);
    this.page++;
  }

  increaseShow(){
    this.profileContentLoader();
  }

  getUserId(){
    return sessionStorage.getItem('userId');
  }
}