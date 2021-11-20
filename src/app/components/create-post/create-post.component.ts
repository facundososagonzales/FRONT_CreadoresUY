import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  contenidos: string[] = ['Texto', 'Imagen','Video', 'Livestream','Audio', 'Link'];
  visualizan: string[] = ['Público', 'Sólo suscriptores','Seleccionar Suscripción'];
  tipoSuscripcion: string[] = ['Plan 1', 'Plan 2','VIP'];
  contSelec: string;
  tipovisAsig: string;
  tipoSusAsig: string;
  selected=-1;
  public editor= ClassicEditor;
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;

  constructor() { }

  ngOnInit(): void {
  }

  urls = new Array<string>();

  detectFiles(event) {
    let files = event.target.files;
    if (files.length > 1) {
      alert("You can select only 1 images");
    }else{
      let reader = new FileReader();
      if(event.target.id == "formFileLg"){
        reader.onload = (e: any) => {
          console.log(reader.result);
          this.urls[0]=(e.target.result);
        }
        reader.readAsDataURL(files[0]);
      }else{
        reader.onload = (e: any) => {
          this.urls[1]=(e.target.result);
        } 
        reader.readAsDataURL(files[0]);
      }
    }
  }

  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }

 
}
