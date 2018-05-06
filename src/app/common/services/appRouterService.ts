import {Injectable, EventEmitter} from '@angular/core';
import {Router, RoutesRecognized, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';

// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class AppRouterService {
  public routeChange: EventEmitter<any> = new EventEmitter();
  public breadcrumbs: Array<any>;

  constructor(private _router: Router, private route: ActivatedRoute) {

    this._router.events.subscribe(eventData => {
      if (eventData instanceof NavigationEnd) {
        let currentUrlPart = this.route.root;
        let currUrl = '';

        this.breadcrumbs = [];
        while (currentUrlPart.children.length > 0) {
          currentUrlPart = currentUrlPart.children[0];
          const routeSnaphot = currentUrlPart.snapshot;

          // means path = ''
          // override parent display name
          if (routeSnaphot.url.length === 0) {
            this.breadcrumbs[this.breadcrumbs.length - 1].displayName = (<any>routeSnaphot.data).displayName;
            continue;
          }

          currUrl += '/' + routeSnaphot.url.map(function (item) {
            return item.path;
          }).join('/');

          this.breadcrumbs.push({
            displayName: (<any>routeSnaphot.data).displayName,
            disabled: (<any>routeSnaphot.data).disabled,
            url: currUrl,
            params: routeSnaphot.params
          });
        }

        console.log(this.breadcrumbs);
        this.routeChange.emit(this.breadcrumbs);
      }
    });
  }
}
