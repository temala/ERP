import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';
import {ClientListItem} from "../model/client-list-item";
import {ClientEventsService} from "../services/client-events.service";

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {

  constructor(private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<ClientUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: Client,private eventsServices: ClientEventsService) { }

  updateClientForm: UntypedFormGroup = new UntypedFormGroup({});

  ngOnInit(): void {
    this.updateClientForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],
      id: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      contactName: [null],
      email: [null],
      telephone: [null],
      companyName: [null],
      siret: [null],
      tva: [null],
      title: [null],
      address: [null],
      postalCode: [null],
      town: [null],
      country: [null],
    });

    if (this.data) {
      this.updateClientForm.setValue({
        id: this.data.id,
        name: this.data.name,
        contactName: this.data.contactName,
        email: this.data.email,
        telephone: this.data.telephone,
        companyName: this.data.companyName,
        siret: this.data.siret,
        tva: this.data.tva,
        title: this.data.title,
        address: this.data.address,
        postalCode: this.data.postalCode,
        town: this.data.town,
        country: this.data.country,
      });
    }
  }

  UpdateClient(form: UntypedFormGroup) {
    this.clientServices.Update({
      id: form.value.id,
      name: form.value.name,
      contactName: form.value.contactName,
      email: form.value.email,
      telephone: form.value.telephone,
      companyName: form.value.companyName,
      siret: form.value.siret,
      tva: form.value.tva,
      title: form.value.title,
      address: form.value.address,
      postalCode: form.value.postalCode,
      town: form.value.town,
      country: form.value.country,
    }).subscribe(clientListItem=>{
      this.dialogRef.close();
      this.eventsServices.ClientUpdated.emit(clientListItem);
    });
  }
}
