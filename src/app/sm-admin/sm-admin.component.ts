import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'sm-admin',
  templateUrl: './sm-admin.component.html',
  styleUrls: ['./sm-admin.component.css']
})
export class SmAdminComponent implements OnInit{
  simulations: any = [];
  highcharts = Highcharts;

  constructor(private route: Router,
    private httpcrud: CrudserviceService,
    ){
    }

  ngOnInit(){
    this.getAllSimulationslist();

   
  }
  chartOptions: Highcharts.Options = {
    title: {
      text: "Evolution des simulations"
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Evolution des simulations"
      }
    },
    series: [{
      data: [12, 8, 43, 35, 20, 90, 100, 110],
      type: 'line'
    }]
  }
  async getAllSimulationslist (){
    this.httpcrud.getAllSimulation().subscribe((data : any) => {
        const resultData = data;
        console.log("resultData");
        console.log(resultData);
        // if (resultData) {
          this.simulations = resultData;
        // }
    });
  }




}
