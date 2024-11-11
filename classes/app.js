import DisplayController from "./displayController";
import Game from "./game";

export default class App {
  constructor() {
    this.game = new Game();
  }

  init() {
    DisplayController.loadGrids();
    const opponentGrid = document.getElementById("opponent-grid");
    const playerGrid = document.getElementById("player-grid");

    const randomPlacementBtn = document.getElementById("random-placement-btn");
    randomPlacementBtn.addEventListener("click", () => {
      this.game.player.gameBoard.placeAllShipsRandomly(this.game.player.ships);
      this.game.opponent.gameBoard.placeAllShipsRandomly(
        this.game.opponent.ships
      );
      DisplayController.showGameplayScreen();
      DisplayController.displayShips(this.game.player, playerGrid);
      DisplayController.displayShips(this.game.opponent, opponentGrid);
    });

    const opponentCellDivs = opponentGrid.querySelectorAll("[data-cell]");
    opponentCellDivs.forEach((cellDiv) => {
      cellDiv.addEventListener("click", () => {
        this.game.opponent.gameBoard.receiveAttack(cellDiv.dataset.cell);
        DisplayController.updateBoardDisplay(this.game.opponent, opponentGrid);
      });
    });
  }
}
