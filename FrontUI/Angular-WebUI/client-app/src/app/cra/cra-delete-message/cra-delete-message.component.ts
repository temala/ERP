import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CraListItem } from '../model/cra-list-item';
import { CraEventsService } from '../services/cra-events.service';
import { CraService } from '../services/cra.service';

@Component({
  selector: 'app-cra-delete-message',
  templateUrl: './cra-delete-message.component.html',
  styleUrls: ['./cra-delete-message.component.scss']
})
export class CraDeleteMessageComponent implements OnInit {

  constructor(private craServices: CraService, private eventsServices: CraEventsService, @Inject(MAT_DIALOG_DATA) public craToDelete: CraListItem, private dialogRef: MatDialogRef<CraDeleteMessageComponent>,) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.craServices.Delete(this.craToDelete.id).subscribe({
      next: () => {
        this.eventsServices.CraDeleted.emit(this.craToDelete);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Failed to delete CRA:', err);
      }
    });
  }

}
