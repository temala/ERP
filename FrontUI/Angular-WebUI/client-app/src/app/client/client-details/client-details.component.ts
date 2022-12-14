import {Client} from '../model/client';
import {ClientListItem} from "../model/client-list-item";
import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../services/client.service';
import {ClientUpdateComponent} from '../client-update/client-update.component';
import {ClientEventsService} from "../services/client-events.service";
import {ClientDeleteMessageComponent} from "../client-delete-message/client-delete-message.component";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnChanges {

  @Input() selectedClient!: ClientListItem;

  public clientInfo!: Client;

  constructor(public updateClientDialog: MatDialog, public deleteClientDialog: MatDialog, private clientServices: ClientService, private eventsServices: ClientEventsService) {
    eventsServices.ClientUpdated.subscribe(item => this.updateItem(item));
  }

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
    this.updateClientDialog.open(ClientUpdateComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.clientInfo
    });
  }

  onDelete() {
    this.deleteClientDialog.open(ClientDeleteMessageComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.selectedClient
    });
  }

  updateItem(client:Client) {
    this.clientInfo = client;
    this.selectedClient.name = client.name;
  }
}
