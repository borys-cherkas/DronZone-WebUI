import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {} from "@types/googlemaps";
import {AddZoneViewModel} from "../../../../../models/viewModels/addZoneViewModel";
import {AppEnums} from "../../../../../app.constants";

declare const google;

@Component({
  selector: 'app-user-areas-page',
  styleUrls: ['./add-area-page.scss'],
  templateUrl: './add-area-page.html'
})
export class AddAreaPageComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;
  @ViewChild('gmap') gmapElement: any;

  public entity: AddZoneViewModel = new AddZoneViewModel();

  private rectangle: any;

  private map: google.maps.Map;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaResource: AreaResource,
              private notificationService: NotificationService) {

  }

  public ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(44.599, -78.443),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    if (navigator.geolocation) {
      const self = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        self.notificationService.showSuccess("Got location");
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
      }, function() {
        self.notificationService.showSuccess("Didn't get location");
      });
    }
  }

  public checkPoints() {
    const userBounds = this.rectangle.bounds;
    this.entity.west = userBounds.b.b;
    this.entity.east = userBounds.b.f;
    this.entity.south = userBounds.f.b;
    this.entity.north = userBounds.f.f;

    this.areaResource.create(this.entity).then(resp => {
      this.notificationService.showSuccess("Zone has been added successfully.");
      this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.list]);
    }, err => {
      console.error(err);
      this.notificationService.showError("Some error has been occured. Check console for details.");
    })

  }
Point}
