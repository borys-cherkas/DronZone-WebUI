import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {AppEnums} from "../../../../../app.constants";
import {DroneListItem} from "../../../../../models/viewModels/drone/droneInfo";
import {DroneResource} from "../../../../../common/resources/drones.resource";

@Component({
  selector: 'app-user-drone-list-page',
  styleUrls: ['./user-drone-list-page.scss'],
  templateUrl: './user-drone-list-page.html'
})
export class UserDroneListPageComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public drones: Array<DroneListItem> = new Array<DroneListItem>();

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private droneResource: DroneResource,
              private notificationService: NotificationService) {}

  public ngOnInit() {
    return this.loadUserDrones();
  }


  private loadUserDrones(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.droneResource.getUserDrones().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.drones = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError("Some error occurred while loading data.  See console for details.");
    });
  }

  public showDetails(droneId: string) {
    return this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.drones, AppEnums.routes.details, droneId]);
  }

  public createNew() {
    return this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.drones, AppEnums.routes.edit]);
  }

  public delete(droneId: string) {
    const self = this;
    return this.confirmationModal.showConfirmation("Are you sure you want detach this drone?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.preformDelete(droneId);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public preformDelete(droneId: string) {
    return this.droneResource.delete(droneId).then(_ => {
      return this.loadUserDrones();
    })
  }

  public getDroneTypePresentation(droneType: number): string {
    return AppEnums.droneTypeReverse[droneType];
  }
}