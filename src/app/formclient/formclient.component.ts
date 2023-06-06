import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';

@Component({
  selector: 'app-formclient',
  templateUrl: './formclient.component.html',
  styleUrls: ['./formclient.component.css'],
})
export class FormclientComponent implements OnInit {

  id_client: any;
  mensualitee!: number;
  fraisdossier!: number;
  Assurance!: number;
  interet!: number;
  mntcredit!: number;
  duree!: number;
  frequence!: number;
  typetaux!: any;
  nomclient!: any;

  step: any = 1;
  invaliddata: boolean = false;
  multistep = new FormGroup({
    //Clients detail
    infoClients: new FormGroup({
      nom_prenom_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      telephone_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      numero_cin_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      age_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      ville_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      profession_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      date_naissance_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      adresse_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      revenu_principale_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    }),

    //Crédit detail
    infoSimulations: new FormGroup({
      type_produit_simulation: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
      prix_produit_simulation: new FormControl(),
      duree_simulation: new FormControl(),
      type_taux_simulation: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
      tauxinteret_simulation: new FormControl(),
      montant_remise_simulation: new FormControl(),
      frequence_simulation: new FormControl(),
      assurance_deces_simulation: new FormControl(),
      assurances_simulation: new FormControl(''),
      avance_credit_simulation: new FormControl(),
      echeance_mensuelle_simulation: new FormControl(),
      frais_dossier_simulation: new FormControl(),
    }),
  });

  constructor(private router: Router, private httpcrud: CrudserviceService) { }
  ngOnInit(): void { }

  async submit() {

    //Etape Client
    const stepclt = this.multistep.get('infoClients');
    // if (stepclt?.invalid) {
    //   alert("ttest");
    //   return
    // }

    //Ajouer Client Step 1
    if (this.step == 1) {
      if (stepclt?.invalid) {
        this.multistep.setErrors({
          invalid :true
        })
        return
      }
    this.nomclient = this.multistep.get('infoClients.nom_prenom_client')?.value;

      await this.httpcrud.addClient(stepclt?.value).subscribe((response) => {
        this.id_client = response.body.data;
        // console.log('ook', response.body.data);
      });
      this.step = this.step + 1;

    }

    const txinteret = this.multistep.get('infoSimulations.tauxinteret_simulation')?.value;
    const frequence = this.multistep.get('infoSimulations.frequence_simulation')?.value;
    const duree = this.multistep.get('infoSimulations.duree_simulation')?.value;
    const montantproduit = this.multistep.get('infoSimulations.prix_produit_simulation')?.value;

    //Parametre calcul
    const montantcredit = -montantproduit
    const rate1 = (txinteret / 100) * 1.1 * duree;
    const nbrper1 = 12 / (12 / frequence);

    //Calcul mensualite
    const mensualite = CalculatePMT(rate1, nbrper1, montantcredit);
    this.mensualitee = mensualite;
    console.log(mensualite);

    // Etape formulaire
    const stepsimulation = this.multistep.get('infoSimulations');
    // Data Simulations
    const datasimulation = {
      prix_produit_simulation: this.multistep.get('infoSimulations.prix_produit_simulation')?.value,
      type_produit_simulation: this.multistep.get('infoSimulations.type_produit_simulation')?.value,
      duree_simulation: this.multistep.get('infoSimulations.duree_simulation')?.value,
      type_taux_simulation: this.multistep.get('infoSimulations.type_taux_simulation')?.value,
      tauxinteret_simulation: this.multistep.get('infoSimulations.tauxinteret_simulation')?.value,
      montant_remise_simulation: this.multistep.get('infoSimulations.montant_remise_simulation')?.value,
      frequence_simulation: this.multistep.get('infoSimulations.frequence_simulation')?.value,
      assurance_deces_simulation: this.multistep.get('infoSimulations.assurance_deces_simulation')?.value,
      avance_credit_simulation: this.multistep.get('infoSimulations.avance_credit_simulation')?.value,
      echeance_mensuelle_simulation: this.multistep.get('infoSimulations.echeance_mensuelle_simulation')?.value,
      frais_dossier_simulation: this.multistep.get('infoSimulations.frais_dossier_simulation')?.value,
      id_client: this.id_client,
      mensualite_simulation: this.mensualitee,
    };
    this.interet = txinteret;
    this.mntcredit = montantproduit;
    this.duree = duree;
    this.frequence = frequence;
    this.typetaux = datasimulation.type_taux_simulation;
    this.fraisdossier = datasimulation.frais_dossier_simulation;
    this.Assurance = datasimulation.assurance_deces_simulation;

    //Ajouter Simulation step 2
    if (this.step == 2) {
      // console.log("feffe");
      // console.log("DDZ", stepsimulation);
      // console.log("data", datasimulation);

      if (stepsimulation?.invalid) {
        this.multistep.setErrors({
          invalid :true
        })
        return
      }else{
      console.log('data', datasimulation);
      await this.httpcrud.addSimulation(datasimulation).subscribe((response) => {
        console.log('ook', response.body.data);

      });
      this.step = this.step + 1;
    }
    }


    // Fin Validate Simulation
    if (this.step == 4) {
      this.router.navigate(['/validation'])
    }
  }

  previous() {
    this.step = this.step - 1;
  }


} 

//Calcul de Mensualité crédit
 /*
     * rate   - interest rate per month
     * nbrper   - number of periods (months)
     * montantpv   - present value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
  */
function CalculatePMT(rate: any, nbrper: number, montantpv: number) {
  
  var type, pmt, pvif;
  type || (type = 0);

  if (rate === 0)  return -(montantpv) / nbrper;

  pvif = Math.pow(1 + rate, nbrper);
  // pmt = (-rate * (montantpv * pvif)) / (pvif - 1);
  pmt = -rate * (montantpv * pvif) / (pvif - 1);


  // if (type === 1)
    pmt /= (1 + rate);
    // pmt /= 1 + rate; 

  return pmt;
}

