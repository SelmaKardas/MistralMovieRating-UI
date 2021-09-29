import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './modules/sessions/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './modules/sessions/signout-redirect-callback.component';
import { MainComponent } from './templates/standard-template/main.component';

const appRoutes: Routes = [
   { path: 'signin-oidc', component: SigninRedirectCallbackComponent },
   { path: 'signout-callback-oidc', component: SignoutRedirectCallbackComponent },
   {
      path: '',
      pathMatch: 'full',
      redirectTo: 'top-movies'
   }
   ,
   { 
      path: 'top-movies',
      component: MainComponent,
      loadChildren: () => import('./modules/movies/movies-top-list/movies.module').then(m => m.MoviesModule) 
   },
   { 
      path: 'rating',
      component: MainComponent,
      loadChildren: () => import('./modules/movies/movies-ratings/movies-rating.module').then(m => m.MoviesRatingModule),
   },
   {
      path: '**',
      redirectTo: ''
   }]

@NgModule({
  	imports: [RouterModule.forRoot(appRoutes)],
 	exports: [RouterModule],
  	providers: []
})
export class RoutingModule { }
