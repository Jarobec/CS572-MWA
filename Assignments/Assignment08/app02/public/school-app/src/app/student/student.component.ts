import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentModel } from '../classes/student-model';
import { StudentDataService } from '../student-data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  student!: StudentModel;
  constructor(
    private _router: ActivatedRoute,
    private _studentSerivce: StudentDataService
  ) {
    this.student = new StudentModel('', '');
  }

  ngOnInit(): void {
    const studentId = this._router.snapshot.params['studentId'];
    this._studentSerivce
      .getOne(studentId)
      .subscribe((student) => (this.student = student));
  }
}
