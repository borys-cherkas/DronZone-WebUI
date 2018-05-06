import {Component, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseModalComponent} from "../../../../../common/base/baseModal.component";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../../../common/services/notificationService";
import {IDroneFilter} from "../../../../../models/interfaces/drone-filter";
import {DroneFilterResource} from "../../../../../common/resources/drone-filter.resource";

@Component({
  selector: 'app-add-drone-filter-modal',
  templateUrl: './add-drone-filter-modal.html',
  styleUrls: ['./add-drone-filter-modal.scss']
})

export class AddDroneFilterModalComponent extends BaseModalComponent<IDroneFilter> {
  @ViewChild('addFilterForm') private addFilterForm: NgForm;

  public $submitted = false;

  constructor(modalService: NgbModal,
              private droneFilterResource: DroneFilterResource,
              private notificationService: NotificationService) {
    super(modalService);
  }

  public showAdd() {
    this.$submitted = false;
    return this.showModalWithEntity({} as IDroneFilter);
  }

  public showEdit(entity: IDroneFilter) {
    this.$submitted = false;
    return this.showModalWithEntity(entity);
  }

  public save(form: NgForm): Promise<any> {
    this.$submitted = true;

    if (!form.valid) {
      return;
    }

    return this.droneFilterResource.create(this.entity).then((response: any) => {
        this.successClose();
    }, err => {
      this.notificationService.showError("Unknown error. See console for details.");
      console.error(err);
      this.cancelClose();
    });
  }
}
