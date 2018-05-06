import {OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

export enum ModalCloseStates {
  Success,
  Cancel
}

export class BaseModalComponent<T> implements OnInit {
  @ViewChild('modalContent') modalContent: any;

  protected currentModalRef: NgbModalRef;

  entity: T;

  constructor(protected modalService: NgbModal) {
    this.entity = {} as T;
  }

  public showModalWithEntity(entity: T): Promise<any> {
    this.entity = Object.assign({}, entity)

    return this.showModal();
  }

  public showModal(): Promise<any> {
    this.currentModalRef = this.modalService.open(this.modalContent);
    return this.currentModalRef.result;
  }

  public successClose() {
    this.currentModalRef.close(ModalCloseStates.Success);
  }

  public cancelClose() {
    this.currentModalRef.close(ModalCloseStates.Cancel);
  }

  public ngOnInit(): void {
    this.entity = {} as T;
  }
}
