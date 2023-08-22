import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import { pmt } from 'financial'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Stepper from 'bs-stepper';


@Component({
  selector: 'app-formclient',
  templateUrl: './formclient.component.html',
  styleUrls: ['./formclient.component.css'],
})
export class FormclientComponent implements OnInit {
  private stepper!: Stepper;
  id_client: any;
  mensualitee!: number;
  fraisdossier!: number;
  Assurance!: number;
  interet!: number;
  mntcredit!: number;
  duree!: number;
  frequence!: number;
  mntndebloquer!: number;
  typetaux!: any;
  nomclient!: any;
  prime!: any;
  typeprod! : any;
  mntavance! : number;
  step: any = 1;
  invaliddata: boolean = false;
  multistep = new FormGroup({
    //Clients detail
    infoClients: new FormGroup({
      nom_prenom_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      telephone_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      numero_cin_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email_client: new FormControl(''),
      age_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      ville_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      profession_client: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      date_naissance_client: new FormControl(''),
      adresse_client: new FormControl(''),
      revenu_principale_client: new FormControl(),
    }),

    //Crédit detail
    infoSimulations: new FormGroup({
      type_produit_simulation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      prix_produit_simulation: new FormControl(),
      duree_simulation: new FormControl(),
      type_taux_simulation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      tauxinteret_simulation: new FormControl(),
      montant_remise_simulation: new FormControl(),
      frequence_simulation: new FormControl(),
      assurance_deces_simulation: new FormControl(),
      assurances_simulation: new FormControl(''),
      caractéristiques_simulation: new FormControl(''),
      avance_credit_simulation: new FormControl(),
      echeance_mensuelle_simulation: new FormControl(),
      frais_dossier_simulation: new FormControl(),
    }),
  });
  @ViewChild('resultat') resultat!: ElementRef;
  constructor(private router: Router, private httpcrud: CrudserviceService) {}
  ngOnInit() { 
    this.stepper = new Stepper(document.querySelector('#stepper1')!, {
      linear: false,
      animation: true
    })
  }

  async submit() {

    //Etape Client
    const stepclt = this.multistep.get('infoClients');

    //Ajouer Client Step 1
    if (this.step == 1) {
      if (stepclt?.invalid) {
        this.multistep.get('infoClients')?.setErrors({
          invalid: true
        })
        return
      }
      else {
        this.multistep.get('infoClients')?.setErrors({
          invalid: false
        })
        this.nomclient = this.multistep.get('infoClients.nom_prenom_client')?.value;

        await this.httpcrud.addClient(stepclt?.value).subscribe((response) => {
          this.id_client = response.body.data;
          // console.log('ook', response.body.data);
        });
        this.step = this.step + 1;
      }
    }

    const txinteret = this.multistep.get('infoSimulations.tauxinteret_simulation')?.value;
    const frequence = this.multistep.get('infoSimulations.frequence_simulation')?.value;
    const duree = this.multistep.get('infoSimulations.duree_simulation')?.value;
    const montantproduit = this.multistep.get('infoSimulations.prix_produit_simulation')?.value;
    const fraisdossier2 = this.multistep.get('infoSimulations.frais_dossier_simulation')?.value;
    // const dr = duree / 12 ;
    this.prime = this.multistep.get('infoSimulations.assurances_simulation')?.value;
    this.typeprod = this.multistep.get('infoSimulations.type_produit_simulation')?.value;
    this.mntavance = this.multistep.get('infoSimulations.avance_credit_simulation')?.value;
    this.mntndebloquer = montantproduit - fraisdossier2;
    //Parametre calcul
    const montantcredit = -montantproduit
    const r1 = (txinteret / 100) * 1;
    console.log("r1",r1);

    // const r2 = 1 * duree / 12 / frequence;

    const rate = r1 / frequence;
    // const nbrper1 = 12 / (12 / frequence);


    //Calcul de Mensualité crédit
    /* Function PMT
        * rate   - interest rate per month
        * nbrper   - number of periods (months)
        * montantpv   - present value
        * type - when the payments are due:
        *        0: end of the period, e.g. end of month (default)
        *        1: beginning of period
    */
    const mensualite = pmt(rate, duree, montantcredit);
 
    this.mensualitee = Math.round(mensualite*100)/100;
    console.log(this.mensualitee);

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
      assurances_simulation: this.multistep.get('infoSimulations.assurances_simulation')?.value,
      caractéristiques_simulation: this.multistep.get('infoSimulations.caractéristiques_simulation')?.value,
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


    //Ajouter Simulation step 2
    if (this.step == 2) {

      if (stepsimulation?.invalid) {
        this.multistep.get('infoSimulations')?.setErrors({
          invalid: true
        })
        return
      } else {
        console.log('data', datasimulation);
        // return false
        await this.httpcrud.addSimulation(datasimulation).subscribe((response) => {
          console.log('ook', response.body.data);

        });
        this.step = this.step + 1;
      }
    }


  }

  previous() {
    this.step = this.step - 1;
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('resultat');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('resultatcredit.pdf');
    });
  }


}




