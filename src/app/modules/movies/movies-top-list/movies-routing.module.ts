import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { MoviesComponent } from './movies.component';

const routes: Routes = [
{ path: '', component: MoviesComponent },
{ path: 'movie-details/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
