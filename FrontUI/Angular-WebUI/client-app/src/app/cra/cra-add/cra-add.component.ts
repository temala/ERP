import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Mission } from 'src/app/mission/model/mission';
import { MissionListItem } from 'src/app/mission/model/mission-list-item';
import { MissionService } from 'src/app/mission/services/mission.service';
import { CraEventsService } from '../services/cra-events.service';
import { CraService } from '../services/cra.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cra-add',
  templateUrl: './cra-add.component.html',
  styleUrls: ['./cra-add.component.scss']
})
export class CraAddComponent implements OnInit {

  constructor(private craServices: CraService, private missionServices: MissionService, private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<CraAddComponent>, private craEventsServices: CraEventsService) {
  }

  addCraForm: UntypedFormGroup = new UntypedFormGroup({});

  missions!: MissionListItem[];

  months: string[] = [];

  ngOnInit(): void {

    this.PopulateMonths();

    this.addCraForm = this.formBuilder.group({
      month: [this.months[1], [Validators.required]],
      days: [null],
      mission: [null]
    });

    this.missionServices.getlist().subscribe(missions => {
      this.missions = missions;
      
      this.addCraForm = this.formBuilder.group({
        month: [this.months[1], [Validators.required]],
        days: [null],
        mission: [this.missions.length === 1 ? this.missions[0] : null]
      });

    });
  }

  private PopulateMonths() {
    this.months.push(moment().subtract(1, 'month').format('MMMM-YYYY'));
    this.months.push(moment().format('MMMM-YYYY'));
    this.months.push(moment().add(1, 'month').format('MMMM-YYYY'));
  }

  AddCra(form: UntypedFormGroup) {
    this.craServices.Add({
      id: 0,
      month: form.value.month,
      days: [],
      mission: new Mission(form.value.mission.id, form.value.mission.name),
    }).subscribe(result => {
      this.dialogRef.close();
      this.craEventsServices.CraCreated.emit(result);
    });
  }
}

