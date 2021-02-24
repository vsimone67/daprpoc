import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '@auth/models/user';
import { SiteConstants } from '@constants/siteConstants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    var currentUser: User = JSON.parse(
      localStorage.getItem(SiteConstants.UserToken)
    );

    const isLoggedIn = currentUser && currentUser.token;

    if (isLoggedIn) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        },
      });
    } else {
      // do not pass Bearer token if we do not have a valid one, we will get an unauthorized error
      // always pass withCredentials so Angular can pass the windows credentials
      request = request.clone({
        withCredentials: true
      });

    }

    return next.handle(request);
  }
}
