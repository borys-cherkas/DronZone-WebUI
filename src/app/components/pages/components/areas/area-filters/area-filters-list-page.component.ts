import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {AreaFilterResource} from "../../../../../common/resources/area-filter.resource";
import {AddDroneFilterModalComponent} from "./add-filter-modal/add-drone-filter-modal.component";
import {AppEnums} from "../../../../../app.constants";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {Subscription} from "rxjs/Subscription";
import {IAreaFilter} from "../../../../../models/interfaces/area-filter";
import {AreaResource} from "../../../../../common/resources/areas.resource";
import {Zone} from "../../../../../models/interfaces/area.models";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-area-filters-list-page',
  styleUrls: ['./area-filters-list-page.scss'],
  templateUrl: './area-filters-list-page.html'
})
export class AreaFiltersListPageComponent implements OnInit {
  @ViewChild('addFitlerModal') public addFitlerModal: AddDroneFilterModalComponent;
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public filters: Array<IAreaFilter>;
  public area: Zone;

  public areaId: string;
  private subscription: Subscription;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private areaFilterResource: AreaFilterResource,
              private areaResource: AreaResource,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private notificationService: NotificationService) {}

  public ngOnInit() {
    this.preloaderService.showGlobalPreloader();
    this.subscription = this.route.params.subscribe(params => {
      this.areaId = params['areaId'];

      return Promise.all([
        this.loadFilters(),
        this.loadArea()
      ]).then(() => {
        this.preloaderService.hideGlobalPreloader();
      });
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public goToArea() {
    return this.router.navigate(
      ['/', AppEnums.routes.content, AppEnums.routes.areas, AppEnums.routes.details, this.areaId]);
  }

  public createNew() {
    return this.addFitlerModal.showAdd().then(() => {
      return this.loadFilters();
    });
  }

  public edit(filter: IAreaFilter) {
    return this.addFitlerModal.showEdit(filter).then(() => {
      return this.loadFilters();
    });
  }

  public getDroneTypePresentation(droneType: number): string {
    return AppEnums.droneTypeReverse[droneType];
  }

  public delete(filter: IAreaFilter) {
    const self = this;
    return this.confirmationModal.showConfirmation("Are you sure you want delete this filter?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.preformDelete(filter);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public preformDelete(filter: IAreaFilter) {
    return this.areaFilterResource.delete(filter.id).then(_ => {
      return this.loadFilters();
    })
  }

  private loadArea(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.areaResource.getById(this.areaId).then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.area = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError("Some error occurred while deleting filter.  See console for details.");
    });
  }

  private loadFilters(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.areaFilterResource.getAreaFilters(this.areaId).then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.filters = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError("Some error occurred while deleting filter.  See console for details.");
    });
  }
}
