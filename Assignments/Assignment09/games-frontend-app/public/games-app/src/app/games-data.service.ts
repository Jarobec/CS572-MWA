import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

import { GameModel } from './classes/game-model';
import { PageModel } from './classes/page-model';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private baseUrl: string = 'http://localhost:1533/api';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public getAll(
    searchValue: string,
    pageNumber: number
  ): Observable<PageModel> {
    let url: string = this.baseUrl + '/games';
    let params = new HttpParams().set('offset', pageNumber * 5);

    if (searchValue.trim().length !== 0) {
      params = params.append('search', searchValue);
    }

    return this.http.get<PageModel>(url, { params });
  }

  public getOne(gameId: string): Observable<GameModel> {
    // intersepter
    let tokenString: string = 'Bearer ' + this.authenticationService.token;
    let headers = new HttpHeaders().set('Authorization', tokenString);
    return this.http.get<GameModel>(this.baseUrl + '/games/' + gameId, {
      headers,
    });
  }

  public addOne(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/games', data);
  }

  public fullUpdateOne(gameId: string, data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/games/' + gameId, data);
  }

  public deleteOne(gameId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/games/' + gameId);
  }
}
