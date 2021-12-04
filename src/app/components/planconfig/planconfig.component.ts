import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-planconfig',
  templateUrl: './planconfig.component.html',
  styleUrls: ['./planconfig.component.css']
})
export class CreateplanComponent implements OnInit {
public editor= ClassicEditor;
@ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
focus; focus1;

plans = [
  {
    namePlan: "Gratis",
    descriptionPlan: "El suscriptor podrá acceder a tu contenido seleccionado de forma gratuita.",
    price: 0,
    visible: false,
    imagen: './assets/img/theme/free.png'
  },
  {
    namePlan: "Normal",
    descriptionPlan: "El suscriptor podrá acceder a tu contenido seleccionado suscribiendose a una membresía mensual.",
    price: 400,
    visible: false,
    imagen: './assets/img/theme/normal.png'
  },
  {
    namePlan: "VIP",
    descriptionPlan: "El suscriptor podrá acceder a todo su contenido + mensajería mediante una suscripción mensual.",
    price: 900,
    visible: false,
    imagen: './assets/img/theme/vip.png'
  }
]

  constructor() { }

  ngOnInit(): void {
  }

}
