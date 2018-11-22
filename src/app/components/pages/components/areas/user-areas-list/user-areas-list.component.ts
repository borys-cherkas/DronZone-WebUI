import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {Zone} from "../../../../../models/interfaces/area.models";
import {AppEnums} from "../../../../../app.constants";
import {IAreaFilter} from "../../../../../models/interfaces/area-filter";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-areas-page',
  styleUrls: ['./user-areas-list.scss'],
  templateUrl: './user-areas-list.html'
})
export class UserAreasListComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public areas: Array<Zone> = new Array<Zone>();

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
  private loadAvailableAreas(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.areaResource.getAll().then(response => {
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
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.add]);
  }

  public editZone(zoneId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.edit, zoneId]);
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
      this.notificationService.showError(AppEnums.notifications.errors.unknownError)
    })
  }
}
