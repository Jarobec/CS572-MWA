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

  constructor(private gamesService: GamesDataService) {}

  ngOnInit(): void {
    this.gamesService.getAll().subscribe((games) => (this.games = games));
  }
}
