import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MissionListItem } from '../model/mission-list-item';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission-delete-message',
  templateUrl: './mission-delete-message.component.html',
  styleUrls: ['./mission-delete-message.component.scss']
})
export class MissionDeleteMessageComponent implements OnInit {

  constructor(private missionServices: MissionService, private eventsServices: MissionEventsService, @Inject(MAT_DIALOG_DATA) public missionToDelete: MissionListItem, private dialogRef: MatDialogRef<MissionDeleteMessageComponent>,) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.missionServices.Delete(this.missionToDelete.id).subscribe({
      next: () => {
        this.eventsServices.MissionDeleted.emit(this.missionToDelete);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Failed to delete mission:', err);
      }
    });
  }

}
