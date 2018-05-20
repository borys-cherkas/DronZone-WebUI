import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {Zone} from "../../../../../models/interfaces/area.models";
import {IDroneFilter} from "../../../../../models/interfaces/drone-filter";
import {AppEnums} from "../../../../../app.constants";

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
              private notificationService: NotificationService) {}

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
      this.notificationService.showError("Some error occurred while deleting filter.  See console for details.");
    });
  }

  public showDetails(zoneId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, zoneId]);
  }

  public createNew() {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.edit]);
  }

  // public edit(filter: IDroneFilter) {
  //   this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.edit]);
  // }


  public delete(filter: IDroneFilter) {
    const self = this;
    return this.confirmationModal.showConfirmation("Are you sure you want delete this filter?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.preformDelete(filter);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public preformDelete(filter: IDroneFilter) {
    return this.areaResource.delete(filter.id).then(_ => {
      return this.loadAvailableAreas();
    })
  }
}
