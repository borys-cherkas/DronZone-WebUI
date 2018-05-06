import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AppEnums} from "../../../../app.constants";
import {PreloaderService} from "../../../../common/services/preloaderService";
import {AuthService} from "../../../../common/services/authService";
import {IContentResponseWrapper, IResponseWrapper} from "../../../../models/interfaces/apiResponse/responseWrapper";
import {IRegistrationModel} from "../../../../models/interfaces/IUserInfo";
import {UserService} from "../../../../common/services/userService";
import {NotificationService} from "../../../../common/services/notificationService";

@Component({
  selector: 'app-registration-page',
  styleUrls: ['./registration.scss'],
  templateUrl: './registration.html',
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent {
  @ViewChild('registrationForm') public registrationForm: NgForm;

  public $submitted = false;

  public routes = AppEnums.routes;

  public entity = {} as IRegistrationModel;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private userService: UserService) {
  }

  public register(): Promise<any> {
    this.$submitted = true;

    if (!this.registrationForm.valid) {
      return;
    }

    this.preloaderService.showGlobalPreloader();
    return this.userService.register(this.entity)
      .then((response: any) => {
          this.preloaderService.hideGlobalPreloader();
          this.notificationService.showSuccess(
            "Registration has been finished successfully. Login using your username and password.");
          this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.login]);
      }, err => {
        this.notificationService.showError(err.statusText);
        this.preloaderService.hideGlobalPreloader();
      });
  }
}
