import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";

@Injectable()
export class AuthResource extends ResourceBase {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
    });
  }

  acquireToken(data): Promise<any> {
    return this.http.post('connect/token', data, {noIntercept: true, useBaseUrl: true});
  }
}
