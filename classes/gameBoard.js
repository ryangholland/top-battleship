import Ship from "./ship";

export default class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard() {
    return Array.from({ length: 10 }, () => Array(10).fill("empty"));
  }

  isValidPlacement(length, x, y, direction) {
    // Check if the ship fits within the board boundaries
    if (direction === "horizontal" && x + length > 10) return false;
    if (direction === "vertical" && y + length > 10) return false;

    // Check if any cell in the ship's path is already occupied
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal" && this.board[y][x + i] !== "empty")
        return false;
      if (direction === "vertical" && this.board[y + i][x] !== "empty")
        return false;
    }

    return true;
  }

  placeShip(ship, startX, startY, direction) {
    if (!this.isValidPlacement(ship.length, startX, startY, direction)) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        this.board[startY][startX + i] = "ship";
      } else {
        this.board[startY + i][startX] = "ship";
      }
    }

    ship.placed = true;
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
