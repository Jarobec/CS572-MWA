import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TeamModel } from './classes/team-model';

@Injectable({
  providedIn: 'root',
})
export class TeamsDataService {
  private _baseUrl = 'http://localhost:1533/api';

  constructor(private _http: HttpClient) {}

  public getAll(): Observable<TeamModel[]> {
    return this._http.get<TeamModel[]>(this._baseUrl + '/teams');
  }

  public getOne(teamId: string): Observable<TeamModel> {
    return this._http.get<TeamModel>(this._baseUrl + '/teams/' + teamId);
  }
}
