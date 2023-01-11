import { EventEmitter, Injectable } from '@angular/core';
import { Cra } from '../model/cra';
import { CraListItem } from '../model/cra-list-item';

@Injectable({
  providedIn: 'root'
})
export class CraEventsService {

  CraDeleted: EventEmitter<CraListItem> = new EventEmitter<CraListItem>();
  CraCreated: EventEmitter<CraListItem> = new EventEmitter<CraListItem>();
  CraUpdated: EventEmitter<Cra> = new EventEmitter<Cra>();
  constructor() { }
}
