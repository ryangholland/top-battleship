export default class Ship {
  constructor(length, name = "Ship") {
    this.length = length;
    this.name = name;
    this.placed = false;
    this.position = [];
    this.timesHit = 0;
    this.sunk = false;
  }

  place(cells) {
    this.placed = true;
    this.position = cells;
  }

  hit() {
    this.timesHit++;
    if (this.timesHit === this.length) this.sunk = true;
  }

  isSunk() {
    return this.sunk;
  }
}
