import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICreateOrderRequest } from "ngx-paypal";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

interface Banco{
  name: string;

}

@Component({
  selector: 'app-signup-creador',
  templateUrl: './signup-creador.component.html',
  styleUrls: ['./signup-creador.component.css']
})
export class SignupCreadorComponent implements OnInit {
  focus;
  htmlContent = '';
  public editor= ClassicEditor;
  
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

 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  limitSelection = false;

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Arte' },
      { item_id: 2, item_text: 'Musica' },
      { item_id: 3, item_text: 'Trading' },
      { item_id: 4, item_text: 'Comida' }
    ];
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      limitSelection: 2,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }



  
  constructor() {}
 

      

}
