import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets,ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SingleDataSet,monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { User } from 'src/app/model/user';
import { userServices } from 'src/app/services/UserServices/userServices';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {

  /*Grafica de visitas en la web*/

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Visitas totales' },
  ];
  public lineChartLabels: Label[] = ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  /*Graficas de creadores/usuario*/
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Creadores'], ['Usuario no Creadores']];
  public pieChartData: number[] = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  listusers: any;
  public page: number;
  filterpost= '';

  constructor(private router:Router , private userService:userServices) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if(token==null || userType!=="admin"){
      this.router.navigate(['/home']);
    }
    this.userService.getUsers().subscribe(data => {
      this.listusers = data;
    });
  
    
  }

 
}
