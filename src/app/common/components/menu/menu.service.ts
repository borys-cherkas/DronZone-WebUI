import {Injectable} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {AppEnums} from "../../../app.constants";

// Do not forget to register new @Injectable() in module 'Providers' section
@Injectable()
export class MenuService {

  protected _currentMenuItem = {};

  constructor(private _router: Router) {
  }

  public convertRoutesToMenus(routes: Routes, sidebarCollapsed: boolean): any[] {
    const items = this._convertArrayToItems(routes, sidebarCollapsed);
    return this._skipEmpty(items);
  }

  public getCurrentItem(): any {
    return this._currentMenuItem;
  }

  public selectMenuItem(menuItems: any[], sidebarCollapsed: boolean): any[] {
    const items = [];
    menuItems.forEach((item) => {
      this._selectItem(item, sidebarCollapsed);

      if (item.selected) {
        this._currentMenuItem = item;
      }

      if (item.children && item.children.length > 0) {
        item.children = this.selectMenuItem(item.children, sidebarCollapsed);
      }
      items.push(item);
    });
    return items;
  }

  protected _skipEmpty(items: any[]): any[] {
    const menu = [];
    items.forEach((item) => {
      let menuItem;
      if (item.skip) {
        if (item.children && item.children.length > 0) {
          menuItem = item.children;
        }
      } else {
        menuItem = item;
      }

      if (menuItem) {
        menu.push(menuItem);
      }
    });

    return [].concat.apply([], menu);
  }

  protected _convertArrayToItems(routes: any[], sidebarCollapsed: boolean, parent?: any): any[] {
    const items = [];
    routes.forEach((route) => {
      items.push(this._convertObjectToItem(route, sidebarCollapsed, parent));
    });
    return items;
  }

  protected _convertObjectToItem(object, sidebarCollapsed: boolean, parent?: any): any {
    let item: any = {
      accept: object.accept
    };

    if (object.data && object.data.menu) {
      // this is a menu object
      item = object.data.menu;
      item.accept = object.accept;
      item.route = object;

      delete item.route.data.menu;
    } else {
      item.route = object;
      item.skip = true;
    }

    item.parent = parent;
    // we have to collect all paths to correctly build the url then
    item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : [];

    if (Array.isArray(item.route.path)) {
      item.route.paths = item.route.paths.concat(item.route.path);
    } else {
      if (item.route.path) {
        item.route.paths.push(item.route.path);
      }
    }


    if (object.children && object.children.length > 0) {
      item.children = this._convertArrayToItems(object.children, sidebarCollapsed, item);
    }

    const prepared = this._prepareItem(item, sidebarCollapsed);

    // if current item is selected or expanded - then parent is expanded too
    if ((prepared.selected || prepared.expanded) && parent) {
      parent.expanded = true;
    }

    return prepared;
  }

  protected _prepareItem(object: any, sidebarCollapsed: boolean): any {
    if (!object.skip) {

      const itemUrl = this._router.serializeUrl(this._router.createUrlTree(object.route.paths));
      object.url = object.url ? object.url : '' + itemUrl;

      object.target = object.target || '';
      return this._selectItem(object, sidebarCollapsed);
    }

    return object;
  }

  protected _selectItem(object: any, sidebarCollapsed: boolean): any {
    object.selected = false;
    if (!object.accept) {
      object.selected = this._router.url.indexOf(object.url) == 0;
    } else {
      object.accept.forEach((item) => {
        object.selected = object.selected || this._router.url.indexOf(object.url + '/' + item) === 0;
      });
    }
    object.expanded = false;
    if (object.children) {

      object.expanded = object.selected;
    }

    if (sidebarCollapsed) {
      object.expanded = false;
    }

    return object;
  }
}
