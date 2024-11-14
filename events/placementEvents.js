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

  // Add preview shading hover effect when placing ships
  const placementCellDivs = placementGrid.querySelectorAll("[data-cell]");
  placementCellDivs.forEach((cellDiv) => {
    cellDiv.addEventListener("mouseover", () => {
      let cellDivsToShade = getDivsToShade(cellDiv, game.activeDirection);
      DisplayController.addHoverShade(cellDivsToShade, game);
    });

    cellDiv.addEventListener("mouseout", () => {
      DisplayController.removeHoverShade(placementGrid);
    });
  });

  function getDivsToShade(cellDiv, direction) {
    let cellNumsToShade = [];
    let activeCellNum = +cellDiv.dataset.cell;
    let activeShipLength = game.player.ships[game.activeShipNum].length;

    if (direction === "horizontal") {
      let nextRowStart = Math.ceil((activeCellNum + 0.01) / 10) * 10;
      if (nextRowStart === 0) nextRowStart += 10;
      for (let i = 0; i < activeShipLength; i++) {
        if (activeCellNum < nextRowStart) {
          cellNumsToShade.push(activeCellNum);
        }
        activeCellNum++;
      }
    }

    if (direction === "vertical") {
      for (let i = 0; i < activeShipLength; i++) {
        if (activeCellNum <= 99) {
          cellNumsToShade.push(activeCellNum);
        }
        activeCellNum += 10;
      }
    }

    let cellDivsToShade = [];
    cellNumsToShade.forEach((cellNum) => {
      cellDivsToShade.push(
        placementGrid.querySelector(`[data-cell="${cellNum}"]`)
      );
    });

    return cellDivsToShade;
  }

  // Place ships
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
        // DisplayController.displayShips(game.opponent, opponentGrid);
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
    // DisplayController.displayShips(game.opponent, opponentGrid);
  });
}
