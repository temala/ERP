import { CraMapper } from './mappers/cra-mapper.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraDetailsEmptyComponent } from './cra-details-empty/cra-details-empty.component';
import { CraDetailsComponent } from './cra-details/cra-details.component';
import { CraListComponent } from './cra-list/cra-list.component';
import { CraAddComponent } from './cra-add/cra-add.component';
import { CraUpdateComponent } from './cra-update/cra-update.component';
import { MaterialModule } from '../core.module';



@NgModule({
  declarations: [
    CraDetailsEmptyComponent,
    CraDetailsComponent,
    CraListComponent,
    CraAddComponent,
    CraUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [CraMapper]
})
export class CraModule { }