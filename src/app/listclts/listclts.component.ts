import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'listclts',
  templateUrl: './listclts.component.html',
  styleUrls: ['./listclts.component.css'],
  providers: [DatePipe]

})
export class ListcltsComponent implements OnInit, OnDestroy {

  //Object Declaration
  clients: any = [];
  currentDate: any = new Date();
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  filtredProducts: any = [];
  subscription!: Subscription;

  constructor(private router: Router,
            private httpcrud: CrudserviceService,
            private datePipe: DatePipe){

            }


 ngOnDestroy(){
 
  }

  ngOnInit() {
    this.getListClients();
  }

async getListClients ()
{
    this.httpcrud.getAllClients().subscribe((data : any) => {
        const resultData = data;
        console.log(resultData);
        // if (resultData) {
          this.filtredProducts = this.clients = resultData;
        // }
    });
}

//Pagination
onTableDataChange(event: any) {
  this.page = event;
  this.getListClients();
}

onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getListClients();

}

//Search bar
filter(query: string){
  this.filtredProducts = (query) ?
  // this.clients.filter
  this.clients.filter((client: { nom_prenom_client: string; }) => client.nom_prenom_client.toLowerCase().includes(query.toLowerCase())) :
  this.clients;
}

//Delete client;,;
supprimer(id_client: any)
{

  if (confirm("est ce que vous etes sure de supprimer ce client")) {
    // console.log("iddelete",id_client)
    this.httpcrud.deleteclt(id_client).subscribe();
  }else{
  return ;
  }

}


//Export Excel
fileName= this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') + '_Clients.xlsx';
exportExcel()
{
    /* pass here the table id */
    let element = document.getElementById('clients');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'clients');
    // date = this.currentDate;
    // console.log("currentdate",this.fileName)
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
}

}
