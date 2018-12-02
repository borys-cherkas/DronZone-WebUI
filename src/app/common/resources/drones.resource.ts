import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";

@Injectable()
export class DroneResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getById': 'userDrones/getById/{droneId}',
      'getUserDrones': 'userDrones/getUserDrones',
      'registerByCode': 'userDrones/registerByCode',
      'delete': 'userDrones/deleteFromPerson',

      'getDetachedDrones': 'adminDrones/getDetachedDrones',
      'generateDronePack': 'adminDrones/generateDrones',
    });
  }

  public getById(droneId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getById'], { droneId: droneId });
    return this.http.get(url);
  }

  public getUserDrones(searchParams): Promise<any> {
    const url = this.buildUrlClassic(this.urlOptions['getUserDrones'], searchParams);
    return this.http.get(url);
  }

  public generateDronePack(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['generateDronePack'], {});
    return this.http.post(url, {});
  }

  public getDetachedDrones(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getDetachedDrones'], {});
    return this.http.get(url);
  }

  public registerByCode(code: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['registerByCode'], {});
    return this.http.post(url, {code: code});
  }

  public delete(droneId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['delete'], {});
    return this.http.post(url, {droneId: droneId});
  }
}
