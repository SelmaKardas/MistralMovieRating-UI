import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { MoviesService } from '../../service/movies.service';
import { MovieTVShowCategory } from 'app/shared/enums/movie-category';
import { Constants } from 'app/constants';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    @Input()
    model:any = {};
    @Input()
    id: any = '';
    movieCategory : number = MovieTVShowCategory.Movie;

  constructor(private mainService: MoviesService, 
              private route: ActivatedRoute,
              private location: Location
              ) {}

  async ngOnInit() {
      await this.init();
  }

  private async init() {
    this.route.params.subscribe(async params => {
      this.id = params['id'];
        this.model = (await this.mainService.get(this.id)); 
    });
  }

  private getImageFullPath = (imagePath: string) => {
    return `${Constants.api}${imagePath}`;
  }

  goBack() {
    this.location.back();
  }

}
