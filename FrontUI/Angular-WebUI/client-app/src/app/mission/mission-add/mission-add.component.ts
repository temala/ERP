import { Client } from './../../client/model/client';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientListItem } from 'src/app/client/model/client-list-item';
import { ClientService } from 'src/app/client/services/client.service';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

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
      priceHT: [null,[Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]],
      tva: [null],
      client:[null]     
    });

    this.clientServices.getlist().subscribe(clients => {
      this.clients = clients;
    });
  }

  AddMission(form: UntypedFormGroup) {
    this.missionServices.Add({
      id: 0,
      name: form.value.name,
      priceHT: form.value.priceHT,
      tva: form.value.tva,
      client:new Client(form.value.client.id,form.value.client.name),      
    }).subscribe({
      next: (result) => {
        this.dialogRef.close();
        this.missionEventsServices.MissionCreated.emit(result);
      },
      error: (err) => {
        console.error('Failed to create mission:', err);
      }
    });
  }

}
