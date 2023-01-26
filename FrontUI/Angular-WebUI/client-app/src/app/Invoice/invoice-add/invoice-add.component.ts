import { Client } from '../../client/model/client';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {

 
  constructor(private invoiceServices: InvoiceService,private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<InvoiceAddComponent>,private invoiceEventsServices:InvoiceEventsService) {
  }

  addInvoiceForm: UntypedFormGroup = new UntypedFormGroup({});
  
  clients!:ClientListItem[];

  ngOnInit(): void {
    this.addInvoiceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],    
      priceHT: [null,[Validators.required, Validators.pattern('/^\d+[\.]\d{2}$/i')]],
      tva: [null],
      client:[null]     
    });

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });
  }

  AddInvoice(form: UntypedFormGroup) {
    this.invoiceServices.Add({
      id: 0,
      name: form.value.name,
      priceHT: form.value.priceHT,
      tva: form.value.tva,
      client:new Client(form.value.client.id,form.value.client.name),      
    }).subscribe(result => {
      this.dialogRef.close();
      this.invoiceEventsServices.InvoiceCreated.emit(result);
    });
  }

}
