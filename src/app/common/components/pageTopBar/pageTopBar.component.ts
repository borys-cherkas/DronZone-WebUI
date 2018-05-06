import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {ProfileTopBarComponent} from "../profileTopBar/profileTopBar.component";

// Do not forget to register Components in Declarations sections of App.module
@Component({
  selector: 'app-page-top',
  styleUrls: ['./pageTopBar.scss'],
  templateUrl: './pageTopBar.html',
  encapsulation: ViewEncapsulation.None
})
export class PageTopBarComponent {
  public isScrolled = false;

  constructor() {
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
