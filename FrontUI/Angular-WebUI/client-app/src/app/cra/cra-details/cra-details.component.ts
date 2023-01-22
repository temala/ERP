import { craDay } from './../model/cra';
import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { CraDeleteMessageComponent } from '../cra-delete-message/cra-delete-message.component';
import { Cra } from '../model/cra';
import { CraListItem } from '../model/cra-list-item';
import { CraEventsService } from '../services/cra-events.service';
import { CraService } from '../services/cra.service';

@Component({
  selector: 'app-cra-details',
  templateUrl: './cra-details.component.html',
  styleUrls: ['./cra-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CraDetailsComponent implements OnInit {

  @ViewChild(MatCalendar, { static: false }) calendar!: MatCalendar<Date>;
  @Input() selectedCra!: CraListItem;

  public craInfo!: Cra;
  public selectedPeriod: Date = new Date(1996, 0, 1);

  constructor(public updateCraDialog: MatDialog, public deleteCraDialog: MatDialog, private craServices: CraService, private eventsServices: CraEventsService) {
    eventsServices.CraUpdated.subscribe(item => this.updateItem(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCraInfo();
  }

  ngOnInit(): void {
    this.getCraInfo();
  }

  getCraInfo() {
    if (this.selectedCra)
      this.craServices.getCra(this.selectedCra.id).subscribe(craResult => {
        this.craInfo = craResult;
        this.selectedPeriod.setMonth(craResult.month - 1);
        this.selectedPeriod.setFullYear(craResult.year);
        this.calendar.updateTodaysDate();
      });
  }

  onEdit() {
    this.craServices.Update(this.craInfo).subscribe(craListItem => {
      this.eventsServices.CraUpdated.emit(craListItem);
    });
  }

  onPrint() {
    this.craServices.Print(this.craInfo.id).subscribe(data => {
      var blob = new Blob([data as BlobPart], { type: 'application/pdf' });

      var downloadURL = window.URL.createObjectURL(data as Blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
    });
  }

  onDelete() {
    this.deleteCraDialog.open(CraDeleteMessageComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.selectedCra
    });
  }

  updateItem(cra: Cra) {

  }

  private dateExists(event: Date) {
    if (this.craInfo != undefined) {
      return this.craInfo.days.findIndex(date => date.getValue() == new craDay(event).getValue());
    }
    return -1;
  }

  private isWeekEnd(event: any) {
    return (moment(event).day() % 6 == 0)
  }

  updateDays(event: any) {
    if (event.getDate() != null) {
      const index = this.dateExists(event);
      if (index == -1) {
        this.craInfo.days.push(new craDay(event));
      }
      else {
        const selectedDay = this.craInfo.days[index];
        if (!selectedDay.isHalfDay) {
          selectedDay.isHalfDay = true;
        }
        else {
          this.craInfo.days.splice(index, 1);
        }
      }

      this.calendar.updateTodaysDate();
    }
  }



  isSelected = (event: any) => {
    const index = this.dateExists(event);
    if (index >= 0) {
      const selectedDay = this.craInfo.days[index];

      if (selectedDay.isHalfDay) {
        return "morning-selected";
      }
      return "selected"
    }

    return (this.isWeekEnd(event) ? "weekend" : "");
  };

}
