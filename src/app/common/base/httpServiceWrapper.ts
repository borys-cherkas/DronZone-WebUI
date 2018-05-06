import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {SysConfig} from "../../../environments/sysConfig";
import {StorageService} from "../services/storageService";
import {AppEnums} from "../../app.constants";

// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class HttpServiceWrapper {
  constructor(private http: Http,
              private config: SysConfig,
              private router: Router,
              private storageService: StorageService) {
  }

  static createOptions(): RequestOptions {
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json; charset=utf-8');
    options.headers.append('Accept', 'q=0.8;application/json;q=0.9');
    return options;
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, params?: any): Promise<Response> {
    return this.appendHeaders().then(requestOptions => {
      requestOptions.headers.delete('Content-Type');
      requestOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlSearchParams = this.createUrlSearchParamsFromObj(body);
      const urlSearchParamsString = urlSearchParams.toString();

      const requestUrl = (params && params.useBaseUrl ? this.config.baseUrl : this.config.fullUrl) + '/' + url;
      const resultPromise = this.http.post(requestUrl, urlSearchParamsString, requestOptions).toPromise();

      if (params && params.noIntercept) {
        return resultPromise.then((res) => {
          return res.text && res.text() ? res.json() : {};
        });
      }

      return this.interceptAuthError(resultPromise).then(res => {
        return res.text && res.text() ? res.json() : {};
      });
    });

  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: string): Promise<Response> {
    return this.appendHeaders().then(requestOptions => {
      requestOptions.headers.delete('Content-Type');
      requestOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlSearchParams = this.createUrlSearchParamsFromObj(body);
      const urlSearchParamsString = urlSearchParams.toString();
      const result = this.http.put(this.config.fullUrl + '/' + url, urlSearchParamsString, requestOptions).toPromise();

      return this.interceptAuthError(result).then(res => {
        return res.text && res.text() ? res.json() : {};
      });
    });
  }


  get(url: string, params?: any): Promise<Response> {
    return this.appendHeaders().then(requestOptions => {

      const requestUrl = (params && params.useBaseUrl ? this.config.baseUrl : this.config.fullUrl) + '/' + url;
      const result = this.http.get(requestUrl, requestOptions).toPromise();

      return this.interceptAuthError(result).then((res) => {
        return res.text && res.text() ? res.json() : res;
      });
    });
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string): Promise<Response> {
    return this.appendHeaders().then(requestOptions => {
      requestOptions.headers.delete('Content-Type');

      const result = this.http.delete(this.config.fullUrl + '/' + url, requestOptions).toPromise();
      return this.interceptAuthError(result);
    });
  }

  protected appendHeaders(): Promise<RequestOptions> {
    const requestOptions = HttpServiceWrapper.createOptions();

    const accessToken = this.storageService.get('accessToken');
    if (accessToken) {
      requestOptions.headers.delete('Authorization');
      requestOptions.headers.append('Authorization', 'Bearer ' + accessToken);
    }

    return Promise.resolve(requestOptions);
  }

  private createUrlSearchParamsFromObj(obj: any): URLSearchParams {
    const urlSearchParams = new URLSearchParams();

    Object.keys(obj).map((objectKey, index) => {
      urlSearchParams.append(objectKey, obj[objectKey]);
    });

    return urlSearchParams;
  }

  interceptAuthError(promise: Promise<Response>): Promise<Response> {
    return promise.catch(err => {
      console.error(err);
      if (err.status === 401) {
        this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.login]);
        return;
      } else {
        return Promise.reject(err);
      }
    });
  }

}
