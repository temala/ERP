import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceListItem } from '../model/invoice-list-item';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-delete-message',
  templateUrl: './invoice-delete-message.component.html',
  styleUrls: ['./invoice-delete-message.component.scss']
})
export class InvoiceDeleteMessageComponent implements OnInit {

  constructor(private invoiceServices: InvoiceService, private eventsServices: InvoiceEventsService, @Inject(MAT_DIALOG_DATA) public invoiceToDelete: InvoiceListItem, private dialogRef: MatDialogRef<InvoiceDeleteMessageComponent>,) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.invoiceServices.Delete(this.invoiceToDelete.id).subscribe(_ => {
        this.eventsServices.InvoiceDeleted.emit(this.invoiceToDelete);
        this.dialogRef.close();
      }
    );
  }

}
