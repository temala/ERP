import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { craDay } from '../model/cra';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'craDaysCount' })
export class craDaysCount implements PipeTransform {
  transform(value: craDay[], exponent = 1): number {
    return value.map(d => d.isHalfDay ? 0.5 : 1).reduce((sum, current) => sum + current, 0);
  }
}