"use strict";

import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AppEnums} from "../../app.constants";
import {UserService} from "../services/userService";


@Injectable()
export class CanActivateRoute implements CanActivate {
  constructor(protected userService: UserService,
              protected router: Router,
              protected role: string) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userInfo = this.userService.getUserInfo();
    if (userInfo) {
      return true;
    } else {
      this.router.navigate(['/', AppEnums.routes.content, AppEnums.routes.login]);
      return false;
    }
  }
}
