import { Client } from './../../client/model/client';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';
import { Mission } from '../model/mission';

@Component({
  selector: 'app-mission-add',
  templateUrl: './mission-add.component.html',
  styleUrls: ['./mission-add.component.scss']
})
export class MissionAddComponent implements OnInit {

 
  constructor(private missionServices: MissionService,private clientServices: ClientService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<MissionAddComponent>,private missionEventsServices:MissionEventsService) {
  }

  addMissionForm: UntypedFormGroup = new UntypedFormGroup({});
  
  clients!:ClientListItem[];

  ngOnInit(): void {
    this.addMissionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],    
      priceHT: [null,[Validators.required, Validators.pattern('/^\d+[\.]\d{2}$/i')]],
      tva: [null],
      client:[null]     
    });

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });
  }

  AddMission(form: UntypedFormGroup) {
    let mission = new Mission(form.value.id, form.value.name);
    mission.priceHT = form.value.priceHT;
    mission.tva = form.value.tva;
    mission.client = new Client(form.value.client.id, form.value.client.name);
    
    this.missionServices.Add(mission).subscribe(result => {
      this.dialogRef.close();
      this.missionEventsServices.MissionCreated.emit(result);
    });
  }

}
