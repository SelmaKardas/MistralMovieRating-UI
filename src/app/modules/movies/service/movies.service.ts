import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'app/constants';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
   
    constructor(private httpClient: HttpClient,
                private translateService: TranslateService,
                private snackBarService: MatSnackBar) {}
   
    getMovies(searchObject: any): Promise<any> {
        const httpParams = new HttpParams({
            fromObject: {
                search: searchObject.fts.toString(),
                page: searchObject.page.toString(),
                pageSize: searchObject.pageSize.toString(),
                category: searchObject.category.toString()
            },
        });

        return this.httpClient.get(
            Constants.apiRoot + 'movies',
            {
               params: httpParams,
            }
        ).toPromise();
    }

    getMovieUserRatings(searchObject: any): Promise<any> {
        const httpParams = new HttpParams({
            fromObject: {
                search: searchObject.fts.toString(),
                page: searchObject.page.toString(),
                pageSize: searchObject.pageSize.toString()
            },
        });

        return this.httpClient.get(
            Constants.apiRoot + 'movies/rating',
            {
               params: httpParams,
            }
        ).toPromise();
    }

    async get(id): Promise<any> {
        return this.httpClient.get(
            Constants.apiRoot + `movies/${id}`).toPromise();
      }

    async insertRating(insertRequest: any) {
        const response = this.httpClient.post(
        Constants.apiRoot + `movies/rating`,
        insertRequest
    ).toPromise();
        this.snackBarService.open(this.translateService.instant('Common.RequestCompleted'), null, {
            duration: environment.snackbarDefaultTimeout
        });
        return response;
    }

    async updateRating(updateRequest: any) {
        const response = this.httpClient.put(
        Constants.apiRoot + `movies/rating`,
        updateRequest
    ).toPromise();
        this.snackBarService.open(this.translateService.instant('Common.RequestCompleted'), null, {
            duration: environment.snackbarDefaultTimeout
        });
        return response;
    }
}

