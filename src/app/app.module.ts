import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SysConfig} from '../environments/sysConfig';
import {StorageService} from "./common/services/storageService";
import {UserService} from "./common/services/userService";
import {AuthResource} from "./common/resources/auth.resource";
import {AccountResource} from "./common/resources/account.resource";
import {AuthService} from "./common/services/authService";
import {AppRouterService} from "./common/services/appRouterService";
import {PreloaderService} from "./common/services/preloaderService";
import {NotificationService} from "./common/services/notificationService";
import {GlobalState} from "./global.state";
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpServiceWrapper} from "./common/base/httpServiceWrapper";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {PagesModule} from "./components/pages/pages.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from "./common/core.module";

// Application wide providers
const APP_PROVIDERS = [
  GlobalState,

  AccountResource,
  AuthResource,

  StorageService,
  AuthService,
  UserService,
  NotificationService,
  SysConfig,
  HttpServiceWrapper,
  PreloaderService,
  AppRouterService
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    PagesModule,

    NgbModule.forRoot(),

    routing
  ],
  exports: [
    AppComponent
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
