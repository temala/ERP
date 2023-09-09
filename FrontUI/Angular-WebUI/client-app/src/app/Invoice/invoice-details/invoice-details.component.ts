import { Input, OnChanges } from '@angular/core';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDeleteMessageComponent } from '../invoice-delete-message/invoice-delete-message.component';
import { Invoice } from '../model/invoice';
import { InvoiceListItem } from '../model/invoice-list-item';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit , OnChanges{

  @Input() selectedInvoice!: InvoiceListItem;

  displayedColumns: string[] = ['description', 'date', 'qte', 'unit', 'priceHT', 'tva', 'priceTTC'];

  public get totalHT(): number {
    return this.invoiceInfo.invoiceLines.map(l => l.product.priceHT * l.quantity).reduce((x, y) => x + y);
  }

  public get tva(): number {
    return this.invoiceInfo.invoiceLines.map(l => (l.product.priceHT* l.quantity * l.product.tva) / 100).reduce((x, y) => x + y);
  }

  public get total(): number {
    return this.totalHT + this.tva;
  }

  public invoiceInfo!: Invoice;

  constructor(private router: Router, public deleteInvoiceDialog: MatDialog, private invoiceServices: InvoiceService, private eventsServices: InvoiceEventsService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getInvoiceInfo();
  }

  ngOnInit(): void {
    this.getInvoiceInfo();
  }

  getInvoiceInfo() {
    if (this.selectedInvoice)
      this.invoiceServices.getInvoice(this.selectedInvoice.id).subscribe(invoiceResult => {
        this.invoiceInfo =invoiceResult;
      });
  }

  onEdit() {
    if (this.invoiceInfo && this.invoiceInfo.id) {
      this.router.navigate(['/invoice/update-invoice', this.invoiceInfo.id]);
    }
  }

  onDelete() {
    this.deleteInvoiceDialog.open(InvoiceDeleteMessageComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.selectedInvoice
    });
  }
}
