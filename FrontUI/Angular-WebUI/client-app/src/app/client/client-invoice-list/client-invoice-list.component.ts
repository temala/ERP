import { ClientListItem } from './../model/client-list-item';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClientInvoiceListItem } from '../model/ClientInvoiceListItem';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-invoice-list',
  templateUrl: './client-invoice-list.component.html',
  styleUrls: ['./client-invoice-list.component.scss']
})
export class ClientInvoiceListComponent implements AfterViewInit {

  @Input() client!: ClientListItem;

  @ViewChild(MatSort) sort = new MatSort();

  public displayedColumns: string[] = ['invoiceNumber', 'totalTTC', 'totalHT', 'tax', 'issueDate', 'dueDate', 'daysToPay', 'actions'];

  public invoices!: MatTableDataSource<ClientInvoiceListItem>;

  constructor(private clientServices: ClientService) { }

  ngAfterViewInit(): void {
    this.clientServices.getInvoiceList(this.client.id).subscribe(invoices => {
      this.invoices = new MatTableDataSource(invoices);
      this.invoices.sort = this.sort;
    });
  }

}
