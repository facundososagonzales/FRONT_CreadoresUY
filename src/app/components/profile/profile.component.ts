import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/model/Subscription';
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
    public nPage:string = "0";
    public contentNumer:string = "6";
    public genericLoaded:boolean = false;
    public genericContent = new CreatorContent("999999999","Patrones de diseño en C# Aplicados en ASP", "Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales. Aprende la esencia de los patrones de diseño y su utilización en proyectos reales.",9999,"",null,false,null,false,"","","./assets/img/brand/1.jpg",0,null,null);
    public contentViwer:ContentViwer[] = [];

    showContent(){
      this.http.userContent(sessionStorage.getItem("userId"),this.nPage,this.contentNumer).subscribe(res =>{
        console.log(res);
        console.log(JSON.stringify(res["obj"]) === '{}');
        if(res["obj"].length>0){
          res["obj"].forEach(element => {
            element['img']='./assets/img/brand/1.jpg';
            this.contentViwer.push(new ContentViwer(false,element));
          });
        }
        if((!this.genericLoaded) && (!(res["obj"].length>0))){
          this.contentViwer.push(new ContentViwer(false,this.genericContent));
          this.genericLoaded=true;
        }else if(this.genericLoaded){
          this.genericLoaded=false;
          this.contentViwer.forEach((element, index)=>{
            if(element.content.id==this.genericContent.id) delete this.contentViwer[index];
          });
        }
      });
      this.nPage = (parseInt(this.nPage)+1).toString();
    }

    increaseShow() {
      this.showContent();
      window.scroll(0, 0);
    }

    urls = new Array<string>();
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

    constructor(private router:Router, private http:userServices) { }

    ngOnInit(): void {
        const token = sessionStorage.getItem('token');
         if(token==null){ 
            this.router.navigate(['/home']);
          }
          else {
            this.nickname= sessionStorage.getItem('name');
          }
          this.showContent();
          console.log(this.contentViwer);
      }

}