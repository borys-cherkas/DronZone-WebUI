import {Injectable, ViewChild} from "@angular/core";
import * as $ from 'jquery';

// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class PreloaderService {
  public showGlobalPreloader() {
    $('#preloader').addClass('operation-loader').show();
  }

  public hideGlobalPreloader() {
     $('#preloader').removeClass('operation-loader').hide();
  }
}
