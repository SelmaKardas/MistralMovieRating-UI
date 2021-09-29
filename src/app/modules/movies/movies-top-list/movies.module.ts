import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { SharedModule } from 'app/shared/shared.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
  declarations: [MoviesComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ],
  entryComponents: [MovieDetailsComponent]
})
export class MoviesModule { }
