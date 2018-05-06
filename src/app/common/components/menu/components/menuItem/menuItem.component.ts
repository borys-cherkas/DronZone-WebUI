import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";

// Do not forget to register Components in Declarations sections of App.module
@Component({
  selector: 'app-menu-item',
  styleUrls: ['./menuItem.scss'],
  templateUrl: './menuItem.html',
  encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent {

  constructor(private router: Router) {
  }

  @Input() menuItem: any;
  @Input() child = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  public onHoverItem($event): void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  public navigateUrl(menuItem: any) {
    if (menuItem.url === this.router.url) {
      return;
    }

    if (menuItem.parent) {
      menuItem.parent.expanded = false;
    }

    this.router.navigate([menuItem.url]);
  }
}
