import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";
import {AddAreaRequestViewModel} from "../../models/viewModels/addAreaRequestViewModel";
import {EditAreaRequestViewModel} from "../../models/viewModels/editAreaRequestViewModel";

@Injectable()
export class AreaRequestsResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getById': 'zoneModifications/GetRequestById/{requestId}',
      'getUserRequests': 'zoneModifications/getUserRequests',
      'createAddingRequest': 'zoneModifications/createAddingZoneRequest',
      'createEditingRequest': 'zoneModifications/createModifyingZoneRequest',
      'cancelRequest': 'zoneModifications/cancelRequest'
    });
  }

  public getById(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getById'], { requestId: requestId });
    return this.http.get(url);
  }

  public getUserRequests(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getUserRequests'], {});
    return this.http.get(url);
  }

  public createAddingRequest(entity: AddAreaRequestViewModel): Promise<any> {
    const url = this.buildUrl(this.urlOptions['createAddingRequest'], {});
    return this.http.post(url, entity);
  }

  public createEditingRequest(entity: EditAreaRequestViewModel): Promise<any> {
    const url = this.buildUrl(this.urlOptions['createEditingRequest'], {});
    return this.http.post(url, entity);
  }

  public cancelRequest(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['cancelRequest'], {});
    return this.http.post(url, {requestId: requestId});
  }
}
