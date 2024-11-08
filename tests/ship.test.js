import Ship from "../classes/ship";

describe("Ship class", () => {
  test("initializes with the correct properties", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.timesHit).toBe(0);
    expect(ship.sunk).toBe(false);
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
    expect(ship.sunk).toBe(false); // Not sunk yet
    ship.hit();
    ship.isSunk(); // isSunk should set sunk to true
    expect(ship.sunk).toBe(true);
  });

  test("isSunk remains true once ship is sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.isSunk()).toBe(true);
    ship.hit(); // Additional hits shouldn't affect sunk status
    expect(ship.isSunk()).toBe(true);
  });
});
