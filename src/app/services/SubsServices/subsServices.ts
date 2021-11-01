import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subscription } from 'src/app/model/Subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private httpClient:HttpClient) {}

getSubscriptions(): Observable<Subscription[]>{
  return this.httpClient.get<Subscription[]>('/api/SubscriptionModels');
}

}
