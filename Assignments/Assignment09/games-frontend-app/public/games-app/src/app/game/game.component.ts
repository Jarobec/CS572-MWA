import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { GameModel } from '../classes/game-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game!: GameModel;

  constructor(
    private router: ActivatedRoute,
    private gameService: GamesDataService
  ) {
    this.game = new GameModel('', '', 0.0);
  }

  ngOnInit(): void {
    const gameId = this.router.snapshot.params['gameId'];
    this.gameService.getOne(gameId).subscribe((game) => (this.game = game));
  }

  onDelete(): void {
    const gameId = this.router.snapshot.params['gameId'];
    this.gameService
      .deleteOne(gameId)
      .subscribe((game) => console.log('Success'));
  }
}
