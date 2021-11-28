import { Component, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest } from "ngx-paypal";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SuscriptionPlans } from 'src/app/model/SuscriptionPlans';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.component.html',
  styleUrls: ['./suscribe.component.css']
})

export class SuscribeComponent implements OnInit {
  public payPalConfig: any;
  closeModal: string;
  show = false;



  plans = [
    {
      namePlan: "Gratis",
      descriptionPlan: "El suscriptor podrá acceder a tu contenido seleccionado de forma gratuita.",
      price: 0,
      visible: false
    },
    {
      namePlan: "Normal",
      descriptionPlan: "El suscriptor podrá acceder a tu contenido seleccionado suscribiendose a una membresía mensual.",
      price: 400,
      visible: false
    },
    {
      namePlan: "VIP",
      descriptionPlan: "El suscriptor podrá acceder a todo su contenido + mensajería mediante una suscripción mensual.",
      price: 900,
      visible: false
    }
  ]
  

  constructor(private modalService: NgbModal) {}
    
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  ngOnInit(): void {
    
    const headers = {
      'Accept': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token'
   };
   console.log(headers);
   this.payPalConfig = {
      currency: "EUR",
      clientId: "AR6r31Q1-UBExv3N0jKTOAJBVR0s7lFj9peXOxgf_1opCSdk9On_TtR2VVDdukqlOeSb2DYjYxyRWALR",
      createOrder: data =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: "9.99",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              ]
            }
          ]
        },

      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };
    
  }



}
