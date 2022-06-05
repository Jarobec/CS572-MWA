import { GameModel } from './game-model';

export class PageModel {
  #_games!: GameModel[];
  #_totalPage!: number;

  constructor(games: GameModel[], totalPage: number) {
    this.#_games = games;
    this.#_totalPage = totalPage;
  }
  get games(): GameModel[] {
    return this.#_games;
  }
  set games(games: GameModel[]) {
    this.#_games = games;
  }
  get totalPage(): number {
    return this.#_totalPage;
  }
  set totalPage(totalPage: number) {
    this.#_totalPage = totalPage;
  }
}
