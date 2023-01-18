import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Mission } from 'src/app/mission/model/mission';
import { MissionListItem } from 'src/app/mission/model/mission-list-item';
import { MissionService } from 'src/app/mission/services/mission.service';
import { CraEventsService } from '../services/cra-events.service';
import { CraService } from '../services/cra.service';
import * as moment from 'moment';
import { craPeriod } from '../model/cra';

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

  periods: craPeriod[] = [];

  ngOnInit(): void {

    this.PopulateMonths();

    this.addCraForm = this.formBuilder.group({
      period: [this.periods[1], [Validators.required]],
      days: [null],
      mission: [null]
    });

    this.missionServices.getlist().subscribe(missions => {
      this.missions = missions;

      this.addCraForm = this.formBuilder.group({
        period: [this.periods[1], [Validators.required]],       
        days: [null],
        mission: [this.missions.length === 1 ? this.missions[0] : null]
      });

    });
  }

  private PopulateMonths() {
    this.periods.push({year: moment().subtract(1, 'month').year(),month:moment().subtract(1, 'month').month()});
    this.periods.push({year: moment().year(),month:moment().month()});
    this.periods.push({year: moment().add(1, 'month').year(),month:moment().add(1, 'month').month()});
  }

  AddCra(form: UntypedFormGroup) {
    this.craServices.Add({
      id: 0,
      month: form.value.period.month+1,
      year: form.value.period.year,
      days: [],
      missionId: form.value.mission.id,
    }).subscribe(result => {
      this.dialogRef.close();
      this.craEventsServices.CraCreated.emit(result);
    });
  }
}

