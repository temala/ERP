import { Client } from '../../client/model/client';
import { InvoiceListItem } from '../model/invoice-list-item';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../model/invoice';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.scss']
})
export class InvoiceUpdateComponent implements OnInit {


  constructor(private invoiceServices: InvoiceService, private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<InvoiceUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: InvoiceListItem, private eventsServices: InvoiceEventsService) { }

  updateInvoiceForm: UntypedFormGroup = new UntypedFormGroup({});

  clients!: ClientListItem[];

  ngOnInit(): void {
    this.updateInvoiceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],
      id: [null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      priceHT: [null],
      tva: [null],
      client: [null],
    });

    if (this.data) {
      this.updateInvoiceForm.setValue({
        invoiceId: [null, [Validators.required, Validators.maxLength(70)]],
        billingDate: [null],
        dueDate: [null],
        client: [null],
      });
    }

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });
  }

  UpdateInvoice(form: UntypedFormGroup) {
    this.invoiceServices.Update({
      invoiceId: form.value.invoiceId,
      billingDate: form.value.billingDate,
      dueDate: form.value.dueDate,
      message: form.value.message,
      client: new Client(form.value.client.id, form.value.client.name),
    }).subscribe(invoiceListItem => {
      this.dialogRef.close();
      this.eventsServices.InvoiceUpdated.emit(invoiceListItem);
    });
  }
}
