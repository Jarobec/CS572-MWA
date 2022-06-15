import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Credientials } from './classes/crediential-model';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private baseUrl: string = 'http://localhost:1533/api';

  constructor(private http: HttpClient) {}

  public register(data: Credientials): Observable<Credientials> {
    return this.http.post<Credientials>(this.baseUrl + '/users', data.json());
  }

  public login(data: Credientials): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/users', data.json());
  }
}
