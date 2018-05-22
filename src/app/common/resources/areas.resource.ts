import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";

@Injectable()
export class AreaResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getById': 'zones/getById/{zoneId}',
      'getAllUserZones': 'zones/getAllUserZones',
      'create': 'zones/add',
      'update': 'zones/update',
      'delete': 'zones/delete'
    });
  }

  public getById(zoneId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getById'], { zoneId: zoneId });
    return this.http.get(url);
  }

  public getAll(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getAllUserZones'], {});
    return this.http.get(url);
  }

  public create(entity: any): Promise<any> {
    const url = this.buildUrl(this.urlOptions['create'], {});
    return this.http.post(url, entity);
  }

  public pdate(entity: any): Promise<any> {
    const url = this.buildUrl(this.urlOptions['update'], {});
    return this.http.put(url, entity);
  }

  public delete(id: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['delete'], {});
    return this.http.post(url, {id: id});
  }
}
