import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
    imagen: './assets/img/theme/free.png',
    edit: false,
    beneficio: "Contenido Limitado"
  },
  {
    namePlan: "Normal",
    descriptionPlan: "El suscriptor podrá acceder a tu contenido seleccionado suscribiendose a una membresía mensual.",
    price: 400,
    visible: false,
    imagen: './assets/img/theme/normal.png',
    edit: false,
    beneficio: "Contenido un poco menos limitado"
  },
  {
    namePlan: "VIP",
    descriptionPlan: "El suscriptor podrá acceder a todo su contenido + mensajería mediante una suscripción mensual.",
    price: 900,
    visible: false,
    imagen: './assets/img/theme/vip.png',
    edit: false,
    beneficio: "Todo el contenido del creador disponible"
  }
]

  constructor() { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  limitSelection = false;

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Chat' },
      { item_id: 2, item_text: '2 posts por día' },
      { item_id: 3, item_text: '2 posts por semana' },
      { item_id: 4, item_text: '2 post por mes' }
    ];
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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

}
