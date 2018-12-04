import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";
import {UpdateAreaNameViewModel} from "../../models/interfaces/area.models";

@Injectable()
export class AreaResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getById': 'zones/getById/{zoneId}',
      'getAllUserZones': 'zones/getAllUserZones',
      'updateZoneName': 'zones/updateZoneName',
      'create': 'zones/add',
      'update': 'zones/update',
      'delete': 'zones/delete'
    });
  }

  public getById(zoneId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getById'], { zoneId: zoneId });
    return this.http.get(url);
  }

  public getAll(searchParams): Promise<any> {
    const url = this.buildUrlClassic(this.urlOptions['getAllUserZones'], searchParams);
    return this.http.get(url);
  }

  public updateAreaName(entity: any): Promise<any> {
    const url = this.buildUrl(this.urlOptions['updateAreaName'], {});
    return this.http.put(url, entity);
  }
}
