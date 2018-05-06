import {Pipe, PipeTransform} from '@angular/core';

// Do not forget to register Pipes into Declarations section of App.module
@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phone: string, countryCode: string, extension: string): string {
    const ph1 = phone.substr(0, 3);
    const ph2 = phone.substr(3, 3);
    const ph3 = phone.substr(6, 4);

    let primaryContactStr = '(' + ph1 + ')';

    if (countryCode) {
      primaryContactStr = '[' + countryCode + '] ' + primaryContactStr;
    }

    if (ph2) {
      primaryContactStr += ' ' + ph2;
    }

    if (ph3) {
      primaryContactStr += '-' + ph3;
    }

    if (extension) {
      primaryContactStr += ' ext: [' + extension + ']';
    }

    return primaryContactStr;
  }
}
