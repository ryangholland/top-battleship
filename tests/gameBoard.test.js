import GameBoard from "../classes/gameBoard";
import Ship from "../classes/ship";

describe("GameBoard initialization", () => {
  let gameBoard;

  // Before each test, we create a new GameBoard instance
  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("should create a 10x10 board", () => {
    // Check if the board is a 10x10 grid
    expect(gameBoard.board.length).toBe(10); // The board should have 10 rows
    gameBoard.board.forEach((row) => {
      expect(row.length).toBe(10); // Each row should have 10 columns
    });
  });

  test('should initialize all cells as "empty"', () => {
    // Check if all cells are initialized to "empty"
    gameBoard.board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toBe("empty"); // Each cell should be "empty"
      });
    });
  });
});

describe("GameBoard ship placement and attacks", () => {
  let gameBoard, destroyer, submarine;

  // Setup a new game board and ships before each test
  beforeEach(() => {
    gameBoard = new GameBoard();
    destroyer = new Ship(3);
    submarine = new Ship(4);
  });

  describe("placeShip", () => {
    test("places a ship horizontally on the board", () => {
      gameBoard.placeShip(destroyer, 0, 0, "horizontal");
      expect(gameBoard.board[0][0]).toBe(destroyer);
      expect(gameBoard.board[0][1]).toBe(destroyer);
      expect(gameBoard.board[0][2]).toBe(destroyer);
    });

    test("places a ship vertically on the board", () => {
      gameBoard.placeShip(submarine, 2, 2, "vertical");
      expect(gameBoard.board[2][2]).toBe(submarine);
      expect(gameBoard.board[3][2]).toBe(submarine);
      expect(gameBoard.board[4][2]).toBe(submarine);
      expect(gameBoard.board[5][2]).toBe(submarine);
    });

    test("throws error when placing a ship out of bounds", () => {
      expect(() =>
        gameBoard.placeShip(destroyer, 8, 0, "horizontal")
      ).toThrow();
      expect(() => gameBoard.placeShip(submarine, 0, 8, "vertical")).toThrow();
    });

    test("throws error when placing a ship on an occupied cell", () => {
      gameBoard.placeShip(destroyer, 0, 0, "horizontal");
      expect(() => gameBoard.placeShip(submarine, 0, 0, "vertical")).toThrow();
    });
  });

  describe("receiveAttack", () => {
    beforeEach(() => {
      gameBoard.placeShip(destroyer, 0, 0, "horizontal");
      gameBoard.placeShip(submarine, 5, 5, "vertical")
    });

    test("marks a miss on an empty cell", () => {
      expect(gameBoard.receiveAttack(9, 9)).toBe("miss");
      expect(gameBoard.board[9][9]).toBe("miss");
    });

    test("marks a hit on a ship cell and updates ship hit count", () => {
      expect(gameBoard.receiveAttack(0, 0)).toBe("hit");
      expect(gameBoard.board[0][0]).toBe("hit");
      expect(destroyer.timesHit).toBe(1);
    });

    test("sinks the ship when all parts are hit", () => {
      gameBoard.receiveAttack(0, 0);
      gameBoard.receiveAttack(1, 0);
      expect(gameBoard.receiveAttack(2, 0)).toBe("sunk");
      expect(destroyer.isSunk()).toBe(true);
    });

    test("report when all ships are sunk", () => {
      gameBoard.receiveAttack(0, 0);
      gameBoard.receiveAttack(1, 0);
      gameBoard.receiveAttack(2, 0);
      gameBoard.receiveAttack(5, 5);
      gameBoard.receiveAttack(5, 6);
      gameBoard.receiveAttack(5, 7);
      expect(gameBoard.receiveAttack(5, 8)).toBe("all sunk");
      expect(destroyer.isSunk()).toBe(true);
      expect(submarine.isSunk()).toBe(true);
    })
  });
});
