import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../../common/services/preloaderService";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../../../../../../common/services/notificationService";
import {AppEnums} from "../../../../../../app.constants";
import {AreaRequestsResource} from "../../../../../../common/resources/area-requests.resource";
import {
  AreaRequestListItemViewModel
} from "../../../../../../models/viewModels/areaRequestListItemViewModel";
import {ConfirmationModalComponent} from "../../../../../../common/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-admin-untaken-area-requests-list',
  styleUrls: ['./admin-untaken-area-requests-list.scss'],
  templateUrl: './admin-untaken-area-requests-list.html'
})
export class AdminUntakenAreaRequestsListComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public untakenAreaRequestList: Array<AreaRequestListItemViewModel> = new Array<AreaRequestListItemViewModel>();

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaRequestsResource: AreaRequestsResource,
              private translate: TranslateService,
              private notificationService: NotificationService) {
    translate.setDefaultLang('en');
  }

  public ngOnInit() {
    this.loadUntakenAreaRequests();
  }

  // public goToAreaRequest(request: AreaRequestListItemViewModel) {
  //   return this.router.navigate(
  //     ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, request.targetZoneId]);
  // }

  public loadUntakenAreaRequests(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestsResource.getUntakenRequests().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.untakenAreaRequestList = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public showDetails(requestId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.details, requestId]);
  }

  public assignRequestToCurrentUser(requestListItem: AreaRequestListItemViewModel) {
    return this.confirmationModal.showConfirmation("Are you sure you want to assign this request to yourself?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.performAssignment(requestListItem.id);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public performAssignment(id: string) {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestsResource.assignRequestToCurrentUser(id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadUntakenAreaRequests();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }
}
