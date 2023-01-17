import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { CraUpdateComponent } from '../cra-update/cra-update.component';
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
  public selectedPeriod: Date=new Date(1996,0,1);

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
      this.craServices.getCra(this.selectedCra.id.toString()).subscribe(craResult => {
        this.craInfo = craResult;
        this.selectedPeriod.setMonth(craResult.month-1);
        this.selectedPeriod.setUTCFullYear(craResult.year);
        this.calendar.updateTodaysDate();
      });
  }

  onEdit() {
    this.updateCraDialog.open(CraUpdateComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box',
      data: this.craInfo
    });
  }

  onDelete() {
    // this.deleteCraDialog.open(CraDeleteMessageComponent, {
    //   width: '600px',
    //   maxHeight: '90vh',
    //   panelClass: 'custom-dialog-box',
    //   data: this.selectedCra
    // });
  }

  updateItem(cra: Cra) {

  }

  private dateExists(event: any) {
    if (this.craInfo != undefined) {
      return this.craInfo.days.findIndex(date => toStringDate(event) == toStringDate(date));
    }
    return -1;

    function toStringDate(item: Date) {
      return `${item.getDate()}/${item.getMonth() + 1}/${item.getFullYear()}`;
    }
  }

  private isWeekEnd(event: any) {
    return (moment(event).day() % 6 == 0)
  }

  updateDays(event: any) {
    if (event.getDate() != null) {
      const index = this.dateExists(event);
      if (index == -1) {
        this.craInfo.days.push(event);
      }
      else {
        this.craInfo.days.splice(index, 1);
      }

      this.calendar.updateTodaysDate();
    }
  }



  isSelected = (event: any) => {
    return this.dateExists(event)>=0 ? "selected" : (this.isWeekEnd(event) ? "weekend" : "");
  };

}
