import {EventEmitter, Injectable} from '@angular/core';
import {AuthResource} from "../resources/auth.resource";
import {Route, Router} from "@angular/router";
import {AppEnums} from "../../app.constants";
import {UserService} from "./userService";
import {IUserInfo, ILoginModel} from "../../models/interfaces/IUserInfo";
import {StorageService} from "./storageService";
import {IContentResponseWrapper} from "../../models/interfaces/apiResponse/responseWrapper";

@Injectable()
export class AuthService {
  public onUserLogout = new EventEmitter<any>();

  constructor(private authResource: AuthResource,
              private router: Router,
              private storageService: StorageService,
              private userService: UserService) {
  }

  public toLoginPage() {
    this.onUserLogout.emit();
    this.updateAuthData({});
    this.userService.clearUserInfo();
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.login]);
  }

  public acquireToken(entity: ILoginModel): Promise<any> {

    const tokenRequestData = {
      grant_type: "password",
      username: entity.username,
      password: entity.password
    };

    return this.authResource.acquireToken(tokenRequestData).then((result: any) => {
      this.updateAuthData(result);
      return this.userService.updateUserInfo();
    }, err => {
      this.updateAuthData({});
      console.error(err);
      return Promise.reject(err);
    });
  }

  private updateAuthData(result: any) {
    if (result.access_token) {
      this.storageService.set('accessToken', result.access_token);
      this.storageService.set('tokenType', result.token_type);
      this.storageService.set('expiresIn', result.expires_in);
      this.storageService.set('when', new Date());
    } else {
      this.storageService.remove('accessToken');
      this.storageService.remove('tokenType');
      this.storageService.remove('expiresIn');
      this.storageService.remove('when');
    }
  }
}
