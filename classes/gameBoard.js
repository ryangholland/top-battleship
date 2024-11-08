import Ship from "./ship";

export default class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard() {
    return Array.from({ length: 10 }, () => Array(10).fill("empty"));
  }

  placeShip(ship, startX, startY, direction) {
    if (direction === "horizontal" && startX + ship.length > 10) {
      throw new Error("Ship placement out of bounds horizontally");
    }
    if (direction === "vertical" && startY + ship.length > 10) {
      throw new Error("Ship placement out of bounds vertically");
    }

    for (let i = 0; i < ship.length; i++) {
      const x = direction === "horizontal" ? startX + i : startX;
      const y = direction === "vertical" ? startY + i : startY;

      if (this.board[y][x] !== "empty") {
        throw new Error("Cannot place ship on an occupied cell");
      }

      this.board[y][x] = ship;
      ship.position.push({ x, y });
    }

    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    const target = this.board[y][x];

    if (target === "empty") {
      this.board[y][x] = "miss";
      return "miss";
    } else if (target instanceof Ship) {
      target.hit();
      this.board[y][x] = "hit";

      if (this.ships.every((ship) => ship.isSunk())) {
        return "all sunk";
      } else if (target.isSunk()) {
        return "sunk";
      }
      return "hit";
    }
  }
}
