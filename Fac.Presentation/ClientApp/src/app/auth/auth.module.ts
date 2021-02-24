import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth/service/jwtInterceptor.service';
import { AuthenticationService } from '@auth/services/authentication.service';
import { ForbiddenComponent } from '@auth/components/forbidden/forbidden.component';
import { AuthRoutingModule } from '@auth/auth-routing';
import { AuthGuard } from '@auth/service/auth-guard';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [AuthRoutingModule],
  exports: [AuthRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthenticationService, AuthGuard]
})
export class AuthModule { }
