import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentViwer } from 'src/app/model/ContentViwer';
import { CreatorContent } from 'src/app/model/CreatorContent';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { userServices } from 'src/app/services/UserServices/userServices';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
  follow:boolean=false;
  public videosrc: any;
  public rawvideolink: string;
  

  public stopper:boolean = false;
  public genericContent = new CreatorContent("999999999","Soy un credor nuevo en creadoresUy!", "Acabo de comenzar en creadorUy, asegurese de revisar mi perfil en la brevedad para ver nuevas actualizaciones y suscribase si es de su agrado",9999,"",
         (new Date()),false,(new Date()),true,"","","./assets/img/brand/1.png",0);  

  public contentViwer:ContentViwer[] = [];
  public genericLoaded:boolean=false;
  public page:number = 1;
  public contentByPage:number=8;
  
  constructor(private router:Router, private route:ActivatedRoute, private http:CreatorServiceService, private userServices:userServices,private _sanitizer: DomSanitizer) {}

  async ngOnInit(){
    this.nickname = this.route.snapshot.paramMap.get('nickname'); 
    this.profileLoader();
    this.onScroll();   
  }

  async profileLoader(){
    this.http.creatorProfileLoader(this.nickname).subscribe(res =>{
      if(res['success']){
        this.creatorName=res['obj']['creatorName'];
        this.video=res['obj']['youtubeLink'];
        this.getVideoIframe(this.video);
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

  onScroll(){
    if(!this.stopper){
      this.http.creatorProfileContentLoader
      (this.nickname,this.getUserId(),this.page.toString(),this.contentByPage.toString()).subscribe(res =>{
        if(res['success']){
          console.log(res);
          this.follow = res['obj']['follower'];
          if(JSON.stringify(res["obj"]['contentsAndBool']) == '[]' || res['obj']['results']!=this.contentByPage){
            this.stopper = true;
          }
          if(JSON.stringify(res["obj"]['contentsAndBool']) !== '[]'){
            res["obj"]["contentsAndBool"].forEach(element => {
              element['content']['img']="./assets/img/brand/1.jpg"; 
              this.contentViwer.push(new ContentViwer(false,element['authorized'],element['content']));
            });
            this.page++;
          }else if(!this.genericLoaded && this.page==1){
            this.genericContent.nickName=this.nickname;
            this.contentViwer[0]= new ContentViwer(false,true,this.genericContent);
            this.genericLoaded=true;
          }
        }
      });
    }
  }

  

  scrollToStart(e) {
    (e.target as Element).parentElement.parentElement.scrollIntoView({block: "start"});
  }

  increaseShow(){
    this.onScroll();
  }

  getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  getVideoIframe(url: string) {
    console.log(url);
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    this.rawvideolink = "www.youtube.com/embed/" + this.getId(url);
    this.videosrc = ("//www.youtube.com/embed/" + this.getId(url));
  }

  followCreator(){
    this.userServices.followCreator((this.getUserId()),this.nickname).subscribe(res =>{
      if(res['success']){
        this.follow=true;
        this.profileLoader();
      }
    });
  }

  unfollowCreator(){
    this.userServices.unfollowCreator(this.getUserId(),this.nickname).subscribe(res =>{
      if(res['success']){
        this.follow=false;
        this.profileLoader();
      }
    });
  }

  navToSuscribe(){
    this.router.navigate([`/creator-Profile/${this.nickname}/suscribe`]);
  }

  getUserId(){
    if(sessionStorage.getItem('userId')!=null){
      return sessionStorage.getItem('userId');
    }else{
      return "0";
    }
  }

  getNickname(){
    if(sessionStorage.getItem('nickname') !=null)
      return sessionStorage.getItem('nickname');
    else
      return '0';
  }
}