import {
  AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import {MENU} from '../../../../app/app.menu';
import {UserService} from "../../services/userService";
import {MenuComponent} from "../menu/menu.component";
import * as $ from 'jquery';
import {IUserInfo} from "../../../models/interfaces/IUserInfo";

// Do not forget to register Components in Declarations sections of App.module
@ Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.scss'],
  templateUrl: './sidebar.html',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('appMenu') menu: MenuComponent;

  // here we declare which routes we want to use as a menu in our sidebar
  public routes = []; // we're creating a deep copy since we are going to change that object

  private userChangeSb;

  constructor(private userService: UserService) {
  }

  public filterRoute(routes, userRole: string) {
    const filteredRoutes = [];

    routes.forEach((item) => {
      if (item.children && item.children.length > 0) {
        const subFiltered = this.filterRoute(item.children, userRole);

        if (subFiltered.length > 0) {
          filteredRoutes.push({
            path: item.path,
            data: item.data,
            children: subFiltered
          });
        }
      } else {
        let allowed = true;
        if (item.data.menu.roles && item.data.menu.roles.length > 0) {
          allowed = item.data.menu.roles.indexOf(userRole) > -1;
        }
        if (allowed) {
          filteredRoutes.push(item);
        }
      }
    });

    return filteredRoutes;
  }

  public ngOnInit(): void {
    this.userChangeSb = this.userService.onUserChanged.subscribe((newUser) => {
      this.updateMenuItems(this.userService.getUserInfo());
    });

    this.updateMenuItems(this.userService.getUserInfo());
  }

  private updateMenuItems(userInfo: IUserInfo) {
    const unfilteredRoutes = $.extend(true, [], MENU);
    const userRole = userInfo && userInfo.roles ? userInfo.roles[0] : '';

    this.routes = unfilteredRoutes;
    const filtered = this.filterRoute(unfilteredRoutes, userRole);

    this.menu.setMenu(filtered);
  }

  public ngOnDestroy() {
    this.userChangeSb.unsubscribe();
  }
}
