import {NgModule} from "@angular/core";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {MenuComponent} from "./components/menu/menu.component";
import {MenuItemComponent} from "./components/menu/components/menuItem/menuItem.component";
import {PageTopBarComponent} from "./components/pageTopBar/pageTopBar.component";
import {ScrollPositionDirective} from "./directives/scrollPosition/scrollPosition.directive";
import {ProfileTopBarComponent} from "./components/profileTopBar/profileTopBar.component";
import {ActionNotifierComponent} from "./components/actionNotifier/actionNotifier";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {MenuService} from "./components/menu/menu.service";
import {AppRouterService} from "./services/appRouterService";
import {RouterContainerComponent} from "./components/routerContainer/routerContainer.component";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {PhoneNumberPipe} from "./pipes/phoneNumber.pipe";
import {PreloaderService} from "./services/preloaderService";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MomentFormatDatePipe} from "./pipes/momentDateFormat.pipe";
import {MomentFormatDateTimePipe} from "./pipes/momentDateTimeFormat.pipe";
import {ConfirmationModalComponent} from "./components/confirmation-modal/confirmation-modal.component";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./services/languageService";

@NgModule({
  declarations: [
    SidebarComponent,
    MenuComponent,
    MenuItemComponent,
    PageTopBarComponent,
    ProfileTopBarComponent,
    ActionNotifierComponent,

    ConfirmationModalComponent,

    ScrollPositionDirective,

    RouterContainerComponent,

    TruncatePipe,
    PhoneNumberPipe,
    MomentFormatDatePipe,
    MomentFormatDateTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,

    NgbModule,

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    MenuService,
    AppRouterService,
    PreloaderService,
    LanguageService
  ],
  exports: [
    SidebarComponent,
    MenuComponent,
    MenuItemComponent,
    PageTopBarComponent,
    ProfileTopBarComponent,
    ActionNotifierComponent,
    ConfirmationModalComponent,
    ScrollPositionDirective,

    RouterContainerComponent,

    TruncatePipe,
    PhoneNumberPipe,
    MomentFormatDatePipe,
    MomentFormatDateTimePipe
  ]
})
export class CoreModule {
}


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

