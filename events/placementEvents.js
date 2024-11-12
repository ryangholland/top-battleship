import DisplayController from "../classes/displayController";

export default function loadPlacementEvents(game) {
  const placementGrid = document.getElementById("placement-grid");
  const opponentGrid = document.getElementById("opponent-grid");
  const playerGrid = document.getElementById("player-grid");

  // Toggle "horizontal" / "vertical" placement
  const rotateBtn = document.getElementById("rotate-btn");
  rotateBtn.addEventListener("click", () => {
    game.changeDirection();
  });

  // Place ships
  const placementCellDivs = placementGrid.querySelectorAll("[data-cell]");
  placementCellDivs.forEach((cellDiv) => {
    cellDiv.addEventListener("click", () => {
      let shipPlaced;
      shipPlaced = game.player.gameBoard.placeShip(
        game.player.ships[game.activeShipNum],
        +cellDiv.dataset.cell,
        game.activeDirection
      );

      if (game.player.ships.filter((ship) => !ship.placed).length === 0) {
        game.opponent.gameBoard.placeAllShipsRandomly(game.opponent.ships);
        DisplayController.showGameplayScreen();
        DisplayController.displayShips(game.player, playerGrid);
        DisplayController.displayShips(game.opponent, opponentGrid);
      } else {
        if (shipPlaced) game.selectNextShip();
        DisplayController.displayShips(game.player, placementGrid);
        DisplayController.updateActiveShipName(
          game.player.ships[game.activeShipNum]
        );
      }
    });
  });

  // Random placement button
  const randomPlacementBtn = document.getElementById("random-placement-btn");
  randomPlacementBtn.addEventListener("click", () => {
    game.player.gameBoard.placeAllShipsRandomly(
      game.player.ships.filter((ship) => !ship.placed)
    );
    game.opponent.gameBoard.placeAllShipsRandomly(game.opponent.ships);
    DisplayController.showGameplayScreen();
    DisplayController.displayShips(game.player, playerGrid);
    DisplayController.displayShips(game.opponent, opponentGrid);
  });
}
