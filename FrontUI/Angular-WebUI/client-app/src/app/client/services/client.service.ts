import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISearchService } from '../../common/IService';
import { ClientListItem } from "../model/client-list-item";
import { map } from 'rxjs';
import { ClientMapper } from '../mappers/client-mapper.service';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements ISearchService<ClientListItem> {

  constructor(private http: HttpClient, private mapper: ClientMapper) { }

  find(keyword: string) {
    return this.http.get(`${environment.apiURL}/clients?PageNumber=1&PageSize=50&SearchTerm=${encodeURIComponent(keyword)}`).pipe(map(response => this.mapper.Map(response)));
  }

  getlist() {
    return this.http.get(`${environment.apiURL}/clients?PageNumber=1&PageSize=10`).pipe(map(response => this.mapper.Map(response)));
  }

  getClient(id: string) {
    return this.http.get(`${environment.apiURL}/clients/GetClientDetails?id=${id}`).pipe(map(response => this.mapper.MapClient(response)));
  }

  getInvoiceList(id: string) {
    return this.http.get(`${environment.apiURL}/clients?PageNumber=1&PageSize=50`).pipe(map(response => this.mapper.Map(response)));
  }

  Update(client:Client){
    return this.http.put(`${environment.apiURL}/clients?id=${client.id}`,client).pipe(map(response => this.mapper.MapClient(response)));
  }

  Add(client:Client){
    return this.http.post(`${environment.apiURL}/clients`,client).pipe(map(response => this.mapper.MapClientListItem(response)));
  }

  Delete(id:string){
    return this.http.delete(`${environment.apiURL}/clients/${id}`);
  }
}


