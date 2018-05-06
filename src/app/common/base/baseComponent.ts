import {OnDestroy} from '@angular/core';
import {ResourceBase} from "./resourceBase";
import {AppEnums} from "../../app.constants";
import {DatePipe} from '@angular/common';
import {NotificationService} from "../services/notificationService";

export class BaseComponent<T extends ResourceBase> implements OnDestroy {
  protected inited = false;

  constructor(protected resource: T, protected notificationService: NotificationService) {
    if (this.resource && this.notificationService) {
      this.resource.onError = this.onServerError.bind(this);
    }
  }

  onServerError(err) {
    this.notificationService.showNotification(err.message, AppEnums.alertType.error);
  }

  ngOnDestroy() {
    if (this.resource) {
      this.resource.onError = null;
    }
  }

  formatDate(data) {
    const dateTransform = new DatePipe("en");

    if (!!data) {
      const dt = new Date(data + 'Z');
      const utc = new Date(dt.getTime() + dt.getTimezoneOffset() * 60000);

      return dateTransform.transform(utc, 'yMdjm');
    }

    return '';
  }
}
