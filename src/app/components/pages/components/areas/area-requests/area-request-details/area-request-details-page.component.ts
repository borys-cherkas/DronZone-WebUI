import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {PreloaderService} from "../../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../../common/services/notificationService";
import {AreaRequestsResource} from "../../../../../../common/resources/area-requests.resource";
import {
  ZoneValidationRequestDetailedViewModel,
  ZoneValidationStatus,
  ZoneValidationType
} from "../../../../../../models/viewModels/area-request.models";
import {AppEnums} from "../../../../../../app.constants";
import {AreaRequestListItemViewModel} from "../../../../../../models/viewModels/areaRequestListItemViewModel";
import {ConfirmationModalComponent} from "../../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {UserService} from "../../../../../../common/services/userService";

declare const google;

@Component({
  selector: 'app-area-request-details-page',
  styleUrls: ['./area-request-details-page.scss'],
  templateUrl: './area-request-details-page.html'
})
export class AreaRequestDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;
  @ViewChild('gmap') gmapElement: any;

  private rectangle: any;
  private map: google.maps.Map;
  private requestId: string;
  private request: ZoneValidationRequestDetailedViewModel;

  private subscription: Subscription;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private userService: UserService,
              private areaRequestResource: AreaRequestsResource,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private notificationService: NotificationService) {

  }

  public ngOnInit() {
    this.preloaderService.showGlobalPreloader();
    this.subscription = this.route.params.subscribe(params => {
      this.requestId = params['requestId'];

      return this.loadRequestById().then(() => {
        this.preloaderService.hideGlobalPreloader();
      });
    });
  }

  public get isInAdminRole() {
    return this.userService.isInAdminRole;
  }

  public get isRequestUntaken() {
    return this.request != null && this.request.status === ZoneValidationStatus.WaitingForAdministrator;
  }

  public get isRequestTakenByMe() {
    return this.request != null && this.request.canConfirmReject;
  }

  public get isInUserRole() {
    return this.userService.isInUserRole;
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public isEditRequest() {
    return this.request != null && this.request.requestType === ZoneValidationType.Modifying;
  }

  public shouldShowCancelButtonOrNot(requestListItem: AreaRequestListItemViewModel) {
    return requestListItem != null
      && (requestListItem.status === ZoneValidationStatus.InProgress
        || requestListItem.status === ZoneValidationStatus.WaitingForAdministrator);
  }

  public goToRelatedArea() {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, this.request.targetZoneId]);
  }

  public cancelRequest(requestListItem: AreaRequestListItemViewModel) {
    return this.confirmationModal.showConfirmation("Are you sure you want to cancel this request?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.performCancel(requestListItem.id);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  private performCancel(id: string) {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestResource.cancelRequest(id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadRequestById();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
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
    return this.areaRequestResource.assignRequestToCurrentUser(id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadRequestById();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }


  public confirmRequest(requestListItem: AreaRequestListItemViewModel) {
    return this.confirmationModal.showConfirmation("Are you sure you want to confirm this request?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.performConfirmation(requestListItem.id);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public declineRequest(requestListItem: AreaRequestListItemViewModel) {
    return this.confirmationModal.showConfirmation("Are you sure you want to decline this request?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.performRejection(requestListItem.id);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public performConfirmation(id: string) {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestResource.confirmRequest(id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadRequestById();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public performRejection(id: string) {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestResource.declineRequest(id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadRequestById();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }


  private updateMap() {
    const latitudeCenter = (this.request.topLeftLongitude + this.request.bottomRightLongitude) / 2;
    const longitudeCenter = (this.request.topLeftLatitude + this.request.bottomRightLatitude) / 2;

    const mapProp = {
      center: new google.maps.LatLng(latitudeCenter, longitudeCenter),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    const bounds = {
      west: this.request.topLeftLatitude,
      north: this.request.topLeftLongitude,
      east: this.request.bottomRightLatitude,
      south: this.request.bottomRightLongitude
    };

    // Define a rectangle and set its editable property to true.
    this.rectangle = new google.maps.Rectangle({
      bounds: bounds,
      editable: false,
      draggable: false
    });
    this.rectangle.setMap(this.map);
  }

  public loadRequestById() {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestResource.getById(this.requestId).then((response: any) => {
      this.preloaderService.hideGlobalPreloader();
      this.request = response;
      return this.updateMap();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }
}
