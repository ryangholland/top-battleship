import DisplayController from "../classes/displayController";

export default function loadGameplayEvents(game) {
  const opponentGrid = document.getElementById("opponent-grid");
  const playerGrid = document.getElementById("player-grid");
  const opponentCellDivs = opponentGrid.querySelectorAll("[data-cell]");

  // Attack cell
  opponentCellDivs.forEach((cellDiv) => {
    cellDiv.addEventListener("click", () => {
      if (game.activeTurn == game.player) {
        let playerAttackLanded = false;
        playerAttackLanded = game.opponent.gameBoard.receiveAttack(
          cellDiv.dataset.cell
        );
        if (playerAttackLanded === "all sunk") {
          DisplayController.showGameOverScreen("player");
        } else if (playerAttackLanded) {
          DisplayController.updateBoardDisplay(game.opponent, opponentGrid);
          game.activeTurn = game.opponent;
          setTimeout(() => {
            let opponentAttackLanded = false;
            let cellChoice;

            while (!opponentAttackLanded) {
              if (game.ai.hasCoreHit()) {
                cellChoice =
                  game.ai.attackTargetedCell() || game.ai.attackRandomCell();
                opponentAttackLanded =
                  game.player.gameBoard.receiveAttack(cellChoice);
              } else {
                cellChoice = game.ai.attackRandomCell();
                opponentAttackLanded =
                  game.player.gameBoard.receiveAttack(cellChoice);
                if (opponentAttackLanded === "hit") {
                  game.ai.resetAll();
                  game.ai.setCoreHit(cellChoice);
                  game.ai.setDirection();
                }
              }
            }

            game.ai.hitCells.push(cellChoice);

            if (opponentAttackLanded === "sunk") {
              game.ai.resetAll();
            }

            if (game.ai.hasCoreHit() && opponentAttackLanded === "miss") {
              game.ai.setDirection();
              game.ai.resetSteps();
              game.ai.step();
            }

            if (game.ai.hasCoreHit() && opponentAttackLanded === "hit") {
              game.ai.step();
            }

            if (opponentAttackLanded === "all sunk") {
              DisplayController.showGameOverScreen("opponent");
            } else {
              DisplayController.updateBoardDisplay(game.player, playerGrid);
              game.activeTurn = game.player;
            }
          }, 1000);
        }
      }
    });
  });
}
