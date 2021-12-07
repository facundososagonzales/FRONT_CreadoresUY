import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatorDto } from 'src/app/model/CreatorDto';
import { CreatorContentProfile } from 'src/app/model/CreatorContentProfile';
import { CreatorProfile } from 'src/app/model/CreatorProfile';
import { Response } from 'src/app/model/Response';
import { infoPago } from 'src/app/model/infoPago';

import * as dev from 'src/dev';
import { PlanBasic } from 'src/app/model/PlanBasic';

@Injectable({
  providedIn: 'root'
})
export class CreatorServiceService {

  Url=`${dev.apiurl}`;

  constructor(private http:HttpClient) { }

  creatorCreate(name:string,nickname:string,link:string,description:string,namePayment:string,account:string,selectedItem:string,toppings:string[],base64:string[],textArea:string){
    var creatorDto = new CreatorDto();
    var infoPagos = new infoPago();
    infoPagos.nombreTitular=namePayment; infoPagos.numeroDeCuenta=parseInt(account); infoPagos.nombreEntidadFinanciera=selectedItem; 
    creatorDto.idUser=parseInt(sessionStorage.getItem('userId')); creatorDto.creatorName=name; creatorDto.nickName=nickname; creatorDto.contentDescription=description;
    creatorDto.biography = textArea; creatorDto.youtubeLink = link; creatorDto.creatorImage = base64[0]; creatorDto.coverImage = base64[1]; creatorDto.infoPago=infoPagos;
    creatorDto.category1=toppings[0];
    if(toppings.length==2){
      creatorDto.category2=toppings[1];
    }else{
      creatorDto.category2='';
    }
    console.log(creatorDto);
    return this.http.post<Response<String>>(`${this.Url}` + "/api/Creator/SignUp",{CreatorDto:creatorDto},{headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  creatorCategoires(){
    return this.http.get<Response<String[]>>(`${this.Url}` + "/api/Creator/GetCategoryes")
  }

  creatorProfileLoader(nickname:string){
    let url = `${this.Url}` + "/api/Creator/GetProfile?"​ + "nickname=" + nickname;
    return this.http.get<Response<CreatorProfile>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  creatorProfileContentLoader(nickname:string, idUser:string,pageNumer:string,pageSize:string){
    let url = `${this.Url}` + "/api/Creator/GetContentByUser?"​ + "nickname=" + nickname + "&idUser=" + idUser
    + "&pageNumber=" + pageNumer + "&pageSize=" + pageSize;
    return this.http.get<Response<CreatorContentProfile>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  getPlanBasic(nickname:string){
    let url = `${this.Url}` + "/api/Creator/GetCreatorPlansBasic?"​ + "nickname=" + nickname;
    return this.http.get<Response<PlanBasic>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }
}
