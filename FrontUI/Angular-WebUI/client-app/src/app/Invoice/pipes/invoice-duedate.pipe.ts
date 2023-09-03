import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { InvoiceStatus } from '../model/InvoiceStatus';

@Pipe({name: 'invoiceDuedate'})
export class invoiceDuedatePipe implements PipeTransform {
  transform(value: number,billingDate:Date): Date {
    return moment(billingDate).add(value,'d').toDate();
  }
}
