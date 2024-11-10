import DisplayController from "./displayController";
import GameController from "./gameController";

export default class App {
  constructor() {
    this.displayController = new DisplayController();
    this.gameController = new GameController();
  }

  init() {
    const placementGrid = document.getElementById("placement-grid");
    const enemyGrid = document.getElementById("enemy-grid");
    const playerGrid = document.getElementById("player-grid");
    this.displayController.loadGrid(placementGrid);
    this.displayController.loadGrid(enemyGrid);
    this.displayController.loadGrid(playerGrid);

    this.gameController.humanPlayer.placeShipsRandom();
    this.gameController.compPlayer.placeShipsRandom();

    console.log(this.gameController);
  }
}
