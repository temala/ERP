import { Client } from './../../client/model/client';
import { MissionListItem } from './../model/mission-list-item';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';
import { Mission } from '../model/mission';

@Component({
  selector: 'app-mission-update',
  templateUrl: './mission-update.component.html',
  styleUrls: ['./mission-update.component.scss']
})
export class MissionUpdateComponent implements OnInit {


  constructor(private missionServices: MissionService, private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<MissionUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: MissionListItem, private eventsServices: MissionEventsService) { }

  updateMissionForm: UntypedFormGroup = new UntypedFormGroup({});

  clients!: ClientListItem[];

  ngOnInit(): void {
    this.updateMissionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],
      id: [null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      priceHT: [null],
      tva: [null],
      client: [null],
    });

    if (this.data) {
      this.updateMissionForm.setValue({
        id: this.data.id,
        name: this.data.name,
        priceHT: this.data.HT,
        tva: this.data.TVA,
        client: this.data.Client,
      });
    }

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });
  }

  UpdateMission(form: UntypedFormGroup) {
    let mission = new Mission(form.value.id, form.value.name);
    mission.priceHT = form.value.priceHT;
    mission.tva = form.value.tva;
    mission.client = new Client(form.value.client.id, form.value.client.name);

      this.missionServices.Update(mission).subscribe(missionListItem => {
        this.dialogRef.close();
        this.eventsServices.MissionUpdated.emit(missionListItem);
      });
  }
}
