import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../../../common/services/preloaderService";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../../../../../../common/services/notificationService";
import {AppEnums} from "../../../../../../app.constants";
import {AreaRequestsResource} from "../../../../../../common/resources/area-requests.resource";
import {
  AreaRequestListItemViewModel
} from "../../../../../../models/viewModels/areaRequestListItemViewModel";

@Component({
  selector: 'app-admin-assigned-to-me-area-requests-list',
  styleUrls: ['./admin-assigned-to-me-area-requests-list.scss'],
  templateUrl: './admin-assigned-to-me-area-requests-list.html'
})
export class AdminAssignedToMeAreaRequestsListComponent implements OnInit {
  public areaRequestList: Array<AreaRequestListItemViewModel> = new Array<AreaRequestListItemViewModel>();

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaRequestsResource: AreaRequestsResource,
              private translate: TranslateService,
              private notificationService: NotificationService) {
    translate.setDefaultLang('en');
  }

  public ngOnInit() {
    this.loadAssignedAreaRequests();
  }

  public showDetails(requestId: string) {
    this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areaRequests, AppEnums.routes.details, requestId]);
  }

  public loadAssignedAreaRequests(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.areaRequestsResource.getTakenByMeActiveRequests().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.areaRequestList = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError(AppEnums.notifications.errors.unknownError);
    });
  }
}
