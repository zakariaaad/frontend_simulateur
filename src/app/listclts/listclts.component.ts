import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';

@Component({
  selector: 'listclts',
  templateUrl: './listclts.component.html',
  styleUrls: ['./listclts.component.css']
})
export class ListcltsComponent implements OnInit {

  clients: any = [];

  constructor(private router: Router,
            private httpcrud: CrudserviceService){}

  ngOnInit() {

    // let id = this.route.snapshot.paramMap.get('id');
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

}
