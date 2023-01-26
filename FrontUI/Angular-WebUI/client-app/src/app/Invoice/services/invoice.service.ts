import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceMapper } from '../mappers/invoice-mapper.service';
import { Invoice } from '../model/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private mapper: InvoiceMapper) { }
  
  find(keyword: string) {
    return this.http.get(`${environment.fakeApiURL}/find-invoices?keyword=${keyword}`).pipe(map(response => this.mapper.Map(response)));
  }

  getlist() {
    return this.http.get(`${environment.apiURL}/invoices?PageNumber=1&PageSize=10`).pipe(map(response => this.mapper.Map(response)));
  }

  getInvoice(id: string) {
    return this.http.get(`${environment.apiURL}/invoices/GetInvoiceDetails?id=${id}`).pipe(map(response => this.mapper.MapInvoice(response)));
  }

  Update(invoice:Invoice){
    return this.http.put(`${environment.apiURL}/invoices?id=${invoice.id}`,invoice).pipe(map(response => this.mapper.MapInvoice(response)));
  }

  Add(invoice:Invoice){
    return this.http.post(`${environment.apiURL}/invoices`,invoice).pipe(map(response => this.mapper.MapInvoiceListItem(response)));
  }

  Delete(id:string){
    return this.http.delete(`${environment.apiURL}/invoices/${id}`);
  }
}
