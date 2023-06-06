import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';

@Component({
  selector: 'listsimulations',
  templateUrl: './listsimulations.component.html',
  styleUrls: ['./listsimulations.component.css']
})
export class ListsimulationsComponent implements OnInit {

  constructor(private route: Router,
    private httpcrud: CrudserviceService){}
    simulations: any = [];
ngOnInit() {
    // this.httpcrud.getAllSimulation();
    this.getAllSimulationslist();
    console.log("HHHHHHH");

    
}

async getAllSimulationslist ()
{
    this.httpcrud.getAllSimulation().subscribe((data : any) => {
      // if (data != null && data.body != null) {
        const resultData = data;
        console.log(resultData);
        // if (resultData) {
          this.simulations = resultData;
        // }
      // }
    });
}

}
