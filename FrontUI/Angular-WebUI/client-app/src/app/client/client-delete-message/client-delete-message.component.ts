import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../services/client.service";
import {ClientEventsService} from "../services/client-events.service";
import {ClientListItem} from "../model/client-list-item";

@Component({
  selector: 'app-client-delete-message',
  templateUrl: './client-delete-message.component.html',
  styleUrls: ['./client-delete-message.component.scss']
})
export class ClientDeleteMessageComponent implements OnInit {

  constructor(private clientServices: ClientService, private eventsServices: ClientEventsService, @Inject(MAT_DIALOG_DATA) public clientToDelete: ClientListItem, private dialogRef: MatDialogRef<ClientDeleteMessageComponent>,) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.clientServices.Delete(this.clientToDelete.id).subscribe({
      next: () => {
        this.eventsServices.ClientDeleted.emit(this.clientToDelete);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Failed to delete client:', err);
      }
    });
  }
}
