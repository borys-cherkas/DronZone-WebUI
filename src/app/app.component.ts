import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {PreloaderService} from "./common/services/preloaderService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private _router: Router,
              private viewContainerRef: ViewContainerRef,
              private preloaderService: PreloaderService) {

    this._router.events.subscribe(eventData => {
      this.onRouteChange(eventData);
    });
  }

  private onRouteChange(eventData: any) {
    if (eventData instanceof NavigationStart) {
      console.log('NavigationStart');
      this.preloaderService.showGlobalPreloader();
    }

    if (eventData instanceof NavigationError) {
      console.log("Navigation Error");
      debugger;
    }

    if (eventData instanceof NavigationEnd) {
      this.preloaderService.hideGlobalPreloader();
    }
  }

  public ngAfterViewInit() {
  }
}
