import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GameModel } from './classes/game-model';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private _baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this._baseUrl + '/games');
  }

  public getOne(gameId: string): Observable<GameModel> {
    return this.http.get<GameModel>(this._baseUrl + '/games/' + gameId);
  }
}
