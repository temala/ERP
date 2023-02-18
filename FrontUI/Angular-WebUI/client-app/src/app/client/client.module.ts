import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientMapper } from './mappers/client-mapper.service';
import { MaterialModule } from '../core.module';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientInvoiceListComponent } from './client-invoice-list/client-invoice-list.component';
import { ClientInvoiceStatusPipe } from './pipe/client-invoice-status.pipe';
import { ClientInvoiceStatusColorPipe } from './pipe/client-invoice-status-color.pipe';
import { ClientDeleteMessageComponent } from './client-delete-message/client-delete-message.component';
import { ClientDetailsEmptyComponent } from './client-details-empty/client-details-empty.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClientListComponent,
    ClientAddComponent,
    ClientUpdateComponent,
    ClientDetailsComponent,
    ClientInvoiceListComponent,
    ClientInvoiceStatusPipe,
    ClientInvoiceStatusColorPipe,
    ClientDeleteMessageComponent,
    ClientDetailsEmptyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers: [ClientMapper]
})
export class ClientModule { }
