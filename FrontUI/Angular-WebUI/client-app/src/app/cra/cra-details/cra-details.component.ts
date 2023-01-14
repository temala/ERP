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
  encapsulation:ViewEncapsulation.None
})
export class CraDetailsComponent implements OnInit {

  @ViewChild(MatCalendar, {static: false}) calendar!: MatCalendar<Date>;
  @Input() selectedCra!: CraListItem;

  public craInfo!: Cra;

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

  updateDays(event: any) {
    if (event.getDate() != null) {
      const date = new Date(event.getFullYear(), event.getMonth(), event.getDate());
      this.craInfo.days.push(date);
      this.calendar.updateTodaysDate();
    }
  }

  isSelected = (event: any) => {
    const inputDateString = `${event.getMonth()}/${event.getDate()}/${event.getFullYear()}`;
    if (this.craInfo != undefined) {
      const result = this.craInfo.days.filter(date=> {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const dateString = `${monthIndex}/${day}/${year}`;
        return dateString.includes(inputDateString);        
    });
     
    return result.length>0 ? "selected" : "";
    }
    return "";
  };

}
