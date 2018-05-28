import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/userService";
import {AuthService} from "../../services/authService";
import {IUserInfo} from "../../../models/interfaces/IUserInfo";
import {AppEnums} from "../../../app.constants";
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "../../services/storageService";
import {LanguageService} from "../../services/languageService";

// Do not forget to register Components in Declarations sections of App.module
@Component({
  selector: 'app-profile-top-bar',
  styleUrls: ['./profileTopBar.scss'],
  templateUrl: './profileTopBar.html',
  encapsulation: ViewEncapsulation.None
})
export class ProfileTopBarComponent implements OnDestroy, OnInit {
  constructor(private userService: UserService,
              private languageService: LanguageService,
              private translateService: TranslateService,
              private storageService: StorageService,
              private authService: AuthService) {
    LanguageService.onLanguageChanged.subscribe(_ => {
      this.translateService.use(languageService.currentLanguage);
    });
  }

  public switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

  public get isAuthenticated(): boolean {
    return !!this.user && !!this.user.identityId;
  }

  public get user(): IUserInfo {
    return this.userService.getUserInfo();
  }

  public get routes(): any {
    return AppEnums.routes;
  }

  public logout() {
    this.authService.toLoginPage();
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
