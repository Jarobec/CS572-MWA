export class GameModel {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  #designers!: string;

  constructor(id: string, title: string, price: number) {
    this.#_id = id;
    this.#title = title;
    this.#price = price;
  }

  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
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
  get designers() {
    return this.#designers;
  }

  // toString() {
  //   return (
  //     '{"title":"' +
  //     this.title +
  //     '","year":"' +
  //     this.year +
  //     '","rate":"' +
  //     this.rate +
  //     '","price":"' +
  //     this.price +
  //     '","minPlayers":"' +
  //     this.minPlayers +
  //     '","maxPlayers":"' +
  //     this.maxPlayers +
  //     '","minAge":"' +
  //     this.minAge +
  //     '"}'
  //   );
  // }
}
