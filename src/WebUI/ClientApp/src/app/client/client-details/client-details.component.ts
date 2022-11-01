import { Client } from './../model/client';
import { ClientListItem } from "../model/client-list-item";
import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { ClientUpdateComponent } from '../client-update/client-update.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnChanges {

  @Input() selectedClient!: ClientListItem;

  public clientInfo!: Client;

  constructor(public updateClientDialog: MatDialog, private clientServices: ClientService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getClientInfo();
  }

  ngOnInit(): void {
    this.getClientInfo();
  }

  getClientInfo() {
    if (this.selectedClient)
      this.clientServices.getClient(this.selectedClient.id).subscribe(clientResult => {
        this.clientInfo = clientResult;
      });
  }

  onEdit() {
    let updateDialog = this.updateClientDialog.open(ClientUpdateComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.clientInfo
    });

    updateDialog.componentInstance.ClientUpdated.subscribe(client=>{
      this.clientInfo = client;
      this.selectedClient.name = client.name;
    });
  }

  onDelete()
  {

  }
}
