import GameBoard from "../classes/gameBoard";
import Ship from "../classes/ship";

describe("GameBoard initialization", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("should create a board with 100 cells", () => {
    expect(gameBoard.board.length).toBe(100);
  });

  test('should initialize all cells as "empty"', () => {
    gameBoard.board.forEach((cell) => {
      expect(cell).toBe("");
    });
  });
});

describe("GameBoard isValidPlacement method", () => {
  let gameBoard, destroyer, battleship;

  beforeEach(() => {
    gameBoard = new GameBoard();
    destroyer = new Ship(3, "Destroyer");
    battleship = new Ship(4, "Battleship");
  });

  test("shoud return true on valid horizontal placement", () => {
    expect(gameBoard.isValidPlacement(4, 0, "horizontal")).toBe(true);
    expect(gameBoard.isValidPlacement(3, 55, "horizontal")).toBe(true);
    expect(gameBoard.isValidPlacement(5, 94, "horizontal")).toBe(true);
  });

  test("shoud return true on valid vertical placement", () => {
    expect(gameBoard.isValidPlacement(4, 0, "vertical")).toBe(true);
    expect(gameBoard.isValidPlacement(4, 44, "vertical")).toBe(true);
    expect(gameBoard.isValidPlacement(3, 79, "vertical")).toBe(true);
  });

  test("shoud return false on invalid horizontal placement", () => {
    expect(gameBoard.isValidPlacement(4, 7, "horizontal")).toBe(false);
    expect(gameBoard.isValidPlacement(3, 98, "horizontal")).toBe(false);
    expect(gameBoard.isValidPlacement(5, 47, "horizontal")).toBe(false);
  });

  test("shoud return false on invalid vertical placement", () => {
    expect(gameBoard.isValidPlacement(4, 75, "vertical")).toBe(false);
    expect(gameBoard.isValidPlacement(2, 99, "vertical")).toBe(false);
    expect(gameBoard.isValidPlacement(5, 80, "vertical")).toBe(false);
  });

  test("shoud return false if any target cell is occupied", () => {
    gameBoard.placeShip(destroyer, 3, "horizontal");
    gameBoard.placeShip(battleship, 55, "vertical");
    expect(gameBoard.isValidPlacement(4, 0, "horizontal")).toBe(false);
    expect(gameBoard.isValidPlacement(4, 3, "vertical")).toBe(false);
    expect(gameBoard.isValidPlacement(4, 53, "horizontal")).toBe(false);
    expect(gameBoard.isValidPlacement(4, 35, "vertical")).toBe(false);
  });
});

describe("GameBoard placeShip method", () => {
  let gameBoard, destroyer, battleship, ships;

  beforeEach(() => {
    gameBoard = new GameBoard();
    destroyer = new Ship(3, "Destroyer");
    battleship = new Ship(4, "Battleship");
    ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "Patrol Boat"),
    ];
  });

  test("place a ship horizontally", () => {
    expect(gameBoard.placeShip(destroyer, 0, "horizontal")).toBe(true);
    expect(gameBoard.board[0]).toBe("ship");
    expect(gameBoard.board[1]).toBe("ship");
    expect(gameBoard.board[2]).toBe("ship");
    expect(destroyer.position).toStrictEqual([0, 1, 2]);
    expect(destroyer.placed).toBe(true);
    expect(gameBoard.ships).toEqual(expect.arrayContaining([destroyer]));
  });

  test("place a ship vertically", () => {
    expect(gameBoard.placeShip(destroyer, 55, "vertical")).toBe(true);
    expect(gameBoard.board[55]).toBe("ship");
    expect(gameBoard.board[65]).toBe("ship");
    expect(gameBoard.board[75]).toBe("ship");
    expect(destroyer.position).toStrictEqual([55, 65, 75]);
    expect(destroyer.placed).toBe(true);
    expect(gameBoard.ships).toEqual(expect.arrayContaining([destroyer]));
  });

  test("fail to place a ship horizontally", () => {
    expect(gameBoard.placeShip(destroyer, 9, "horizontal")).toBe(false);
    expect(gameBoard.board[9]).toBe("");
    expect(gameBoard.board[10]).toBe("");
    expect(gameBoard.board[11]).toBe("");
    expect(destroyer.position).toStrictEqual([]);
    expect(destroyer.placed).toBe(false);
    expect(gameBoard.ships).not.toEqual(expect.arrayContaining([destroyer]));
  });

  test("fail to place a ship vertically", () => {
    expect(gameBoard.placeShip(destroyer, 95, "vertical")).toBe(false);
    expect(gameBoard.board[95]).toBe("");
    expect(gameBoard.board[96]).toBe("");
    expect(gameBoard.board[99]).toBe("");
    expect(destroyer.position).toStrictEqual([]);
    expect(destroyer.placed).toBe(false);
    expect(gameBoard.ships).not.toEqual(expect.arrayContaining([destroyer]));
  });
});

describe("GameBoard placeAllShipsRandomly method", () => {
  let gameBoard, ships;

  beforeEach(() => {
    gameBoard = new GameBoard();
    ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "Patrol Boat"),
    ];
  });

  test("place ships randomly", () => {
    expect(gameBoard.placeAllShipsRandomly(ships)).toBe(true);

    // Board should have 17 "ship" cells
    const shipCount = gameBoard.board.filter((cell) => cell === "ship").length;
    expect(shipCount).toBe(17);

    // All ships "placed" property should be true
    ships.forEach((ship) => {
      expect(ship.placed).toBe(true);
    });
  });
});

describe("GameBoard receiveAttack method", () => {
  let gameBoard, destroyer, battleship;

  beforeEach(() => {
    gameBoard = new GameBoard();
    destroyer = new Ship(3, "Destroyer");
    battleship = new Ship(4, "Battleship");
    gameBoard.placeShip(destroyer, 0, "horizontal");
    gameBoard.placeShip(battleship, 45, "vertical");
  });

  test("receive attack on an empty cell", () => {
    gameBoard.receiveAttack(9);
    expect(gameBoard.board[9]).toBe("miss");
  });

  test("receive attack on a ship's cell", () => {
    expect(gameBoard.receiveAttack(1)).toBe("hit");
    expect(gameBoard.board[1]).toBe("hit");
    expect(destroyer.timesHit).toBe(1);
  });

  test("receive attack that sinks a ship", () => {
    gameBoard.receiveAttack(0);
    gameBoard.receiveAttack(1);
    expect(gameBoard.receiveAttack(2)).toBe("sunk");
    expect(destroyer.isSunk()).toBe(true)
  });

  test("receive attack that sinks the last ship", () => {
    gameBoard.receiveAttack(0);
    gameBoard.receiveAttack(1);
    gameBoard.receiveAttack(2);
    gameBoard.receiveAttack(45);
    gameBoard.receiveAttack(55);
    gameBoard.receiveAttack(65);
    expect(gameBoard.receiveAttack(75)).toBe("all sunk");
    expect(destroyer.isSunk()).toBe(true)
    expect(battleship.isSunk()).toBe(true)
  });

  test("attack on an already attacked cell returns false", () => {
    gameBoard.receiveAttack(9);
    expect(gameBoard.receiveAttack(9)).toBe(false);
    gameBoard.receiveAttack(1);
    expect(gameBoard.receiveAttack(1)).toBe(false);
  });
});