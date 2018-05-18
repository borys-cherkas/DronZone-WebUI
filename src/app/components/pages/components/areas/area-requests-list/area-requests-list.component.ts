import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {NotificationService} from "../../../../../common/services/notificationService";

@Component({
  selector: 'app-user-areas-page',
  styleUrls: ['./area-requests-list.scss'],
  templateUrl: './area-requests-list.html'
})
export class AreaRequestsListComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaResource: AreaResource,
              private notificationService: NotificationService) {}

  public ngOnInit() {
    // this.loadAvailableAreas();
  }


  // private loadAvailableAreas(): Promise<any> {
  //   this.preloaderService.showGlobalPreloader();
  //   return this.droneFilterResource.getAll().then(response => {
  //     this.preloaderService.hideGlobalPreloader();
  //
  //     this.fitlers = response;
  //   }, err => {
  //     this.preloaderService.hideGlobalPreloader();
  //     this.notificationService.showError("Some error occurred while deleting filter.  See console for details.");
  //   });
  // }
}
