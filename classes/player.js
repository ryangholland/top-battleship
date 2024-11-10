import GameBoard from "./gameBoard";

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}
