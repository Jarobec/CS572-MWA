import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { GameModel } from './classes/game-model';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private baseUrl: string = 'http://localhost:1533/api';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this.baseUrl + '/games');
  }

  public getOne(gameId: string): Observable<GameModel> {
    return this.http.get<GameModel>(this.baseUrl + '/games/' + gameId);
  }

  public addOne(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/games', data);
  }

  public deleteOne(gameId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/games/' + gameId);
  }
}
