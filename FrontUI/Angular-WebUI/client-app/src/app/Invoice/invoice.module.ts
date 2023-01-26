import { InvoiceMapper } from './mappers/invoice-mapper.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { MaterialModule } from '../core.module';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceDetailsEmptyComponent } from './invoice-details-empty/invoice-details-empty.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceUpdateComponent } from './invoice-update/invoice-update.component';
import { InvoiceDeleteMessageComponent } from './invoice-delete-message/invoice-delete-message.component';



@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceDetailsComponent,
    InvoiceDetailsEmptyComponent,
    InvoiceAddComponent,
    InvoiceUpdateComponent,
    InvoiceDeleteMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [InvoiceMapper]
})
export class InvoiceModule { }
