import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planconfig',
  templateUrl: './planconfig.component.html',
  styleUrls: ['./planconfig.component.css']
})
export class CreateplanComponent implements OnInit {
public editor= ClassicEditor;
focus; focus1;
closeModal: string;

plans = [
  {
    namePlan: "Gratis",
    descriptionPlan: "El suscriptor podrá acceder a tu contenido seleccionado de forma gratuita.El suscriptor podrá acceder a tu contenido seleccionado de forma gratuita.El suscriptor podrá acceder a tu contenido seleccionado de forma gratuita.El suscriptor podrá acceder a tu contenido seleccionado de forma gratuita.",
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


constructor(private modalService: NgbModal) {}
    
editplan(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReasonEdit(res)}`;
  });
}

newplan(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReasonNew(res)}`;
  });
}

private getDismissReasonEdit(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

private getDismissReasonNew(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

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

  detectFilesNew(event) {
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

  urls1 = new Array<string>();
  detectFilesEdit(event) {
    let files = event.target.files;
    if (files.length > 1) {
      alert("You can select only 1 images");
    }else{
      let reader = new FileReader();
      if(event.target.id == "formFileLg"){
        reader.onload = (e: any) => {
          console.log(reader.result);
          this.urls1[0]=(e.target.result);
        }
        reader.readAsDataURL(files[0]);
      }else{
        reader.onload = (e: any) => {
          this.urls1[1]=(e.target.result);
        } 
        reader.readAsDataURL(files[0]);
      }
    }
  }

  @ViewChild('textarea') myEditor: any;
  textArea:string = '';
  gettext(event:Event){
    console.log(this.textArea);
  }
}
