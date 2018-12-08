import { Injectable } from "@angular/core";
import { ResourceBase } from "../base/resourceBase";
import { SysConfig } from "../../../environments/sysConfig";
import { HttpServiceWrapper } from "../base/httpServiceWrapper";
import { AddAreaRequestViewModel } from "../../models/viewModels/addAreaRequestViewModel";
import { EditAreaRequestViewModel } from "../../models/viewModels/editAreaRequestViewModel";

@Injectable()
export class AreaRequestsResource extends ResourceBase {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getById': 'zoneModifications/GetRequestById/{requestId}',
      'getUserRequests': 'zoneModifications/getUserRequests',
      'getUntakenRequests': 'zoneModifications/getUntakenRequests',
      'getTakenByMeActiveRequests': 'zoneModifications/getTakenByMeActiveRequests',
      'createAddingRequest': 'zoneModifications/createAddingZoneRequest',
      'createEditingRequest': 'zoneModifications/createModifyingZoneRequest',
      'confirmRequest': 'zoneModifications/confirmRequest',
      'declineRequest': 'zoneModifications/declineRequest',
      'cancelRequest': 'zoneModifications/cancelRequest',
      'assignRequestToCurrentUser': 'zoneModifications/assignRequestToCurrentUser'
    });
  }

  public getById(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getById'], { requestId: requestId });
    return this.http.get(url);
  }

  public getUserRequests(searchParams): Promise<any> {
    const url = this.buildUrlClassic(this.urlOptions['getUserRequests'], searchParams);
    return this.http.get(url);
  }

  public getUntakenRequests(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getUntakenRequests'], {});
    return this.http.get(url);
  }

  public getTakenByMeActiveRequests(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getTakenByMeActiveRequests'], {});
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

  public confirmRequest(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['confirmRequest'], {});
    return this.http.post(url, { requestId: requestId });
  }


  public declineRequest(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['declineRequest'], {});
    return this.http.post(url, { requestId: requestId });
  }


  public cancelRequest(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['cancelRequest'], {});
    return this.http.post(url, { requestId: requestId });
  }

  public assignRequestToCurrentUser(requestId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['assignRequestToCurrentUser'], {});
    return this.http.post(url, { requestId: requestId });
  }
}
