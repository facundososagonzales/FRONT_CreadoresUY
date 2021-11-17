import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatorContentProfile } from 'src/app/model/CreatorContentProfile';
import { CreatorProfile } from 'src/app/model/CreatorProfile';
import { Response } from 'src/app/model/Response';

import * as dev from 'src/dev';

@Injectable({
  providedIn: 'root'
})
export class CreatorServiceService {

  Url=`${dev.apiurl}`;

  constructor(private http:HttpClient) { }

  creatorProfileLoader(nickname:string){
    let url = `${this.Url}` + "/api/Creator/GetProfile?"​ + "nickname=" + nickname;
    return this.http.get<Response<CreatorProfile>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }

  creatorProfileContentLoader(nickname:string, idUser:string,pageNumer:string,pageSize:string){
    let url = `${this.Url}` + "/api/Creator/GetContentByUser?"​ + "nickname=" + nickname + "&idUser=" + idUser
    + "&pageNumber=" + pageNumer + "&pageSize=" + pageSize;
    return this.http.get<Response<CreatorContentProfile>>(url, {headers: {'Authorization': ` Bearer ${sessionStorage.getItem('token')}`}});
  }
}
