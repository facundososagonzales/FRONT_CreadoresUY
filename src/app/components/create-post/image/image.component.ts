import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { PlanBasic } from 'src/app/model/PlanBasic';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  visualizan: string[] = ['Público', 'Sólo suscriptores','Seleccionar Suscripción'];
  tipoSuscripcion: PlanBasic[] = [];
  contSelec: string;
  focus; focus1;
  tipovisAsig: string;
  tipoSusAsig: string;
  dateAlert:boolean=false;

  labelPosition: 'Si' | 'No' = 'No';
  today:Date = new Date();

  urls:string[] = ['']
  base64:string[] = ['']

  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  tags: string[] = ['Comida'];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  public editor= ClassicEditor;
  public textArea:string = '';

  constructor(private router:Router, private http:CreatorServiceService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    if(!(sessionStorage.getItem('token')!=null && (sessionStorage.getItem('userType')=='creator' || sessionStorage.getItem('userType')=='admin'))){
      this.router.navigate(['/home']);
    }
    this.getPlanBasic();
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

  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }

  @ViewChild('textarea') myEditor: any;
  gettext(){
    this.textArea = this.getArticleContent();
  }

  getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }
    return '';
  }

  getPlanBasic(){
    this.http.getPlanBasic(sessionStorage.getItem('nickname')).subscribe(res=>{
      if(res['success']){
        res['obj'].forEach(element => {
          this.tipoSuscripcion.push(element);
        });
      }
    });
  }

  checkDate(date:string){
    console.log(date);
    let curretDate = new Date();
    if(date<=this.datepipe.transform(curretDate, 'yyyy-MM-dd')){
      this.dateAlert = true;
    }else{
      this.dateAlert=false;
    }
  }

  checkTime(time:string){
    console.log(time)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.value!='';

    this.tagControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }
}
