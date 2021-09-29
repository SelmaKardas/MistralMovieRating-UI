import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';

import { MoviesRatingRoutingModule } from './movies-rating-routing.module';
import { MoviesRatingComponent} from './movies-rating.component';
import { MoviesRatingListComponent } from './movies-ratings-list/movies-rating-list.component';
import { RatingComponent } from './rating-component/rating.component';

@NgModule({
  declarations: [
    MoviesRatingComponent, 
    MoviesRatingListComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    MoviesRatingRoutingModule,
    SharedModule,
  ],
  entryComponents: [ 
  ]
})
export class MoviesRatingModule { }
