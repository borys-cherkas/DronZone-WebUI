import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {} from "@types/googlemaps";
import {AppEnums} from "../../../../../app.constants";
import {TranslateService} from "@ngx-translate/core";
import {EditZoneViewModel} from "../../../../../models/viewModels/editZoneViewModel";
import {Subscription} from "rxjs/Subscription";
import {Zone} from "../../../../../models/interfaces/area.models";

declare const google;

@Component({
  selector: 'app-edit-drone-page',
  styleUrls: ['./edit-area-page.scss'],
  templateUrl: './edit-area-page.html'
})
export class EditAreaPageComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;
  @ViewChild('gmap') gmapElement: any;

  public $submitted = false;
  public entity: EditZoneViewModel = new EditZoneViewModel();
  private subscription: Subscription;
  private areaId: string;
  public area: Zone = new Zone();

  private rectangle: any;

  private map: google.maps.Map;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaResource: AreaResource,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private notificationService: NotificationService) {
    // translate.setDefaultLang("en");
  }

  public ngOnInit() {
    this.preloaderService.showGlobalPreloader();
    this.subscription = this.route.params.subscribe(params => {
      this.areaId = params['areaId'];

      return this.loadAreaById().then(() => {
        this.preloaderService.hideGlobalPreloader();
        this.initMap();
      });
    });
  }

  private initMap() {
    const initialRectangle = this.area.mapRectangle;

    const latitudeCenter = (initialRectangle.topLeftLongitude + initialRectangle.bottomRightLongitude) / 2;
    const longitudeCenter = (initialRectangle.topLeftLatitude + initialRectangle.bottomRightLatitude) / 2;

    const mapProp = {
      center: new google.maps.LatLng(latitudeCenter, longitudeCenter),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    const bounds = {
      west: initialRectangle.topLeftLatitude,
      north: initialRectangle.topLeftLongitude,
      east: initialRectangle.bottomRightLatitude,
      south: initialRectangle.bottomRightLongitude
    };

    // Define a rectangle and set its editable property to true.
    this.rectangle = new google.maps.Rectangle({
      bounds: bounds,
      editable: true,
      draggable: true
    });
    this.rectangle.setMap(this.map);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public saveArea() {
    this.$submitted = true;

    const userBounds = this.rectangle.bounds;

    const topLeftLatitude = userBounds.j.j;
    const topLeftLongitude = userBounds.l.l;
    const bottomRightLatitude = userBounds.j.l;
    const bottomRightLongitude = userBounds.l.j;

    this.entity.zoneId = this.areaId;
    this.entity.topLeftLatitude = topLeftLatitude;
    this.entity.topLeftLongitude = topLeftLongitude;
    this.entity.bottomRightLatitude = bottomRightLatitude;
    this.entity.bottomRightLongitude = bottomRightLongitude;

    this.preloaderService.showGlobalPreloader();
    return this.areaResource.update(this.entity).then(resp => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showSuccess(AppEnums.notifications.success.zoneAddedSuccess);
      this.goToAreaDetails();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  private goToAreaDetails() {
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, this.areaId]);
  }

  public loadAreaById() {
    this.preloaderService.showGlobalPreloader();
    return this.areaResource.getById(this.areaId).then(response => {
      this.preloaderService.hideGlobalPreloader();
      this.area = response;
      this.entity.zoneName = this.area.name;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }
}
