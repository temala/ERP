import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from './../model/invoice';
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

  public get totalHT(): number {
    return this.lines.map(l => l.priceHT).reduce((x, y) => x + y);
  }

  public get tva(): number {
    return this.lines.map(l => (l.priceHT * l.tva) / 100).reduce((x, y) => x + y);
  }

  public get total(): number {
    return this.totalHT + this.tva;
  }

  constructor(private invoiceServices: InvoiceService, private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private invoiceEventsServices: InvoiceEventsService,private router:Router,private route: ActivatedRoute) {
  }

  addInvoiceForm: UntypedFormGroup = new UntypedFormGroup({});

  clients!: ClientListItem[];
  lines: InvoiceLine[] = [];

  ngOnInit(): void {
    this.addInvoiceForm = this.formBuilder.group({
      invoiceId: [null, [Validators.required, Validators.maxLength(70)]],
      billingDate: [new Date(), [Validators.required]],
      dueDate: [45],
      message: [null],
      client: [null, [Validators.required]],
    });

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });

    this.AddNewLine();
  }

  AddInvoice(form: UntypedFormGroup) {
    let invoice = new Invoice(form.value.id);
    invoice.invoiceId = form.value.invoiceId;
    invoice.billingDate = form.value.billingDate;
    invoice.dueDate = form.value.dueDate;
    invoice.message = form.value.message;
    invoice.client = new Client(form.value.client.id, form.value.client.name);
    invoice.invoiceLines = this.lines;


    this.invoiceServices.Add(invoice).subscribe(result => {
      this.invoiceEventsServices.InvoiceCreated.emit(result);

      this.router.navigate(['invoice/']);
    });
  }

  AddNewLine() {
    this.lines.push(new InvoiceLine());
  }

}
