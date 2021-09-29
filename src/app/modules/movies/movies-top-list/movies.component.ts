import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Constants } from 'app/constants';
import { MovieTVShowCategory } from 'app/shared/enums/movie-category';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'ms-landing',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
   
   isLoading = false;
        
   searchObject: any = {
     page: 0,
     pageSize: 10,
     fts: '',
     category: 0,
     reload: false,
   };

   searchObjectClone = {}; //holds initial search object so that we can clear search
   searchResult: any = {count: 100, resultList: []};

   movieCategory : number = MovieTVShowCategory.Movie;
   tvShowCategory : number = MovieTVShowCategory.TVShow;
 
 constructor(public mainService: MoviesService, 
                private router: Router,
                protected activatedRoute: ActivatedRoute) {}


 async ngOnInit() {
         await this.init();
 }

 private async init() {
     Object.assign(this.searchObjectClone, this.searchObject);
     await this.search(true);
 }
 
 async search(reload = false) {
         this.searchObject.reload = reload;
         if (reload === true) {
             this.searchObject.page = 0;
         }
         await this.searchInternal();
 }

async searchMore() {
    this.searchObject.page += 1;
    await this.searchInternal(true);
}

private async searchInternal(append = false) {
    this.isLoading = true;
    const search: any = {};
    Object.assign(search, this.searchObject);
    const result = (await this.mainService.getMovies(search));
    if (this.searchObject.reload) {
        this.searchResult.count = result.totalCount || this.searchResult.count;
    }
    if (append) {
    this.searchResult.resultList = [...this.searchResult.resultList, ...result.entities];
    } else {
    this.searchResult.resultList = result.entities;
    }
    this.searchResult.hasMore = result.hasMore;
    this.isLoading = false;
    return result;
}

 async clear() {
     this.searchObject = {};
     Object.assign(this.searchObject, this.searchObjectClone);
     await this.search(true);
 }

 details(row) {
     this.router.navigate(['movie-details', row.id], { relativeTo: this.activatedRoute.parent });
 }

 private getImageFullPath = (imagePath: string) => {
  return `${Constants.api}${imagePath}`;
}

async filterResults(){
    if (this.searchObject.fts.length > 1 || this.searchObject.fts.length == 0) {
        await this.search(true);
    }
}

async categoryChanged() {
    await this.search(true);
}
}
