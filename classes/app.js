import DisplayController from "./displayController";
import Game from "./game";

export default class App {
  constructor() {
    this.game = new Game();
  }

  init() {
    // Create events folder, 3 files: placementEvents, gameplayEvents, gameoverEvents

    DisplayController.loadGrids();
    const placementGrid = document.getElementById("placement-grid");
    const opponentGrid = document.getElementById("opponent-grid");
    const playerGrid = document.getElementById("player-grid");

    // Placement Phase
    let activeShipNum = 0;
    let activeDirection = "horizontal";
    DisplayController.updateActiveShipName(
      this.game.player.ships[activeShipNum]
    );

    const rotateBtn = document.getElementById("rotate-btn");
    rotateBtn.addEventListener("click", () => {
      activeDirection =
        activeDirection === "horizontal" ? "vertical" : "horizontal";
    });

    const placementCellDivs = placementGrid.querySelectorAll("[data-cell]");
    placementCellDivs.forEach((cellDiv) => {
      cellDiv.addEventListener("click", () => {
        let shipPlaced;
        shipPlaced = this.game.player.gameBoard.placeShip(
          this.game.player.ships[activeShipNum],
          +cellDiv.dataset.cell,
          activeDirection
        );

        if (
          this.game.player.ships.filter((ship) => !ship.placed).length === 0
        ) {
          this.game.opponent.gameBoard.placeAllShipsRandomly(
            this.game.opponent.ships
          );
          DisplayController.showGameplayScreen();
          DisplayController.displayShips(this.game.player, playerGrid);
          DisplayController.displayShips(this.game.opponent, opponentGrid);
        } else {
          if (shipPlaced) activeShipNum++;
          DisplayController.displayShips(this.game.player, placementGrid);
          DisplayController.updateActiveShipName(
            this.game.player.ships[activeShipNum]
          );
        }
      });
    });

    const randomPlacementBtn = document.getElementById("random-placement-btn");
    randomPlacementBtn.addEventListener("click", () => {
      this.game.player.gameBoard.placeAllShipsRandomly(
        this.game.player.ships.filter((ship) => !ship.placed)
      );
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
    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", () => {
      this.game = new Game();
      DisplayController.loadGrids();
      DisplayController.showPlacementScreen();
    });
  }
}
