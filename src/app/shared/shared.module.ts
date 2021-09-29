import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatSlideToggleModule, MatButtonModule, MatBadgeModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatDatepickerModule, MatProgressSpinnerModule,
	MatTableModule, MatExpansionModule, MatSelectModule, MatSnackBarModule, MatTooltipModule, MatChipsModule, MatListModule, MatSidenavModule,
	MatTabsModule, MatProgressBarModule, MatCheckboxModule, MatSliderModule, MatRadioModule, MatDialogModule, MatGridListModule, MatAutocompleteModule, MatSortModule, MatPaginatorModule, MatStepperModule, MatButtonToggleModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localeBs from '@angular/common/locales/bs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { CellLocalizerDirective } from './directives/cell-localizer.directive';
import { ErrorHandlerService } from './services/error-handler.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../core/auth/auth-interceptor.service';
import { AuthService } from '../core/auth/auth-service.component';
import { AdminRouteGuard } from 'app/core/auth/admin-route-guard';
import { NgxPermissionsModule } from 'ngx-permissions';

registerLocaleData(localeBs);

@NgModule({
	declarations: [
		CellLocalizerDirective,
		SpinnerComponent],
	imports: [
		CommonModule,
		TranslateModule,
		MatSlideToggleModule,
		MatButtonModule,
		MatCardModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatBadgeModule,
		MatInputModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatExpansionModule,
		MatSelectModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatChipsModule,
		MatListModule,
		MatSidenavModule,
		MatTabsModule,
		MatProgressBarModule,
		MatCheckboxModule,
		MatSliderModule,
		MatRadioModule,
		MatDialogModule,
		MatGridListModule,
		MatAutocompleteModule,
		MatSortModule,
		MatPaginatorModule,
		MatStepperModule,
		MatButtonToggleModule,
		FormsModule,
		ReactiveFormsModule,
		EditorModule,
		NgxPermissionsModule
	],
	entryComponents: [],
	exports: [
		TranslateModule,
		MatSlideToggleModule,
		MatButtonModule,
		MatCardModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatBadgeModule,
		MatInputModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatExpansionModule,
		MatSelectModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatChipsModule,
		MatListModule,
		MatSidenavModule,
		MatTabsModule,
		MatProgressBarModule,
		MatCheckboxModule,
		MatSliderModule,
		MatRadioModule,
		MatDialogModule,
		MatGridListModule,
		MatAutocompleteModule,
		MatSortModule,
		MatPaginatorModule,
		MatStepperModule,
		MatButtonToggleModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		EditorModule,
		CellLocalizerDirective,
		SpinnerComponent,
		NgxPermissionsModule],
	providers: [{
		provide: LOCALE_ID,
		deps: [],
		useFactory: (fact) => {
			return localStorage.getItem('core.language') ? localStorage.getItem('core.language') : 'bs';
		}
	},
	{
		provide: ErrorHandler,
		useClass: ErrorHandlerService
	},
	AuthService,
	AdminRouteGuard,
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class SharedModule { }
