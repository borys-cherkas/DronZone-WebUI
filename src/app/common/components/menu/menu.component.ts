import {Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Router, Routes, NavigationEnd} from '@angular/router';
import {MenuService} from './menu.service';
import {GlobalState} from '../../../global.state';
import {Subscription} from "rxjs/Subscription";
import * as $ from "jquery";
import {AppEnums} from "../../../app.constants";

// Do not forget to register Components in Declarations sections of App.module
@Component({
  selector: 'app-menu',
  styleUrls: ['./menu.scss'],
  templateUrl: './menu.html',
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnDestroy {
  @Input() sidebarCollapsed = false;
  @Input() menuHeight: number;
  menuRoutes: Routes = [];

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea = -200;

  constructor(private router: Router,
              private menuService: MenuService,
              private state: GlobalState) {
    this._onRouteChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this.menuService.selectMenuItem(this.menuItems, this.sidebarCollapsed);
      this.state.notifyDataChanged('menu.activeLink', this.menuService.getCurrentItem());
    }
  }

  setMenu(menuRoutes: Routes): void {
    this.menuRoutes = menuRoutes;
    this.menuItems = this.menuService.convertRoutesToMenus(menuRoutes, this.sidebarCollapsed);
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    const submenu = $($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.menuItems.forEach(function (item) {
        item.expanded = false;
      });

      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
    }

    return false;
  }

  public goToHomePage() {
    this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.home]);
  }
}
