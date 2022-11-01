import {ClientListItem} from "../model/client-list-item";
import {ClientAddComponent} from './../client-add/client-add.component';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ClientService} from '../services/client.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements AfterViewInit {

  @ViewChild(MatSort) sort = new MatSort();

  public displayedColumns: string[] = ['id', 'name', 'openInvoicesGrossTotal', 'paidInvoicesGrossTotal', 'actions'];

  public clients!: MatTableDataSource<ClientListItem>;

  public selectedClient!: ClientListItem;

  constructor(public addClientDialog: MatDialog, private clientServices: ClientService) {
  }

  openDialog(): void {
    let addDialogInstance = this.addClientDialog.open(ClientAddComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box'
    });

    addDialogInstance.componentInstance.ClientCreated.subscribe(insertedClient => {
      this.clients.data.push(insertedClient);
      this.clients.data =[...this.clients.data];
    });
  }

  ngAfterViewInit(): void {
    this.clientServices.getlist().subscribe(clients => {
      this.clients = new MatTableDataSource(clients);
      this.clients.sort = this.sort;
    });
  }

  find(keyword: string) {
    this.clientServices.find(keyword).subscribe(clients => {
      this.clients = new MatTableDataSource(clients);
      this.clients.sort = this.sort;
    });
  }

  onClientSelected(client: ClientListItem) {
    this.selectedClient = client;
  }
}
