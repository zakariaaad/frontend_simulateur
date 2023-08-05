import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'detailsim',
  templateUrl: './detailsim.component.html',
  styleUrls: ['./detailsim.component.css']
})
export class DetailsimComponent implements OnInit{

  constructor(private httpcrud: CrudserviceService,
    private route: ActivatedRoute, private router: Router){}
    id_simulation:any;
    simulation: any = {};


  async ngOnInit(){
    this.id_simulation = await this.route.snapshot.params['id_simulation'];
    console.log(this.id_simulation);
    await this.getDetailSimById();

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

  exportDetail(){
    
  }

  //Separateur de milier
  addSpaceSeparators(number:any) {
    if (number !== undefined && number !== null) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
} 
}
