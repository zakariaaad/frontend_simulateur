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
  editClient: apiUrl + 'api/v1/clients',
  editSimulation: apiUrl + 'api/v1/simulations',
  getAllSimulation: apiUrl + 'api/v1/simulations/',
  getClientById: apiUrl + 'api/v1/clients',
  getSimById: apiUrl + 'api/v1/simulations',
  getVilles: apiUrl + 'api/user/villes',
}

@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {

  constructor(private apiConfig: ConfigapiService, private httpClient: HttpClient) { }

  //Ajouter clients data
  public addClient(client: any): Observable<any> {

    return this.apiConfig.post(httplink.saveClient, client);
  }

  //Ajouter Simulation data
  public addSimulation(simulation: any): Observable<any> {
    return this.apiConfig.post(httplink.saveSimulation, simulation);
  }

  //Get list clients
  public getAllClients(): Observable<any> {

    return this.apiConfig.get(httplink.getAllClients)
  }

    //Get list clients
    public getAllVilles(): Observable<any> {
      return this.apiConfig.get(httplink.getVilles)
    }

  //Get list simulations
  public getAllSimulation(): Observable<any> {

    return this.apiConfig.get(httplink.getAllSimulation)
  }

  //Modifier Client
  public editClient(id:string, data: any): Observable<any>{
    return this.apiConfig.put(`${httplink.editClient}/${id}`, data)
  }

  //Get Single Client By ID
  public findClientById(id:string): Observable<any>{
    return this.apiConfig.get(`${httplink.getClientById}/${id}`)
  }

    //Get Single Client By ID
  public findSimById(id:string): Observable<any>{
      return this.apiConfig.get(`${httplink.getSimById}/${id}`)
    }

  //Modifier Client
  public editSim(id:string, data: any): Observable<any>{
    return this.apiConfig.put(`${httplink.editSimulation}/${id}`, data)
  }

  public deleteclt(id:string): Observable<any>{
    return this.httpClient.delete(`${httplink.getClientById}/${id}`);
  }

  public deleteSim(id:string): Observable<any>{
    return this.apiConfig.get(`${httplink.getSimById}/${id}`)
  }
}
