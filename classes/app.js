import DisplayController from "./displayController";
import GameController from "./gameController";

export default class App {
  constructor() {
    this.displayController = new DisplayController();
    this.gameController = new GameController();
  }

  init() {
    this.displayController.loadGrids();

    const randomPlacementBtn = document.getElementById("random-placement-btn");
    randomPlacementBtn.addEventListener("click", () => {
      this.gameController.humanPlayer.placeShipsRandom();
      this.gameController.compPlayer.placeShipsRandom();
      this.displayController.showGameplayScreen();
      this.displayController.displayShips(this.gameController.humanPlayer);
    });

    console.log(this.gameController);
  }
}
