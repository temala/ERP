import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { InvoiceStatus } from '../model/InvoiceStatus';

@Pipe({name: 'invoiceStatus'})
export class invoiceStatusPipe implements PipeTransform {
  transform(value: InvoiceStatus): string {
    return InvoiceStatus[value];
  }
}