import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";

@Injectable()
export class DroneFilterResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getAll': 'droneFilters/getDroneFilters',
      'create': 'droneFilters/create',
      'update': 'droneFilters/update',
      'delete': 'droneFilters/delete'
    });
  }

  getAll(): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getAll'], {});
    return this.http.get(url);
  }

  create(entity: any): Promise<any> {
    const url = this.buildUrl(this.urlOptions['create'], {});
    return this.http.post(url, entity);
  }

  update(entity: any): Promise<any> {
    const url = this.buildUrl(this.urlOptions['update'], {});
    return this.http.put(url, entity);
  }

  delete(id: number): Promise<any> {
    const url = this.buildUrl(this.urlOptions['delete'], {});
    return this.http.post(url, {id: id});
  }
}
