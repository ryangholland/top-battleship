import GameBoard from "./gameBoard";
import Ship from "./ship";

export default class Player {
  constructor() {
    this.gameBoard = new GameBoard();
    this.ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "Patrol Boat"),
    ];
  }
}
