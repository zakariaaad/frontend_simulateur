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
  data: any;
clients: any = {};
  // clientform = new FormGroup({
  //   nom_prenom_client: new FormControl(''),
  //   telephone_client: new FormControl(''),
  //   numero_cin_client: new FormControl(''),
  //   email_client: new FormControl(''),
  //   age_client: new FormControl(''),
  //   ville_client: new FormControl(''),
  //   profession_client: new FormControl(''),
  //   date_naissance_client: new FormControl(''),
  //   adresse_client: new FormControl(''),
  //   revenu_principale_client: new FormControl(),
  // })

  constructor( private httpcrud: CrudserviceService,
    private route: ActivatedRoute, private router: Router
    ){}

  async ngOnInit(){
     this.id_client = await this.route.snapshot.params['id_client'];
    console.log("idclt",this.id_client)
    await this.getDetailClientById();

  }

  async getDetailClientById(){
    await this.httpcrud.findClientById(this.id_client).subscribe(data =>{

      if (data != null ){
        var resultData = data;
      console.log("res",resultData)
      console.log("tts",resultData[0].nom_prenom_client)

        if (resultData) {

          this.clients = resultData[0]
          // this.clientform.value.nom_prenom_client = resultData[0].nom_prenom_client;
          // this.clientform.value.telephone_client = resultData[0].telephone_client;
          // this.clientform.value.numero_cin_client = resultData[0].numero_cin_client;
          // this.clientform.value.email_client = resultData[0].email_client;
          // this.clientform.value.age_client = resultData[0].age_client;
          // this.clientform.value.ville_client = resultData[0].ville_client;
          // this.clientform.value.date_naissance_client = resultData[0].date_naissance_client;
          // this.clientform.value.adresse_client = resultData[0].adresse_client;
          // this.clientform.value.revenu_principale_client = resultData[0].revenu_principale_client;
          // this.clientform.value.numero_cin_client = resultData.numero_cin_client;
          // this.clientform.LastName = resultData.lastName;

        }
      }
    } );
  }

  updateClient(){
    // this.id_client=1;
    console.log("id",this.id_client)
    // const result = this.clientform.patchValue({
    //   nom_prenom_client: '',
    //   telephone_client: '',
    //   numero_cin_client: '',
    //   email_client: '',
    //   age_client: '',
    //   ville_client: '',
    //   profession_client: '',
    //   date_naissance_client: '',
    //   adresse_client: '',
    //   revenu_principale_client: ''
    // })
    // this.data =  result

    console.log("res",this.data)

    this.httpcrud.editClient(this.id_client, this.data).subscribe(response => console.log(response));
  }

}

