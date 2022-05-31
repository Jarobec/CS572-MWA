import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteDataService {
  baseUrl = 'https://animechan.vercel.app/api';

  constructor(private http: HttpClient) {}

  public getQuotes(): Observable<any> {
    return this.http.get(this.baseUrl + '/quotes');
  }

  // public getQuotes(): Promise<Quote[]> {
  //   const url = this.baseUrl + '/quotes';
  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then((response) => response as Quote[])
  //     .catch(this._handleError);
  // }

  // private _handleError(err: any): Promise<any> {
  //   console.log('Service  Error', err);
  //   return Promise.reject(err.message || err);
  // }
}
