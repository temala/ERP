import { EventEmitter, Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { InvoiceListItem } from '../model/invoice-list-item';
import { InvoiceLine } from '../model/InvoiceLine';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEventsService {

  InvoiceDeleted: EventEmitter<InvoiceListItem> = new EventEmitter<InvoiceListItem>();
  InvoiceCreated: EventEmitter<InvoiceListItem> = new EventEmitter<InvoiceListItem>();
  InvoiceUpdated: EventEmitter<Invoice> = new EventEmitter<Invoice>();
  InvoiceLineDeleted: EventEmitter<InvoiceLine> = new EventEmitter<InvoiceLine>();

  constructor() {
  }
}
