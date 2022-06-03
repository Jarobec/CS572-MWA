import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatFactsDataService {
  private baseUrl: string = 'https://cat-fact.herokuapp.com';

  constructor(private http: HttpClient) {}

  public getCatFacts(): Observable<any> {
    const url: string = this.baseUrl + '/facts';
    console.log('url', url);

    return this.http.get(url);
  }
}
