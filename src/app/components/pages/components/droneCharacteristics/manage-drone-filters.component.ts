import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../../../common/services/preloaderService";
import {NotificationService} from "../../../../common/services/notificationService";
import {DroneFilterResource} from "../../../../common/resources/drone-filter.resource";
import {IDroneFilter} from "../../../../models/interfaces/drone-filter";
import {AddDroneFilterModalComponent} from "./add-characteristic-modal/add-drone-filter-modal.component";

@Component({
  selector: 'app-manage-drone-filters-page',
  styleUrls: ['./manage-drone-filters.scss'],
  templateUrl: './manage-drone-filters.html'
})
export class ManageDroneFiltersComponent implements OnInit {
  @ViewChild('addFitlerModal') public addFitlerModal: AddDroneFilterModalComponent;

  public fitlers: Array<IDroneFilter>;

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private droneFilterResource: DroneFilterResource,
              private notificationService: NotificationService) {

  }

  public ngOnInit() {
    this.loadAvailableCharacteristics();
  }

  public createNew() {
    return this.addFitlerModal.showAdd().then(() => {
      this.notificationService.showSuccess("Filter has been added successfully.");
    }, err => {
      this.notificationService.showError("Some error has occurred while adding new filter.");
    });
  }

  public edit(charact: IDroneFilter) {
    return this.addFitlerModal.showEdit(charact).then(() => {
      this.notificationService.showSuccess("Filter has been updated successfully.");
    }, err => {
      this.notificationService.showError("Some error has occurred while updating filter.");
    });
  }

  public showDetails(charact: IDroneFilter) {

  }

  public delete(charact: IDroneFilter) {

  }

  private loadAvailableCharacteristics(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.droneFilterResource.getAll().then(response => {
      this.preloaderService.hideGlobalPreloader();

      this.fitlers = response;
    });
  }
}
