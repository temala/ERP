import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../services/client.service';
import {MatDialogRef} from "@angular/material/dialog";
import {ClientListItem} from "../model/client-list-item";
import {ClientMapper} from "../mappers/client-mapper.service";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  @Output()
  ClientCreated: EventEmitter<ClientListItem> = new EventEmitter<ClientListItem>();

  constructor(private clientServices: ClientService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ClientAddComponent>) {
  }

  addClientForm: FormGroup = new FormGroup({});
  showMore: boolean = false;

  ngOnInit(): void {
    this.clientServices.getNextClientId().subscribe(nextClientId => {
      this.addClientForm.setValue({
        id: nextClientId,
        name: "",
        contactName: "",
        email: "",
        telephone: "",
        companyName: "",
        siret: "",
        tva: "",
        title: "",
        address: "",
        postalCode: "",
        town: "",
        country: "",
      });
    });

    this.addClientForm = this.formBuilder.group({
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
  }

  AddClient(form: FormGroup) {
    this.clientServices.Add({
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
    }).subscribe(result => {
      this.dialogRef.close();
      this.ClientCreated.emit(result);
    });
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
