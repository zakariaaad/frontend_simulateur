import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigapiService } from "./configapi.service";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Cache-Control' : 'no-cache',
//     'Pragma' : 'no-cache'
//   }),
//   observe: "response" as 'body'
// };
const apiUrl = 'http://localhost:5000/';
const httplink = {
  getAllClients: apiUrl + 'api/v1/clients/',
  saveClient: apiUrl + 'api/v1/clients/addclt',
  saveSimulation: apiUrl + 'api/v1/simulations/addsim',
  getAllSimulation: apiUrl + 'api/v1/simulations/',
}

@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {

  constructor(private apiConfig: ConfigapiService) { }
  // constructor(private httpClient: HttpClient) { }

  //Ajouter clients data
  public addClient(client: any): Observable<any>{
    // return this.apiConfig.post(httplink.saveClient, client, httpOptions);
    return this.apiConfig.post(httplink.saveClient, client);
  }

  //Ajouter Simulation data
  public addSimulation(simulation: any): Observable<any>{
    // return this.apiConfig.post(httplink.saveSimulation, simulation, httpOptions);
    return this.apiConfig.post(httplink.saveSimulation, simulation);
  }

  //Get list clients
  public getAllClients (): Observable<any>{
  
      return this.apiConfig.get(httplink.getAllClients)
  }
 
  public getAllSimulation (): Observable<any>{
  
    return this.apiConfig.get(httplink.getAllSimulation)
}

}
