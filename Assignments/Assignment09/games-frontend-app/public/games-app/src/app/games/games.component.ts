import { Component, OnInit } from '@angular/core';

import { PageModel } from '../classes/page-model';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  gamesWithPage!: PageModel;
  search: string = '';
  pageIndex: number = 0;

  constructor(private gamesService: GamesDataService) {
    this.gamesWithPage = new PageModel([], 0);
  }

  ngOnInit(): void {
    this._getAll();
  }

  onSearch(): void {
    this._getAll();
  }

  _getAll(): void {
    this.gamesService
      .getAll(this.search, this.pageIndex)
      .subscribe((gamesWithPage) => (this.gamesWithPage = gamesWithPage));
  }

  onPrev(): void {
    this.pageIndex -= 1;
    this._getAll();
  }
  onNext(): void {
    this.pageIndex += 1;
    this._getAll();
  }

  onPage(page: number): void {
    this.pageIndex = page;
    this._getAll();
  }
}
