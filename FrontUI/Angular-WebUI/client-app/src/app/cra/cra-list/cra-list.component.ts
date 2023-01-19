
import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CraAddComponent } from '../cra-add/cra-add.component';
import { CraListItem } from '../model/cra-list-item';
import { CraEventsService } from '../services/cra-events.service';
import { CraService } from '../services/cra.service';

@Component({
  selector: 'app-cra-list',
  templateUrl: './cra-list.component.html',
  styleUrls: ['./cra-list.component.scss']
})
export class CraListComponent  implements AfterViewInit {

  
  @ViewChild(MatSort) sort = new MatSort();

  public displayedColumns: string[] = ['id', 'month','mission','days', 'actions'];

  public craList!: MatTableDataSource<CraListItem>;

  public selectedCra!: CraListItem;

  constructor(public addCraDialog: MatDialog, private craServices: CraService, private eventsServices: CraEventsService) {
    eventsServices.CraDeleted.subscribe(item=>this.removeDeletedItem(item));
    eventsServices.CraCreated.subscribe(item=>this.addCreatedItem(item));
  }

  openDialog(): void {
    let addDialogInstance = this.addCraDialog.open(CraAddComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-box'
    });
  }

  ngAfterViewInit(): void {
    this.craServices.getlist().subscribe(craList => {
      this.craList = new MatTableDataSource(craList);
      this.craList.sort = this.sort;
    });
  }

  find(keyword: string) {
    this.craServices.find(keyword).subscribe(craList => {
      this.craList = new MatTableDataSource(craList);
      this.craList.sort = this.sort;
    });
  }

  onCraSelected(cra: CraListItem) {
    this.selectedCra = cra;
  }

  addCreatedItem(insertedCra:CraListItem) {
    this.craList.data.push(insertedCra);
    this.craList.data = [...this.craList.data];
    this.selectedCra = insertedCra;
  }

  removeDeletedItem(craItem:CraListItem) {
    this.selectedCra= null as any;
    this.craList.data = this.craList.data.filter(item => {
      return item !== craItem;
    });
  }

}

