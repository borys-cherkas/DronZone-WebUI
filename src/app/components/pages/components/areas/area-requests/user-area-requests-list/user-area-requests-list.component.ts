import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../../common/services/preloaderService";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../../../../../../common/services/notificationService";
import {AppEnums} from "../../../../../../app.constants";
import {AreaRequestsResource} from "../../../../../../common/resources/area-requests.resource";
import {
  AreaRequestListItemViewModel,
  ZoneValidationStatus,
  ZoneValidationType
} from "../../../../../../models/viewModels/areaRequestListItemViewModel";

@Component({
  selector: 'app-user-area-requests-list',
  styleUrls: ['./user-area-requests-list.scss'],
  templateUrl: './user-area-requests-list.html'
})
export class UserAreaRequestsListComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public areaRequestList: Array<AreaRequestListItemViewModel> = new Array<AreaRequestListItemViewModel>();

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaRequestsResource: AreaRequestsResource,
              private translate: TranslateService,
              private notificationService: NotificationService) {
    translate.setDefaultLang('en');
  }

  public ngOnInit() {
    this.loadAreaRequests();
  }

  public goToArea(request: AreaRequestListItemViewModel) {
    return this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, request.targetZoneId]);
  }

  public loadAreaRequests(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestsResource.getUserRequests().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.areaRequestList = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public showDetails(requestId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.details, requestId]);
  }

  public createNew() {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.add]);
  }

  // public editZone(zoneId: string) {
  //   this.router.navigate(
  //     ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.edit, zoneId]);
  // }

  public cancelRequest(requestListItem: AreaRequestListItemViewModel) {
    return this.confirmationModal.showConfirmation("Are you sure you want to cancel this request?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.performCancel(requestListItem.id);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public performCancel(id: string) {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestsResource.cancelRequest(id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadAreaRequests();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public shouldShowCancelButtonOrNot(requestListItem: AreaRequestListItemViewModel) {
    return requestListItem.status === ZoneValidationStatus.InProgress
      || requestListItem.status === ZoneValidationStatus.WaitingForAdministrator;
  }
  public shouldShowOpenZoneOrNot(requestListItem: AreaRequestListItemViewModel) {
    return requestListItem.requestType === ZoneValidationType.Modifying;
  }
}
