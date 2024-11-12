import Player from "./player";

export default class Game {
  constructor() {
    this.player = new Player();
    this.opponent = new Player();
    this.activeShipNum = 0;
    this.activeDirection = "horizontal";
    this.activeTurn = this.player;
  }

  selectNextShip() {
    this.activeShipNum++;
  }

  changeDirection() {
    this.activeDirection =
      this.activeDirection === "horizontal" ? "vertical" : "horizontal";
  }
}
