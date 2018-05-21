import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../../../../../common/components/confirmation-modal/confirmation-modal.component";
import {PreloaderService} from "../../../../../common/services/preloaderService";
import {NotificationService} from "../../../../../common/services/notificationService";
import {DroneResource} from "../../../../../common/resources/drones.resource";
import {NgForm} from "@angular/forms";
import {AppEnums} from "../../../../../app.constants";


@Component({
  selector: 'app-drone-page',
  styleUrls: ['./attach-drone-page.scss'],
  templateUrl: './attach-drone-page.html'
})
export class AttachDronePageComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;
  @ViewChild('addDroneForm') public addDroneForm: NgForm;

  public $submitted: boolean = false;
  public droneCode: string = "";

  constructor(private router: Router,
              private preloaderService: PreloaderService,
              private droneResource: DroneResource,
              private notificationService: NotificationService) {

  }

  public ngOnInit() {
  }

  public addDrone() {
    this.$submitted = true;

    if (!this.addDroneForm.valid) {
      return;
    }

    this.preloaderService.showGlobalPreloader();
    return this.droneResource.registerByCode(this.droneCode).then(response => {
      this.preloaderService.hideGlobalPreloader();
      this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.drones, AppEnums.routes.list])
    }, err => {
      this.preloaderService.hideGlobalPreloader();
      if (err._body == 'invalid_data') {
        this.notificationService.showError("Wrong drone code!");
      }
    });
  }
}
