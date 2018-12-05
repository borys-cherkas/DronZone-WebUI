import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseModalComponent} from "../../../../../../common/base/baseModal.component";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../../../../common/services/notificationService";
import {AppEnums} from "../../../../../../app.constants";
import {PreloaderService} from "../../../../../../common/services/preloaderService";
import {UpdateAreaNameViewModel, Zone, ZoneDetailedViewModel} from "../../../../../../models/interfaces/area.models";
import {AreaResource} from "../../../../../../common/resources/areas.resource";

@Component({
  selector: 'app-update-area-name-modal',
  templateUrl: './change-area-name-modal.html',
  styleUrls: ['./change-area-name-modal.scss']
})

export class ChangeAreaNameModalComponent extends BaseModalComponent<UpdateAreaNameViewModel> {
  @Input('area') private areaViewModel: ZoneDetailedViewModel;

  public $submitted = false;
  public nameIsUsedError = "";

  constructor(modalService: NgbModal,
              private areaResource: AreaResource,
              private preloaderService: PreloaderService,
              private notificationService: NotificationService) {
    super(modalService);
  }

  public show() {
    this.$submitted = false;

    const vm = new UpdateAreaNameViewModel();
    vm.zoneId = this.areaViewModel.id;
    vm.zoneName = this.areaViewModel.name;

    return this.showModalWithEntity(vm);
  }

  public save(form: NgForm): Promise<any> {
    this.$submitted = true;

    if (!form.valid) {
      return;
    }

    this.preloaderService.showGlobalPreloader();
    return this.areaResource.checkIfNameAvailable(this.entity).then(res => {
      if (!res.isAvailable) {
        this.nameIsUsedError = this.entity.zoneName;
        this.preloaderService.hideGlobalPreloader();
        return;
      }

      this.nameIsUsedError = "";

      return this.areaResource.updateAreaName(this.entity).then((response: any) => {
        this.preloaderService.hideGlobalPreloader();
        this.notificationService.showSuccess(AppEnums.notifications.success.areaNameUpdatedSuccess);
        this.successClose();
      }, err => {
        this.preloaderService.hideGlobalPreloader();
        this.notificationService.showError(AppEnums.notifications.errors.unknownError);
        console.error(err);
        this.cancelClose();
      });
    });

  }
}
