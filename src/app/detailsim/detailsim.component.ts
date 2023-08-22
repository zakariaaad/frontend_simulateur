import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import {jsPDF} from 'jspdf';

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

    @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef;
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

  // exportDetail(){
    
  // }

  public  downloadAsPDF() {
    const doc = new jsPDF();
    console.log(doc);
    const specialElementHandlers = {
      '#editor': function (element: any, renderer: any) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;
    console.log(pdfTable);
    console.log(specialElementHandlers);

     doc.html(pdfTable.innerHTML,{
      // width: 190,

      callback: function (doc) {

        doc.save('tableToPdf.pdf');
      }
      // 'elementHandlers': specialElementHandlers

    });

  }

  //Separateur de milier
  addSpaceSeparators(number:any) {
    if (number !== undefined && number !== null) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
} 
}
