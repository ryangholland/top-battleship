import Player from "./player";

export default class Game {
  constructor() {
    this.player = new Player();
    this.opponent = new Player();
    this.activeTurn = this.player;
  }
}
