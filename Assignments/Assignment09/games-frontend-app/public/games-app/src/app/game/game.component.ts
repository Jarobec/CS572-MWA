import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { GameModel } from '../classes/game-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game!: GameModel;
  #_gameId!: string;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gameService: GamesDataService
  ) {
    this.#_gameId = this.activeRouter.snapshot.params['gameId'];
    this.game = new GameModel('', '', 0.0);
  }

  ngOnInit(): void {
    this.gameService
      .getOne(this.#_gameId)
      .subscribe((game) => (this.game = game));
  }

  deleteGame(): void {
    this.gameService
      .deleteOne(this.#_gameId)
      .subscribe((game) => this._redirect());
  }

  _redirect(): void {
    this.router.navigate(['games']);
  }
}
