import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission-add',
  templateUrl: './mission-add.component.html',
  styleUrls: ['./mission-add.component.scss']
})
export class MissionAddComponent implements OnInit {

 
  constructor(private missionServices: MissionService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<MissionAddComponent>,private missionEventsServices:MissionEventsService) {
  }

  addMissionForm: UntypedFormGroup = new UntypedFormGroup({});
  
  ngOnInit(): void {
    this.addMissionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],    
      priceHT: [null,[Validators.required, Validators.pattern('/^\d+[\.]\d{2}$/i')]],
      tva: [null]     
    });
  }

  AddMission(form: UntypedFormGroup) {
    this.missionServices.Add({
      id: 0,
      name: form.value.name,
      priceHT: form.value.priceHT,
      tva: form.value.tva,      
    }).subscribe(result => {
      this.dialogRef.close();
      this.missionEventsServices.MissionCreated.emit(result);
    });
  }

}
