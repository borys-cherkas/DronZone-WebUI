import {Injectable} from '@angular/core';
import {AppEnums} from "../../app.constants";


// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class StorageService {
  private storage: any;
  private storageSupported: boolean;
  private type: string;

  public constructor() {
    this.storage = {};
    this.type = AppEnums.storageTypes.sessionStorage;
    this.storageSupported = this._isStorageSupported(this.type);
  }

  public get(key) {
    if (this.storage[key]) {
      return this.storage[key];
    }

    if (this.storageSupported && window[this.type][key]) {
      this.storage[key] = JSON.parse(window[this.type][key]);
    }

    return this.storage[key];
  }

  public set(key, data) {
    this.storage[key] = data;

    if (this.storageSupported) {
      window[this.type][key] = JSON.stringify(data);
    }
  }

  /***
   * Removes specified item from localStorage
   * @param key {string}
   */
  public remove(key) {
    if (this.storageSupported) {
      delete window[this.type][key];
    }

    delete this.storage[key];
  }

  moveToStorage(destType) {
    if (this._isStorageSupported(destType)) {
      for (const prop in window[this.type]) {
        window[destType][prop] = window[this.type][prop];

        delete window[this.type][prop];
      }

      this.type = destType;
    }
  }

  switchToPermanentStorage() {
    this.moveToStorage(AppEnums.storageTypes.localStorage);
  }

  switchToTemporaryStorage() {
    if (this.type !== AppEnums.storageTypes.sessionStorage) {
      this.moveToStorage(AppEnums.storageTypes.sessionStorage);
    }
  }

  _isStorageSupported(type) {
    return type in window && window[type] !== null && this.isLocalStorageAccessible(type);
  }

  _determineCurrentStorageType() {
    this.type = AppEnums.storageTypes.sessionStorage;
    for (const prop in AppEnums.storageTypes) {
      const type = AppEnums.storageTypes[prop];
      if (this._isStorageSupported(type) && Object.keys(window[type]).length) {
        this.type = type;
        break;
      }
    }
  }

  /**
   * Test set/remove from LS.
   * Required for Safari on Iphone in private mode
   * @param type
   * @returns {boolean}
   */
  isLocalStorageAccessible(type) {
    const testKey = 'test';
    const storage: any = window[type];
    try {
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

}
