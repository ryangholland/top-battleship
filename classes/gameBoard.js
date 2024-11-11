export default class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 100; i++) {
      board.push("");
    }
    return board;
  }

  isValidPlacement(length, cellNum, direction) {
    // Check if the ship fits within the board boundaries
    if (direction === "horizontal") {
      let nextRowStart = Math.ceil(cellNum / 10) * 10;
      if (nextRowStart === 0) nextRowStart += 10;
      if (length + cellNum > nextRowStart) return false;
    }

    if (direction === "vertical") {
      const finalCell = (length - 1) * 10 + cellNum;
      if (finalCell > 99) return false;
    }

    // Check if any cell in the ship's path is already occupied
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal" && this.board[cellNum + i] !== "")
        return false;
      if (direction === "vertical" && this.board[cellNum + i * 10] !== "")
        return false;
    }

    return true;
  }

  placeShip(ship, cellNum, direction) {
    if (!this.isValidPlacement(ship.length, cellNum, direction)) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        this.board[cellNum + i] = "ship";
        ship.position.push(cellNum + i);
      } else {
        this.board[cellNum + i * 10] = "ship";
        ship.position.push(cellNum + i * 10);
      }
    }

    ship.placed = true;
    this.ships.push(ship);
    return true;
  }

  placeAllShipsRandomly(shipArray) {
    shipArray.forEach((ship) => {
      while (!ship.placed) {
        const randomCell = Math.floor(Math.random() * 99);
        const randomDirection = Math.random() < 0.5 ? "horizontal" : "vertical";
        this.placeShip(ship, randomCell, randomDirection);
      }
    });
    return true;
  }

  receiveAttack(cellNum) {
    const target = this.board[cellNum];

    if (target === "hit" || target === "miss") return false;

    if (target === "ship") {
      const hitShip = this.ships.find((ship) =>
        ship.position.includes(+cellNum)
      );

      hitShip.hit();
      this.board[cellNum] = "hit";

      if (this.ships.every((ship) => ship.isSunk())) {
        return "all sunk";
      } else if (hitShip.isSunk()) {
        return "sunk";
      } else return "hit";
    } else {
      this.board[cellNum] = "miss";
      return "miss";
    }
  }
}
