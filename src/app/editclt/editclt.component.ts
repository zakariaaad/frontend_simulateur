import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
@Component({
  selector: 'editclt',
  templateUrl: './editclt.component.html',
  styleUrls: ['./editclt.component.css']
})
export class EditcltComponent implements OnInit {
  id_client: any;
  infoclt: any;
  clients: any = {};

  constructor( private httpcrud: CrudserviceService,
    private route: ActivatedRoute, private router: Router
    ){}

  async ngOnInit(){
     this.id_client = await this.route.snapshot.params['id_client'];

    await this.getDetailClientById();

  }

  async getDetailClientById(){
    await this.httpcrud.findClientById(this.id_client).subscribe(data =>{
      if (data != null ){
        var resultData = data;
        // console.log("res",resultData)
        if (resultData) {
          this.clients = resultData[0]
        }
      }
    });
  }

  updateClient(){

    // console.log("res",this.infoclt)
    this.httpcrud.editClient(this.id_client, this.clients).subscribe(response => console.log(response));

    this.router.navigate(['/clients']);

  }

}

