import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CraUpdateComponent } from '../cra-update/cra-update.component';
import { Cra } from '../model/cra';
import { CraListItem } from '../model/cra-list-item';
import { CraEventsService } from '../services/cra-events.service';
import { CraService } from '../services/cra.service';

@Component({
  selector: 'app-cra-details',
  templateUrl: './cra-details.component.html',
  styleUrls: ['./cra-details.component.scss']
})
export class CraDetailsComponent implements OnInit {

  @Input() selectedCra!: CraListItem;

  public craInfo!: CraListItem;

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
        this.craInfo = new CraListItem(craResult.id,craResult.month);
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

  updateItem(cra:Cra) {
    this.craInfo = new CraListItem(cra.id,cra.month);
    this.selectedCra.month = cra.month;
    this.selectedCra.days = cra.days.length; 
    this.selectedCra.mission = cra.mission;
  }

}
