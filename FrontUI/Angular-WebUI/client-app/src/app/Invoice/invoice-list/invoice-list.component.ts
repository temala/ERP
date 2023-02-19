import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceAddComponent } from '../invoice-add/invoice-add.component';
import { InvoiceListItem } from '../model/invoice-list-item';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements AfterViewInit {

  
  @ViewChild(MatSort) sort = new MatSort();

  public displayedColumns: string[] = ['identifier', 'client','date','dueDate','TTC','status', 'actions'];

  public invoices!: MatTableDataSource<InvoiceListItem>;

  public selectedInvoice!: InvoiceListItem;

  constructor(public addInvoiceDialog: MatDialog, private invoiceServices: InvoiceService, private eventsServices: InvoiceEventsService) {
    eventsServices.InvoiceDeleted.subscribe(item=>this.removeDeletedItem(item));
    eventsServices.InvoiceCreated.subscribe(item=>this.addCreatedItem(item));
  }

  openDialog(): void {
    let addDialogInstance = this.addInvoiceDialog.open(InvoiceAddComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box'
    });
  }

  ngAfterViewInit(): void {
    this.invoiceServices.getlist().subscribe(invoices => {
      this.invoices = new MatTableDataSource(invoices);
      this.invoices.sort = this.sort;
    });
  }

  find(keyword: string) {
    this.invoiceServices.find(keyword).subscribe(invoices => {
      this.invoices = new MatTableDataSource(invoices);
      this.invoices.sort = this.sort;
    });
  }

  onInvoiceSelected(invoice: InvoiceListItem) {
    this.selectedInvoice = invoice;
  }

  addCreatedItem(insertedInvoice:InvoiceListItem) {
    this.invoices.data.push(insertedInvoice);
    this.invoices.data = [...this.invoices.data];
    this.selectedInvoice = insertedInvoice;
  }

  removeDeletedItem(invoiceItem:InvoiceListItem) {
    this.selectedInvoice= null as any;
    this.invoices.data = this.invoices.data.filter(item => {
      return item !== invoiceItem;
    });
  }

}
