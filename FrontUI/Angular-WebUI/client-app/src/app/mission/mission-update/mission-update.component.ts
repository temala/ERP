import { MissionListItem } from './../model/mission-list-item';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mission } from '../model/mission';
import { MissionEventsService } from '../services/mission-events.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission-update',
  templateUrl: './mission-update.component.html',
  styleUrls: ['./mission-update.component.scss']
})
export class MissionUpdateComponent implements OnInit {

  
  constructor(private missionServices: MissionService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<MissionUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: MissionListItem,private eventsServices: MissionEventsService) { }

  updateMissionForm: UntypedFormGroup = new UntypedFormGroup({});

  ngOnInit(): void {
    this.updateMissionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(70)]],
      id: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      priceHT: [null],
      tva: [null],     
    });

    if (this.data) {
      this.updateMissionForm.setValue({
        id: this.data.id,
        name: this.data.name,
        priceHT: this.data.HT,
        tva: this.data.TVA,
      });
    }
  }

  UpdateMission(form: UntypedFormGroup) {
    this.missionServices.Update({
      id: form.value.id,
      name: form.value.name,
      priceHT: form.value.priceHT,
      tva: form.value.tva,
    }).subscribe(missionListItem=>{
      this.dialogRef.close();
      this.eventsServices.MissionUpdated.emit(missionListItem);
    });
  }
}
