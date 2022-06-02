import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameModel } from '../classes/game-model';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game!: GameModel;
  constructor(
    private _router: ActivatedRoute,
    private _gamesService: GamesDataService
  ) {
    this.game = new GameModel('', '', 0);
  }

  ngOnInit(): void {
    const gameId = this._router.snapshot.params['gameId'];
    this._gamesService.getOne(gameId).subscribe((game) => (this.game = game));
  }
}
