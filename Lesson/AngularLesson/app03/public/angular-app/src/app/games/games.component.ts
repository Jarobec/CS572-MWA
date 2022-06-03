import { Component, OnInit } from '@angular/core';
import { CatFactsDataService } from '../cat-facts-data.service';
import { GamesDataService } from '../games-data.service';

class CatFact {
  status!: { verified: boolean; sentCount: number };
  _id!: string;
  user!: string;
  text!: string;
  __v!: number;
  source!: string;
  updatedAt!: string;
  type!: string;
  createdAt!: string;
  deleted!: boolean;
  used!: boolean;
}

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
  }
  set title(title: string) {
    this.#title = title;
  }
  get year() {
    return this.#year;
  }
  get rate() {
    return this.#rate;
  }
  get price() {
    return this.#price;
  }
  set price(price: number) {
    this.#price = price;
  }
  get minPlayers() {
    return this.#minPlayers;
  }
  get maxPlayers() {
    return this.#maxPlayers;
  }
  get minAge() {
    return this.#minAge;
  }
  constructor(id: string, title: string, price: number) {
    this.#_id = id;
    this.#title = title;
    this.#price = price;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  facts: CatFact[] = [];

  constructor(private gamesService: GamesDataService) {}

  ngOnInit(): void {
    //this.catService.getCatFacts().subscribe((facts) => (this.facts = facts));
    this.gamesService.getAll().subscribe((games) => (this.games = games));
  }
}
