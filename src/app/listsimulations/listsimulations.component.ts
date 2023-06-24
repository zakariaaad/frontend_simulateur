import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'listsimulations',
  templateUrl: './listsimulations.component.html',
  styleUrls: ['./listsimulations.component.css'],
  providers: [DatePipe]

})
export class ListsimulationsComponent implements OnInit {

  constructor(private route: Router,
    private httpcrud: CrudserviceService,
    private datePipe: DatePipe){
     
    }
    
  //Object Declaration    
simulations: any = [];
currentDate: any = new Date();
page: number = 1;
count: number = 0;
tableSize: number = 7;
tableSizes: any = [3, 6, 9, 12];

ngOnInit() {

    this.getAllSimulationslist();
}

async getAllSimulationslist ()
{
    this.httpcrud.getAllSimulation().subscribe((data : any) => {
        const resultData = data;
        console.log(resultData);
        // if (resultData) {
          this.simulations = resultData;
        // }
    });
}

//Pagination
onTableDataChange(event: any) {
  this.page = event;
  this.getAllSimulationslist();
}

onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getAllSimulationslist();

}

//Export Excel
fileName= this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') + '_Simulations.xlsx';
exportExcel()
{
    /* pass here the table id */
    let element = document.getElementById('simulations');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'simulations');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
}


//Delete Simulation
supprimer(id_simulation: any)
{
  if (confirm("est ce que vous etes sure de supprimer cette simulation")) {
    console.log("iddelete",id_simulation)
    // return false
    this.httpcrud.deleteSim(id_simulation).subscribe();
  }
  else{
  return ;
  }

}
}
