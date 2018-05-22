import {Injectable} from "@angular/core";
import {ResourceBase} from "../base/resourceBase";
import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "../base/httpServiceWrapper";

@Injectable()
export class AreaFilterResource extends ResourceBase  {

  constructor(config: SysConfig, http: HttpServiceWrapper) {
    super(config, http, {
      'getAreaFilters': 'areaFilters/getAreaFilters/{areaId}',
      'create': 'areaFilters/create',
      'update': 'areaFilters/update',
      'delete': 'areaFilters/delete'
    });
  }

  getAreaFilters(areaId: string): Promise<any> {
    const url = this.buildUrl(this.urlOptions['getAreaFilters'], {areaId: areaId});
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
