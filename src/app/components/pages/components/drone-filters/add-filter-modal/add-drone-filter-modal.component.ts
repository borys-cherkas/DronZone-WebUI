import {Component, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseModalComponent} from "../../../../../common/base/baseModal.component";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../../../common/services/notificationService";
import {IDroneFilter} from "../../../../../models/interfaces/drone-filter";
import {DroneFilterResource} from "../../../../../common/resources/drone-filter.resource";
import {AppEnums} from "../../../../../app.constants";
import {PreloaderService} from "../../../../../common/services/preloaderService";

@Component({
  selector: 'app-add-drone-filter-modal',
  templateUrl: './add-drone-filter-modal.html',
  styleUrls: ['./add-drone-filter-modal.scss']
})

export class AddDroneFilterModalComponent extends BaseModalComponent<IDroneFilter> {
  public $submitted = false;

  constructor(modalService: NgbModal,
              private droneFilterResource: DroneFilterResource,
              private preloaderService: PreloaderService,
              private notificationService: NotificationService) {
    super(modalService);
  }

  public get availableDroneTypes() {
    const types = AppEnums.droneType;
    const typePresentations = AppEnums.droneTypeReverse;
    const result = [];

    for (const key in types) {
      const type = types[key];
      result.push({
        value: type,
        display: typePresentations[type]
      });
    }

    return result;
  }

  public showAdd() {
    this.$submitted = false;
    return this.showModalWithEntity({} as IDroneFilter);
  }

  public showEdit(entity: IDroneFilter) {
    this.$submitted = false;
    return this.showModalWithEntity(entity);
  }

  public saveOrEdit(form: NgForm): Promise<any> {
    this.$submitted = true;

    if (!form.valid) {
      return;
    }

    if (this.entity.id) {
      return this.save();
    } else {
      return this.create();
    }
  }

  public save(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.droneFilterResource.update(this.entity).then((response: any) => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showSuccess("Filter has been updated successfully.");
      this.successClose();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError("Unknown error. See console for details.");
      console.error(err);
      this.cancelClose();
    });
  }

  public create(): Promise<any> {
    this.preloaderService.showGlobalPreloader();
    return this.droneFilterResource.create(this.entity).then((response: any) => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showSuccess("Filter has been added successfully.");
      this.successClose();
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      this.notificationService.showError("Unknown error. See console for details.");
      console.error(err);
      this.cancelClose();
    });
  }
}
