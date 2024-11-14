export default class AiController {
  constructor() {
    this.coreHit = null; // this will be the cell number
    this.directions = ["north", "south", "west", "east"];
    this.activeDirection = null;
    this.stepsInDirection = 0;
    this.hitCells = [];
  }

  hasCoreHit() {
    return this.coreHit != null;
  }

  setCoreHit(cellNum) {
    this.coreHit = cellNum;
  }

  setDirection() {
    const randomIndex = Math.floor(Math.random() * this.directions.length);
    const [randomDirection] = this.directions.splice(randomIndex, 1);
    this.activeDirection = randomDirection;
  }

  step() {
    this.stepsInDirection++;
  }

  resetSteps() {
    this.stepsInDirection = 0;
  }

  resetAll() {
    this.setCoreHit(null);
    this.resetSteps();
    this.directions = ["north", "south", "west", "east"];
    this.activeDirection = null;
  }

  attackRandomCell() {
    return Math.floor(Math.random() * 99);
  }

  attackTargetedCell() {
    let cellToAttack;

    console.log(this.activeDirection)
    console.log(this.directions)

    if (this.activeDirection === "north") {
      cellToAttack = this.coreHit + this.stepsInDirection * -10;
      if (cellToAttack < 0 || this.hitCells.includes(cellToAttack)) {
        this.directions = ["north", "south", "west", "east"];
        this.setDirection();
        this.resetSteps();
        return false;
      }
      return cellToAttack;
    }

    if (this.activeDirection === "south") {
      cellToAttack = this.coreHit + this.stepsInDirection * 10;
      if (cellToAttack > 99 || this.hitCells.includes(cellToAttack)) {
        this.directions = ["north", "south", "west", "east"];
        this.setDirection();
        this.resetSteps();

        return false;
      }
      return cellToAttack;
    }

    if (this.activeDirection === "west") {
      cellToAttack = this.coreHit + this.stepsInDirection * -1;
      let rowStart = Math.floor(this.coreHit / 10) * 10;
      if (cellToAttack < rowStart || this.hitCells.includes(cellToAttack)) {
        this.directions = ["north", "south", "west", "east"];
        this.setDirection();
        this.resetSteps();
        return false;
      }
      return cellToAttack;
    }

    if (this.activeDirection === "east") {
      cellToAttack = this.coreHit + this.stepsInDirection;
      let rowEnd = Math.ceil((this.coreHit + 0.01) / 10) * 10;
      if (cellToAttack > rowEnd || this.hitCells.includes(cellToAttack)) {
        this.directions = ["north", "south", "west", "east"];
        this.setDirection();
        this.resetSteps();
        return false;
      }
      return cellToAttack;
    }

    return this.attackRandomCell();
  }
}

