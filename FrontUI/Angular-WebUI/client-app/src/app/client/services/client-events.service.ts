import {EventEmitter, Injectable} from '@angular/core';
import {ClientListItem} from "../model/client-list-item";
import {Client} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientEventsService {
  ClientDeleted: EventEmitter<ClientListItem> = new EventEmitter<ClientListItem>();
  ClientCreated: EventEmitter<ClientListItem> = new EventEmitter<ClientListItem>();
  ClientUpdated: EventEmitter<Client> = new EventEmitter<Client>();

  constructor() {
  }
}
