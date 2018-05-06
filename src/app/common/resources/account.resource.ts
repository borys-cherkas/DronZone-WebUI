import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";

@Injectable()
export class AccountResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getUserInfo': 'account/GetUserInfo',
      'register': 'account/register',
    });
  }

  getUserInfo(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getUserInfo'], {});
    return this.http.get(url);
  }

  register(entity: any): Promise<any> {
    const url = this.buildUrl(this.urlOptions['register'], {});
    return this.http.post(url, entity);
  }
}
