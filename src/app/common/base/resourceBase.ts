import {SysConfig} from "../../../environments/sysConfig";
import {HttpServiceWrapper} from "./httpServiceWrapper";

export class ResourceBase {
  protected urlOptions: any;
  public onError: any;

  constructor(protected config: SysConfig,
              protected http: HttpServiceWrapper,
              options: any) {

    this.urlOptions = options;
  }

  getById(options?: any): Promise<any> {
    const params = options && options.params ? options.params : {};
    const url = this.buildUrl(this.urlOptions['getById'], params);

    return this.http.get(url).catch(this.handleError);
  }

  public getAll(options?: any): Promise<any> {
    const params = options && options.params ? options.params : {};
    const url = this.buildUrl(this.urlOptions['getAll'], params);

    return this.http.get(url).catch(this.handleError.bind(this));
  }

  public save(entity: any, options?: any): Promise<any> {
    let obs;
    const params = (options && options.params) ? options.params : {};
    if (entity.id) {
      const url = this.buildUrl(this.urlOptions['put'], params);
      obs = this.http.put(url, entity);
    } else {
      const url = this.buildUrl(this.urlOptions['post'], params);
      obs = this.http.post(url, entity);
    }

    return obs.catch(this.handleError.bind(this));
  }

  public delete(options: any): Promise<any> {
    const params = options && options.params ? options.params : {};
    const url = this.buildUrl(this.urlOptions['delete'], params);
    return this.http.get(url).catch(this.handleError);
  }

  protected buildUrl(urlTemplate: string, params: any): string {
    const url = urlTemplate;

    Object.keys(params).forEach(function (key) {
      if (params[key] !== undefined) {
        urlTemplate = urlTemplate.replace('{' + key + '}', params[key]);
      }
    });

    return urlTemplate;
  }

  protected buildUrlClassic(urlTemplate: string, params: any): string {
    let url = urlTemplate;
    let separator = '';

    const getUrlSeparator = function () {
      if (separator === '') {
        separator = '?';
      } else if (separator === '?') {
        separator = '&';
      }

      return separator;
    };

    Object.keys(params).forEach(function (key) {
      if (params[key] !== undefined) {
        if (Array.isArray(params[key])) {
          params[key].forEach(function (item) {
            url += getUrlSeparator() + key + '=' + item;
          });
        } else {
          url += getUrlSeparator() + key + '=' + params[key];
        }
      }
    });

    return url;
  }

  protected handleError(error: any) {
    const errMsg = (error.message)
      ? error.message
      : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');

    let errObj: any = {};
    if (error && error.text && error.text()) {
      errObj = error.json();
    }

    console.error(errMsg);
    return Promise.reject(errObj);
  }


}
