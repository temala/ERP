import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../services/client.service';
import {MatDialogRef} from "@angular/material/dialog";
import {ClientEventsService} from "../services/client-events.service";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  constructor(private clientServices: ClientService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ClientAddComponent>,private clientEventsServices:ClientEventsService) {
  }

  addClientForm: FormGroup = new FormGroup({});
  showMore: boolean = false;

  ngOnInit(): void {

    this.addClientForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],
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
      id: 0,
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
      this.clientEventsServices.ClientCreated.emit(result);
    });
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
