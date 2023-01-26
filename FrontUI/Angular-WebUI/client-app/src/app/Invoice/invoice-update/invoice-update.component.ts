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

  
  constructor(private invoiceServices: InvoiceService,private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<InvoiceUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: InvoiceListItem,private eventsServices: InvoiceEventsService) { }

  updateInvoiceForm: UntypedFormGroup = new UntypedFormGroup({});

  clients!:ClientListItem[];
  
  ngOnInit(): void {
    this.updateInvoiceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],
      id: [null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      priceHT: [null],
      tva: [null],    
      client:[null], 
    });

    if (this.data) {
      this.updateInvoiceForm.setValue({
        id: this.data.id,
        name: this.data.name,
        priceHT: this.data.HT,
        tva: this.data.TVA,
        client:this.data.Client,   
      });
    }

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });
  }

  UpdateInvoice(form: UntypedFormGroup) {
    this.invoiceServices.Update({
      id: form.value.id,
      name: form.value.name,
      priceHT: form.value.priceHT,
      tva: form.value.tva,
      client:new Client(form.value.client.id,form.value.client.name),   
    }).subscribe(invoiceListItem=>{
      this.dialogRef.close();
      this.eventsServices.InvoiceUpdated.emit(invoiceListItem);
    });
  }
}
