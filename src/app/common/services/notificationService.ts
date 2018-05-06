import {AppEnums} from "../../app.constants";
import {Injectable} from '@angular/core';
import {ActionNotifierComponent} from "../components/actionNotifier/actionNotifier";

// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class NotificationService {
  notificator: ActionNotifierComponent;

  registerNotificator(obj: ActionNotifierComponent) {
    this.notificator = obj;
  }

  showNotification(text: string, type: string, options?: any) {
    this.notificator.showNotification(text, type, options);
    window.scrollTo(0, 0);
  }

  showSuccess(text: string) {
    this.showNotification(text, AppEnums.alertType.success);
  }

  showWarning(text: string, options?: any) {
    this.showNotification(text, AppEnums.alertType.warning, options);
  }

  showError(text: string) {
    this.showNotification(text, AppEnums.alertType.error);
  }

  hideAll() {
    this.notificator.hideNotification();
  }

}
