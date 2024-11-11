import Ship from "../classes/ship";

describe("Ship class", () => {
  test("initializes with the correct properties", () => {
    const ship = new Ship(4, "Battleship");
    expect(ship.length).toBe(4);
    expect(ship.name).toBe("Battleship");
    expect(ship.placed).toBe(false);
    expect(ship.timesHit).toBe(0);
    expect(ship.sunk).toBe(false);
    expect(ship.position).toStrictEqual([]);
  });

  test("place ship when place method is called", () => {
    const ship = new Ship(4, "Battleship");
    ship.place([0, 1, 2, 3]);
    expect(ship.placed).toBe(true);
    expect(ship.position).toStrictEqual([0, 1, 2, 3]);
  });

  test("increments timesHit when hit method is called", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.timesHit).toBe(1);
    ship.hit();
    expect(ship.timesHit).toBe(2);
  });

  test("isSunk returns false if the ship is not hit enough times", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk returns true when timesHit equals length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("sunk property is set to true when ship is sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(true);
  });
});
