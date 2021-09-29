import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Permissions } from 'app/core/auth/permissions';
import { MoviesRatingListComponent } from './movies-ratings-list/movies-rating-list.component';

const routes: Routes = [

  { 
    path: '',
    component: MoviesRatingListComponent,
  },
  // This route is just example of using Route guards:
  { 
    path: 'me',
    component: MoviesRatingListComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
          only: [Permissions.Rating.Create],
          redirectTo: 'top-movies',
      },
  },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRatingRoutingModule { }
