import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { MovieTVShowCategory } from 'app/shared/enums/movie-category';
import { MoviesService } from '../../service/movies.service';
import { Permissions } from 'app/core/auth/permissions';
import { Constants } from 'app/constants';

@Component({
  selector: 'movies-rating-list',
  templateUrl: './movies-rating-list.component.html',
  styleUrls: ['./movies-rating-list.component.scss']
})
export class MoviesRatingListComponent implements OnInit, AfterViewInit {
    isLoading = false;
    isFilterDescriptionShown = true;
    searchObject: any = {
        fts: '',
        page: 0,
        pageSize: 10,
        reload: false,
    };

    movieCategory : number = MovieTVShowCategory.Movie;

    searchObjectClone = {}; //holds initial search object so that we can clear search
    searchResult: any = {count: 100, resultList: []};
    displayedColumns: string[] = ['coverImagePath', 'title', 'category', 'averageRating', 'myRating' ];

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    Permissions: any = Permissions;

    constructor(private mainService: MoviesService) { }

    async ngOnInit() {
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

        const result = (await this.mainService.getMovieUserRatings(search));
        if (this.searchObject.reload) {
            this.searchResult.count = result.totalCount || this.searchResult.count;
        }
        this.searchResult.resultList = result.entities;
        this.searchResult.hasMore = result.hasMore;
        this.isLoading = false;
        this.isFilterDescriptionShown = false;
        return result;
    }
      
    ngAfterViewInit(): void {
        this.paginator.page.subscribe( async(page) => {
            const reload = this.searchObject.pageSize !== page.pageSize;
            this.searchObject.page = page.pageIndex;
            this.searchObject.pageSize = page.pageSize;
            await this.search(reload);
        });
        this.sort.sortChange.subscribe((event) =>  {
            this.searchObject.page = 0;
            this.searchObject.sortBy = event.active;
            this.searchObject.sortDirection = event.direction;
            this.search(true);
        });
    }

    async clear() {
        this.searchObject = {};
        Object.assign(this.searchObject, this.searchObjectClone);
        await this.search(true);
    }

    private getImageFullPath = (imagePath: string) => {
    return `${Constants.api}${imagePath}`;
    }

    async filterResults(){
    if (this.searchObject.fts.length > 1 || this.searchObject.fts.length == 0) {
        await this.search(true);
        }   
    }

    async ratingComponentClick(clickObj: any, movieId: number, ratingId: number): Promise<any> {
        let ratingObject = {
            id: ratingId,
            movieTVShowId: movieId,
            userId: null,
            rating: clickObj.rating
        }

        if (ratingId)
        {
            this.mainService.updateRating(ratingObject).then(() => {
                this.search(true);
            });  

        }
        else {
            this.mainService.insertRating(ratingObject).then(() => {
                this.search(true);
            });    
        }   
    }
}
