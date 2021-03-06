import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFormatDate'
})
export class MomentFormatDatePipe implements PipeTransform {
  transform(date: any, args?: any): any {
    const d = new Date(date);
    return moment(d).format('DD/MM/YYYY');
  }
}
