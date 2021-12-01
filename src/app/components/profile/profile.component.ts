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
  img:string;
  coverimg:string;

  public stopper:boolean = false;
  public genericContent = new CreatorContent("999999999","Patrones de diseño en C# Aplicados en ASP", "Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales.",9999,"",null,false,null,false,"","","./assets/img/brand/1.jpg",0,null,null);
  public contentViwer:ContentViwer[] = [];
  public genericLoaded:boolean=false;
  public page:number = 1;
  public contentByPage:number=8;
  
  constructor(private router:Router, private route:ActivatedRoute, private http:CreatorServiceService) {}

  async ngOnInit(){
    this.nickname = this.route.snapshot.paramMap.get('nickname'); 
    await this.profileLoader();
    await this.onScroll();
  }

  async profileLoader(){
    this.http.creatorProfileLoader(this.nickname).subscribe(res =>{
      if(res['success']){
        this.creatorName=res['obj']['creatorName'];
        this.video=res['obj']['youtubeLink'];
        this.biografia=res['obj']['biography'];
        this.descripcion=res['obj']['contentDescription'];
        this.cantSubs=res['obj']['cantSubscriptores'];
        this.cantFollowers=res['obj']['cantSeguidores'];
        this.img=res['obj']['creatorImage'];
        this.coverimg=res['obj']['coverImage'];
      }else{
        this.router.navigate(['/home']);
      }
    });
  }

  async onScroll(){
    if(!this.stopper){
      this.http.creatorProfileContentLoader
      (this.nickname,this.getUserId(),this.page.toString(),this.contentByPage.toString()).subscribe(res =>{
        if(res['success']){
          if(JSON.stringify(res["obj"]["results"]) !== '[]'){
            res["obj"]["contentsAndBool"].forEach(element => {
              element['content']['img']="./assets/img/brand/1.jpg"; 
              this.contentViwer.push(new ContentViwer(false,element));
            });
          }
          if(res['obj']['results']!=this.contentByPage){
            this.stopper = true;
          }
        }else if(!this.genericLoaded){
          console.log(this.contentViwer[0]);
          this.contentViwer[0]= new ContentViwer(false, this.genericContent);
          this.genericLoaded=true;
        }else if(this.genericContent){
          this.genericLoaded=false;
          this.contentViwer.forEach((element, index)=>{
            if(element.content.id==this.genericContent.id)
              delete this.contentViwer[index];
          });
        }
      });
    }
    this.page++;
  }

  scrollToStart(e) {
    (e.target as Element).parentElement.parentElement.scrollIntoView({block: "start"});
  }

  async increaseShow(){
    await this.onScroll();
  }

  getUserId(){
    if(sessionStorage.getItem('userId')!=null){
      return sessionStorage.getItem('userId');
    }else{
      return "0";
    }
  }
}