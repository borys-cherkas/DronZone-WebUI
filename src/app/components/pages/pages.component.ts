import {Component, ViewEncapsulation} from '@angular/core';
import {LanguageService} from "../../common/services/languageService";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.scss'],
  templateUrl: './pages.html'
})
export class PagesComponent {

  constructor(private languageService: LanguageService,
              private translateService: TranslateService) {

    LanguageService.onLanguageChanged.subscribe(_ => {
      this.translateService.use(languageService.currentLanguage);
    });

  }
}
