import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { AuthenticationService } from '@auth/services/authentication.service';
import { AuthModule } from '@auth/auth.module';
import { MainNavigationComponent } from './navigation/components/main-navigation/main-navigation.component';

// this method will be called by the angular framework upon startup and will not call the app mouldue unitl it completes
// it will ensure the appsettings and tranlation files are loaded pror to the app being ready
export function initApp(authService: AuthenticationService) {
  return () => {
    return new Promise((resolve) => {
      // cannot call global UI error banner, the screen will not be published yet.  Use the alert instead to show
      authService.login() // have the user loging  ******** TODO: UNCOMMENT THIS OUT WHEN YOU WANT TO ADD JWT AUTHORIZATION ********
        .then(() => resolve()) // all is done return control back to angular
        .catch((error) =>
          alert(
            "Error connecting to Authentication Service...Please make sure it is running, message from server: " +
            error.message
          )
        );
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavigationComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    SharedModule,
    AuthModule,
    RouterModule.forRoot([{ path: '', data: { breadcrumb: "Main Page" }, component: HomeComponent, pathMatch: 'full' }])
  ],
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthenticationService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  static injector: Injector; // global injector service so we can get a service reference outside constructor (in JS functions like ag-grid)

  constructor(injector: Injector) {
    AppModule.injector = injector; // store injector to be used later
  }

}

