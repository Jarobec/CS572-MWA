import { Component, OnInit } from '@angular/core';

import { GameModel } from '../classes/game-model';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: GameModel[] = [];
  constructor(private _gamesService: GamesDataService) {}

  ngOnInit(): void {
    this._gamesService.getAll().subscribe((games) => (this.games = games));
  }
}
