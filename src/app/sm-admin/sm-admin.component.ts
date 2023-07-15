import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sm-admin',
  templateUrl: './sm-admin.component.html',
  styleUrls: ['./sm-admin.component.css']
})
export class SmAdminComponent implements OnInit{
  simulations: any = [];

  constructor(private route: Router,
    private httpcrud: CrudserviceService,
    ){
     
    }



  ngOnInit(){
    this.getAllSimulationslist();
   
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
