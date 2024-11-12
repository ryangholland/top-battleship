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

    // Placement Phase
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

    // Gameplay Phase
    const opponentCellDivs = opponentGrid.querySelectorAll("[data-cell]");
    opponentCellDivs.forEach((cellDiv) => {
      cellDiv.addEventListener("click", () => {
        if (this.game.activeTurn == this.game.player) {
          let playerAttackLanded = false;
          playerAttackLanded = this.game.opponent.gameBoard.receiveAttack(
            cellDiv.dataset.cell
          );
          if (playerAttackLanded === "all sunk") {
            DisplayController.showGameOverScreen("player");
          } else if (playerAttackLanded) {
            DisplayController.updateBoardDisplay(
              this.game.opponent,
              opponentGrid
            );
            this.game.activeTurn = this.game.opponent;
            setTimeout(() => {
              let opponentAttackLanded = false;
              while (!opponentAttackLanded) {
                opponentAttackLanded = this.game.player.gameBoard.receiveAttack(
                  Math.floor(Math.random() * 99)
                );
              }
              if (opponentAttackLanded === "all sunk") {
                DisplayController.showGameOverScreen("opponent");
              } else {
                DisplayController.updateBoardDisplay(
                  this.game.player,
                  playerGrid
                );
                this.game.activeTurn = this.game.player;
              }
            }, 1000);
          }
        }
      });
    });

    // Restart Game
    const restartBtn = document.getElementById("restart")
    restartBtn.addEventListener("click", () => {
      this.game = new Game();
      DisplayController.loadGrids();
      DisplayController.showPlacementScreen();
    })

  }
}
