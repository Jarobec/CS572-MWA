import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GameModel } from '../classes/game-model';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-add-edit',
  templateUrl: './game-add-edit.component.html',
  styleUrls: ['./game-add-edit.component.css'],
})
export class GameAddEditComponent implements OnInit {
  gameForm!: FormGroup;
  #_gameId!: string;
  headerLabel: string = 'Add a new game';
  buttonLabel: string = 'Create game';

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private gameService: GamesDataService
  ) {
    this.#_gameId = this.activeRouter.snapshot.params['gameId'] || '0';
  }

  ngOnInit(): void {
    this._createForm();
    if (this.#_gameId !== '0') {
      this.headerLabel = 'Edit a game';
      this.buttonLabel = 'Update game';
      this._getGame();
    }
  }

  _createForm(game?: GameModel): void {
    const gameFormBody = {
      title: [game?.title || '', [Validators.required]],
      rate: [
        game?.rate || '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      year: [
        game?.year || '',
        [Validators.required, Validators.min(1900), Validators.max(2022)],
      ],
      price: [game?.price || '', [Validators.required, Validators.min(1)]],
      minPlayers: [game?.minPlayers || '', [Validators.min(1)]],
      maxPlayers: [game?.maxPlayers || '', [Validators.min(1)]],
      minAge: [game?.minAge || '', [Validators.min(5)]],
    };
    this.gameForm = this.formBuilder.group(gameFormBody, {
      validators: this._checkMinMaxPlayersGap,
    });
  }

  _getGame(): void {
    this.gameService.getOne(this.#_gameId).subscribe((gameData) => {
      this._createForm(gameData);
    });
  }

  saveGame(): void {
    if (this.#_gameId !== '0') {
      this._updateGame();
    } else {
      this._createGame();
    }
  }

  _createGame(): void {
    this.gameService
      .addOne(this.gameForm.value)
      .subscribe((value) => this._redirect());
  }

  _updateGame(): void {
    this.gameService
      .fullUpdateOne(this.#_gameId, this.gameForm.value)
      .subscribe((value) => this._redirect());
  }

  _redirect(): void {
    if (this.#_gameId !== '0') {
      this.router.navigate(['game/view/' + this.#_gameId]);
    } else {
      this.router.navigate(['games']);
    }
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.errors?.['required']) return '*Required';

    return '';
  }

  _checkMinMaxPlayersGap: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const minPlayers = control.get('minPlayers');
    const maxPlayers = control.get('maxPlayers');

    return minPlayers && maxPlayers && minPlayers.value > maxPlayers.value
      ? { minMaxPlayersGap: true }
      : null;
  };

  get title() {
    return this.gameForm.controls['title'];
  }
  get rate() {
    return this.gameForm.controls['rate'];
  }
  get year() {
    return this.gameForm.controls['year'];
  }
  get price() {
    return this.gameForm.controls['price'];
  }
  get minPlayers() {
    return this.gameForm.controls['minPlayers'];
  }
  get maxPlayers() {
    return this.gameForm.controls['maxPlayers'];
  }
  get minAge() {
    return this.gameForm.controls['minAge'];
  }
}
