import {Injectable} from '@angular/core';

@Injectable()
export class SysConfig {
  public url;
  public port;
  public protocol = 'http';
  public baseUrl: string;

  public get fullUrl() {
    return this.baseUrl + '/api';
  }

  public constructor() {
    this.url = 'localhost';
    this.port = '53507';
    this.protocol = 'http';
    // this.url = 'dronzone.azurewebsites.net';
    // this.port = '';
    // this.protocol = 'https';


    if (this.port) {
      this.baseUrl = `${this.protocol}://${this.url}:${this.port}`;
    } else {
      this.baseUrl = `${this.protocol}://${this.url}`;
    }
  }
}
