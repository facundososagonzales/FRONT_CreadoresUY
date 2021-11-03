import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-signup-creador',
  templateUrl: './signup-creador.component.html',
  styleUrls: ['./signup-creador.component.css']
})
export class SignupCreadorComponent implements OnInit {
  focus;
  htmlContent = '';


  config: AngularEditorConfig = {
    editable: true,
  
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Descripción de mi perfil',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    
  };

  ngOnInit(): void {
  }

  closeModal: string;
  
  constructor() {}
  maxNo = false;
  amt = 0;
 
  onChange(isChecked: boolean) {
    if (isChecked)
      this.amt++
    else 
      this.amt--
    this.amt === 2 ? this.maxNo = true : this.maxNo = false;
  }
  
    checkBox = [
      { name: 'Arte', checked: false, image: './assets/img/theme/art.png' },
      { name: 'Comida', checked: false, image: './assets/img/theme/food.png' },
      { name: 'Trading', checked: false, image: './assets/img/theme/trading.png' },
      { name: 'Música', checked: false, image: './assets/img/theme/music.png' },
      ];

      

}
