import { Input } from '@angular/core';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mission } from '../model/mission';
import { MissionListItem } from '../model/mission-list-item';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent implements OnInit {

  @Input() selectedMission!: MissionListItem;

  public clientInfo!: Mission;

  constructor(public updateMissionDialog: MatDialog, public deleteMissionDialog: MatDialog, private clientServices: MissionService, private eventsServices: MissionEventsService) {
    eventsServices.MissionUpdated.subscribe(item => this.updateItem(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMissionInfo();
  }

  ngOnInit(): void {
    this.getMissionInfo();
  }

  getMissionInfo() {
    if (this.selectedMission)
      this.clientServices.getMission(this.selectedMission.id).subscribe(clientResult => {
        this.clientInfo = clientResult;
      });
  }

  // onEdit() {
  //   this.updateMissionDialog.open(MissionUpdateComponent, {
  //     width: '600px',
  //     maxHeight: '90vh',
  //     panelClass: 'custom-dialog-box',
  //     data: this.clientInfo
  //   });
  // }

  // onDelete() {
  //   this.deleteMissionDialog.open(MissionDeleteMessageComponent, {
  //     width: '600px',
  //     maxHeight: '90vh',
  //     panelClass: 'custom-dialog-box',
  //     data: this.selectedMission
  //   });
  // }

  updateItem(client:Mission) {
    this.clientInfo = client;
    this.selectedMission.name = client.name;
  }

}
