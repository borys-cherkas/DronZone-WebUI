import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {Subscription} from "rxjs/Subscription";
import {Zone} from "../../../../../models/interfaces/area.models";
import {DroneResource} from "../../../../../common/resources/drones.resource";
import {AppEnums} from "../../../../../app.constants";

@Component({
  selector: 'app-drone-details-page',
  styleUrls: ['./drone-details-page.scss'],
  templateUrl: './drone-details-page.html'
})
export class DroneDetailsPageComponent implements OnInit, OnDestroy {
  private droneId: string;
  private drone: Zone = new Zone();
  private subscription: Subscription;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private droneResource: DroneResource,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {

  }

  public ngOnInit() {
    this.preloaderService.showGlobalPreloader();
    this.subscription = this.route.params.subscribe(params => {
      this.droneId = params['droneId'];

      return this.loadDroneById().then(() => {
        this.preloaderService.hideGlobalPreloader();
      });
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public loadDroneById() {
    this.preloaderService.showGlobalPreloader();
    return this.droneResource.getById(this.droneId).then(response => {
      this.preloaderService.hideGlobalPreloader();
      this.drone = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }
}
