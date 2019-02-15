import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../../common/services/notificationService";
import {AreaResource} from "../../../../../../common/resources/areas.resource";
import {} from "@types/googlemaps";
import {AddAreaRequestViewModel} from "../../../../../../models/viewModels/addAreaRequestViewModel";
import {AppEnums} from "../../../../../../app.constants";
import {TranslateService} from "@ngx-translate/core";
import {AreaRequestsResource} from "../../../../../../common/resources/area-requests.resource";
import {NgForm} from "@angular/forms";

declare const google;

@Component({
  selector: 'app-create-area-adding-request-page',
  styleUrls: ['./create-area-adding-request-page.scss'],
  templateUrl: './create-area-adding-request-page.html'
})
export class CreateAreaAddingRequestPageComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;
  @ViewChild('gmap') gmapElement: any;

  public $submitted = false;
  public entity: AddAreaRequestViewModel = new AddAreaRequestViewModel();

  private rectangle: any;

  private map: google.maps.Map;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaRequestsResource: AreaRequestsResource,
              private translate: TranslateService,
              private notificationService: NotificationService) {
  }

  public ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(44.599, -78.443),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    if (navigator.geolocation) {
      const self = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        self.map.setCenter(currentPosition);

        const bounds = {
          north: position.coords.latitude + 0.05,
          south: position.coords.latitude - 0.05,
          east: position.coords.longitude + 0.1,
          west: position.coords.longitude - 0.1
        };

        // Define a rectangle and set its editable property to true.
        self.rectangle = new google.maps.Rectangle({
          bounds: bounds,
          editable: true,
          draggable: true
        });
        self.rectangle.setMap(self.map);
      }, function () {
        self.notificationService.showError(AppEnums.notifications.errors.cannotDetermineLocation);
      });
    }
  }

  public sendRequest(form: NgForm) {
    this.$submitted = true;

    if (!form.valid) {
      return;
    }

    const userBounds = this.rectangle.bounds;

    const topLeftLatitude = userBounds.ga.j;
    const topLeftLongitude = userBounds.ma.l;
    const bottomRightLatitude = userBounds.ga.l;
    const bottomRightLongitude = userBounds.ma.j;

    this.entity.topLeftLatitude = topLeftLatitude;
    this.entity.topLeftLongitude = topLeftLongitude;
    this.entity.bottomRightLatitude = bottomRightLatitude;
    this.entity.bottomRightLongitude = bottomRightLongitude;

    this.preloaderService.showGlobalPreloader();
    return this.areaRequestsResource.createAddingRequest(this.entity).then(nothing => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showSuccess(AppEnums.notifications.success.addingZoneRequestAddedSuccess);
      this.goToAreaRequestsList();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      console.error(err);
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }

  private goToAreaRequestsList() {
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.list]);
  }
}
