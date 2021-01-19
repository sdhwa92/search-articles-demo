import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';


@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string, format = 'dddd, MMM Do YYYY, h:mm:ss a'): string {
    let datetime = moment(value).format(format);
    return datetime;
  }

}
