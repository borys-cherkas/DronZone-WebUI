import {EventEmitter, Injectable, ViewChild} from "@angular/core";
import * as $ from 'jquery';
import {StorageService} from "./storageService";
import {AppEnums} from "../../app.constants";
import {TranslateService} from "@ngx-translate/core";

// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class LanguageService {
  public static onLanguageChanged = new EventEmitter<any>();

  constructor(private storageService: StorageService,
              private translate: TranslateService) {
    const lang = this.storageService.get(AppEnums.storageKeys.language);
    translate.setDefaultLang("en");
    translate.use(lang);
  }

  public setLanguage(language: string) {
    this.saveToStorage(language);
    this.translate.use(language);
    LanguageService.onLanguageChanged.emit();
  }

  public get currentLanguage() {
    return this.getFromStorage();
  }

  private getFromStorage() {
    return this.storageService.get(AppEnums.storageKeys.language);
  }

  private saveToStorage(lang: string) {
    this.storageService.set(AppEnums.storageKeys.language, lang);
  }
}
