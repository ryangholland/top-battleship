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
            while (!opponentAttackLanded) {
              opponentAttackLanded = game.player.gameBoard.receiveAttack(
                Math.floor(Math.random() * 99)
              );
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
