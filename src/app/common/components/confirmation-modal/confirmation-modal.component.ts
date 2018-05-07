import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseModalComponent} from "../../base/baseModal.component";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.html',
  styleUrls: ['./confirmation-modal.scss']
})
export class ConfirmationModalComponent extends BaseModalComponent<any> {
  public message: string =  "";

  private modalPromise: Promise<any>;

  constructor(modalService: NgbModal) {
    super(modalService);
  }

  public confirm() {
    this.successClose();
  }

  public discard() {
    this.cancelClose();
  }

  public showConfirmation(message: string) {
    this.message = message;
    this.modalPromise = this.showModal();
    return this.modalPromise;
  }
}
