export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.placed = false;
    this.timesHit = 0;
    this.sunk = false;
    this.position = [];
  }

  hit() {
    this.timesHit++;
    if (this.timesHit === this.length) this.sunk = true;
  }

  isSunk() {
    return this.sunk;
  }
}
