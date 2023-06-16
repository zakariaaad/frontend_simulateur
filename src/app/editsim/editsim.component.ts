import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'editsim',
  templateUrl: './editsim.component.html',
  styleUrls: ['./editsim.component.css']
})
export class EditsimComponent implements OnInit {

  constructor(private httpcrud: CrudserviceService,
    private route: ActivatedRoute, private router: Router){}

  id_simulation:any;
  simulation: any = {};

  async ngOnInit(){
    this.id_simulation = await this.route.snapshot.params['id_simulation'];
    console.log("idsuim",this.id_simulation);
    await this.getDetailSimById();

  }

  updateSimulation(){
    this.httpcrud.editSim(this.id_simulation, this.simulation).subscribe(response => console.log(response));
    this.router.navigate(['/simulations']);

  }

  async getDetailSimById(){
    await this.httpcrud.findSimById(this.id_simulation).subscribe(data =>{
      if (data != null ){
        var resultData = data;

        if (resultData) {
          this.simulation = resultData[0]
        }
      }
    });
  }

}
