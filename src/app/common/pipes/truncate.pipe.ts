import {Pipe, PipeTransform} from '@angular/core';


// Do not forget to register Pipes into Declarations section of App.module
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limitNumber: string, trailText: string): string {
    if (!value) {
      return;
    }

    const limit = parseInt(limitNumber, 10);
    const trail = trailText ? trailText : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
