import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {AppEnums} from "../../../../../app.constants";
import {DroneListItem} from "../../../../../models/viewModels/drone/droneInfo";
import {DroneResource} from "../../../../../common/resources/drones.resource";

@Component({
  selector: 'app-admin-drone-list-page',
  styleUrls: ['./admin-drone-list-page.scss'],
  templateUrl: './admin-drone-list-page.html'
})
export class AdminDroneListPageComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public drones: Array<DroneListItem> = new Array<DroneListItem>();

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private droneResource: DroneResource,
              private notificationService: NotificationService) {}

  public ngOnInit() {
    return this.loadAllDetachedDrones();
  }


  private loadAllDetachedDrones(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.droneResource.getDetachedDrones().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.drones = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public showDetails(droneId: string) {
    return this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.drones, AppEnums.routes.details, droneId]);
  }

  public generate() {

    return this.droneResource.generateDronePack().then(response => {
      this.preloaderService.hideGlobalPreloader();
      return this.loadAllDetachedDrones();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  public getDroneTypePresentation(droneType: number): string {
    return AppEnums.droneTypeReverse[droneType];
  }
}
