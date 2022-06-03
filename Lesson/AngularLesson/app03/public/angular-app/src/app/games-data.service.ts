import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private baseUrl: string = 'http://localhost:1533/api';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl + '/games');
  }
}
