import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MissionAddComponent } from '../mission-add/mission-add.component';
import { MissionListItem } from '../model/mission-list-item';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements AfterViewInit {

  
  @ViewChild(MatSort) sort = new MatSort();

  public displayedColumns: string[] = ['id', 'name','client','HT','TVA','TTC', 'actions'];

  public missions!: MatTableDataSource<MissionListItem>;

  public selectedMission!: MissionListItem;

  constructor(public addMissionDialog: MatDialog, private missionServices: MissionService, private eventsServices: MissionEventsService) {
    eventsServices.MissionDeleted.subscribe(item=>this.removeDeletedItem(item));
    eventsServices.MissionCreated.subscribe(item=>this.addCreatedItem(item));
  }

  openDialog(): void {
    let addDialogInstance = this.addMissionDialog.open(MissionAddComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box'
    });
  }

  ngAfterViewInit(): void {
    this.missionServices.getlist().subscribe(missions => {
      this.missions = new MatTableDataSource(missions);
      this.missions.sort = this.sort;
    });
  }

  find(keyword: string) {
    this.missionServices.find(keyword).subscribe(missions => {
      this.missions = new MatTableDataSource(missions);
      this.missions.sort = this.sort;
    });
  }

  onMissionSelected(mission: MissionListItem) {
    this.selectedMission = mission;
  }

  addCreatedItem(insertedMission:MissionListItem) {
    this.missions.data.push(insertedMission);
    this.missions.data = [...this.missions.data];
    this.selectedMission = insertedMission;
  }

  removeDeletedItem(missionItem:MissionListItem) {
    this.selectedMission= null as any;
    this.missions.data = this.missions.data.filter(item => {
      return item !== missionItem;
    });
  }

}
