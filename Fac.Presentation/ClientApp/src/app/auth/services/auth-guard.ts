import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    var isUserInRole = false;

    // make sure we have a current user and token, if we do not then the route will not validate
    // if the token has expired, get a new one
    if (this.authenticationService.isTokenExpired()) {
      async () => await this.authenticationService.login();
    }

    isUserInRole = this.authenticationService.isUserInRoles(route.data.roles);

    if (!isUserInRole) {
      this.router.navigate(["forbidden"]);
    }

    return isUserInRole;
  }
}
