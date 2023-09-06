import { Client } from '../../client/model/client';
import { InvoiceListItem } from '../model/invoice-list-item';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InvoiceEventsService } from '../services/invoice-events.service';
import { InvoiceService } from '../services/invoice.service';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';
import { InvoiceLine } from '../model/InvoiceLine';
import { InvoiceStatus } from '../model/InvoiceStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../model/invoice';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.scss']
})
export class InvoiceUpdateComponent implements OnInit {

  public get totalHT(): number {
    return this.lines.map(l => l.priceHT).reduce((x, y) => x + y, 0);
  }

  public get tva(): number {
    return this.lines.map(l => (l.priceHT * l.tva) / 100).reduce((x, y) => x + y, 0);
  }

  public get total(): number {
    return this.totalHT + this.tva;
  }

  constructor(private router: ActivatedRoute, private invoiceServices: InvoiceService, private clientServices: ClientService, private formBuilder: UntypedFormBuilder,  private eventsServices: InvoiceEventsService) {

  }

  updateInvoiceForm: UntypedFormGroup = new UntypedFormGroup({});

  clients!: ClientListItem[];
  lines:InvoiceLine[] = [];

  invoice!:Invoice;

  ngOnInit(): void {
    this.updateInvoiceForm = this.formBuilder.group({
      invoiceId: [null, [Validators.required, Validators.maxLength(70)]],
      billingDate: [new Date(), [Validators.required]],
      dueDate: [45],
      message: [null],
      client: [null, [Validators.required]],
    });

    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceServices.getInvoice(id).subscribe(invoice => {
        this.invoice=invoice;
        this.updateInvoiceForm.setValue({
          invoiceId: invoice.id,
          billingDate: new Date(invoice.billingDate),
          dueDate: invoice.dueDate,
          client:  invoice.client.id,
          message: invoice.message
        });

        this.lines = invoice.invoiceLines || [];
      });
    }

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;

    });
  }

  AddNewLine() {
    this.lines.push(new InvoiceLine());
  }

  UpdateInvoice(form: UntypedFormGroup) {
    const selectedClientId = form.value.client;
    const selectedClient = this.clients.find(client => client.id === selectedClientId);

    this.invoiceServices.Update({
      id:this.invoice.id,
      identifier: this.invoice.invoiceId,
      billingDate: form.value.billingDate,
      dueDate: form.value.dueDate,
      message: form.value.message,
      client: new Client(Number(selectedClient?.id), selectedClient?.name || ''),
      invoiceLines:this.lines,
    }).subscribe(invoiceListItem => {
      this.eventsServices.InvoiceUpdated.emit(invoiceListItem);
    });
  }
}
