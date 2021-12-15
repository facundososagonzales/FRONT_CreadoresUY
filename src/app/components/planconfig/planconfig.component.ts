import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Plan } from 'src/app/model/Plan';
import { Router } from '@angular/router';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { FormControl } from '@angular/forms';
import { PlanPost } from 'src/app/model/PlanPost';
import { PlanAndNickname } from 'src/app/model/PlanAndNickname';

@Component({
  selector: 'app-planconfig',
  templateUrl: './planconfig.component.html',
  styleUrls: ['./planconfig.component.css'],
})
export class CreateplanComponent implements OnInit {

@ViewChild('textarea') myEditor: any;
@ViewChild('benefitInput') myBenefit: ElementRef<HTMLInputElement>;
plans:Plan[] = [];
addPlan:boolean = false;
textArea:string = '';
editor= ClassicEditor;
urls:string[] = [''];
base64:string[] = [''];
showBar:boolean=false;

benefitsControl = new FormControl();

benefits: string[] = [];

constructor(private router:Router, private http:CreatorServiceService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if(token==null || sessionStorage.getItem('userType')!='creator'){ 
       this.router.navigate(['/home']);
     }
    this.plans=[];
    this.http.getPlanByCreator(sessionStorage.getItem('creatorId')).subscribe(res =>{
      console.log(res)
      res['obj'].forEach(element => {
        this.plans.push(element);
      });
      this.plans.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    })
  }

  displayAddForm(){
    this.http.getDefaultBenefits().subscribe(res=>{
      this.benefits=res['obj'];
    });
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); 
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 12);
    this.addPlan = true;
  }

  displayCard(){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); 
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 12);
    this.addPlan = false;
  }

  getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }
    return '';
  }

  setArticleContent(content:string) {
    this.myEditor.editorInstance.setData(content);
  }

  detectFiles(event) {
    let files = event.target.files;
    if (files.length > 1) {
      alert("You can select only 1 images");
    }else{
      let reader = new FileReader();
      if(event.target.id == "formFileLg"){
        reader.onload = (e: any) => {
          this.urls[0]=(e.target.result);
          var n = e.target.result.lastIndexOf(',');
          this.base64[0]=(e.target.result.substring(n + 1));
        }
        reader.readAsDataURL(files[0]); 
      }
    }
  }

  addBenefit(){
    if (this.myBenefit.nativeElement.value != ''){
      this.benefits.push(this.myBenefit.nativeElement.value);
      this.myBenefit.nativeElement.value='';
    }
  }

  crearPlan(title:string,price:string,link:string,mensaje:string){
    if(title!='' && price!=''){
      var planPost = new PlanPost();
      planPost.name = title; planPost.price=parseInt(price),planPost.welcomeVideoLink=link; planPost.subscriptionMsg=mensaje;
      planPost.description=this.getArticleContent(); planPost.benefits=this.benefitsControl.value; planPost.image=this.base64[0];
      var newPlan = new(PlanAndNickname);
      newPlan.nickname=sessionStorage.getItem('nickname');
      newPlan.pandB=planPost;
      console.log(newPlan);
      this.showBar=true;
      this.http.postPlan(newPlan).subscribe(res=>{
        console.log(res);
        this.addPlan=false;
        this.showBar=false;
        this.ngOnInit();
      })
    }
  }
}
