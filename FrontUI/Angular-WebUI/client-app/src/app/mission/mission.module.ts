import { MissionMapper } from './mappers/mission-mapper.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MaterialModule } from '../core.module';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionDetailsEmptyComponent } from './mission-details-empty/mission-details-empty.component';
import { MissionAddComponent } from './mission-add/mission-add.component';
import { MissionUpdateComponent } from './mission-update/mission-update.component';
import { MissionDeleteMessageComponent } from './mission-delete-message/mission-delete-message.component';



@NgModule({
  declarations: [
    MissionListComponent,
    MissionDetailsComponent,
    MissionDetailsEmptyComponent,
    MissionAddComponent,
    MissionUpdateComponent,
    MissionDeleteMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [MissionMapper]
})
export class MissionModule { }
