import GameBoard from "./gameBoard";
import Ship from "./ship";

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new GameBoard();
    this.ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "Patrol Boat"),
    ];
  }

  placeShipsRandom() {
    console.log(this.ships)
    this.ships.forEach((ship) => {
      while (!ship.placed) {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        const randomDirection = Math.random() < 0.5 ? "horizontal" : "vertical";
        this.gameBoard.placeShip(ship, randomX, randomY, randomDirection);
      }
      return;
    });
  }
}
