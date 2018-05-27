import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AppEnums} from "../../../../app.constants";
import {PreloaderService} from "../../../../common/services/preloaderService";
import {AuthService} from "../../../../common/services/authService";
import {IContentResponseWrapper} from "../../../../models/interfaces/apiResponse/responseWrapper";
import {NotificationService} from "../../../../common/services/notificationService";
import {ILoginModel} from "../../../../models/interfaces/IUserInfo";

@Component({
  selector: 'app-login-page',
  styleUrls: ['./login.scss'],
  templateUrl: './login.html'
})
export class LoginComponent {
  @ViewChild('loginForm') public loginForm: NgForm;

  public $submitted = false;

  public routes = AppEnums.routes;

  public entity = {
    rememberMe: false,
    username: '',
    password: ''
  } as ILoginModel;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private notificationService: NotificationService,
              private authService: AuthService) {
  }

  public signIn(): Promise<any> {
    this.$submitted = true;

    if (!this.loginForm.valid) {
      return;
    }

    this.preloaderService.showGlobalPreloader();
    return this.authService.acquireToken(this.entity).then((result: any) => {
      this.preloaderService.hideGlobalPreloader();

        this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.home]);

    }, (response) => {
      this.preloaderService.hideGlobalPreloader();

      let message = '';
      if (response.status === 400) {
        message = AppEnums.notifications.errors.wrongUsernameOrPassword;
      } else {
        message = AppEnums.notifications.errors.unknownError;
      }

      this.notificationService.showError(message);
      console.error(response);
    }).catch(() => {
      this.preloaderService.hideGlobalPreloader();
    });
  }

  public signOut() {
    //TODO: Send request to log out
    this.authService.toLoginPage();
  }

  public goToRegister() {
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.register]);
  }

}
