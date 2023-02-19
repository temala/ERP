import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { craPeriod } from '../model/cra';

@Pipe({name: 'periodName'})
export class craPeriodPipe implements PipeTransform {
  transform(value: craPeriod, exponent = 1): string {
    return moment(new Date(value.year,value.month,1)).format("MMMM yyyy");
  }
}