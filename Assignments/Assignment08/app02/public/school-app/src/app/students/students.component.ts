import { Component, OnInit } from '@angular/core';

import { StudentModel } from '../classes/student-model';
import { StudentDataService } from '../student-data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: StudentModel[] = [];

  constructor(private _studentService: StudentDataService) {}

  ngOnInit(): void {
    this._studentService
      .getAll()
      .subscribe((students) => (this.students = students));
  }
}
