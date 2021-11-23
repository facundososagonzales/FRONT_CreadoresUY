import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  visualizan: string[] = ['Público', 'Sólo suscriptores','Seleccionar Suscripción'];
  tipoSuscripcion: string[] = ['Plan 1', 'Plan 2','VIP'];
  categorias: string[] = ['Arte', 'Trading','Música','Comida'];
  contSelec: string;
  focus; focus1;
  tipovisAsig: string;
  tipoSusAsig: string;
  selected=-1;
  public editor= ClassicEditor;
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;


  constructor() { }

  ngOnInit(): void {
  }
 
  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }
}
