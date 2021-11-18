import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICreateOrderRequest } from "ngx-paypal";

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
  maxNo = false;
  amt = 0;
  
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

 
  
  ngOnInit(): void {
  }



  
  constructor() {}
 
  onChange(isChecked: boolean) {
    if (isChecked)
      this.amt++
    else 
      this.amt--
    this.amt === 2 ? this.maxNo = true : this.maxNo = false;
  }
  
      

}
