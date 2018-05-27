import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {} from "@types/googlemaps";
import {AddZoneViewModel} from "../../../../../models/viewModels/addZoneViewModel";
import {AppEnums} from "../../../../../app.constants";
import {Subscription} from "rxjs/Subscription";
import {Zone} from "../../../../../models/interfaces/area.models";
import {TranslateService} from "@ngx-translate/core";

declare const google;

@Component({
  selector: 'app-area-details-page',
  styleUrls: ['./area-details-page.scss'],
  templateUrl: './area-details-page.html'
})
export class AreaDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild('gmap') gmapElement: any;

  private rectangle: any;
  private map: google.maps.Map;

  public area: Zone = new Zone();
  private areaId: string;
  private subscription: Subscription;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaResource: AreaResource,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private notificationService: NotificationService) {

  }

  public ngOnInit() {
    this.preloaderService.showGlobalPreloader();
    this.subscription = this.route.params.subscribe(params => {
      this.areaId = params['areaId'];

      return this.loadAreaById().then(() => {

      }).then(() => {
        this.preloaderService.hideGlobalPreloader();
      });
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public goToFilters() {
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.areaFilters, this.areaId])
  }

  private updateMap() {
    const latitudeCenter = (this.area.mapRectangle.north + this.area.mapRectangle.south) / 2;
    const longitudeCenter = (this.area.mapRectangle.east + this.area.mapRectangle.west) / 2;

    var mapProp = {
      center: new google.maps.LatLng(latitudeCenter, longitudeCenter),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    const bounds = {
      north: this.area.mapRectangle.north,
      south: this.area.mapRectangle.south,
      east: this.area.mapRectangle.east,
      west: this.area.mapRectangle.west
    };

    // Define a rectangle and set its editable property to true.
    this.rectangle = new google.maps.Rectangle({
      bounds: bounds,
      editable: false,
      draggable: false
    });
    this.rectangle.setMap(this.map);
  }

  public loadAreaById() {
    this.preloaderService.showGlobalPreloader();
    return this.areaResource.getById(this.areaId).then(response => {
      this.preloaderService.hideGlobalPreloader();
      this.area = response;
      return this.updateMap();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });

  }
}
