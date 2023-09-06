import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: Date): string {
    const now = moment();
    const dateValue = moment(value);
    const daysAgo = now.diff(dateValue, 'days');
    return `${daysAgo}`;
  }
}
