import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userServices } from 'src/app/services/UserServices/userServices';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { ContentViwer } from 'src/app/model/ContentViwer';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  focus; focus1;

  public stopped:boolean;
  public nPage:string = "0";
  public contentNumer:string = "6";
  public genericLoaded:boolean;
  public genericContent = new CreatorContent("999999999","Patrones de diseño en C# Aplicados en ASP", "Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales.",9999,"",null,false,null,false,"","","./assets/img/brand/1.jpg",0,null,null);
  public contentViwer:ContentViwer[]=[];
  
  constructor(private router:Router,private http:userServices) {}

  async ngOnInit(): Promise<void> {
    const token = sessionStorage.getItem('token');
     if(token==null){ 
        this.router.navigate(['/home']);
      }
      this.stopped=false;
      this.genericLoaded=false;
      this.contentViwer = [];
      await this.onScroll();
  }

  async onScroll() : Promise<void>{
    if(!this.stopped){
      this.http.userContent(sessionStorage.getItem("userId"),this.nPage,this.contentNumer).subscribe(res =>{
        if(res["obj"].length>0){
          res["obj"].forEach(element => {
            element['img']='./assets/img/brand/1.jpg';
            this.contentViwer.push(new ContentViwer(false,element));
          });
        }
        if(res["obj"].length<this.contentNumer){
          this.stopped=true;
        }
        if((!this.genericLoaded) && (JSON.stringify(res["obj"]) === '[]')){
          this.contentViwer.push(new ContentViwer(false,this.genericContent));
          this.genericLoaded=true;
        }else if(this.genericLoaded){
          this.genericLoaded=false;
          this.contentViwer.forEach((element, index)=>{
            if(element.content.id==this.genericContent.id) delete this.contentViwer[index];
          });
        }
      });
    }
    this.nPage = (parseInt(this.nPage)+1).toString();
  }

  async increaseShow(e:Event) {
    await this.onScroll();
  }

  scrollToStart(e) {
    (e.target as Element).parentElement.parentElement.scrollIntoView({block: "start"});
  }

  getUserImage(){
    return sessionStorage.getItem('imgProfile');
  }

  getUserNickname(){
    return sessionStorage.getItem('name');
  }
}
