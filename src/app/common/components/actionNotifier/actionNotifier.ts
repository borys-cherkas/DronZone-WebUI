import {AfterViewInit, Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {NotificationService} from "../../services/notificationService";
import {AppEnums} from "../../../app.constants";
import * as $ from 'jquery';

// Do not forget to register Components into Declarations section of App.module
@Component({
  selector: 'app-action-notifier',
  styleUrls: ['./actionNotifier.scss'],
  templateUrl: './actionNotifier.html',
  encapsulation: ViewEncapsulation.None // disable style rewriting
})
export class ActionNotifierComponent implements AfterViewInit {
  notificationTimeout = 10000;
  element: any;
  alertClass: any;
  alertText: any;
  iconClass: any;
  alertEl: any;
  link: string;

  private topBarOptions = {
    "dir1": "down",
    "dir2": "right",
    "push": "top",
    "spacing1": 0,
    "spacing2": 0
  };

  constructor(element: ElementRef, notificationService: NotificationService) {
    this.element = element;
    notificationService.registerNotificator(this);
  }

  ngAfterViewInit() {
    this.alertEl = $(this.element.nativeElement).find('.alert');
    this.hideNotification();
  }

  public getAlertClass() {
    return this.alertClass;
  }

  public getIconClass() {
    return this.iconClass;
  }

  public showNotification(text: string, type: string, options?: any) {
    this.alertText = text;

    switch (type) {
      case AppEnums.alertType.error:
        this.alertClass = 'alert-danger';
        this.iconClass = 'fa-exclamation-circle';
        break;
      case AppEnums.alertType.success:
        this.alertClass = 'alert-success';
        this.iconClass = 'fa-check';
        break;
      case AppEnums.alertType.info:
        this.alertClass = 'alert-info';
        this.iconClass = 'fa-info';
        break;
      case AppEnums.alertType.fault:
        this.alertClass = 'alert-fault';
        this.iconClass = 'fa-rocket';
        break;
      case AppEnums.alertType.warning:
        this.alertClass = 'alert-warning';
        this.iconClass = 'fa-exclamation-circle';
        break;
    }

    this.alertEl.show();

    if (!options || !options.disableAutoClose) {
      setTimeout(this.hideNotification.bind(this), this.notificationTimeout);
    }

    if (options && options.link) {
      this.link = options.link;
    }
  }

  public hideNotification() {
    if (this.alertEl) {
      this.alertEl.hide();
    }
  }
}
