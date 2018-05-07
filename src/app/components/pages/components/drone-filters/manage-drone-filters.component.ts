import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../common/services/preloaderService";
import {NotificationService} from "../../../../common/services/notificationService";
import {DroneFilterResource} from "../../../../common/resources/drone-filter.resource";
import {IDroneFilter} from "../../../../models/interfaces/drone-filter";
import {AddDroneFilterModalComponent} from "./add-filter-modal/add-drone-filter-modal.component";
import {AppEnums} from "../../../../app.constants";
import {ConfirmationModalComponent} from "../../../../common/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-manage-drone-filters-page',
  styleUrls: ['./manage-drone-filters.scss'],
  templateUrl: './manage-drone-filters.html'
})
export class ManageDroneFiltersComponent implements OnInit {
  @ViewChild('addFitlerModal') public addFitlerModal: AddDroneFilterModalComponent;
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public fitlers: Array<IDroneFilter>;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private droneFilterResource: DroneFilterResource,
              private notificationService: NotificationService) {}

  public ngOnInit() {
    this.loadAvailableFilters();
  }

  public createNew() {
    return this.addFitlerModal.showAdd().then(() => {
      return this.loadAvailableFilters();
    });
  }

  public edit(filter: IDroneFilter) {
    return this.addFitlerModal.showEdit(filter).then(() => {
      return this.loadAvailableFilters();
    });
  }

  public getDroneTypePresentation(droneType: number): string {
    return AppEnums.droneTypeReverse[droneType];
  }

  public delete(filter: IDroneFilter) {
    const self = this;
    return this.confirmationModal.showConfirmation("Are you sure you want delete this filter?").then(isDiscarded => {
      if (!isDiscarded) {
        return this.preformDelete(filter);
      }
    }, err => {
      // clicked on backdrop
    });
  }

  public preformDelete(filter: IDroneFilter) {
    return this.droneFilterResource.delete(filter.id).then(_ => {
      return this.loadAvailableFilters();
    })
  }

  private loadAvailableFilters(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.droneFilterResource.getAll().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.fitlers = response;
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError("Some error occurred while deleting filter.  See console for details.");
    });
  }
}
