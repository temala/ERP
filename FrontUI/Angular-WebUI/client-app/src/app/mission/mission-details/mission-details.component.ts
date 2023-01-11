import { Input, OnChanges } from '@angular/core';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MissionDeleteMessageComponent } from '../mission-delete-message/mission-delete-message.component';
import { MissionUpdateComponent } from '../mission-update/mission-update.component';
import { Mission } from '../model/mission';
import { MissionListItem } from '../model/mission-list-item';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent implements OnInit , OnChanges{

  @Input() selectedMission!: MissionListItem;

  public missionInfo!: MissionListItem;

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
      this.clientServices.getMission(this.selectedMission.id).subscribe(missionResult => {
        this.missionInfo = new MissionListItem(missionResult.id.toString(),missionResult.name,missionResult.priceHT,missionResult.tva,this.selectedMission.Client);
      });
  }

  onEdit() {
    this.updateMissionDialog.open(MissionUpdateComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.missionInfo
    });
  }

  onDelete() {
    this.deleteMissionDialog.open(MissionDeleteMessageComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.selectedMission
    });
  }

  updateItem(mission:Mission) {
    this.missionInfo = new MissionListItem(mission.id.toString(),mission.name,mission.priceHT,mission.tva,mission.client);
    this.selectedMission.name = mission.name;
    this.selectedMission.HT = mission.priceHT;
    this.selectedMission.TVA = mission.tva;
    this.selectedMission.Client = mission.client;
  }

}
