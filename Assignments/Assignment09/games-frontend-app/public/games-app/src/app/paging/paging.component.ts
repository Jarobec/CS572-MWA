import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnInit {
  pageNumbers!: number[];
  activePageIndex!: number;
  @Output()
  pageEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  @Input()
  set createPages(totalPage: number) {
    this.pageNumbers = new Array<number>(totalPage);
  }

  @Input()
  set pageIndex(pageIndex: number) {
    this.activePageIndex = pageIndex;
  }

  selectPage(page: number): void {
    this.pageEvent.emit(page);
  }
}
