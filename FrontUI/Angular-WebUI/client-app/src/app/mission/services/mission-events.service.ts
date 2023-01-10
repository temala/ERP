import { EventEmitter, Injectable } from '@angular/core';
import { Mission } from '../model/mission';
import { MissionListItem } from '../model/mission-list-item';

@Injectable({
  providedIn: 'root'
})
export class MissionEventsService {

  MissionDeleted: EventEmitter<MissionListItem> = new EventEmitter<MissionListItem>();
  MissionCreated: EventEmitter<MissionListItem> = new EventEmitter<MissionListItem>();
  MissionUpdated: EventEmitter<Mission> = new EventEmitter<Mission>();

  constructor() {
  }
}
