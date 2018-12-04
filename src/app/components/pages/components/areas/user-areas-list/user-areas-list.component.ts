import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {Zone, ZoneListItemViewModel} from "../../../../../models/interfaces/area.models";
import {AppEnums} from "../../../../../app.constants";
import {IAreaFilter} from "../../../../../models/interfaces/area-filter";
import {TranslateService} from '@ngx-translate/core';
import {ZoneListFilterViewModel} from "../../../../../models/interfaces/apiRequest/zoneListFilterViewModel";
import {AreaRequestListItemViewModel} from "../../../../../models/viewModels/areaRequestListItemViewModel";

@Component({
  selector: 'app-user-areas-page',
  styleUrls: ['./user-areas-list.scss'],
  templateUrl: './user-areas-list.html'
})
export class UserAreasListComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  // set "init" value to not skip first search
  private appliedSearchString = "init";
  private appliedConfirmedFilter: boolean = null;

  public searchString: string;
  public confirmedFilter: boolean = null;
  public areas: Array<ZoneListItemViewModel> = new Array<ZoneListItemViewModel>();

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaResource: AreaResource,
              private translate: TranslateService,
              private notificationService: NotificationService) {
    translate.setDefaultLang('en');
  }

  public ngOnInit() {
    this.loadAvailableAreas();
  }

  public hasActiveRequest(area: ZoneListItemViewModel) {
    return area.validationRequestId != null;
  }

  public loadAvailableAreas(): Promise<any> {
    if (this.appliedSearchString === this.searchString
      && this.appliedConfirmedFilter === this.confirmedFilter) {

      this.notificationService.showSuccess(AppEnums.notifications.success.filtersAlreadyApplied);
      return;
    }

    this.appliedSearchString = this.searchString;
    this.appliedConfirmedFilter = this.confirmedFilter;

    this.preloaderService.showGlobalPreloader();
    return this.areaResource.getAll({
      zoneName: this.searchString,
      confirmed: this.confirmedFilter
    }).then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.areas = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public showDetails(zoneId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, zoneId]);
  }

  public createNew() {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.add]);
  }

  public editZone(zoneId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.edit, zoneId]);
  }

  public goToEditingRequest(area: ZoneListItemViewModel) {
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.details, area.validationRequestId]);
  }

  public delete(zone: Zone) {
    const self = this;
    return this.confirmationModal.showConfirmation("Are you sure you want delete this area?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.preformDelete(zone);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public preformDelete(zone: Zone) {
    this.preloaderService.showGlobalPreloader();
    return this.areaResource.delete(zone.id).then(_ => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadAvailableAreas();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }
}
