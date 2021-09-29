import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
import 'hammerjs';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { RoutingModule } from "./app-routing.module";
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';;
import { PageTitleService } from './shared/services/page-title.service';
import { AppComponent} from './app.component';
import { MainComponent }   from './templates/standard-template/main.component';
import { MenuToggleModule } from './main/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { WidgetComponentModule } from './widget-component/widget-component.module';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { MultiTranslateHttpLoader } from './shared/services/multi-translate-loader';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SignoutRedirectCallbackComponent } from './modules/sessions/signout-redirect-callback.component';
import { SigninRedirectCallbackComponent } from './modules/sessions/signin-redirect-callback.component';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './core/auth/auth-service.component';
import { MatInputModule } from '@angular/material';

// AoT requires an exported function for factories
export function translateLoader(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        {prefix: './assets/i18n/', suffix: '.json'},
        {prefix: './assets/i18n/common/common.', suffix: '.json'}
    ]);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RoutingModule,
		FlexLayoutModule,
		MatInputModule,
		PerfectScrollbarModule,
		MenuToggleModule,
		HttpClientModule,
		TranslateModule.forRoot({
         loader: {
				provide: TranslateLoader,
				useFactory: translateLoader,
				deps: [HttpClient]
         }
      }),
		WidgetComponentModule,
		LoadingBarRouterModule,
		LoadingBarHttpClientModule,
		SharedModule,
		NgxPermissionsModule.forRoot()
	],
	declarations: [
		AppComponent, 
		MainComponent, 
		SideBarComponent, FooterComponent,
		SignoutRedirectCallbackComponent,
		SigninRedirectCallbackComponent
	],
	bootstrap: [AppComponent],
	providers: [
		MenuItems,
		PageTitleService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
            provide: APP_INITIALIZER,
            useFactory: (
                authService: AuthService,
                permissionService: NgxPermissionsService
				) => () => {
					return authService.getUserId().then(data => {
						if (data) {
							return authService
								.loadPermissions(data)
								.then((data) =>
									permissionService.loadPermissions(data)
								)
								.catch(() => Promise.resolve(true));
						}	
						return Promise.resolve(true);
					});
				},
            deps: [AuthService, NgxPermissionsService],
            multi: true,
        },
	],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
