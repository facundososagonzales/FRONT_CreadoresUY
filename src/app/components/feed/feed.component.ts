import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/SubsServices/subsServices';
import { Subscription } from 'src/app/model/Subscription';
import { userServices } from 'src/app/services/UserServices/userServices';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  focus;
    focus1;
  titulo="";
  description ="Descripcion del tier";
  public cardStatus = true;
  show =2;
  filterpost= '';
  nickname= '';

  public subscriptionSearch:Subscription[] = [];

  public subscriptions:Subscription[]=[
    new Subscription(1,"Patrones de diseño en C# Aplicados en ASP .Net"," Aprende la esencia de los patrones de diseño y su utilización en proyectos reales.", './assets/img/brand/1.jpg'),
    new Subscription(1,"Angular: De cero a experto","Componentes, directivas, servicios, mapas, gráficas, JWT, autenticación, despliegues, mongo, Git, GitHub y mucho más", './assets/img/brand/2.png'),
    new Subscription(1,"Desarrollando Aplicaciones en Angular 12 y ASP.NET Core 5","Utiliza Angular, ASP.NET Core, Entity Framework Core, Material Design, JWT, Leaflet, para crear una aplicación completa", './assets/img/brand/3.jpg'),
  ]


  

  increaseShow() {
    this.show += 2; 
  }

  constructor(private subsService:SubscriptionService, private router:Router) { }

  


  getSubscriptions(){
    this.subsService.getSubscriptions().subscribe(subscriptions => this.subscriptions = this.subscriptions.concat(subscriptions));
  }

  ngOnInit(): void {
    this.getSubscriptions();
    const token = sessionStorage.getItem('token');
     if(token==null){ 
        this.router.navigate(['/home']);
      }
      else {
        this.nickname= sessionStorage.getItem('name');
      }

  }


}
