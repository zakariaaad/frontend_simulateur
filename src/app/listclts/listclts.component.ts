import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'listclts',
  templateUrl: './listclts.component.html',
  styleUrls: ['./listclts.component.css'],
  providers: [DatePipe]

})
export class ListcltsComponent implements OnInit {

  clients: any = [];
  currentDate:any = new Date();

  constructor(private router: Router,
            private httpcrud: CrudserviceService,
            private datePipe: DatePipe){
              // if (this.currentDate != null){this.currentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');}
              
            }

  ngOnInit() {
    // let id = this.route.snapshot.paramMap.get('id');
    this.currentDate.toLocaleDateString();

    // let page = this.route.snapshot.queryParamMap.get('page');
    this.getListClients();
  }

async getListClients ()
{
    this.httpcrud.getAllClients().subscribe((data : any) => {
      // if (data != null && data.body != null) {
        const resultData = data;
        console.log(resultData);
        // if (resultData) {
          this.clients = resultData;
        // }
      // }
    });
}

supprimer(id_client: any)
{

  if (confirm("est ce que vous etes sure de supprimer ce client")) {
    console.log("iddelete",id_client)
    // return false
    this.httpcrud.deleteclt(id_client).subscribe();
  }else{
  return;
  }

}

fileName= this.currentDate + 'Clients.xlsx';

exportExcel()
{

    /* pass here the table id */
    let element = document.getElementById('clients');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'clients');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);

}

}
