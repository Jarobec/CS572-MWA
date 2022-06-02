export class TeamModel {
  #_id!: string;
  #name!: string;
  #country!: string;
  #numOfPartInOlympic!: number;
  #players!: PlayerModel[];

  constructor(id: string, name: string) {
    this.#_id = id;
    this.#name = name;
  }

  get _id(): string {
    return this.#_id;
  }
  get name(): string {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }
  get country(): string {
    return this.#country;
  }
  set numOfPartInOlympic(numOfPartInOlympic: number) {
    this.#numOfPartInOlympic = numOfPartInOlympic;
  }
  get players(): PlayerModel[] {
    return this.#players;
  }
  set players(players: PlayerModel[]) {
    this.#players = players;
  }
}

class PlayerModel {
  #_id!: string;
  #name!: string;
  #age!: number;

  constructor(id: string, name: string, age: number) {
    this.#_id = id;
    this.#name = name;
    this.#age = age;
  }

  get _id(): string {
    return this.#_id;
  }
  get name(): string {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }
  get age(): number {
    return this.#age;
  }
  set age(age: number) {
    this.#age = age;
  }
}
