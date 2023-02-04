import { Client } from '../../client/model/client';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceLine } from "../model/InvoiceLine";

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {

  public get totalHT() : number {
    return this.lines.map(l=>l.priceHT).reduce((x,y)=>x+y);
  }

  public get tva() : number {
    return this.lines.map(l=>(l.priceHT*l.tva)/100).reduce((x,y)=>x+y);
  }   

  public get total() : number {
    return this.totalHT+this.tva;
  }  

  constructor(private invoiceServices: InvoiceService,private clientServices: ClientService, private formBuilder: UntypedFormBuilder,private invoiceEventsServices:InvoiceEventsService) {
  }

  addInvoiceForm: UntypedFormGroup = new UntypedFormGroup({});
  
  clients!:ClientListItem[];
  lines:InvoiceLine[] = [];

  ngOnInit(): void {
    this.addInvoiceForm = this.formBuilder.group({
      invoiceId: [null, [Validators.required, Validators.maxLength(70)]],    
      billingDate: [new Date(),[Validators.required]],
      dueDate: [45],
      message: [null],
      client:[null,[Validators.required]],     
    });

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });

    this.AddNewLine();
  }

  AddInvoice(form: UntypedFormGroup) {
    this.invoiceServices.Add({
      invoiceId: form.value.invoiceId,
      billingDate: form.value.billingDate,
      dueDate: form.value.dueDate,
      message: form.value.message,
      client:new Client(form.value.client.id,form.value.client.name),      
    }).subscribe(result => {
      this.invoiceEventsServices.InvoiceCreated.emit(result);
    });
  }

  AddNewLine()
  {
    this.lines.push(new InvoiceLine());
  }

}
