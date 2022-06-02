import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StudentModel } from './classes/student-model';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  private _baseUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) {}

  public getAll(): Observable<StudentModel[]> {
    return this._http.get<StudentModel[]>(this._baseUrl + '/students');
  }

  public getOne(studentId: string): Observable<StudentModel> {
    return this._http.get<StudentModel>(
      this._baseUrl + '/students/' + studentId
    );
  }
}
