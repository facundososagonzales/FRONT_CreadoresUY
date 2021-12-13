import { Component, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';
import { Plan } from 'src/app/model/Plan';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.component.html',
  styleUrls: ['./suscribe.component.css']
})

export class SuscribeComponent implements OnInit {
  closeModal: string;
  show = false;
  nickname:string = '';
  plans:Plan[] = [];
  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean =false;
  

  constructor(private router:Router, private route:ActivatedRoute, private modalService: NgbModal, private creatorServices:CreatorServiceService) {}

  ngOnInit(): void {

    this.nickname = this.route.snapshot.paramMap.get('nickname');
    console.log(this.nickname);
    this.creatorServices.getPlanToUser(sessionStorage.getItem('userId'),this.nickname).subscribe(res =>{
      console.log(res)
      res['obj']['plans'].forEach(element => {
        this.plans.push(element);
      });
      console.log(this.plans);
    });
    
    const headers = {
      'Accept': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token'
    };
    console.log(headers);
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AR6r31Q1-UBExv3N0jKTOAJBVR0s7lFj9peXOxgf_1opCSdk9On_TtR2VVDdukqlOeSb2DYjYxyRWALR',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '20',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '20'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '20',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
    
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
}
