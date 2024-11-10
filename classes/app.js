import DisplayController from "./displayController";

export default class App {
  constructor() {
    this.displayController = new DisplayController();
  }

  init() {
    const placementGrid = document.getElementById("placement-grid");
    const enemyGrid = document.getElementById("enemy-grid");
    const playerGrid = document.getElementById("player-grid");
    this.displayController.loadGrid(placementGrid);
    this.displayController.loadGrid(enemyGrid);
    this.displayController.loadGrid(playerGrid);
  }
}
