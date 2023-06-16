import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'editsim',
  templateUrl: './editsim.component.html',
  styleUrls: ['./editsim.component.css']
})
export class EditsimComponent implements OnInit {

  constructor(){}

  simulation: any = {};

  ngOnInit(){}

  updateSimulation(){
  
  
  }

}
