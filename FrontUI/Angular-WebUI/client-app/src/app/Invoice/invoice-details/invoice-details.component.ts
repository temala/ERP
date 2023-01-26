import { Input, OnChanges } from '@angular/core';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDeleteMessageComponent } from '../invoice-delete-message/invoice-delete-message.component';
import { InvoiceUpdateComponent } from '../invoice-update/invoice-update.component';
import { Invoice } from '../model/invoice';
import { InvoiceListItem } from '../model/invoice-list-item';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit , OnChanges{

  @Input() selectedInvoice!: InvoiceListItem;

  public invoiceInfo!: InvoiceListItem;

  constructor(public updateInvoiceDialog: MatDialog, public deleteInvoiceDialog: MatDialog, private clientServices: InvoiceService, private eventsServices: InvoiceEventsService) {
    eventsServices.InvoiceUpdated.subscribe(item => this.updateItem(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getInvoiceInfo();
  }

  ngOnInit(): void {
    this.getInvoiceInfo();
  }

  getInvoiceInfo() {
    if (this.selectedInvoice)
      this.clientServices.getInvoice(this.selectedInvoice.id).subscribe(invoiceResult => {
        this.invoiceInfo = new InvoiceListItem(invoiceResult.id.toString(),invoiceResult.name,invoiceResult.priceHT,invoiceResult.tva,this.selectedInvoice.Client);
      });
  }

  onEdit() {
    this.updateInvoiceDialog.open(InvoiceUpdateComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.invoiceInfo
    });
  }

  onDelete() {
    this.deleteInvoiceDialog.open(InvoiceDeleteMessageComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.selectedInvoice
    });
  }

  updateItem(invoice:Invoice) {
    this.invoiceInfo = new InvoiceListItem(invoice.id.toString(),invoice.name,invoice.priceHT,invoice.tva,invoice.client);
    this.selectedInvoice.name = invoice.name;
    this.selectedInvoice.HT = invoice.priceHT;
    this.selectedInvoice.TVA = invoice.tva;
    this.selectedInvoice.Client = invoice.client;
  }

}