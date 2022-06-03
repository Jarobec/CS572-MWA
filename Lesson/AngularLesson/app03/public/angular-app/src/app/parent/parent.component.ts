import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  parentX: number = 5;
  parentY: number = 7;
  parentZ: number = 0;

  constructor() {}

  ngOnInit(): void {}

  updateZ(msg: number): void {
    this.parentZ = msg;
  }
}
