import { CraMapper } from './mappers/cra-mapper.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraDetailsEmptyComponent } from './cra-details-empty/cra-details-empty.component';
import { CraDetailsComponent } from './cra-details/cra-details.component';
import { CraListComponent } from './cra-list/cra-list.component';
import { CraAddComponent } from './cra-add/cra-add.component';
import { MaterialModule } from '../core.module';
import { craPeriodPipe } from './pipes/cra-period.pipe';
import { CraDeleteMessageComponent } from './cra-delete-message/cra-delete-message.component';



@NgModule({
  declarations: [
    CraDetailsEmptyComponent,
    CraDetailsComponent,
    CraListComponent,
    CraAddComponent,
    craPeriodPipe,
    CraDeleteMessageComponent,
    ],
    
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [CraMapper]
})
export class CraModule { }
