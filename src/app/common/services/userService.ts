import {Injectable} from '@angular/core';
import {EventEmitter} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {IUserInfo, IRegistrationModel} from "../../models/interfaces/IUserInfo";
import {StorageService} from "./storageService";
import {AccountResource} from "../resources/account.resource";
import {AppEnums} from "../../app.constants";
import {IContentResponseWrapper, IResponseWrapper} from "../../models/interfaces/apiResponse/responseWrapper";

@Injectable()
export class UserService {
  public onUserChanged = new EventEmitter<any>();
  public userInfo: IUserInfo;

  constructor(private accountResource: AccountResource,
              private storageService: StorageService) {
    this.userInfo = this.storageService.get('userInfo');
  }

  public isAuthenticated(): boolean {
    return this.userInfo && this.storageService.get('userInfo');
  }

  public getUserInfo(): IUserInfo {
    return this.userInfo;
  }

  public get isInAdminRole() {
    if(!this.isAuthenticated) return false;

    const roles = this.userInfo.roles.split(',');
    const isAdmin = roles.indexOf(AppEnums.roles.admin) !== -1;
    return isAdmin;
  }

  public updateUserInfo(): Promise<any> {
    return this.accountResource.getUserInfo().then((result: IUserInfo) => {
        console.log(result);
        this.updateUserInfoStorage(result);

        this.userInfo = result;
        this.onUserChanged.emit(this.userInfo);

        return result;
    });
  }

  public register(entity: IRegistrationModel): Promise<any> {
    return this.accountResource.register(entity);
  }

  private updateUserInfoStorage(user: IUserInfo) {
    if (user) {
      this.storageService.set('userInfo', user);
    } else {
      this.clearUserInfo();
    }
  }

  public clearUserInfo() {
    this.storageService.remove('userInfo');
    this.userInfo = null;
    this.onUserChanged.emit(this.userInfo);
  }
}
