import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css'],
})
export class GameEditComponent implements OnInit {
  gameEditForm!: FormGroup;
  #_gameId!: string;

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private gameService: GamesDataService
  ) {
    this.#_gameId = this.activeRouter.snapshot.params['gameId'];
    this.gameEditForm = formBuilder.group({
      title: '',
      rate: '',
      year: '',
      price: '',
      minPlayers: '',
      maxPlayers: '',
      minAge: '',
    });
  }

  ngOnInit(): void {
    this.gameService.getOne(this.#_gameId).subscribe((game) => {
      this.gameEditForm = this.formBuilder.group({
        title: game.title,
        rate: game.rate,
        year: game.year,
        price: game.price,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        minAge: game.minAge,
      });
    });
  }

  editGame(): void {
    const a = this.gameService.fullUpdateOne(
      this.#_gameId,
      this.gameEditForm.value
    );
    a.subscribe((a) => this.router.navigate(['game/view/' + this.#_gameId]));
  }
}
