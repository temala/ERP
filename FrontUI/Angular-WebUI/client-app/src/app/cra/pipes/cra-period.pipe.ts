import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { craPeriod } from '../model/cra';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'periodName'})
export class craPeriodPipe implements PipeTransform {
  transform(value: craPeriod, exponent = 1): string {
    return moment(new Date(value.year,value.month,1)).format("MMMM yyyy");
  }
}